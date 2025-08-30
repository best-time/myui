<template>
  <router-view />
  <!-- 全局挂载弹框 -->
  <dialog-com></dialog-com>
</template>

<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
import dialogCom from './components/common/dialogCom.vue'
hello()
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
