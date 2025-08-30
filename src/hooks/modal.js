import { ref, inject, provide, watchEffect } from 'vue'
/**
 * 控制打开弹窗
 * @param modelName 相对应的弹窗组件名(这里是自己定义的一个接口，一是为了编码代码时候友好提示，十是为了防止代码出错）
 * @returns openAction 打开弹窗方法
 */
export function openModal(modelName) {
  const name = ref(false)
  provide(modelName, name)
  /**
   * 打开弹窗
   */
  function openAction() {
    name.value = true
  }
  return { openAction }
}

/**
 * 控制关闭弹窗
 * @param modelName 相对应的弹窗组件名
 * @returns
 */
export function closeModal(modelName) {
  // 控制弹窗 flag
  const visible = ref(false)
  const show = inject(modelName, ref(false))
  watchEffect(() => {
    visible.value = show.value
  })
  /**
   * 取消弹窗
   */
  function cancel() {
    show.value = false
  }
  /**
   * 带有回调函数关闭弹窗
   * @param callback
   */
  function handleOk(callback) {
    cancel()
    callback && callback()
  }
  return { visible, cancel, handleOk }
}
