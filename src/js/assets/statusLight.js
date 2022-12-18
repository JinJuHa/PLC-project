import * as THREE from 'three'

class StatusLight {
  constructor() {
    // no1 statusLight
    this.no1Light = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.5, 0.5, 100),
      new THREE.MeshPhongMaterial({ color: 0x404040, specular: 0x00ff00, shininess: 100 })
    )
    this.no1Hemisphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 15, 32),
      new THREE.MeshPhongMaterial({ color: 0x404040, specular: 0x00ff00, shininess: 100 })
    )
    // color statusLight
    this.colorLight = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.5, 0.5, 100),
      new THREE.MeshPhongMaterial({ color: 0x404040, specular: 0x00ff00, shininess: 100 })
    )
    this.colorHemisphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 15, 32),
      new THREE.MeshPhongMaterial({ color: 0x404040, specular: 0x00ff00, shininess: 100 })
    )
    // no2 statusLight
    this.no2Light = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.5, 0.5, 100),
      new THREE.MeshPhongMaterial({ color: 0x404040, specular: 0x00ff00, shininess: 100 })
    )
    this.no2Hemisphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 15, 32),
      new THREE.MeshPhongMaterial({ color: 0x404040, specular: 0x00ff00, shininess: 100 })
    )
    // vision statusLight
    this.visionLight = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.5, 0.5, 100),
      new THREE.MeshPhongMaterial({ color: 0x404040, specular: 0x00ff00, shininess: 100 })
    )
    this.visionHemisphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 15, 32),
      new THREE.MeshPhongMaterial({ color: 0x404040, specular: 0x00ff00, shininess: 100 })
    )
    // no3 statusLight
    this.no3Light = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.5, 0.5, 100),
      new THREE.MeshPhongMaterial({ color: 0x404040, specular: 0x00ff00, shininess: 100 })
    )
    this.no3Hemisphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 15, 32),
      new THREE.MeshPhongMaterial({ color: 0x404040, specular: 0x00ff00, shininess: 100 })
    )

    this.no1StatusLight()
    this.colorSensorStatusLight()
    this.no2StatusLight()
    this.visionStatusLight()
    this.no3StatusLight()
  }

  no1StatusLight() {
    // this.defaultLight.rotateX(-(Math.PI / 2))
    this.no1Light.name = '기본 상태등 하단'
    this.no1Light.position.set(-14.965, 0.5, 10.8)
    this.no1Hemisphere.name = '기본 상태등 상단'
    this.no1Hemisphere.position.set(-14.965, 0.74, 10.8)
  }
  colorSensorStatusLight() {
    // this.defaultLight.rotateX(-(Math.PI / 2))
    this.colorLight.name = '기본 상태등 하단'
    this.colorLight.position.set(-9.965, 0.5, 10.8)
    this.colorHemisphere.name = '기본 상태등 상단'
    this.colorHemisphere.position.set(-9.965, 0.74, 10.8)
  }
  no2StatusLight() {
    // this.defaultLight.rotateX(-(Math.PI / 2))
    this.no2Light.name = '기본 상태등 하단'
    this.no2Light.position.set(-4.965, 0.5, 10.8)
    this.no2Hemisphere.name = '기본 상태등 상단'
    this.no2Hemisphere.position.set(-4.965, 0.74, 10.8)
  }
  visionStatusLight() {
    // this.defaultLight.rotateX(-(Math.PI / 2))
    this.visionLight.name = '기본 상태등 하단'
    this.visionLight.position.set(0, 0.5, 10.8)
    this.visionHemisphere.name = '기본 상태등 상단'
    this.visionHemisphere.position.set(0, 0.74, 10.8)
  }
  no3StatusLight() {
    // this.defaultLight.rotateX(-(Math.PI / 2))
    this.no3Light.name = '기본 상태등 하단'
    this.no3Light.position.set(4.965, 0.5, 10.8)
    this.no3Hemisphere.name = '기본 상태등 상단'
    this.no3Hemisphere.position.set(4.965, 0.74, 10.8)
  }
}

export { StatusLight }
