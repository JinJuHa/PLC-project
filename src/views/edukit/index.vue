<template>
  <div>
    <div id="control-button">
      <button>시작</button>
      <button>정지</button>
      <button>리셋</button>
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
  position: absolute;
}
</style>
