<template>
  <div>
    <div id="control-button">
      <button class="start"><font-awesome-icon icon="fa-solid fa-play" /></button>
      <button class="stop"><font-awesome-icon icon="fa-solid fa-stop" /></button>
      <button class="reset"><font-awesome-icon icon="fa-solid fa-rotate-left" /></button>
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
      <button class="logout" @click="signOut"><font-awesome-icon icon="fa-solid fa-power-off" /></button>
    </div>
    <div>
      <UserInfo />
    </div>
    <Edukit />
    <div ref="webgl"></div>
    <the-footer />
  </div>
</template>

<script>
import Edukit from './edukit.vue'
import UserInfo from '../user/index.vue'
import TheFooter from '../../components/layout/TheFooter.vue'

export default {
  components: { Edukit, UserInfo, TheFooter },
  data() {
    return {
      on: true
    }
  },
  methods: {
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
#control-button button {
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-bottom: 20px;
  background: #fff;
}
.logout {
  position: absolute;
  margin: 50px;
}
.control-three {
  position: absolute;
  display: flex;
  width: 140px;
  height: 140px;
  bottom: 35%;
  left: 40px;
}
.control-three-button {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
/* .grid {
  border: 2px solid red;
} */
.control-three-button button {
  margin: 3px;
  width: 40px;
  height: 40px;
  border-radius: 25px;
  background: #fff;
}
.remote-control {
  width: 70px;
  height: 70px;
  margin: 34px;
  border-radius: 50px;
  background: #fff;
}
button:focus {
  outline: none;
}
</style>
