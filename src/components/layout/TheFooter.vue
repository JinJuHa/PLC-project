<template>
  <div class="footer-page">
    <div id="menuToggle">
      <input class="checkbox" type="checkbox" />
      <!-- <div class="footer-button" @click="drawer">
      <font-awesome-icon icon="fa-solid fa-angles-up" />
    </div> -->
      <div id="menu">
        <div class="menu-icon" @click="dashboard">
          <font-awesome-icon icon="fa-solid fa-chart-line" />
        </div>
        <div class="menu-icon">
          <font-awesome-icon icon="fa-solid fa-list" />
        </div>
        <div v-b-modal.modal-1 class="menu-icon">
          <font-awesome-icon icon="fa-solid fa-user-gear" />
          <UserInfo />
        </div>
        <div class="menu-icon" @click="$router.push('/list')">
          <font-awesome-icon icon="fa-solid fa-users" />
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
      drawerStat: false
    }
  },
  methods: {
    drawer() {
      this.drawerStat = true
    },
    dashboard() {
      this.$emit('dashboardOpen')
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
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  opacity: 0.5;
  width: 50px;
  height: 50px;
  margin-left: 50px;
}
.footer-button-icon {
  width: 100%;
  height: 100%;
  cursor: pointer;
  font-size: 25px;
  text-align: center;
  padding-top: 5px;
  color: darkgreen;
}
.menu-container {
  width: 100%;
  /* position: fixed; */
  position: absolute;
  bottom: 0;
}
#menu {
  position: absolute;
  height: 90px;
  background-color: rgba(255, 255, 255, 0.634);
  border-radius: 40px;
  width: 60%;
  margin-left: 290px;
  margin-bottom: 35px;
  display: flex;
  justify-content: space-between;
  padding-left: 16%;
  padding-right: 16%;
  align-items: center;
  box-shadow: inset 7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  transform-origin: 0% 0%;
  transform: translate(0%, 150%);
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

/* .slide-leave-from {
  transform: translateY(0px);
}
.slide-leave-active {
  transition: all 3s;
}
.slide-leave-to {
  transform: translateY(100px);
}
.menuSlide-enter-from {
  transform: translateY(90px);
}
.menuSlide-enter-active {
  transition: all 2s;
}
.menuSlide-enter-to {
  transform: translateY(-10px);
} */
.footer-page {
  /* border: 2px solid red; */
  height: 120px;
  overflow: hidden;
}

#menuToggle input {
  position: absolute;
  display: block;
  width: 40px;
  height: 32px;
  top: -7px;
  left: -5px;
  cursor: pointer;
  opacity: 1;
  z-index: 2; /* and place it over the hamburger */
}
/* .checkbox:checked ~ .footer-button {
  opacity: 1;
  transform: rotate(45deg) translate(-2px, -1px);
  background: #232323;
} */
#menuToggle input:checked ~ #menu {
  transform: none;
}
</style>
