<template>
  <div>
    <div class="background">
      <div class="dashboard">
        <font-awesome-icon class="back-button" icon="fa-solid fa-circle-chevron-left" @click="$router.push('/web')" />
        <iframe
          class="data-one"
          src="http://192.168.0.50:3000/d-solo/8ybdmNc4k/cycle-data?orgId=1&from=1670952872000&to=1670952892000&panelId=2"
          width="450"
          height="200"
          frameborder="0"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.dashboard {
  height: 85vh;
  padding: 50px;
  margin: 50px;
  border: none;
  border-radius: 15px;
  background-color: #fff;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.1);
}
.background {
  margin: 0px;
  height: 100vh;
  width: 100%;
  background-color: #024d92;
}
.back-button {
  position: absolute;
  left: 70px;
  cursor: pointer;
  width: 100px;
  font-size: 25px;
}
.data-one {
  margin-top: 50px;
}
</style>
