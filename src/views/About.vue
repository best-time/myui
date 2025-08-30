<template>
  <div class="about">
    <h2>use defineModel -This is an about page {{ a }}</h2>
    <el-input v-model="name" placeholder="请输入name"></el-input>
    <p>{{ name }}</p>
    <el-input v-model="count" placeholder="请输入count"></el-input>
    <p>{{ count }}</p>
    <el-input v-model="formData.name" placeholder="请输入"></el-input>
    <p>{{ formData }}</p>
  </div>
</template>
<script setup lang="ts">
// 带默认值
const name = defineModel('name', {
  default: 'david'
})

const count = defineModel('count', {
  default: 0,
  validator: (value) => {
    return typeof value === 'number' && value >= 0
  },
  set(value: string) {
    return typeof value === 'string' ? value.trim() : value
  }
})
const formData = reactive({
  name: '1'
})
const a = ref<string>('123')
</script>
