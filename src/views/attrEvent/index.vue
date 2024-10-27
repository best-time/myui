<template>
  <div>
    <el-button type="primary" @click="changeShow">index点击</el-button>
    <second-com @register="register" v-bind="{ ...attrs }"></second-com>
  </div>
</template>

<script setup>
import { useAttrs, defineAsyncComponent }from 'vue'
import {useBasic} from './base'

const SecondCom = defineAsyncComponent(() => import('./SecondCom.vue'))
const attrs = useAttrs()
console.log(attrs)
const [ , { changeShow, register }] = useBasic()
</script>
