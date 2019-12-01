<template>
  <div class="cell-box">
    <div class="cell-title" v-if="title">{{ title }}</div>
    <div class="cell">
      <slot></slot>
    </div>
    <slot name="bottom"></slot>
  </div>
</template>

<script>
export default {
  name: "cell-group",
  props: {
    title: String
  }
};
</script>
