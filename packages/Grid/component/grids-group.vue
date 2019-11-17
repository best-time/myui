<template>
  <div>
    <div :class="tileCls" v-if="title">{{title}}</div>
    <div :class="cls">
      <slot></slot>
    </div>
  </div>
</template>
<script>

import { pCls, oneOf } from "../../utils/assist";
export default {
  name: "grids-group",
  props: {
    rows: {
      validator: oneOf([2, 3, 4, 5]),
      default: 4
    },
    title: String

  },
  data() {
    return {
      tileCls: `${pCls}-gridstitle`
    }
  },
  computed: {
    cls() {
      return `${pCls}-grids-${this.rows}`
    }
  }
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>