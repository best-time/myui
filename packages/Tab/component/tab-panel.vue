<template>
  <div class="tab-panel-item" :class="classes">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "tab-panel",
  props: {
    label: String,
    active: Boolean,
    tabkey: [String, Number]
  },
  computed: {
    classes() {
      // 用_uid判断是否选中
      return this.$parent.activeIndex == this._uid ? "tab-active" : "";
    }
  },
  watch: {
    active() {
      this.$parent.init(true);
    },
    label() {
      this.$parent.init("label");
    }
  }
};
</script>
