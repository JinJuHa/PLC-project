<template>
  <div>
    <div>
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
#MQTT {
  margin: 50px;
}
</style>
