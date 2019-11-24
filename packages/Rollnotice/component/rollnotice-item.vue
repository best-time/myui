<template>
  <div class="rollnotice-item"><slot></slot></div>
</template>

<script>
export default {
  name: "rollnotice-item",
  mounted() {
    this.$parent.init();
  }
};
</script>
