import { createApp } from 'vue'
import { MessageBox } from 'element-plus'

const openMessage = (props, callback) => {
  let container = document.createElement('div')
  const messagebox = createApp(MessageBox, {...props, close})
  open()
  function open() {
    messagebox.mount(container)
    document.body.appendChild(container)
  }
  function close() {
    messagebox.unmount()
    container.remove()
    container = null
  }
}
export default openMessage
