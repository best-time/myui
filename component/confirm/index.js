import { createApp } from 'vue'
import Confirm from './index.vue'

function confirm ({ title, message, confirmBtnText, cancelBtnText }) {
    return new Promise((resolve, reject) => {
        // 实例化组件，createApp第二个参数是props
        const confirmInstance = createApp(Confirm, {
            title: title || '提示',
            message: message || '确认消息',
            confirmBtnText: confirmBtnText || '确定',
            cancelBtnText: cancelBtnText || '取消',
            onConfirm: () => {
                unmount()
                resolve()
            },
            onCancel: () => {
                unmount()
                reject(new Error())
            }
        })
        // 卸载组件
        const unmount = () => {
            confirmInstance.unmount()
            document.body.removeChild(parentNode)
        }
        // 创建一个挂载容器
        const parentNode = document.createElement('div')
        document.body.appendChild(parentNode)
        // 挂载组件
        confirmInstance.mount(parentNode)
    })
}

export default confirm

/*

setup () {
  const showConfirm = () => {
    Confirm({
      title: '标题',
      message: '内容'
    }).then(() => {
      console.log('点击确认')
    }).catch(() => {
      console.log('点击取消')
    })
  }
  return {
    showConfirm
  }
}
 */
