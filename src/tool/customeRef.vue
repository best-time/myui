<template>
  <div>
    <!-- 防抖输入框 -->
    <input v-model="searchQuery" placeholder="搜索..." />
    <p>搜索内容: {{ searchQuery }}</p>

    <!-- 异步数据 -->
    <div v-if="userData.loading">加载中...</div>
    <div v-else-if="userData.error">错误: {{ userData.error }}</div>
    <div v-else>{{ userData.value }}</div>

    <!-- 数据验证 -->
    <input v-model="age.value" type="number" />
    <p v-if="age.error" style="color: red">{{ age.error }}</p>
  </div>
</template>

<script setup>
import { useDebouncedRef, useAsyncRef, useValidatedRef } from './customRef.js'

const searchQuery = useDebouncedRef('', 500)
const userData = useAsyncRef(() => fetch('/api/user').then((res) => res.json()))
const age = useValidatedRef(18, (value) => {
  if (value < 0) {
    return '年龄不能为负数'
  }
  return true
})
</script>
