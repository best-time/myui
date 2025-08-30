<template>
  <div class="modal5">
    <el-button type="primary" @click="open">打开1</el-button>
  </div>
</template>
<script setup>
import { ref, getCurrentInstance } from 'vue'
import { createDynamicComponent } from './index.js'
const dyComp = ref(null)
const instance = getCurrentInstance()
const open = async () => {
  dyComp.value = await createDynamicComponent(instance)
  console.log(dyComp.value)
  dyComp.value.open()
}
</script>
