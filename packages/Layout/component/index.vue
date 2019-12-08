<template>
  <section class="m-flexview">
    <slot name="navbar" v-if="showNavbar">
      <navbar :title="title" v-if="!!title">
        <router-link :to="link || '/'" slot="left">
          <navbar-back-icon></navbar-back-icon>
        </router-link>
      </navbar>
    </slot>

    <slot name="top"></slot>

    <section class="m-scrollview" ref="scrollView" id="scrollView">
      <slot></slot>
    </section>

    <slot name="bottom"></slot>

    <slot name="tabbar"></slot>
  </section>
</template>

<script>
export default {
  name: "layout",
  props: {
    link: String,
    title: String,
    showNavbar: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="less">
@import "./index.less";
</style>
