<template>
  <label class="cell-item">
    <span class="cell-left">
      <slot name="left"></slot>
    </span>
    <label class="cell-right">
      <slot name="right"></slot>
    </label>
  </label>
</template>

<script>
export default {
  name: "Cell"
}
</script>

<style scoped lang="less">
@import "./index.less";
</style>