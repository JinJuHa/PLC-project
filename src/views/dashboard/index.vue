<template>
  <div class="dashboard-background">
    <div class="dashboard-container">
      <font-awesome-icon class="back-button" icon="fa-solid fa-circle-chevron-left" @click="dashboardClose" />
      <div class="dashboard-title">
        <p>대시보드</p>
      </div>
      <div class="dashboard-content">
        <div class="dashboard-left">
          <div class="dashboard-info">
            <div class="dashboard-info-lists">
              <div class="dashboard-clock">
                <div id="time">&nbsp;</div>
              </div>
              <div class="dashboard-details">
                <div class="dashboard-user">
                  <div class="user-info">
                    <p>PLC 명</p>
                    <p>PLC - {{ id }}호기</p>
                  </div>
                  <div class="user-info">
                    <p>담당자</p>
                    <p>{{ 담당자이름 }}</p>
                  </div>
                </div>
                <div class="dashboard-active">
                  <p>작동 여부</p>
                  <!-- <p>{{ plc.plcStart === true ? 'ON' : 'OFF' }}</p> -->
                  <p>ON</p>
                </div>
              </div>
            </div>
            <div class="light-container">
              <div class="dashboard-lights">
                <div v-show="plc.lightRed === false" class="light red-off"></div>
                <div v-show="plc.lightRed === true" class="light red"></div>
                <div v-show="plc.lightYellow === false" class="light yellow-off"></div>
                <div v-show="plc.lightYellow === true" class="light yellow"></div>
                <div v-show="plc.lightGreen === false" class="light green-off"></div>
                <div v-show="plc.lightGreen === true" class="light green"></div>
              </div>
            </div>
          </div>
          <div class="dashboard-line">
            <line-chart
              id="stockChart"
              ref="stockChart"
              :chart-data="chartData"
              :options="lineChart.options"
              style="height: 260px; width: 1000px"
            ></line-chart>
          </div>
        </div>
        <div class="dashboard-right">
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mqtt from 'mqtt'
// import DoughnutChart from '@/components/chart/doughnutChart'
// import BarChart from '@/components/chart/barChart'
import LineChart from '@/components/chart/lineChart'
import axios from 'axios'
export default {
  components: {
    // 'doughnut-chart': DoughnutChart,
    // 'bar-chart': BarChart,
    'line-chart': LineChart
  },
  props: {
    plc: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      selected: {
        deviceId: 1,
        deviceName: '1StockData',
        tagList: ['트레이', '주사위']
      },
      // 라인차트 옵션 시작
      options: {
        responsive: true,
        title: {
          display: true,
          text: '재고 현황'
        },
        tooltips: {
          mode: 'index'
        },
        hover: {
          mode: 'index'
        },
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Time'
              }
            }
          ],
          yAxes: [
            {
              stacked: false,
              scaleLabel: {
                display: true,
                labelString: 'amount'
              }
            }
          ]
        }
      },
      // 라인차트 옵션 끝
      no1Status: false,
      no2Status: false,
      isColorSensing: false,

      담당자이름: '지미',
      tray: 8,
      dice: 8,
      id: '',
      doughnutChart: {
        data: {
          labels: ['불량품', '양품'],
          datasets: [
            {
              backgroundColor: ['#A684B7', '#DD7445'],
              borderColor: '#eee',
              hoverBorderColor: '#eee',
              data: [0, 0]
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Accuracy Rate Chart'
          },
          plugins: {
            legend: {
              display: true,
              position: 'left',
              labels: {
                boxWidth: 8,
                padding: 10,
                usePointStyle: true,
                pointStyle: 'circle',
                font: {
                  size: 14
                }
              },
              fullSize: true,
              align: 'center'
            },
            tooltip: {
              boxWidth: 15,
              bodyFont: {
                size: 14
              }
            }
          },
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: {
              top: 50,
              bottom: 50
            }
          },
          elements: {
            arc: {
              borderWidth: 2
            }
          },
          animation: {
            duration: 5000
          }
        }
      },
      // 내가 사용한 변수
      lineDatasetLabels: [],
      lineChartLabels: [],
      mqttDataListForLine: [],
      // lineChartData: [],

      // 원래있던 애들
      maxDataLength: 20, // TODO: 현재 차트에서 출력할 데이터의 최대크기(화면에서 입력 가능하도록 한다.)
      mqttDataList: [], // mqtt를 통해 받은 데이터(리스트로 계속 추가됨)
      chartData: [0, 0, 0, 0, 0, 0], // 차트로 표현될 데이터
      chartLabels: [], // 차트에서 사용할 라벨 리스트(가로축 라벨)
      chartDatasetLabels: [], // 차트에서 사용할 데이터셋 라벨 리스트
      chartDatasetDataList: [], // 차트에서 사용할 데이터셋 데이터 리스트
      diceStatus: false,
      work: 0,
      good: 0,
      bad: 0,
      accuracyRate: 0
    }
  },
  // computed: {
  //   stockCheck() {
  //     if (this.no1Active === true) {
  //       return this.tray--
  //     }
  //     if (this.no2Active === true) {
  //       return this.dice--
  //     }
  //   }
  // },
  created() {
    this.createMqtt()
  },
  mounted() {
    ;(this.timerInterval = setInterval(() => {
      const now = new Date()
      let years = now.getFullYear()
      let months = now.getMonth() + 1
      let dates = now.getDate()
      this.today = `${years}/${months}/${dates}`
      document.querySelector('#time').innerHTML = now.toLocaleString('ko-kr')
    }, 10)),
      // this.makeChartData()
      this.makeLineChartData()
    this.accuracyCheck()
    // this.renderChart(this.barChart.data.datasets[0].data, this.options)
    this.deviceIdCheck()
  },
  destroyed() {
    clearInterval(this.timerInterval)
  },
  methods: {
    dashboardClose() {
      this.$emit('dashboardClose')
    },
    createMqtt() {
      // mqtt연결
      const mqttClient = mqtt.connect(process.env.VUE_APP_MQTT)

      mqttClient.on('connect', () => {
        // mqtt연결 시 구독한다.
        const topic = 'myEdukit' // 구독할 topic
        mqttClient.subscribe(topic, {}, (error, res) => {
          if (error) {
            console.error('mqtt client error', error)
          }
        })
      })

      // 메세지 실시간 수신
      mqttClient.on('message', (topic, message) => {
        const mqttData = JSON.parse(message) // json string으로만 받을 수 있음
        let plcData = mqttData.Wrapper.filter(
          p => p.tagId === '3' || p.tagId === '29' || p.tagId === '39' || p.tagId === '40'
        )
        this.mqttDataListForLine.push(this.tray)
        this.mqttDataListForLine.push(this.dice)
        // console.log('plcData', plcData)
        // console.log('this.mqttDataListForLine', this.mqttDataListForLine)

        // 3은 tray 작동, 27은 주사위 작동, 39는 컬러센서 작동, 40은 3호기 작동
        // console.log('plcData', plcData) // [0] : 1호기 작동 / [1] : 2호기 작동 / [2]: 컬러센서 작동 / [3]: 3호기 작동

        // 1호기 벨류가 true이면서 1호기 상태가 false면 트레이 갯수 -1 후 1호기 상태 true로 변경
        if (plcData[0].value && this.no1Status === false) {
          this.no1Status = true
          this.tray--
          // console.log('white', this.tray)
        }

        // 컬러 센서가 작동했다면 컬러센서 상태를 true로 변경 후 1호기 상태를 false로 변경
        if (plcData[2].value === true) {
          this.isColorSensing = true
          this.no1Status = false
          // console.log('this.no1Status', this.no1Status)
        }

        // 2호기 벨류가 true이고 2호기 상태가 false이면서 컬러센서가 작동됐다면(white tray)
        // 다이스 갯수 -1 후 2호기 상태 true 및 컬러센싱 상태 false로 변경
        if (plcData[1].value && !this.no2status && this.isColorSensing) {
          this.no2Status = true
          this.dice--
          this.isColorSensing = false
          // console.log('this.no2Status', this.no2Status)
        }

        // 3호기 벨류가 true이면 2호기 상태 false로 변경
        if (plcData[3].value) {
          this.no2Status = false
        }
        this.makeLineChartXAxisLabel(mqttData)
        this.makeLineChartData() // 라인 차트 데이터 생성

        // console.log('트레이 갯수', this.tray)
        // console.log('주사위 갯수', this.dice)

        // 선택된 devicdId만 수용함
        this.removeOldData() // 오래된 데이터 제거

        // this.makeChartData() // 차트용 데이터 작성
      })
    },
    removeOldData() {
      // 현재 차트에 출력할 수가 x개를 넘어서면 제일 오래된 데이터를 제거 한다.
      if (this.maxDataLength - 1 < this.mqttDataList.length) {
        this.mqttDataList.shift() // mqttData제거
        this.chartLabels.shift() // 차트라벨 제거
      }
    },

    // 시간라벨용 차트

    // 라인차트용 데이터 생성
    makeLineChartData() {
      // console.log('makeLineChartData - In?')
      // mqtt정보가 없으면 기본 그래프를 그려준다.(이것이 없으면 그래프 자체가 나오지 않음)
      if (this.mqttDataListForLine.length === 0) {
        // console.log('여기를 탔니?')
        this.chartData = {
          labels: ['0'],
          datasets: [
            {
              label: 'no data',
              data: [0]
            }
          ]
        }
        return
      }
      // console.log('여기는 오니?')
      // 라인차트용 데이터셋 라벨 리스트 생성 (태그 리스트를 데이터셋 라벨로 사용한다.)
      const lineChartDatasetLabels = []
      for (let i = 0; i < this.selected.tagList.length; i += 1) {
        // console.log('라인차트 for문 탔다!')
        const lineTagName = this.selected.tagList[i] // 라인차트용 테그네임을 추출함
        // console.log('for문 라인테그', lineTagName)
        lineChartDatasetLabels.push(lineTagName) // 테그네임을 라벨로 사용함.
      }
      this.lineDatasetLabels = Array.from(new Set(lineChartDatasetLabels)) // 중복제거

      // 라인 차트 데이터 생성
      this.chartData = {
        labels: this.lineChartLabels,
        datasets: this.makeLineChartDatasetDatas()
      }
      console.log('this.chartData.labels', this.chartData.labels)
      console.log('this.chartData.datasets', this.chartData.datasets)
    },

    // 라인차트용데이타셋데이터스 만들기
    makeLineChartDatasetDatas() {
      // console.log('트레이갯수 살아있니?', this.tray)
      const lineDatasetDatas = []
      // console.log('this.lineDatasetLabels', this.lineDatasetLabels)
      for (let i = 0; i < this.lineDatasetLabels.length; i += 1) {
        const lineLabel = this.lineDatasetLabels[i]
        // console.log('lineLabe', lineLabel)
        const lineDatas = [] // 해당 label에 속한 데이터셋의 데이터 리스트
        for (let j = 0; j < this.mqttDataListForLine.length; j += 1) {
          const mqttDataForLineChart = this.mqttDataListForLine[j]
          // console.log('mqttDataForLineChart', mqttDataForLineChart)
          lineDatas.push(mqttDataForLineChart)
          // console.log('lineDatas', lineDatas)
        }
        lineDatasetDatas.push({
          label: lineLabel,
          fill: false,
          data: lineDatas
        })
        // console.log('lineDatasetDatas', lineDatasetDatas)
      }
      return lineDatasetDatas.map((item, idx) => {
        const color = idx === 0 ? '#1B9CFC' : '#e74c3c'
        // console.log('item', item)
        return { ...item, borderColor: color }
      })
    },

    // 라인 차트 라벨(가로측) 생성
    makeLineChartXAxisLabel(mqttData) {
      this.lineChartLabels.push(mqttData.Wrapper[40].value.substring(11, 19))
    },
    doughnutDatasetDatas() {
      const doughnutData = this.doughnutChart.data.datasets[0].data
      console.log('불량품', doughnutData[0])
      console.log('양품', doughnutData[1])
      doughnutData.splice(0, 2, this.bad, this.good)
    },
    makeDatasetDatas() {
      // 데이터셋의 데이터 추출
      const datasetDatas = []

      for (let i = 0; i < this.chartDatasetLabels.length; i += 1) {
        const label = this.chartDatasetLabels[i] // label을 하나씩 추출한다.
        const datas = [] // 해당 label에 속한 데이터셋의 데이터 리스트

        // mqtt로 들어온 데이터에서 key값으로 사용된 tag와 현재 label이 같으면 해당 데이터를 추출 한다.
        for (let j = 0; j < this.mqttDataList.length; j += 1) {
          const mqttData = this.mqttDataList[j]
          const tagData = mqttData.wrapper[22].value // 현재 데이터셋 label과 같은 태그만 추출한다.
          datas.push(tagData)
        }
        datasetDatas.push({
          label: label,
          fill: false,
          data: datas
        })
      }
      return datasetDatas.map((item, idx) => {
        const color = idx === 0 ? '#1B9CFC' : '#e74c3c'
        return { ...item, borderColor: color }
      })
    },
    accuracyCheck() {
      axios
        .get(process.env.VUE_APP_SERVER + '/logs/find-cycle-all/1')
        .then(response => {
          const cycle = response.data.data
          for (let i = 0; i < cycle.length; i++) {
            this.work = this.work + cycle[i].work
            this.good = this.good + cycle[i].good
            this.bad = this.bad + cycle[i].bad
          }
          this.accuracyRate = Math.round((this.good / this.work) * 100)
          // this.doughnutDatasetDatas()
          const doughnutData = this.doughnutChart.data.datasets[0].data
          doughnutData.splice(0)
          doughnutData.push(this.bad, this.good)
          console.log('불량품', doughnutData[0])
          console.log('양품', doughnutData[1])
        })
        .catch(error => {
          console.log('accuracyRate: ', error)
          alert('try again!')
        })
    },
    deviceIdCheck() {
      this.id = this.$route.params.id
    }
  }
}
</script>

