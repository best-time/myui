<template>
  <el-button type="primary" @click="changeShow">page点击</el-button>
  <index-com @register="register"></index-com>
</template>

<script setup>
// 在Erzi.vue 中并没有去接收 Yeye.vue 传下来的 emits，但是它却能透传到Sunzi.vue 中，并且两者叠加
import { defineAsyncComponent} from 'vue'
import {useBasic} from './base'

const IndexCom = defineAsyncComponent(() => import('./index.vue'))
const [ , { changeShow,register }] = useBasic()

</script>
