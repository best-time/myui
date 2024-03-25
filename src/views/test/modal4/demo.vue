<template>
  <div class="home">
    <p>modal4</p>
    <el-button type="primary" @click="showDialog">显示提示弹窗</el-button>
  </div>
</template>

<script setup>
import mountDialog from './index.js'
const showDialog = () => {
  mountDialog({ title: '自定义标题', content: '自定义内容' })
}
</script>

