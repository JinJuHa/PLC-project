/**
 * 목표 기기의 실시간 정보를 연결하는 파트입니다
 * 방식은 자유지만 본 프로젝트에서는 mqtt를 사용함
 */
import mqtt from 'mqtt'

class Event {
  constructor(element, renderer, scene) {
    // mqtt config
    const publish_topic = process.env.VUE_APP_MQTT_PUB_TOPIC
    const subscribe_topic = process.env.VUE_APP_MQTT_SUB_TOPIC

    // Marchine config
    const hostname = process.env.VUE_APP_NO_3_HOST
    const port = process.env.VUE_APP_NO_3_PORT
    const path = process.env.VUE_APP_NO_3_PATH
    const no1MachineStatus = false

    let props = {
      hostname,
      port,
      path,
      topic: subscribe_topic,
      scene,
      edukit: scene.resource.edukit,
      no1: no1MachineStatus
    }

    this.subscribeMqtt(props)
  }

  subscribeMqtt(props) {
    let { hostname, port, path, topic, scene, edukit, no1 } = props

    const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
    this.client = mqtt.connect({
      clientId,
      clean: true,
      protocol: 'ws',
      reconnectPeriod: 1000,
      hostname,
      port,
      path
    })

    this.client.on('connect', () => {
      console.log('MQTT Connected')
      // console.log('subscribeMqtt- scene', scene)

      this.client.subscribe([topic], () => {
        console.log(`토픽 연결 완료: ${topic}`)
      })
      this.client.on('message', (topic, payload) => {
        // console.log(`토픽 ${topic}에서 전송된 메시지: ${payload.toString()}`)

        let message = JSON.parse(payload)
        let data = message.Wrapper.filter(
          p =>
            p.tagId === '21' ||
            p.tagId === '22' ||
            p.tagId === '18' ||
            p.tagId === '19' ||
            p.tagId === '20' ||
            p.tagId === '3' ||
            p.tagId === '39'
        )
        // console.log(data)
        // console.log(edukit)

        // greenLight status
        if (data[1].value === true) {
          // console.log('green on')
          scene.trafficLight.trafficLight1.material.color.set(0x00ff00)
        } else if (data[1].value === false) {
          // console.log('green off')
          scene.trafficLight.trafficLight1.material.color.set(0x003300)
        }
        // yellowLight status
        if (data[2].value === true) {
          // console.log('yellow on')
          scene.trafficLight.trafficLight2.material.color.set(0xffff00)
        } else if (data[2].value === false) {
          // console.log('yellow off')
          scene.trafficLight.trafficLight2.material.color.set(0x996600)
        }
        // redLight status
        if (data[3].value === true) {
          // console.log('red on')
          scene.trafficLight.trafficLight3.material.color.set(0xff0000)
        } else if (data[3].value === false) {
          // console.log('red off')
          scene.trafficLight.trafficLight3.material.color.set(0x660000)
        }
        if (data[0].value || no1) {
          // console.log('No1_action - true')
          no1 = true
          this.moveGoods(scene)
          if (scene.toyGoods.defaultToy.position.x >= 5) {
            this.removeGoods(scene, no1)
          }
        }

        data = data.map(p => parseInt(p.value))
        edukit['yAxis'] = data[5]
        edukit['xAxis'] = data[6]
      })
    })
  }

  async moveGoods(scene) {
    console.log('moveGoods')
    console.log(scene)
    // scene.toyGoods.defaultToy.position.x += 0.5
  }

  async removeGoods(scene, no1) {
    console.log('scene.toyGoods', scene)
    // scene.remove(scene.toyGoods.defaultToy)
    // console.log('here?')
    no1 = false
  }
}

export { Event }
