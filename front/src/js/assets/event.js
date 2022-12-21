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

    let props = {
      hostname,
      port,
      path,
      topic: subscribe_topic,
      scene,
      edukit: scene.resource.edukit
    }

    this.subscribeMqtt(props)
  }

  subscribeMqtt(props) {
    let { hostname, port, path, topic, scene, edukit } = props

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
            p.tagId === '39' ||
            p.tagId === '3' ||
            p.tagId === '29' ||
            p.tagId === '39' ||
            p.tagId === '37' ||
            p.tagId === '32' ||
            p.tagId === '40'
        )

        let stockData = message.Wrapper.filter(p => p.tagId === '23' || p.tagId === '25')
        // console.log(edukit)

        // no1 hemisphere status
        if (data[0].value === true) {
          scene.statusLight.no1Hemisphere.material.color.set(0x008000)
        } else if (data[0].value === false) {
          if (stockData[0].value === false) {
            scene.statusLight.no1Hemisphere.material.color.set(0xff00000)
          } else {
            scene.statusLight.no1Hemisphere.material.color.set(0xffd400)
          }
        }
        if (data[6].value === true) {
          scene.statusLight.colorHemisphere.material.color.set(0x008000)
        } else if (data[6].value === false) {
          scene.statusLight.colorHemisphere.material.color.set(0xffd400)
        }
        if (data[4].value === true) {
          scene.statusLight.no2Hemisphere.material.color.set(0x008000)
        } else if (data[4].value === false) {
          if (stockData[1].value === true) {
            scene.statusLight.no2Hemisphere.material.color.set(0xff0000)
          } else {
            scene.statusLight.no2Hemisphere.material.color.set(0xffd400)
          }
        }
        if (data[10].value !== '0') {
          scene.statusLight.visionHemisphere.material.color.set(0x008000)
        } else if (data[10].value === '0') {
          scene.statusLight.visionHemisphere.material.color.set(0xffd400)
        }
        if (data[7].value === true) {
          scene.statusLight.no3Hemisphere.material.color.set(0x008000)
        } else if (data[7].value === false) {
          scene.statusLight.no3Hemisphere.material.color.set(0xffd400)
        }

        // greenLight status
        if (data[1].value === true) {
          scene.trafficLight.trafficLight1.material.color.set(0x00ff00)
        } else if (data[1].value === false) {
          scene.trafficLight.trafficLight1.material.color.set(0x003300)
        }
        // yellowLight status
        if (data[2].value === true) {
          scene.trafficLight.trafficLight2.material.color.set(0xffff00)
        } else if (data[2].value === false) {
          scene.trafficLight.trafficLight2.material.color.set(0x996600)
        }
        // redLight status
        if (data[3].value === true) {
          scene.trafficLight.trafficLight3.material.color.set(0xff0000)
        } else if (data[3].value === false) {
          scene.trafficLight.trafficLight3.material.color.set(0x660000)
        }

        data = data.map(p => parseInt(p.value))
        edukit['yAxis'] = data[8]
        edukit['xAxis'] = data[9]
      })
    })
  }
}

export { Event }
