<template>
  <div>
    <transition name="slide">
      <div v-show="drawerStat !== true" class="footer">
        <div class="footer-button">
          <div class="footer-button-icon" @click="drawer">
            <font-awesome-icon icon="fa-solid fa-angles-up" />
          </div>
        </div>
      </div>
    </transition>
    <transition name="menuSlide">
      <div v-show="drawerStat == true" class="menu-container">
        <div class="menu">
          <div class="menu-icon"></div>
          <div class="menu-icon"></div>
          <div class="menu-icon"></div>
          <div class="menu-icon"></div>
          <div class="menu-icon"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawerStat: false
    }
  },
  methods: {
    drawer() {
      this.drawerStat = true
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
  position: fixed;
  bottom: 0;
}
.menu {
  height: 90px;
  background-color: rgb(255, 245, 206);
  border-radius: 40px;
  width: 70%;
  margin-left: 180px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  padding-left: 15%;
  padding-right: 15%;
  align-items: center;
}
.menu-icon {
  height: 70px;
  width: 70px;
  background-color: orange;
  border-radius: 10px;
}

.slide-leave-from {
  transform: translateY(0px);
}
.slide-leave-active {
  transition: all 2s;
}
.slide-leave-to {
  transform: translateY(300px);
}
.menuSlide-enter-from {
  transform: translateY(0px);
}
.menuSlide-enter-active {
  transition: all 3s;
}
.menuSlide-enter-to {
  transform: translateY(300px);
}
</style>
