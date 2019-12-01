<template>
  <div class="timeline">
    <ul class="timeline-content">
      <slot></slot>
    </ul>
  </div>
</template>

<script type="text/babel">
export default {
  name: "timeline"
};
</script>

<style lang="less">
@import "./index.less";
</style>
