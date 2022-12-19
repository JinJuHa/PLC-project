<template>
  <div>
    <div id="alert-connection">
      <!-- <button @click="delayedAlert">Show alert for 2s</button> -->
      <b-alert v-model="showAlert">
        {{ alertMessage }}
      </b-alert>
    </div>
    <div id="control-button">
      <button :class="plc.plcStart ? 'active-but' : 'start'" :disabled="plc.plcStart" @click="mcStart">
        <font-awesome-icon icon="fa-solid fa-play" />
      </button>
      <button :class="!plc.plcStart ? 'active-but' : 'stop'" :disabled="!plc.plcStart" @click="mcStop">
        <font-awesome-icon icon="fa-solid fa-stop" />
      </button>
      <button :class="plc.plcStart ? 'active-but' : 'reset'" :disabled="plc.plcStart" @click="mcReset">
        <font-awesome-icon icon="fa-solid fa-rotate-left" />
      </button>
    </div>
    <div class="test-page">
      <div class="user-profile">
        <img class="avatar" src="../../../public/img/engineer.png" />
        <div class="username">PLC - {{ this.$route.params.id }}호기</div>
        <button class="logout" @click="signOut">
          <font-awesome-icon icon="fa-solid fa-power-off" />
        </button>
        <div class="description"></div>
        <ul class="data">
          <li v-show="plc.plcStart == false"><font-awesome-icon icon="fa-solid fa-stop" /> 정지</li>
          <li v-show="plc.plcStart == true && plc.plcStop == true">
            <font-awesome-icon icon="fa-solid fa-forward" /> 작동 중
          </li>
        </ul>
      </div>
    </div>
    <div class="dice-status">
      <div v-show="plc.diceValue == 1" class="dice">
        <div class="dot"></div>
      </div>
      <div v-show="plc.diceValue == 2" class="dice">
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
      <div v-show="plc.diceValue == 3" class="dice">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
      <div v-show="plc.diceValue == 4" class="dice">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
      <div v-show="plc.diceValue == 5" class="dice">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
      <div v-show="plc.diceValue == 6" class="dice">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>
    <div v-show="dashboardStat == true" class="monitoring">
      <Dashboard :plc="plc" @dashboardClose="dashboardSet2" />
    </div>
    <Edukit />
    <TheFooter class="footer" @dashboardOpen="dashboardSet" />
  </div>
</template>

<script>
import Edukit from './edukit.vue'
import TheFooter from '../../components/layout/TheFooter.vue'
import mqtt from 'mqtt'
import Dashboard from '../dashboard/rough.vue'
import axios from 'axios'

