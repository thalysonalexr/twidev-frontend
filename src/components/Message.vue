<template>
  <div class="toggle-box">
    <div class="wrapper">
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Message',
  props: {
    message: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

.toggle-box{
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  border-radius: 15px;
}

.wrapper{
  padding: 0 5%;
}

.wrapper p{
  color: #f5f5f5;
  font-size: 1.4em;
  font-family: 'Ubuntu', sans-serif;
  text-align: center;
}

</style>
