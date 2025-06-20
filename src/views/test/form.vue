<template>
  <h3>{{ props.title }}</h3>
  <el-form ref="formRef" :model="numberValidateForm" label-width="100px" class="demo-ruleForm">
    <el-form-item
      label="age"
      prop="age"
      :rules="[
        { required: true, message: 'age is required' },
        { type: 'number', message: 'age must be a number' }
      ]"
    >
      <el-input v-model.number="numberValidateForm.age" type="text" autocomplete="off" />
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'

const props = defineProps({
  title: {
    type: String,
    default: '欢迎访问'
  }
})

const formRef = ref<FormInstance>()

const numberValidateForm = reactive({
  age: ''
})

const submitForm = () => {
  if (!formRef.value) {
    return
  }
  return new Promise((resolve) => {
    formRef.value.validate((valid) => {
      if (valid) {
        console.log('提交成功!')
        resolve(true)
      } else {
        console.log('提交失败')
        resolve(false)
      }
    })
  })
}

const resetForm = () => {
  if (!formRef.value) return
  formRef.value.resetFields()
}

defineExpose({
  submitForm,
  resetForm
})
</script>
