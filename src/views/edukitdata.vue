<template>
  <div>
    <div class="background">
      <div class="dashboard">
        <font-awesome-icon class="back-button" icon="fa-solid fa-circle-chevron-left" @click="$router.go(-1)" />
        <p class="dashboard-title">생산품 데이터</p>
        <div class="db-dashboard">
          <iframe
            class="iframe-data"
            src="http://192.168.0.50:3000/d-solo/8ybdmNc4k/cycle-data?orgId=1&from=1670952872000&to=1670952892000&panelId=6"
            width="500"
            height="200"
            frameborder="0"
          ></iframe
          ><iframe
            class="iframe-data"
            src="http://192.168.0.50:3000/d-solo/8ybdmNc4k/cycle-data?orgId=1&from=1670952872000&to=1670952892000&panelId=4"
            width="500"
            height="200"
            frameborder="0"
          ></iframe
          ><iframe
            class="iframe-data-bottom"
            src="http://192.168.0.50:3000/d-solo/8ybdmNc4k/cycle-data?orgId=1&from=1670952872000&to=1670952892000&panelId=2"
            width="800"
            height="220"
            frameborder="0"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.background {
  width: 100%;
}
.dashboard {
  height: 85vh;
  padding: 50px;
  margin: 50px;
  border: none;
  border-radius: 15px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.1);
  background: #181b1f;
}
.back-button {
  color: rgb(96, 96, 96);
  position: absolute;
  left: 70px;
  cursor: pointer;
  width: 100px;
  font-size: 25px;
  transition: 0.2s;
}
.back-button:hover {
  color: #85dd79;
}
.dashboard-title {
  margin-left: 380px;
  width: 450px;
  padding: 6px;
  border-radius: 25px;
  background-color: rgb(96, 96, 96);
  color: #e5e5e5;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}
.db-dashboard {
  margin-left: 90px;
}
.iframe-data-bottom {
  margin-left: 100px;
}
</style>
