<template>
  <div class="footer">
    <div class="footer-button">
      <div class="footer-button-icon">
        <font-awesome-icon icon="fa-solid fa-angles-up" />
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  display: flex;
  justify-content: center;
  background-color: black;
}
.footer-button {
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  opacity: 0.5;
  width: 50px;
  height: 50px;
}
.footer-button-icon {
  width: 100%;
  height: 100%;
  cursor: pointer;
  font-size: 25px;
}
.input-plus {
  cursor: pointer;
}
</style>
