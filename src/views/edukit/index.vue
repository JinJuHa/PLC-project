<template>
  <div>
    <div ref="webgl"></div>
    <the-footer />
  </div>
</template>

<script>
import Three from '../../js/example'
import TheFooter from '../../components/layout/TheFooter.vue'

export default {
  components: { TheFooter },
  mounted() {
    Three(this.$refs.webgl)
  }
}
</script>

<style scoped></style>
