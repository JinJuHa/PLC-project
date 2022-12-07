<template>
  <div>
    <div id="control-button">
      <button class="start"><font-awesome-icon icon="fa-solid fa-play" /></button>
      <button class="stop">정지</button>
      <button class="reset">리셋</button>
    </div>
    <div>
      <button class="logout"></button>
    </div>
    <div>
      <button class="user-page">사용자 관리</button>
    </div>
    <Edukit />
  </div>
</template>

<script>
import Edukit from './edukit.vue'

export default {
  components: {
    Edukit
  }
}
</script>

<style scoped>
#control-button {
  margin-left: 20px;
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 35px;
  right: 40px;
}
#control-button button {
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-bottom: 20px;
  background: #fff;
}
.user-page {
  position: absolute;
}
</style>