<style scoped>
.dashboard-background {
  width: 100%;
}
.dashboard-container {
  height: 85vh;
  padding: 50px;
  margin: 50px;
  border: none;
  border-radius: 15px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.1);
  background: #474b4b;
  display: grid;
  grid-template-rows: 10% 90%;
}
.dashboard-title {
  margin-left: 380px;
  width: 450px;
  border-radius: 25px;
  background-color: #999999;
  color: #e5e5e5;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  padding-top: 4px;
  margin-bottom: 8px;
}
.back-button {
  position: absolute;
  color: #999999;
  cursor: pointer;
  left: 70px;
  width: 100px;
  font-size: 25px;
  transition: 0.2s;
}
.back-button:hover {
  color: #aabece;
}
.dashboard-content {
  display: grid;
  grid-template-columns: 50% 50%;
}
.dashboard-left {
  display: grid;
  grid-template-rows: 55% 45%;
}
.dashboard-right {
  display: grid;
  grid-template-rows: 80% 20%;
}
.dashboard-info {
  display: grid;
  grid-template-columns: 84% 16%;
}
.dashboard-info-lists {
  display: grid;
  grid-template-rows: 25% 75%;
  padding: 10px;
}
.dashboard-clock {
  text-align: left;
  width: 100%;
  color: darkgreen;
  border-left: 3px solid rgb(2, 44, 84);
  border-right: 3px solid rgb(2, 44, 84);
  padding-left: 20px;
  font-size: 30px;
  background-color: white;
  border-radius: 10px;
}
.dashboard-details {
  padding: 10px;
  display: grid;
  grid-template-columns: 60% 40%;
}
.dashboard-user {
  display: grid;
  grid-template-rows: 50% 50%;
}
.user-info {
  display: flex;
  color: white;
  font-size: 20px;
  justify-content: space-between;
  align-items: center;
}
.light-container {
  padding: 10px;
}
.dashboard-lights {
  width: 100%;
  height: 100%;
  background-color: black;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
.light {
  width: 100%;
  height: 100%;
  border-radius: 100%;
  margin: 3px 3px 3px 3px;
}
.red-off {
  background-color: gray;
}
.red {
  background-color: #ff0000;
  box-shadow: 0 0 6em #ff3333;
}
.yellow-off {
  background-color: gray;
}
.yellow {
  background-color: #ffff00;
  box-shadow: 0 0 6em #ffff33;
}
.green-off {
  background-color: gray;
}
.green {
  background-color: #00ff00;
  box-shadow: 0 0 6em #33ff33;
}
</style>
