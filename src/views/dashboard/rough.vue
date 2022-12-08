<template>
  <div class="dashboard-container">
    <div class="dashboard-header">
      <div class="dashboard-headding"><p>대시보드</p></div>
      <div class="dashboard-info">
        <div class="dashboard-date"><p>날짜 및 시간</p></div>
        <div class="dashboard-user"><p>담당자 : 이름이름</p></div>
      </div>
    </div>
    <div class="dashboard-columns">
      <div class="dashboard-rates">
        <div class="dashboard-amount">
          <p>총 생산량</p>
        </div>
        <div class="dashboard-amount">
          <p>불량품, 양품 비율</p>
        </div>
      </div>
      <div class="dashboard-doughnut"></div>
      <div class="dashboard-bar"></div>
    </div>
    <div class="dashboard-footer"></div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.dashboard-container {
  display: grid;
  grid-template-rows: 25% 45% 30%;
  width: 100%;
  height: 100vh;
  background-color: green;
  padding: 5px;
}
.dashboard-header {
  display: grid;
  grid-template-rows: 30% 70%;
  width: 100%;
  height: 100%;
  background-color: yellow;
  padding: 5px;
}
.dashboard-headding {
  background-color: aliceblue;
  color: grey;
  font-size: 30px;
  width: 100%;
  height: 100%;
  text-align: center;
}
.dashboard-info {
  background-color: rgb(9, 15, 80);
  display: grid;
  grid-template-columns: 70% 30%;
  width: 100%;
  height: 100%;
  padding: 5px;
}
.dashboard-date {
  background-color: azure;
  padding: 5px;
  color: grey;
  font-size: 30px;
}
.dashboard-user {
  background-color: aliceblue;
  padding: 5px;
  font-size: 30px;
}
.dashboard-columns {
  display: grid;
  grid-template-columns: 30% 35% 35%;
  width: 100%;
  height: 100%;
  background-color: orange;
  padding: 5px;
}
.dashboard-rates {
  display: grid;
  grid-template-rows: 50% 50%;
  padding: 5px;
  background-color: bisque;
}
.dashboard-amount {
  width: 100%;
  height: 100%;
  background-color: rgb(214, 219, 250);
  padding: 5px;
}
.dashboard-doughnut {
  width: 100%;
  height: 100%;
  background-color: brown;
}
.dashboard-bar {
  width: 100%;
  height: 100%;
  background-color: yellow;
}
.dashboard-footer {
  width: 100%;
  height: 100%;
  background-color: orangered;
}
</style>
