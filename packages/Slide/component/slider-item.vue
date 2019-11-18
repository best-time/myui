<template>
  <div class="slider-item">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "slider-item",
  mounted() {
    this.$parent.init();
  }
};
</script>
