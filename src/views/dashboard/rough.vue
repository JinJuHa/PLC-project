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
          <p>총 생산량</p>
        </div>
        <div class="dashboard-amount">
          <p>불량품, 양품 비율</p>
        </div>
      </div>
      <div class="dashboard-doughnut">
        <!-- <doughnut-chart ref="chart" :chartData="chart.data" :options="options" style="width: 450px height: 250px">
        </doughnut-chart> -->
        <doughnut-chart
          id="chart"
          ref="fruitChart"
          :chart-data="doughnutChart.data"
          :options="doughnutChart.options"
          style="width: 450px; height: 290px"
        ></doughnut-chart>
      </div>
      <div class="dashboard-bar">
        <bar-chart
          id="chart"
          ref="fruitChart"
          :chart-data="barChart.data"
          :options="barChart.options"
          style="width: 450px; height: 290px"
        ></bar-chart>
      </div>
    </div>
    <div class="dashboard-footer">
      <line-chart id="chart" ref="lineChart" :chart-data="lineChart.data" :options="lineChart.options"></line-chart>
    </div>
  </div>
</template>

<script>
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
          labels: ['딸기', '자두', '수박', '복숭아', '메론', '망고'],
          datasets: [
            {
              backgroundColor: ['#A684B7', '#DD7445', '#DE9D11', '#E0D295', '#B1D166', '#78BAA1'],
              borderColor: '#eee',
              hoverBorderColor: '#eee',
              data: [50, 30, 20, 40, 60, 10]
            }
          ]
        },
        options: {
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
              backgroundColor: 'pink',
              pointBackgroundColor: 'white',
              borderWidth: 1,
              borderColor: 'hotpink',
              fill: true,
              tension: 0.1,
              barPercentage: 0.55,
              data: [1200, 2000, 2500, 2200, 4000, 3000, 5000, 2000]
            }
          ]
        },
        options: {
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
              data: [45, 30, 10, 100, 75, 60, 90, 10, 10, 0]
            },
            {
              label: '주사위',
              fill: true,
              tension: 0.1,
              borderColor: 'yellow',
              pointBorderColor: 'yellow',
              borderWidth: 1,
              pointBorderWidth: 1,
              data: [50, 100, 40, 80, 30, 20, 80, 15, 12, 20]
            }
          ]
        },
        options: {
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
      }
    }
  },
  mounted() {
    this.timerInterval = setInterval(() => {
      const now = new Date()
      let years = now.getFullYear()
      let months = now.getMonth() + 1
      let dates = now.getDate()
      this.today = `${years}/${months}/${dates}`
      document.querySelector('#time').innerHTML = now.toLocaleString('ko-kr')
    }, 10)
  },
  destroyed() {
    clearInterval(this.timerInterval)
  },
  methods: {}
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
  /* background-color: yellow; */
}
.dashboard-footer {
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 10px;
}
</style>
