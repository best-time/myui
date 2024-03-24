<template>
  <h2>组件aaaaa</h2>
  <el-button type="primary" @click="open">a组件查看</el-button>
</template>

<script setup>

import Loading from './modal3/index.js'
import {defineAsyncComponent} from 'vue'

const open = () => {
  Loading({
    mask: true,
    text:'数据获取中',
    title: '第2个弹窗-组件b',
    component: defineAsyncComponent(() => import('./b.vue'))
  }, 'b')
}
</script>
