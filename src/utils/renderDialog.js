import { createApp, ref, h } from 'vue'
import { ElDialog } from 'element-plus'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Footer from '@/views/test/footer.vue'

const dialogConfig = {
  'close-on-click-modal': false,
  'close-on-press-escape': false
}

export function renderDialog(component, props, modalProps) {
  const visible = ref(true)
  const loading = ref(false)
  const instance = ref(null)
  console.log(instance)
  const dialog = () => {
    return h(
      ElDialog,
      {
        ...dialogConfig,
        'model-value': visible.value,
        ...modalProps,
        onClosed() {
          console.log('closdddddd')
          unmount()
        },
        onClose() {
          visible.value = false
          console.log('close')
        }
      },
      {
        default: () => h(component, { ref: instance, ...props }),
        footer: () =>
          h(Footer, {
            confirmLoading: loading.value,
            onCancel() {
              console.log('点击了取消按钮')
              visible.value = false
            },
            onConfirm() {
              loading.value = true
              console.log('点击了确认按钮')
              // const res = await instance.value.submitForm()
              // if (res) {
              //   visible.value = false
              // }
              instance.value
                .submitForm()
                .then((res) => {
                  console.log(res, 'rrrrr')
                })
                .finally(() => {
                  setTimeout(() => {
                    loading.value = false
                  }, 1000)
                })
            }
          })
      }
    )
  }

  const app = createApp(dialog)
  app.use(ElementPlus)
  const div = document.createElement('div')
  document.body.appendChild(div)
  app.mount(div)

  function unmount() {
    app.unmount()
    document.body.removeChild(div)
  }
  return {
    unmount,
    instance
  }
}
