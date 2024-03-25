<template>
<h1>ccccc</h1>
  <p>标题: {{title}}</p>
</template>
<script setup>
import { } from 'vue'
const props = defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>
