<template>
  <div>
    <slot></slot>
  </div>
</template>

<script type="text/babel">
import { isColor } from "../../utils/assist";

export default {
  name: "checkbox-group",
  props: {
    value: {
      type: Array,
      default: () => {
        return []
      }
    },
    color: {
      validator(value) {
        if (!value) return true;
        return isColor(value);
      },
      default: "#4CD864"
    },
    size: {
      validator(val) {
        return /^([1-9]\d*)$/.test(val);
      },
      default: 20
    },
    callback: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    updateValue() {
      const value = this.value;
      this.childrens = this.$children.filter(
        item => item.$options.name === "checkbox"
      );

      if (this.childrens) {
        this.childrens.forEach(child => {
          child.model = value;
        });
      }
    },
    change(val) {
      this.callback(val);
      this.$emit("input", val);
    }
  },
  watch: {
    value() {
      this.updateValue();
    }
  },
  mounted() {
    this.$nextTick(this.updateValue);
  }
};
</script>
