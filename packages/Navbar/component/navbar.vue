<template>
  <header
    class="navbar"
    :class="classes"
    :style="{ backgroundColor: bgcolor, height: height, color: borderColor }"
  >
    <div class="navbar-item">
      <slot name="left"></slot>
    </div>
    <div class="navbar-center-box" :style="{ height: height }">
      <div class="navbar-center">
        <slot name="center"
          ><span
            class="navbar-center-title"
            :style="{ color: color, fontSize: fontsize }"
            >{{ title }}</span
          ></slot
        >
      </div>
    </div>
    <div class="navbar-item">
      <slot name="right"></slot>
    </div>
  </header>
</template>

<script>
import { isColor } from "../../utils/assist";

export default {
  name: "navbar",
  props: {
    title: String,
    fixed: Boolean,
    bgcolor: {
      validator(value) {
        if (!value) return true;
        return isColor(value);
      },
      default: "#FFF"
    },
    color: {
      validator(value) {
        if (!value) return true;
        return isColor(value);
      },
      default: "#5C5C5C"
    },
    borderColor: {
      validator(value) {
        if (!value) return true;
        return isColor(value);
      },
      default: "#E4E4E4"
    },
    fontsize: {
      validator(value) {
        return /^(\.|\d+\.)?\d+(px)$/.test(value);
      },
      default: "16px"
    },
    height: {
      validator(value) {
        return /^(\.|\d+\.)?\d+(px)$/.test(value);
      },
      default: "44px"
    }
  },
  computed: {
    classes() {
      return this.fixed ? "navbar-fixed" : "";
    }
  }
};
</script>

<style lang="less">
@import "./index.less";
</style>
