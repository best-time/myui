<template>
  <div>
    <h2>组件bbbbbbbb---{{title}}</h2>
    <el-button @click="update" type="primary">触发</el-button>
    <slot name="content" />
    <slot name="contentTips" />
    <slot />
  </div>
</template>
<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '默认标题'
  }
})
const emits = defineEmits(['update'])
function update() {
  emits('update', Math.random())
}
</script>
