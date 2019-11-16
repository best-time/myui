<template>
  <div>
    <!--带边框背景-->
    <button
      v-if="!isPlain"
      :class="[`${prefixCls}-Button`, Type, Size, Shape]"
      @click="handleClike"
      :disabled="disabled"
    >
      <i :class="icon" v-if="icon"></i>
      <slot></slot>
    </button>
    <!--纯文字-->
    <button
      v-if="isPlain"
      :class="[`${prefixCls}-Button-plain`, Type]"
      @click="handleClike"
      :disabled="disabled"
    >
      <i :class="icon" v-if="icon"></i>
      <slot></slot>
    </button>
  </div>
</template>

<script>
import { oneOf } from "./../../utils/assist";
const prefixCls = "y";
export default {
  name: "Button",
  props: {
    type: {
      validator: oneOf(["primary", "success", "error"]),
      default: "primary"
    },
    size: {
      validator: oneOf(["normal", "small", "large"]),
      default: "normal"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    shape: {
      validator: oneOf(["round", "circle", "simple"]),
      default: "simple"
    },
    icon: {
      type: String,
      default: ""
    },
    plain: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefixCls,
      buttonCls: `${prefixCls}-Button`
    };
  },
  computed: {
    Type() {
      if (this.type) {
        if (this.type === "primary") {
          return this.plain ? `${this.buttonCls}-plain-primary` : `${this.buttonCls}-primary`;
        } else if (this.type === "success") {
          return this.plain ? `${this.buttonCls}-plain-success` : `${this.buttonCls}-success`;
        } else if (this.type === "error") {
          return this.plain ? `${this.buttonCls}-plain-error` : `${this.buttonCls}-error`;
        } else {
          return "";
        }
      }
      return "";
    },
    Disabled() {
      if (this.disabled) {
        if (this.disabled === true) {
          return true;
        } else {
          return false;
        }
      }
      return false;
    },
    Size() {
      if (this.size) {
        if (this.size === "small") {
          return this.plain ? "" : `${this.buttonCls}-small`;
        } else if (this.size === "large") {
          return this.plain ? "" : `${this.buttonCls}-large`;
        } else {
          return "";
        }
      }
      return "";
    },
    Shape() {
      if (this.shape) {
        if (this.shape === "round") {
          return this.plain ? "" : `${this.buttonCls}-round`;
        } else if (this.shape === "circle") {
          return this.plain ? "" : `${this.buttonCls}-circle`;
        } else if (this.shape === "simple") {
          return this.plain ? "" : `${this.buttonCls}-simple`;
        } else {
          return "";
        }
      }
      return "";
    },
    isPlain() {
      if (this.plain) {
        if (this.plain === true) {
          return true;
        } else {
          return false;
        }
      }
      return false;
    }
  },
  methods: {
    handleClike: () => {
      this.$emit("click");
    }
  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
// @import '../../CaiIcon/component/index.less';
</style>
