<script setup>
import { ref } from 'vue'

defineProps({
  text: {
    type: String,
    default: '加载中...'
  },
  title: {
    type: String,
    default: '标题'
  },
  mask: {
    type: Boolean,
    default: false
  },
  component: {}
})
const emit = defineEmits(['before-close'])

const visible = ref(false)

function open() {
  visible.value = true
}

function close() {
  visible.value = false
}
const beforeClose = () => {
  emit('before-close')
}
function confirm() {}

defineExpose({
  close,
  open
})
</script>
<script>
export default {
  name: 's-dialog'
}
</script>
<template>
  <el-dialog v-model="visible" :title="title" clas="custom-dialog" width="500" :before-close="beforeClose">
    <component :is="component"></component>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="confirm"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>

  <!--  <div v-show="visible" class="loading-container" :class="{ pe: !mask }">-->
  <!--    <div class="loading-wrapper" :class="{ mask: mask, pe: !mask }">-->
  <!--      <img-->
  <!--          src="https://zhanchi-static.oss-cn-shenzhen.aliyuncs.com/zhancchi_recruit/loading.gif"-->
  <!--          alt=""-->
  <!--      />-->
  <!--      <span class="loading-text">{{ text }}</span>-->
  <!--    </div>-->
  <!--  </div>-->
</template>
<style lang="scss" scoped>
.loading-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;

  .loading-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
      width: 32px;
      height: 32px;
    }

    .loading-text {
      display: inline-block;
      max-width: 100px;
      margin-top: 5px;
      font-size: 12px;
      color: #666;
    }
  }

  .mask {
    background: rgb(0 0 0 / 50%);

    .loading-text {
      color: #fff;
    }
  }
}

.pe {
  pointer-events: none;
}
</style>
