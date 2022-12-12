<template>
  <div>
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
    <div class="control-three">
      <button v-if="on" class="remote-control" @click="on = !on">
        <font-awesome-icon icon="fa-solid fa-gamepad" />
      </button>
      <div v-if="!on" class="control-three-button">
        <div class="grid"></div>
        <div class="grid">
          <button class="click-button"><font-awesome-icon icon="fa-solid fa-angle-up" /></button>
        </div>
        <div class="grid"></div>
        <div class="grid">
          <button class="click-button"><font-awesome-icon icon="fa-solid fa-angle-left" /></button>
        </div>
        <div class="grid">
          <button class="click-button"><font-awesome-icon icon="fa-solid fa-gamepad" @click="on = !on" /></button>
        </div>
        <div class="grid">
          <button class="click-button"><font-awesome-icon icon="fa-solid fa-angle-right" /></button>
        </div>
        <div class="grid"></div>
        <div class="grid">
          <button class="click-button"><font-awesome-icon icon="fa-solid fa-angle-down" /></button>
        </div>
      </div>
    </div>
    <div>
      <button class="logout" @click="signOut">
        <font-awesome-icon icon="fa-solid fa-power-off" /><span class="logout-text">Logout</span>
      </button>
    </div>
    <!-- <div>
      <UserInfo />
    </div> -->
    <div v-show="dashboardStat == true">
      <Dashboard />
    </div>
    <Edukit />
    <the-footer @dashboardOpen="dashboardSet" />
  </div>
</template>

<script>
import Edukit from './edukit.vue'
import TheFooter from '../../components/layout/TheFooter.vue'
import mqtt from 'mqtt'
import Dashboard from '../dashboard/rough.vue'

export default {
  components: { Edukit, TheFooter, Dashboard },
  data() {
    return {
      on: true,
      dashboardStat: false,
      plc: {
        plcStart: null,
        plcStop: null,
        plcReset: null
      }
    }
  },
  mounted() {
    this.createMqtt()
  },
  methods: {
    createMqtt() {
      // mqtt 연결
      const mqttClient = mqtt.connect(process.env.VUE_APP_MQTT)
      mqttClient.on('connect', () => {
        // mqtt 연결 시 구독한다.
        console.log('mqtt success')
        const topic = process.env.VUE_APP_MQTT_TOPIC // 구독할 토픽: "myEdukit"
        mqttClient.subscribe(topic, {}, (error, res) => {
          if (error) {
            // console.error('mqtt client error', error)
            alert('MQTT 연결이 실패했습니다.')
          }
        })
      })
      // 메세지 실시간 수신
      mqttClient.on('message', (topic, message) => {
        this.mqttData = JSON.parse(message) // json string으로만 받을 수 있음
        // let plcData = this.mqttData.Wrapper.filter(p => p.tagId === '1' || p.tagId === '8' || p.tagId === '35')
        let plcData = this.mqttData.Wrapper.filter(p => p.tagId === '1' || p.tagId === '8' || p.tagId === '35')
        this.plc.plcStart = plcData[0].value // 시작
        this.plc.plcReset = plcData[1].value // 리셋
        this.plc.plcStop = plcData[2].value // 비상정지
        // let controlData = this.mqttData.Wrapper.filter(
        //   p => p.tagId === '9' || p.tagId === '10' || p.tagId === '11' || p.tagId === '12' || p.tagId === '13'
        // )
        // this.control.no1 = controlData[0].value // 1호기 전원
        // this.control.no2 = controlData[1].value // 2호기 전원
        // this.control.no3 = controlData[2].value // 3호기 전원
        // this.control.sen1 = controlData[3].value // 1번 센서 전원
        // this.control.sen2 = controlData[4].value // 2번 센서 전원
        console.log(plcData)
      })
    },

    publishMqtt(id, v) {
      // mqtt pubish
      const mqttClient = mqtt.connect(process.env.VUE_APP_MQTT)
      const topic = process.env.VUE_APP_MQTT_WRITE_TOPIC // UVC-Write
      const message = JSON.stringify({ tagId: id, value: v, userId: 1, deviceId: 1 })
      // PLC 제어에 쓰이는 모든 publish message들은
      // { "tagId" : "id값", "value" : "value값" }으로 이루어져야 합니다.
      // true와 false 같은 boolean 값은 1과(true) 0으로(false) 입력하도록 합니다.
      mqttClient.publish(topic, message, error => {
        console.log('message', message)
        if (error) {
          // console.error('mqtt client error', error)
          alert('MQTT 데이터 전송이 실패했습니다.')
        }
      })
    },
    dashboardSet() {
      console.log('열리니?')
      this.dashboardStat = true
      console.log('왜 안되니?')
    },
    mcStart() {
      this.publishMqtt(1, 1)
    },
    mcStop() {
      this.publishMqtt(1, 0)
    },
    mcReset() {
      this.publishMqtt(1, 0)
      this.publishMqtt(8, 1)
    },
    signOut() {
      localStorage.removeItem('token')
      this.$router.push('/auth/login')
    }
  }
}
</script>

<style scoped>
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
  background: #093053;
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
  background: #093053;
  box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.5), 0px 1px 0px rgba(255, 255, 255, 0.2);
}
#control-button button:active {
  transform: scale(0.9);
}
.logout {
  position: absolute;
  width: 42px;
  height: 42px;
  border-radius: 30px;
  border: 2px solid #fff;
  margin: 50px;
  color: #fff;
  font-size: 21px;
  background: none;
  transition: 0.5s;
}
.logout-text {
  position: absolute;
  opacity: 0;
  font-size: 18px;
  padding-left: 10px;
  transition: 0.5s;
  color: #fff;
}
.logout:hover {
  background: #093053;
  width: 120px;
  padding-right: 80px;
  border: none;
  box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.5), 0px 1px 0px rgba(255, 255, 255, 0.2);
}
.logout:hover .logout-text {
  opacity: 1;
}
.control-three {
  position: absolute;
  display: flex;
  width: 140px;
  height: 140px;
  bottom: 35%;
  left: 30px;
}
.control-three-button {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.control-three-button button {
  margin: 3px;
  width: 41px;
  height: 41px;
  border-radius: 25px;
  background: #fff;
}
button:focus {
  outline: none;
}
.click-button:active {
  background-color: black;
  color: #fff;
}
.remote-control {
  width: 70px;
  height: 70px;
  margin: 35px;
  border-radius: 50px;
  background: #fff;
}
</style>
