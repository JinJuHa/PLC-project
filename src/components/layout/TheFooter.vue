<template>
  <div class="footer">
    <ul class="footer-button-plus">
      <font-awesome-icon icon="fa-regular fa-envelope"></font-awesome-icon>
    </ul>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}
.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}
.input-plus {
  cursor: pointer;
}
</style>
