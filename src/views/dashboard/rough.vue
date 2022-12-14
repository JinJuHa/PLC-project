<template>
  <div class="dashboard-container">
    <div class="dashboard-header">
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
        </div>
        <div class="dashboard-amount">
          <!-- tagId 17 -->
          <p>Device Name</p>
        </div>
      </div>
      <div class="dashboard-doughnut">
        <!-- <doughnut-chart ref="chart" :chartData="chart.data" :options="options" style="width: 450px height: 250px">
        </doughnut-chart> -->
        <doughnut-chart
          id="accuracyChart"
          ref="accuracyChart"
          :chart-data="doughnutChart.data"
          :options="doughnutChart.options"
          style="width: 450px; height: 290px"
        ></doughnut-chart>
      </div>
      <div class="dashboard-bar">
        <bar-chart
          id="diceFequencyChart"
          ref="diceFequencyChart"
          :chart-data="barChart.data"
          :options="barChart.options"
          style="width: 450px; height: 290px"
        ></bar-chart>
      </div>
    </div>
    <div class="dashboard-footer">
      <line-chart
        id="stockChart"
        ref="stockChart"
        :chart-data="lineChart.data"
        :options="lineChart.options"
        style="width: 650px; height: 250px"
      ></line-chart>
      <div class="dashboard-lights">
        <div class="light red-off"></div>
        <div class="light yellow-off"></div>
        <div class="light green-off"></div>
      </div>
      <div class="dashboard-rates">
        <div class="dashboard-amount">
          <p>총 생산량</p>
        </div>
        <div class="dashboard-amount">
          <p>불량품, 양품 비율</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mqtt from 'mqtt'
import DoughnutChart from '@/components/chart/doughnutChart'
import BarChart from '@/components/chart/barChart'
import LineChart from '@/components/chart/lineChart'
export default {
  components: {
    'doughnut-chart': DoughnutChart,
    'bar-chart': BarChart,
    'line-chart': LineChart
  },
  data() {
    return {
      담당자이름: '지미',
      doughnutChart: {
        data: {
          labels: ['불량품', '양품'],
          datasets: [
            {
              backgroundColor: ['#A684B7', '#DD7445'],
              borderColor: '#eee',
              hoverBorderColor: '#eee',
              data: []
              // data: [20, 60]
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
              tension: 0.1,
              barPercentage: 0.55,
              data: []
              // data: [1200, 2000, 2500, 2200, 4000, 3000, 5000, 2000]
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Dice Frequency Chart'
          },
          plugins: {
            legend: {
              display: false
            },
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
              grid: {
                drawBorder: false,
                color: 'black',
                lineWidth: 1
              },
              min: 0,
              max: 5000,
              ticks: {
                stepSize: 1000,
                padding: 10,
                callback: (val, index) => {
                  return val !== 0 ? val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''
                }
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
      lineChart: {
        data: {
          labels: [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
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
      mqttDataList: [], // mqtt를 통해 받은 데이터(리스트로 계속 추가됨)
      chartData: null, // 차트로 표현될 데이터
      chartLabels: [], // 차트에서 사용할 라벨 리스트(가로축 라벨)
      chartDatasetLabels: [], // 차트에서 사용할 데이터셋 라벨 리스트
      chartDatasetDataList: [] // 차트에서 사용할 데이터셋 데이터 리스트
    }
  },
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
  },
  destroyed() {
    clearInterval(this.timerInterval)
  },
  methods: {
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
        let lightData = mqttData.Wrapper.filter(p => p.tagId === '18' || p.tagId === '19' || p.tagId === '20')
        console.log('신호등', lightData)
        let lightGreen = lightData[0].value
        let lightYellow = lightData[1].value
        let lightRed = lightData[2].value

        console.log('초록불켜졌니', lightGreen)
        console.log('노랑불켜졌니', lightYellow)
        console.log('빨강불켜졌니', lightRed)
        if (lightGreen === true) {
          const element = document.querySelector('.green-off')
          element.style.backgroundColor = 'green'
        }
        if (lightYellow === true) {
          const element = document.querySelector('.yellow-off')
          element.style.backgroundColor = 'yellow'
        }
        if (lightRed === true) {
          const element = document.querySelector('.red-off')
          element.style.backgroundColor = 'red'
        }
        // 선택된 devicdId만 수용함
        this.removeOldData() // 오래된 데이터 제거

        this.mqttDataList.push(mqttData) // 리스트에 계속 추가함

        this.makeChartLabels(mqttData) // 차트라벨 생성
        this.makeChartData() // 차트용 데이터 작성

        // if (this.selected.deviceId === mqttData.id) {
        //   this.removeOldData() // 오래된 데이터 제거

        //   this.mqttDataList.push(mqttData) // 리스트에 계속 추가함

        //   this.makeChartLabels(mqttData) // 차트라벨 생성
        //   this.makeChartData() // 차트용 데이터 작성
        // }
      })
    },
    removeOldData() {
      // 현재 차트에 출력할 수가 x개를 넘어서면 제일 오래된 데이터를 제거 한다.
      if (this.maxDataLength - 1 < this.mqttDataList.length) {
        this.mqttDataList.shift() // mqttData제거
        this.chartLabels.shift() // 차트라벨 제거
      }
    },
    makeChartData() {
      // 차트용 데이터 생성

      // mqtt정보가 없으면 기본 그래프를 그려준다.(이것이 없으면 그래프 자체가 나오지 않음)
      if (this.mqttDataList.length === 0) {
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

      // 데이터셋 라벨 리스트 생성(태그 리스트(tagList)를 데이터셋 라벨로 사용한다.)
      const datasetLabels = []
      for (let i = 0; i < this.selected.tagList.length; i += 1) {
        const tagName = this.selected.tagList[i] // tagName을 추출함
        datasetLabels.push(tagName) // tagName을 라벨로 사용함
      }
      this.chartDatasetLabels = Array.from(new Set(datasetLabels)) // 중복 제거

      // 차트 데이터 생성
      this.chartData = {
        labels: this.chartLabels,
        datasets: this.makeDatasetDatas()
      }
    },
    makeChartLabels(mqttData) {
      // 차트라벨(가로측) 생성
      this.chartLabels.push(mqttData.datetime.substring(11, 19)) // datetime을 사용한다.(분:초만 추출함)
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
    }
  }
}
</script>

<style scoped>
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
  grid-template-rows: 15% 45% 40%;
  width: 90%;
  height: 90vh;
  background-color: green;
  padding: 5px;
  position: absolute;
  border-radius: 10px;
}
.dashboard-header {
  display: grid;
  grid-template-rows: 30% 70%;
  width: 100%;
  height: 100%;
  color: white;
  padding: 5px;
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
  padding: 10px;
  border-radius: 10px;
}
.dashboard-date {
  padding: 5px;
  color: grey;
  font-size: 25px;
}
.dashboard-user {
  color: darkgreen;
  padding: 10px;
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
  /* background-color: bisque; */
}
.dashboard-amount {
  width: 100%;
  height: 100%;
  background-color: rgb(214, 219, 250);
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
  height: 100%;
}
.dashboard-footer {
  display: grid;
  grid-template-columns: 53% 7% 40%;
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 10px;
}
.dashboard-lights {
  width: 100%;
  height: 100%;
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
  background-color: darkred;
}
.red {
  background-color: red;
}
.yellow-off {
  background-color: burlywood;
}
.yellow {
  background-color: yellow;
}
.green-off {
  background-color: darkolivegreen;
}
.green {
  background-color: green;
}
</style>
