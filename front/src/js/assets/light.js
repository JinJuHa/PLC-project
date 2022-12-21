/**
 * Three.js의 조명을 설정하는 파트입니다
 */
import { AmbientLight, DirectionalLight } from 'three'

class Light {
  constructor() {
    this.ambientLight = new AmbientLight(0x20202a, 6.5, 100)
    // this.ambientLight = new AmbientLight(0x000000, 6.5, 100)
    this.dirLight = new DirectionalLight(0xffffff, 0.5)
    // this.dirLight = new DirectionalLight(0x000000, 0.5)

    this.setLight()
  }

  setLight() {
    this.dirLight.position.set(2, 10, 1)
    this.dirLight.castShadow = true
  }

  get lightElement() {
    return this.dirLight
  }
}

export { Light }
