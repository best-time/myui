<script setup>
import { ref } from 'vue'
import WrapInput from './sub/WrapInput.vue'

const inputText = ref('')

const prependSlotText = ref('Http://')
const appendSlotText = ref('.com')

function updateSlotInfo() {
  prependSlotText.value = 'https://aaa'
  appendSlotText.value = `${new Date().getTime()}`
}

const wrapInputRef = ref()
function setWrapInputFocus() {
  console.log(wrapInputRef.value.inputRef, wrapInputRef.value.log)
  wrapInputRef.value?.log?.()
  wrapInputRef.value?.inputRef?.focus?.()
}
function subMounted() {
  console.log(22222)
}
</script>

<template>
  <WrapInput v-model="inputText" ref="wrapInputRef" @vue:mounted="subMounted">
    <template #prepend>{{ prependSlotText }}</template>
    <template #append>{{ appendSlotText }}</template>
  </WrapInput>

  <div style="margin: 20px 0">
    {{ inputText }}
  </div>

  <el-button type="primary" @click="updateSlotInfo">更新插槽内容</el-button>
  <el-button type="primary" @click="setWrapInputFocus">input获取焦点</el-button>
</template>

<style scoped lang="scss"></style>