export default {
  components: { Edukit, TheFooter, Dashboard },
  data() {
    return {
      showAlert: false,
      alertMessage: 'This is the alert message',
      on: true,
      dashboardStat: false,
      plc: {
        plcStart: null,
        plcStop: null,
        plcReset: null,
        lightGreen: null,
        lightYellow: null,
        lightRed: null,
        no3Active: null,
        diceValue: null
      },
      device: '',
      deviceId: null,
      userId: null
    }
  },
  mounted() {
    this.createMqtt()
    this.getDeviceOne()
    this.checkDeviceId()
  },
  methods: {
    createMqtt() {
      // mqtt 연결
      const mqttClient = mqtt.connect(process.env.VUE_APP_MQTT)
      mqttClient.on('connect', () => {
        // mqtt 연결 시 구독한다.
        console.log('mqtt success')
        const topic = process.env.VUE_APP_MQTT_SUB_TOPIC // 구독할 토픽: "myEdukit"
        mqttClient.subscribe(topic, {}, (error, res) => {
          if (error) {
            console.error('mqtt client error', error)
            alert('MQTT 연결이 실패했습니다.')
          }
        })
      })
      if (this.plc.plcStart == null) {
        this.showAlert = true
        setTimeout(() => {
          this.showAlert = false
        }, 5000)
      }
      // 메세지 실시간 수신
      mqttClient.on('message', (topic, message) => {
        this.mqttData = JSON.parse(message) // json string으로만 받을 수 있음
        // let plcData = this.mqttData.Wrapper.filter(p => p.tagId === '1' || p.tagId === '8' || p.tagId === '35')
        let plcData = this.mqttData.Wrapper.filter(p => p.tagId === '1' || p.tagId === '8' || p.tagId === '35')
        this.plc.plcStart = plcData[0].value // 시작
        this.plc.plcReset = plcData[1].value // 리셋
        this.plc.plcStop = plcData[2].value // 비상정지
        // console.log('정지', this.plc.plcStop)
        // 신호등
        let lightData = this.mqttData.Wrapper.filter(p => p.tagId === '18' || p.tagId === '19' || p.tagId === '20')
        this.plc.lightGreen = lightData[0].value
        this.plc.lightYellow = lightData[1].value
        this.plc.lightRed = lightData[2].value
        // if (!(this.plc.plcStart == null)) {
        //   this.showAlert = false
        // }
        // let lightData = this.mqttData.Wrapper.filter(p => p.tagId === '18' || p.tagId === '19' || p.tagId === '20')
        // this.light.green = lightData[0].value // 초록
        // this.light.yellow = lightData[1].value // 노랑
        // this.light.red = lightData[2].value // 빨강
        // this.control.sen1 = controlData[3].value // 1번 센서 전원
        // this.control.sen2 = controlData[4].value // 2번 센서 전원

        //console.log('index.vue', plcData, this.plc.plcStart)

        //console.log(plcData)
        // console.log('신호등', lightData)
        let diceData = this.mqttData.Wrapper.filter(p => p.tagId === '37' || p.tagId === '40')
        this.plc.no3Active = diceData[0].value
        this.plc.diceValue = diceData[1].value
      })
    },
    publishMqtt(id, v) {
      // mqtt pubish
      const mqttClient = mqtt.connect(process.env.VUE_APP_MQTT)
      const topic = process.env.VUE_APP_MQTT_PUB_TOPIC // UVC-Write
      const message = JSON.stringify({ tagId: id, value: v, userId: this.userId, deviceId: this.deviceid })
      // PLC 제어에 쓰이는 모든 publish message들은
      // { "tagId" : "id값", "value" : "value값" }으로 이루어져야 합니다.
      // true와 false 같은 boolean 값은 1과(true) 0으로(false) 입력하도록 합니다.
      mqttClient.publish(topic, message, error => {
        // console.log('message', message)
        if (error) {
          // console.error('mqtt client error', error)
          alert('MQTT 데이터 전송이 실패했습니다.')
        }
      })
    },
    async getDeviceOne() {
      await axios
        .get(process.env.VUE_APP_SERVER + '/devices/' + this.$route.params.id, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(async res => {
          this.device = res.data
          console.log('/devices/ - response: ', res.data)
        })
        .catch(err => {
          console.log('/devices/ - error: ', err)
        })
    },
    dashboardSet() {
      this.dashboardStat = true
    },
    dashboardSet2() {
      this.dashboardStat = false
    },
    mcStart() {
      this.publishMqtt(1, 1)
      this.deviceStartControl()
    },
    mcStop() {
      this.publishMqtt(1, 0)
      this.deviceStopControl()
    },
    mcReset() {
      this.publishMqtt(1, 0)
      this.publishMqtt(8, 1)
      this.deviceResetControl()
    },
    signOut() {
      localStorage.removeItem('token')
      this.$router.push('/auth/login')
    },
    async deviceStartControl() {
      const axiosBody = {
        deviceid: this.deviceId,
        control: 'START',
        state: this.plc.plcStart
      }
      console.log('/devices/control/start - axiosBody : ', axiosBody)
      await axios
        .post(process.env.VUE_APP_SERVER + '/logs/control', axiosBody, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(async res => {
          console.log('/devices/control/start - response: ', res.data)
        })
        .catch(err => {
          console.log('/devices/control/start - errerr', err)
        })
    },
    async deviceStopControl() {
      const axiosBody = {
        deviceid: this.deviceId,
        control: 'STOP',
        state: this.plc.plcStop
      }
      console.log('/devices/control/stop - axiosBody : ', axiosBody)
      await axios
        .post(process.env.VUE_APP_SERVER + '/logs/control', axiosBody, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(async res => {
          console.log('/devices/control/stop - response: ', res.data)
        })
        .catch(err => {
          console.log('/devices/control/stop - error', err)
        })
    },
    async deviceResetControl() {
      const axiosBody = {
        deviceid: this.deviceId,
        control: 'RESET',
        state: this.plc.plcReset
      }
      console.log('/devices/control/reset - axiosBody : ', axiosBody)
      await axios
        .post(process.env.VUE_APP_SERVER + '/logs/control', axiosBody, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(async res => {
          console.log('/devices/control/reset - response: ', res.data)
        })
        .catch(err => {
          console.log('/devices/control/reset - errerr', err)
        })
    },
    checkDeviceId() {
      this.deviceId = this.$route.params.id
      this.userId = localStorage.getItem('user')
      console.log('디바아디', this.deviceId)
      console.log('유저아디', this.userId)
    }
  }
}
</script>

<style scoped>
#alert-connection {
  position: absolute;
  z-index: 100;
}
.monitoring {
  position: absolute;
  width: 100%;
  height: 100vh;
  z-index: 10;
}
.alert {
  z-index: 1000;
}

.test-page {
  padding: 2.23em;
  position: absolute;
}
.dice-status {
  position: absolute;
  top: 260px;
  left: 150px;
  width: 115px;
  margin: 0 auto;
  background-color: #eee;
  border-radius: 10px;
}
.user-profile {
  margin: auto;
  width: 21em;
  height: 6.5em;
  background: #fff;
  border-radius: 0.3em;
}

.user-profile .username {
  margin: auto;
  margin-top: -3.7em;
  margin-left: 4.6em;
  color: #658585;
  font-size: 1.53em;
  font-weight: bold;
}
.user-profile .bio {
  margin: auto;
  display: inline-block;
  margin-left: 10.43em;
  color: #e76043;
  font-size: 0.87em;
}
.user-profile > .description {
  margin: auto;
  margin-top: 1.35em;
  margin-right: 4.43em;
  width: 14em;
  color: #c0c5c5;
  font-size: 0.87em;
}
.user-profile > img {
  padding: 0.7em;
  margin-left: 0.3em;
  margin-top: 0.3em;
  height: 6.23em;
  width: 6.23em;
  border-radius: 18em;
}

.user-profile ul.data {
  height: 3em;
  background: #4eb6b6;
  text-align: center;
  border-radius: 0 0 0.3em 0.3em;
}

.data li {
  color: #fff;
  list-style: none;
  font-weight: bold;
  padding-top: 10px;
  padding-right: 45px;
}

.user-profile span {
  color: #e3eeee;
  white-space: nowrap;
  font-size: 1.27em;
  font-weight: bold;
}
.user-profile span:hover {
  color: #daebea;
}
.footer {
  position: absolute;
  border: none;
}
#control-button {
  margin-left: 20px;
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 35px;
  right: 40px;
}
.active-but {
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-bottom: 20px;
  color: #fff;
  transition: 0.5s;
  border: none;
  background: #4eb6b6;
  box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.5), 0px 1px 0px rgba(255, 255, 255, 0.2);
}
.start {
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-bottom: 20px;
  background: none;
  border: 2.3px solid #fff;
  color: #fff;
  transition: 0.5s;
}
.stop {
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-bottom: 20px;
  background: none;
  border: 2.3px solid #fff;
  color: #fff;
  transition: 0.5s;
}
.reset {
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-bottom: 20px;
  background: none;
  border: 2.3px solid #fff;
  color: #fff;
  transition: 0.5s;
}
#control-button button:hover {
  border: none;
  background: #4eb6b6;
  box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.5), 0px 1px 0px rgba(255, 255, 255, 0.2);
}
#control-button button:active {
  transform: scale(0.9);
}
.logout {
  position: absolute;
  top: 0px;
  left: 250px;
  width: 40px;
  height: 40px;
  border-radius: 30px;
  border: 2px solid #4eb6b6;
  margin: 50px;
  color: #4eb6b6;
  font-size: 19px;
  background: none;
  transition: 0.5s;
}
.logout:hover {
  background: #4eb6b6;
  color: #fff;
  box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.5), 0px 1px 0px rgba(255, 255, 255, 0.2);
}
button:focus {
  outline: none;
}
.click-button:active {
  background-color: black;
  color: #fff;
}
.dice {
  border-radius: 10px;
  display: block;
  width: 100px;
  height: 100px;
  margin: 7px auto;
  box-sizing: border-box;
  padding: 10px;
  position: relative;
  background: #000;
}
.dice .dot {
  border-radius: 50%;
  position: absolute;
  width: 15px;
  height: 15px;
  background: #eee;
}

