import * as THREE from 'three'
import { Group } from 'three'

class ToyGoods {
  constructor() {
    this.obj = new Group()
    this.goods = {}

    this.toyGoods()
  }

  toyGoods() {
    this.defaultToy = new THREE.Mesh(
      new THREE.CylinderGeometry(1.08, 1.08, 1.08, 100),
      new THREE.MeshPhongMaterial({ color: 0x000000, specular: 0x00ff00, shininess: 100 })
    )

    this.defaultToy.rotateY(-(Math.PI / 2))
    this.defaultToy.name = '기본 장난감'
    this.defaultToy.position.x -= 14.965
    this.defaultToy.position.y += 0.42
    this.defaultToy.position.z += 7.25
  }
}

export { ToyGoods }
