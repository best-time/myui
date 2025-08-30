import usedialogStore from '../store/dialog'
import { defineAsyncComponent, shallowRef } from 'vue'

const dialogStore = usedialogStore()

export const useDialogHooks = () => {
  const initDialog = (options) => {
    const { children } = options
    children.forEach((item) => {
      item.component = shallowRef(defineAsyncComponent(item.component))
    })
    dialogStore.initDialog(options)
  }

  const addDialog = (options) => {
    options.component = shallowRef(defineAsyncComponent(options.component))
    dialogStore.addDialog(options)
  }
  return {
    initDialog,
    addDialog
  }
}

export default useDialogHooks
