<template>
  <div>
    <div id="control-button">
      <button class="start"><font-awesome-icon icon="fa-solid fa-play" /></button>
      <button class="stop"><font-awesome-icon icon="fa-solid fa-stop" /></button>
      <button class="reset"><font-awesome-icon icon="fa-solid fa-rotate-left" /></button>
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
</style>
