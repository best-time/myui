<template>
  <div class="dialog-footer">
    <el-button @click="cancel">取消</el-button>
    <el-button type="primary" @click="confirm" :loading="confirmLoading"> 确认 </el-button>
  </div>
</template>

<script setup>
const props = defineProps({
  confirmLoading: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['cancel', 'confirm'])
const cancel = () => {
  emits('cancel')
}
const confirm = () => {
  emits('confirm')
}
</script>
