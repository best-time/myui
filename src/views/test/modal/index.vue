<template>
  <div class="home">
    <el-button type="primary" @click="openAction">消息-弹窗</el-button>
    <el-button type="primary" @click="openAction2">消息-弹窗2</el-button>
    <Notice />
    <Notice2 title="弹窗2" />
  </div>
</template>
<script setup>
import { openModal } from '../../../hooks/modal.js'

import Notice from './notice.vue'
import Notice2 from './notice2.vue'

// 打开弹窗
const { openAction } = openModal('notice')
const { openAction: openAction2 } = openModal('notice2')
</script>
