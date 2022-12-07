<template>
  <div>
    <div v-show="drawerStat !== true" class="footer">
      <div class="footer-button">
        <div class="footer-button-icon" @click="drawer">
          <font-awesome-icon icon="fa-solid fa-angles-up" />
        </div>
      </div>
    </div>
    <div v-show="drawerStat == true" class="menu-container">
      <div class="menu"></div>
    </div>
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
  position: sticky;
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
  position: sticky;
  bottom: 0;
}
.menu {
  height: 80px;
  background-color: white;
  width: 80%;
}
</style>
