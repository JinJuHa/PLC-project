<template>
  <div>
    <div id="control-button">
      <button class="start"><font-awesome-icon icon="fa-solid fa-play" /></button>
      <button class="stop"><font-awesome-icon icon="fa-solid fa-stop" /></button>
      <button class="reset"><font-awesome-icon icon="fa-solid fa-rotate-left" /></button>
    </div>
    <div>
      <button class="logout"><font-awesome-icon icon="fa-solid fa-power-off" /></button>
    </div>
    <div>
      <button v-b-modal.modal-1 class="user-page">사용자 관리</button>

      <b-modal id="modal-1" hide-footer hide-header>
        <div class="user-profile">
          <b-avatar class="user-avatar" variant="primary"
            ><font-awesome-icon icon="fa-solid fa-user" class="icon-avatar"
          /></b-avatar>
          <div class="user-info">
            <p>
              이름: {{ user.name }}
              <button v-if="on" class="phone" variant="outline-primary" @click="on = !on">
                <b-icon icon="pencil" class="pencil"></b-icon>
              </button>
            </p>
            <p>직급: {{ user.role }}</p>
            <p>아이디: {{ user.userid }}</p>
            <p>이메일: {{ user.email }}</p>
            <p>폰번호: {{ user.phone }}</p>
          </div>
        </div>
      </b-modal>
    </div>
    <Edukit />
    <div ref="webgl"></div>
    <the-footer />
  </div>
</template>

<script>
import axios from 'axios'
import Edukit from './edukit.vue'
import TheFooter from '../../components/layout/TheFooter.vue'

export default {
  components: { Edukit, TheFooter },
  data: () => ({
    user: {}
  }),
  mounted() {
    this.inforData()
  },
  methods: {
    async inforData() {
      await axios
        .get(process.env.VUE_APP_SERVER + '/users', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(async res => {
          this.user = res.data
          console.log('inforData - response: ', this.user)
        })
        .catch(err => {
          console.log('inforData - error: ', err)
        })
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
.user-page {
  position: absolute;
}
.user-profile {
  display: flex;
  justify-content: center;
}
.user-avatar {
  width: 80px;
  height: 80px;
}
.icon-avatar {
  width: 40px;
  height: 40px;
}
/* .user-info {} */
</style>
