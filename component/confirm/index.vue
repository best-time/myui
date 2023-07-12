<template>
  <div class="confirm">
    <div class="confirm-inner">
      <div class="title">{{title}}</div>
      <div class="message">{{message}}</div>
      <div class="btns">
        <div class="btn cancel" @click="onCancel">{{cancelBtnText}}</div>
        <div class="btn confirm" @click="onConfirm">{{confirmBtnText}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Confirm',
  props: {
    title: {
      type: String,
      default: '提示'
    },
    message: {
      type: String,
      default: '默认提示信息'
    },
    confirmBtnText: {
      type: String,
      default: '确认'
    },
    cancelBtnText: {
      type: String,
      default: '取消'
    },
    onConfirm: {
      type: Function,
      default: () => {}
    },
    onCancel: {
      type: Function,
      default: () => {}
    }
  }
}
</script>
