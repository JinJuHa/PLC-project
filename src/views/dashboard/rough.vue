<template>
  <div class="dashboard-container">
    <div class="dashboard-header">
      <font-awesome-icon class="back-button" icon="fa-solid fa-circle-chevron-left" @click="dashboardClose" />
      <div class="dashboard-headding"><p>Dashboard</p></div>
      <div class="dashboard-info">
        <div class="dashboard-date">
          <div class="dateTime">
            <div id="time">&nbsp;</div>
          </div>
        </div>
        <div class="dashboard-user">
          <p>담당자 : {{ this.담당자이름 }}</p>
        </div>
      </div>
    </div>
    <div class="dashboard-columns">
      <div class="dashboard-rates">
        <div class="dashboard-amount">
          <p>Device Id</p>
          <p class="plc-info">PLC - {{ id }}호기</p>
        </div>
        <div class="dashboard-amount">
          <!-- tagId 17 -->
          <p>작동 여부</p>
          <p class="plc-info">{{ plc.plcStart === true ? 'ON' : 'OFF' }}</p>
        </div>
      </div>
      <div class="dashboard-doughnut">
        <doughnut-chart
          id="accuracyChart"
          ref="accuracyChart"
          :chart-data="doughnutChart.data"
          :options="doughnutChart.options"
          style="width: 450px; height: 290px"
        ></doughnut-chart>
      </div>
      <div class="dashboard-rates">
        <div class="dashboard-amount">
          <p>총 생산량</p>
          <p class="plc-info">{{ work }}</p>
        </div>
        <div class="dashboard-amount">
          <p>양품 생산율</p>
          <p class="plc-info">{{ accuracyRate }} %</p>
        </div>
      </div>
    </div>
    <div class="dashboard-footer">
      <line-chart
        id="stockChart"
        ref="stockChart"
        :chart-data="lineChart.data"
        :options="lineChart.options"
        style="width: 1300px; height: 250px"
      ></line-chart>
      <div class="dashboard-lights">
        <div v-show="plc.lightRed === false" class="light red-off"></div>
        <div v-show="plc.lightRed === true" class="light red"></div>
        <div v-show="plc.lightYellow === false" class="light yellow-off"></div>
        <div v-show="plc.lightYellow === true" class="light yellow"></div>
        <div v-show="plc.lightGreen === false" class="light green-off"></div>
        <div v-show="plc.lightGreen === true" class="light green"></div>
      </div>
      <!-- <div class="dashboard-bar">
        <p>주사위는 메인화면에 띠워서 안하기로 함</p>
        <bar-chart
          id="diceFequencyChart"
          ref="diceFequencyChart"
          :chart-data="barChart.data"
          :options="barChart.options"
        ></bar-chart>
      </div> -->
    </div>
  </div>
</template>

