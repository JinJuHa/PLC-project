<template>
  <div class="footer-page">
    <div id="menuToggle">
      <input class="checkbox" type="checkbox" checked />
      <div class="footer-button">
        <font-awesome-icon class="footer-button-icon" icon="fa-solid fa-angles-up" />
      </div>
      <div id="menu">
        <div class="menu-icon" @click="dashboard">
          <font-awesome-icon icon="fa-solid fa-chart-line" />
        </div>
        <div class="menu-icon" @click="$router.push('/data')">
          <font-awesome-icon icon="fa-solid fa-chart-column" />
        </div>
        <div class="menu-icon" @click="$router.push('/list')">
          <font-awesome-icon icon="fa-solid fa-address-card" />
        </div>
        <div v-b-modal.modal-1 class="menu-icon">
          <font-awesome-icon icon="fa-solid fa-user-gear" />
          <UserInfo />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserInfo from '../../views/user'

export default {
  components: { UserInfo },
  data() {
    return {
      drawerStat: false,
      dashboardX: false
    }
  },
  methods: {
    drawer() {
      this.drawerStat = true
    },
    dashboard() {
      this.$emit('dashboardOpen')
    },
    dashX() {
      this.dashboardX = true
    }
  }
}
</script>

<style scoped>
.footer {
  width: 100%;
  position: fixed;
  bottom: 0;
}
.footer-button {
  position: absolute;
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 0.634);
  width: 50px;
  height: 50px;
  margin-left: 70px;
  transition: all ease 0.5s;
}
.footer-button-icon {
  position: absolute;
  top: 12px;
  left: 14px;
  cursor: pointer;
  font-size: 25px;
  text-align: center;
  color: #093053;
}
.menu-container {
  width: 100%;
  position: absolute;
  bottom: 0;
}
#menu {
  position: absolute;
  height: 100px;
  background-color: rgba(255, 255, 255, 0.634);
  border-radius: 50px;
  width: 60%;
  margin-left: 290px;
  margin-bottom: 35px;
  display: flex;
  justify-content: space-between;
  padding-left: 16%;
  padding-right: 16%;
  align-items: center;
  box-shadow: inset 7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  transform: translate(0%, 165%);
  transform-origin: 0% 0%;
  transition: transform 1s cubic-bezier(0.77, 0.2, 0.05, 1);
}
.menu-icon {
  height: 65px;
  width: 65px;
  background: orange;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: #fff;
  transition: 0.5s;
  cursor: pointer;
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5);
}
.menu-icon:hover {
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5), 7px 7px 20px 0px rgba(0, 0, 0, 0.1),
    4px 4px 5px 0px rgba(0, 0, 0, 0.1);
}
.menu-icon:active {
  transform: scale(0.9);
}
.footer-page {
  height: 140px;
  overflow: hidden;
}

#menuToggle input {
  position: absolute;
  display: block;
  width: 55px;
  height: 55px;
  left: 70px;
  cursor: pointer;
  opacity: 0;
  z-index: 2; /* and place it over the hamburger */
}
.icon-button {
  border: 1px solid red;
  width: 50px;
  height: 50px;
}
#menuToggle input:checked ~ .footer-button {
  transform: rotate(180deg);
}
#menuToggle input:checked ~ #menu {
  transform: none;
}
</style>