.dice:first-child .dot {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}

.dice:nth-child(2) .dot:first-child {
  top: 20px;
  left: 20px;
}
.dice:nth-child(2) .dot:last-child {
  bottom: 20px;
  right: 20px;
}

.dice:nth-child(3) .dot:first-child {
  top: 15px;
  left: 15px;
}
.dice:nth-child(3) .dot:nth-child(2) {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}
.dice:nth-child(3) .dot:last-child {
  bottom: 15px;
  right: 15px;
}

.dice:nth-child(4) .dot:first-child {
  top: 15px;
  left: 15px;
}
.dice:nth-child(4) .dot:nth-child(2) {
  top: 15px;
  right: 15px;
}
.dice:nth-child(4) .dot:nth-child(3) {
  bottom: 15px;
  left: 15px;
}
.dice:nth-child(4) .dot:last-child {
  bottom: 15px;
  right: 15px;
}

.dice:nth-child(5) .dot:first-child {
  top: 15px;
  left: 15px;
}
.dice:nth-child(5) .dot:nth-child(2) {
  top: 15px;
  right: 15px;
}
.dice:nth-child(5) .dot:nth-child(3) {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}
.dice:nth-child(5) .dot:nth-child(4) {
  bottom: 15px;
  left: 15px;
}
.dice:nth-child(5) .dot:last-child {
  bottom: 15px;
  right: 15px;
}

.dice:nth-child(6) .dot:first-child {
  top: 15px;
  left: 15px;
}
.dice:nth-child(6) .dot:nth-child(2) {
  top: 15px;
  right: 15px;
}
.dice:nth-child(6) .dot:nth-child(3) {
  top: 0;
  bottom: 0;
  left: 15px;
  margin: auto;
}
.dice:nth-child(6) .dot:nth-child(4) {
  top: 0;
  right: 15px;
  bottom: 0;
  margin: auto;
}
.dice:nth-child(6) .dot:nth-child(5) {
  bottom: 15px;
  left: 15px;
}
.dice:nth-child(6) .dot:last-child {
  bottom: 15px;
  right: 15px;
}
</style>
