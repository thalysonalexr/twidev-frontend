<template>
  <transition name="bounce">
    <div class="error">
      <div class="content">
        <span>{{ message }}</span>
      </div>
      <button
        class="close"
        title="Close message"
        @click="$emit('close')">
        <font-awesome-icon icon="times" />
      </button>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Error',
  props: {
    message: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

.content{
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
