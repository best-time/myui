<template>
  <div class="m-accordion">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "accordion",
  props: {
    accordion: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    open(uid) {
      this.$children.forEach(item => {
        if (item._uid == uid) {
          item.show = !item.show;
        } else {
          if (!this.accordion) {
            item.show = false;
            item.height = 0;
          }
        }
      });
    }
  }
};
</script>

<style lang="less">
@import "./index.less";
</style>
