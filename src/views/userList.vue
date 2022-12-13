<template>
  <div>
    <div>
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
          this.userInfoList = res.data.list
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
  margin: 20px;
}
</style>
