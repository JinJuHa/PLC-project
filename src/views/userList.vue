<template>
  <div>
    <div class="user-list-page">
      <font-awesome-icon class="back-button" icon="fa-solid fa-circle-chevron-left" @click="$router.go(-1)" />
      <p class="user-list-title">사용자 리스트</p>
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
      // Note 'isActive' is left out and will not appear in the rendered table
      fields: [
        { key: 'id', label: '순서', sortable: true },
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
              phone: this.userInfoList[i].phone,
              name: this.userInfoList[i].name,
              email: `${this.userInfoList[i].email}@uvc-company.com`,
              role: this.userInfoList[i].role
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