<script>
import mqtt from 'mqtt'
import DoughnutChart from '@/components/chart/doughnutChart'
// import BarChart from '@/components/chart/barChart'
import LineChart from '@/components/chart/lineChart'
import axios from 'axios'
export default {
  components: {
    'doughnut-chart': DoughnutChart,
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
      no1Status: false,
      no2Status: false,
      isColorSensing: false,
      cycleEnd: true,

      담당자이름: '지미',
      tray: 8,
      dice: 8,
      id: '',
      no1Active: false,
      no2Active: false,
      colorSensor: false,
      no3Active: false,
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
      barChart: {
        data: {
          labels: [1, 2, 3, 4, 5, 6],
          datasets: [
            {
              backgroundColor: ['#A684B7', '#DD7445', '#DE9D11', '#E0D295', '#B1D166', '#78BAA1', '#c45850'],
              pointBackgroundColor: 'white',
              borderWidth: 1,
              fill: true,
              tension: 1,
              barPercentage: 0.55,
              data: [0, 0, 0, 0, 0, 0]
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: 'Dice Frequency Chart'
          },
          plugins: {
            datalabels: {
              display: false
            },
            tooltip: {
              boxWidth: 15
            }
          },
          scales: {
            x: {
              grid: {
                display: false
              },
              ticks: {
                padding: 3
              }
            },
            y: {
              beginAtZero: true,
              grid: {
                drawBorder: false,
                color: 'black',
                lineWidth: 1
              },
              ticks: {
                stepSize: 2,
                padding: 10,
                min: 0,
                max: 200
              }
            }
          },
          responsive: false,
          maintainAspectRatio: false,
          animation: {
            duration: 5000
          }
        }
      },
      lineChart: {
        data: {
          labels: [],
          datasets: [
            {
              label: '트레이',
              fill: true,
              tension: 0.1,
              borderColor: 'green',
              pointBorderColor: 'green',
              borderWidth: 1,
              pointBorderWidth: 1,
              data: []
              // data: [10, 10, 10, 9, 7, 6, 9, 10, 10, 8]
            },
            {
              label: '주사위',
              fill: true,
              tension: 0.1,
              borderColor: 'yellow',
              pointBorderColor: 'yellow',
              borderWidth: 1,
              pointBorderWidth: 1,
              data: []
              // data: [5, 10, 4, 8, 3, 2, 8, 5, 2, 2]
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Stock Chart'
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
          scales: {
            x: {
              grid: {
                display: false
              },
              ticks: {
                padding: 3
              }
            },
            y: {
              ticks: {
                callback: (val, index) => {
                  return val !== 0 ? val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''
                },
                padding: 10
              },
              grid: {
                drawBorder: false,
                color: '#323232',
                lineWidth: 1
              }
            }
          },
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 5000
          }
        }
      },
      maxDataLength: 20, // TODO: 현재 차트에서 출력할 데이터의 최대크기(화면에서 입력 가능하도록 한다.)
      trayDataList: [], // mqtt를 통해 받은 데이터(리스트로 계속 추가됨)
      diceDataList: [],
      chartData: [0, 0, 0, 0, 0, 0], // 차트로 표현될 데이터
      // chartLabels: [], // 차트에서 사용할 라벨 리스트(가로축 라벨)
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
      this.makeChartData()
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

        // 3은 tray 작동, 27은 주사위 작동, 39는 컬러센서 작동, 40은 3호기 작동
        // console.log('plcData', plcData) // [0] : 1호기 작동 / [1] : 2호기 작동 / [2]: 컬러센서 작동 / [3]: 3호기 작동

        // 1호기 벨류가 true이면서 1호기 상태가 false면 트레이 갯수 -1 후 1호기 상태 true로 변경
        if (plcData[0].value && this.no1Status === false) {
          this.no1Status = true
          this.tray--
          console.log('white', this.tray)
        }
        // 컬러 센서가 작동했다면 컬러센서 상태를 true로 변경 후 1호기 상태를 false로 변경
        if (plcData[2].value === true) {
          this.isColorSensing = true
          this.no1Status = false
          console.log('this.no1Status', this.no1Status)
        }

        // 2호기 벨류가 true이고 2호기 상태가 false이면서 컬러센서가 작동됐다면(white tray)
        // 다이스 갯수 -1 후 2호기 상태 true 및 컬러센싱 상태 false로 변경
        if (plcData[1].value && !this.no2status && this.isColorSensing) {
          this.no2Status = true
          this.dice--
          this.isColorSensing = false
          console.log('this.dice', this.dice)
        }

        // 3호기 벨류가 true이면 2호기 상태 false로 변경
        if (plcData[3].value) {
          this.no2Status = false
        }
        this.trayDataList.push(this.tray)
        this.diceDataList.push(this.dice)
        // console.log('트레이 갯수', this.tray)
        // console.log('주사위 갯수', this.dice)

        // 선택된 devicdId만 수용함
        this.removeOldData() // 오래된 데이터 제거

        this.makeLineLabels(mqttData)
        this.makeChartData() // 차트용 데이터 작성
      })
    },
    removeOldData() {
      // 현재 차트에 출력할 수가 x개를 넘어서면 제일 오래된 데이터를 제거 한다.
      if (this.maxDataLength - 1 < this.trayDataList.length) {
        this.trayDataList.shift() // mqttData제거
        this.lineChart.data.labels.shift() // 차트라벨 제거
      }
      if (this.maxDataLength - 1 < this.diceDataList.length) {
        this.diceDataList.shift() // mqttData제거
        this.lineChart.data.labels.shift() // 차트라벨 제거
      }
    },
    makeChartData() {
      // 차트용 데이터 생성

      // mqtt정보가 없으면 기본 그래프를 그려준다.(이것이 없으면 그래프 자체가 나오지 않음)
      if (this.trayDataList.length === 0) {
        this.lineChart.data.datasets[0].data = {
          labels: ['트레이'],
          datasets: [
            {
              label: 'no data',
              data: [8]
            }
          ]
        }
      }
      if (this.diceDataList.length === 0) {
        this.lineChart.data.datasets[1].data = {
          labels: ['주사위'],
          datasets: [
            {
              label: 'no data',
              data: [8]
            }
          ]
        }

        return
      }

      // 데이터셋 라벨 리스트 생성(태그 리스트(tagList)를 데이터셋 라벨로 사용한다.)
      const datasetLabels = []
      for (let i = 0; i < this.lineChart.data.labels.length; i += 1) {
        const tagName = this.lineChart.data.labels[i] // tagName을 추출함
        datasetLabels.push(tagName) // tagName을 라벨로 사용함
      }
      this.chartDatasetLabels = Array.from(new Set(datasetLabels)) // 중복 제거

      // 차트 데이터 생성
      this.chartData = {
        labels: this.lineChart.data.labels,
        datasets: this.makeDatasetDatas()
      }
    },
    // 라인 차트 라벨(가로측) 생성
    makeLineLabels(mqttData) {
      const dateTime = mqttData.Wrapper[40].value.substring(11, 19)
      this.lineChart.data.labels.push(dateTime) // datetime을 사용한다.(분:초만 추출함)
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
        for (let j = 0; j < this.trayDataList.length; j += 1) {
          const trayData = this.trayDataList[j]
          const tagData = trayData.wrapper[22].value // 현재 데이터셋 label과 같은 태그만 추출한다.
          datas.push(tagData)
        }
        datasetDatas.push({
          label: label,
          fill: false,
          data: datas
        })
      }
      for (let i = 0; i < this.chartDatasetLabels.length; i += 1) {
        const label = this.chartDatasetLabels[i] // label을 하나씩 추출한다.
        const datas = [] // 해당 label에 속한 데이터셋의 데이터 리스트

        // mqtt로 들어온 데이터에서 key값으로 사용된 tag와 현재 label이 같으면 해당 데이터를 추출 한다.
        for (let j = 0; j < this.diceDataList.length; j += 1) {
          const diceData = this.diceDataList[j]
          const tagData = diceData.wrapper[22].value // 현재 데이터셋 label과 같은 태그만 추출한다.
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
.back-button {
  position: absolute;
  cursor: pointer;
}
.dateTime {
  text-align: left;
  width: 100%;
  color: darkgreen;
  border-left: 3px solid green;
  padding-left: 20px;
  font-size: 40px;
}
.dashboard-container {
  display: grid;
  grid-template-rows: 14vh 45vh 40vh;
  width: 100%;
  height: 100vh;
  background: green;
  padding: 5px;
  border-radius: 10px;
}
.dashboard-header {
  display: grid;
  grid-template-rows: 30% 70%;
  width: 100%;
  height: 100%;
  color: white;
  /* padding: 5px; */
}
.dashboard-headding {
  letter-spacing: 2px;
  padding: auto;
  font-size: 20px;
  width: 100%;
  height: 100%;
  text-align: center;
}
.dashboard-info {
  background-color: white;
  display: grid;
  grid-template-columns: 70% 30%;
  width: 100%;
  height: 100%;
  /* padding: 10px; */
  border-radius: 10px;
}
.dashboard-date {
  padding: 5px;
  color: grey;
  font-size: 25px;
}
.dashboard-user {
  color: darkgreen;
  /* padding: 10px; */
  font-size: 30px;
}
.dashboard-columns {
  display: grid;
  grid-template-columns: 30% 35% 35%;
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 10px;
  padding: 5px;
}
.dashboard-rates {
  display: grid;
  grid-template-rows: 50% 50%;
  padding: 5px;
}
.dashboard-amount {
  width: 100%;
  height: 100%;
  /* background-color: rgb(214, 219, 250); */
  padding: 5px;
  text-align: center;
}
.dashboard-doughnut {
  width: 100%;
  height: 100%;
  border-left: solid 1px;
  border-right: solid 1px;
}
.dashboard-bar {
  width: 100%;
  height: 300px;
}
.dashboard-footer {
  display: grid;
  grid-template-columns: 93% 7%;
  width: 100%;
  height: 300px;
  background-color: white;
  border-radius: 10px;
}
.dashboard-lights {
  width: 100%;
  height: 300px;
  background-color: black;
  display: grid;
  grid-template-rows: 33% 33% 33%;
  padding: 10px;
}
.light {
  width: 100%;
  height: 100%;
  border-radius: 20%;
}
.red-off {
  background-color: lightsalmon;
}
.red {
  background-color: red;
}
.yellow-off {
  background-color: lightgoldenrodyellow;
}
.yellow {
  background-color: yellow;
}
.green-off {
  background-color: lightgrey;
}
.green {
  background-color: green;
}
.plc-info {
  font-size: 45px;
  color: darkgreen;
}
</style>
