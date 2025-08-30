<template>
  <h2>组件bbbbbbbbbb</h2>
  <el-button type="primary" @click="open">b组件查看</el-button>
</template>

<script setup>
import Loading from './modal3/index.js'
import { defineAsyncComponent } from 'vue'

const open = () => {
  Loading(
    {
      mask: true,
      text: '数据获取中',
      title: '第2个弹窗-组件a',
      component: defineAsyncComponent(() => import('./a.vue'))
    },
    'a'
  )
}
</script>
