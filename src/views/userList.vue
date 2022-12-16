<template>
  <div>
    <div class="user-list-page">
      <font-awesome-icon class="back-button" icon="fa-solid fa-circle-chevron-left" @click="$router.go(-1)" />
      <p class="user-list-title">사용자 리스트</p>
      <b-button v-b-modal.modal-1>디바이스 제어 권한</b-button>
      <b-modal id="modal-1" hide-footer title="디바이스 제어 권한">
        <div class="user-profile">
          <div class="user-info">
            <div>
              <span>이름: </span>
              <b-form-select v-model="selected" :options="options"></b-form-select>
            </div>
            <div>
              <span>디바이스: </span>
              <b-form-select v-model="delist" :options="devices"></b-form-select>
            </div>
            <b-btn class="button" @click="powerAdd()">저장</b-btn>
          </div>
        </div>
      </b-modal>
      <b-table striped hover :items="items" :fields="fields"></b-table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      userInfoList: '',
      devicelist: '',
      selected: null,
      delist: null,
      options: [],
      devices: [],
      fields: [
        { key: 'id', label: '순서', sortable: true },
        { key: 'userid', label: '아이디', sortable: true },
        { key: 'name', label: '이름', sortable: true },
        { key: 'role', label: '직급', sortable: true },
        { key: 'phone', label: '연락처', sortable: false },
        { key: 'email', label: '이메일', sortable: false }
      ],
      items: []
    }
  },
  mounted() {
    this.userList()
    this.deviceList()
  },
  methods: {
    async userList() {
      await axios
        .get(process.env.VUE_APP_SERVER + `/users/list`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(async res => {
          this.userInfoList = res.data.data
          console.log('/users/list - res', this.userInfoList)
          for (let i = 0; i < this.userInfoList.length; i++) {
            this.items.push({
              id: this.userInfoList[i].id,
              userid: this.userInfoList[i].userid,
              phone: this.userInfoList[i].phone,
              name: this.userInfoList[i].name,
              email: `${this.userInfoList[i].email}@uvc-company.com`,
              role: this.userInfoList[i].role
            })
          }
          for (let x = 0; x < this.userInfoList.length; x++) {
            this.options.push({
              value: this.userInfoList[x].id,
              text: this.userInfoList[x].name
            })
          }
        })
        .catch(err => {
          console.log('/users/list - error : ', err)
          if (err.response.status == 401) {
            alert('사용자 리스트를 볼 권한이 없습니다.')
            this.$router.go(-1)
          }
        })
    },
    async deviceList() {
      await axios
        .get(process.env.VUE_APP_SERVER + `/devices/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(async res => {
          this.devicelist = res.data.data
          console.log('deviceList - res', this.devicelist)
          for (let t = 0; t < this.devicelist.length; t++) {
            this.devices.push({
              value: this.devicelist[t].id,
              text: this.devicelist[t].name
            })
          }
        })
        .catch(err => {
          console.log('deviceList - error : ', err)
        })
    },
    async powerAdd() {
      const axiosBody = {
        userid: this.selected,
        deviceid: this.delist
      }
      await axios
        .post(process.env.VUE_APP_SERVER + '/manages/give-auth', axiosBody, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(async res => {
          const code = res.data
          console.log('/deviceAdd - response: ', code)
          alert('디바이스 권한이 반영 되었습니다.')
          this.$router.go(0)
        })
        .catch(err => {
          console.log('/deviceAdd - error: ', err)
          alert('권한이 없습니다.')
        })
    }
  }
}
</script>

<style scoped>
.user-list-title {
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px;
}
.user-list-page {
  height: 85vh;
  padding: 50px;
  margin: 50px;
  border: none;
  border-radius: 15px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.1);
}
.back-button {
  position: absolute;
  left: 70px;
  cursor: pointer;
  width: 100px;
  font-size: 25px;
}
</style>
