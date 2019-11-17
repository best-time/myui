<template>
  <div class="grids-item">
    <div class="grids-icon" v-if="checkIcon">
      <slot name="icon"></slot>
    </div>
    <div class="grids-txt" v-if="checkText">
      <slot name="text"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "grids-item",
  computed: {
    checkIcon() {
      return !!this.$slots.icon;
    },
    checkText() {
      return !!this.$slots.text;
    },
  }
};
</script>

<style scoped lang="less">
@import "./index.less";

</style>