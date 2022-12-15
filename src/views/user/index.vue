<template>
  <div>
    <b-modal id="modal-1" hide-footer hide-header>
      <div class="user-profile">
        <b-avatar class="user-avatar" variant="primary"
          ><font-awesome-icon icon="fa-solid fa-user" class="icon-avatar"
        /></b-avatar>
        <div class="user-info">
          <div>
            <span>이름: </span>
            <span v-if="on">
              {{ user.name }}
              <button v-if="on" class="correction" variant="outline-primary" @click="on = !on">
                <font-awesome-icon icon="fa-solid fa-pen" class="pencil" />
              </button>
            </span>
            <b-input v-if="!on" v-model="name"></b-input>
            <b-btn v-if="!on" variant="danger" @click="on = !on">취소</b-btn>
          </div>
          <div>직급: {{ user.role }}</div>
          <div>아이디: {{ user.userid }}</div>
          <div>
            <span>이메일: </span>
            <span v-if="show">
              {{ user.email }}@uvc-company.com
              <button v-if="show" class="correction" variant="outline-primary" @click="show = !show">
                <font-awesome-icon icon="fa-solid fa-pen" class="pencil" />
              </button>
            </span>
            <b-input v-if="!show" v-model="email" placeholder="아이디를 적어주세요."></b-input>
            <b-btn v-if="!show" variant="danger" @click="show = !show">취소</b-btn>
          </div>
          <div>
            <span>폰번호: </span>
            <span v-if="see">
              {{ user.phone }}
              <button v-if="see" class="correction" variant="outline-primary" @click="see = !see">
                <font-awesome-icon icon="fa-solid fa-pen" class="pencil" />
              </button>
            </span>
            <b-input v-if="!see" v-model="phone"></b-input>
            <b-btn v-if="!see" variant="danger" @click="see = !see">취소</b-btn>
          </div>
          <b-btn class="save-button" @click="updateProfile">저장</b-btn>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    user: {},
    name: '',
    email: '',
    phone: '',
    on: true,
    show: true,
    see: true
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
    },
    async updateProfile() {
      const axiosBody = {
        name: this.name,
        email: this.email,
        phone: this.phone
      }
      console.log('updateProfile - axiosBody', axiosBody)

      await axios
        .put(process.env.VUE_APP_SERVER + '/users/update/' + this.user.userid, axiosBody, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(response => {
          console.log('updateProfile - response : ', response)
          alert('회원정보가 수정 되었습니다.')
          this.on = true
          this.show = true
          this.see = true
          this.inforData()
        })
        .catch(error => {
          console.log('updateProfile - error : ', error)
        })
    }
  }
}
</script>

<style scoped>
.user-page {
  position: absolute;
}
.user-profile {
  display: grid;
  justify-content: center;
  margin: 20px;
}
.user-avatar {
  width: 80px;
  height: 80px;
  margin-left: 35%;
  margin-bottom: 20px;
}
.icon-avatar {
  width: 40px;
  height: 40px;
}
.pencil {
  font-size: 13px;
  transition: 0.5s;
  justify-content: center;
  text-align: center;
}
.correction {
  width: 28px;
  height: 28px;
  padding: 2px;
  background-color: rgb(255, 255, 255);
  border-radius: 20px;
  border: none;
  transition: 0.5s;
}
.correction:hover {
  background-color: #024d92;
}
.correction:hover .pencil {
  color: #fff;
}
.save-button {
  margin-top: 20px;
  background: #024d92;
  transition: 0.5s;
}
.save-button:hover {
  background: #0c365d;
}
</style>
