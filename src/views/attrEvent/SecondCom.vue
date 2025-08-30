<template>
  <basic-com :ref="setRef"></basic-com>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

const BasicCom = defineAsyncComponent(() => import('./BasicCom.vue'))

const emits = defineEmits(['register'])
function setRef(ins) {
  emits('register', ins)
}
</script>
