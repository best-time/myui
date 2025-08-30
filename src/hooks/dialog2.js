import { shallowRef, render, onBeforeMount, onMounted, h, getCurrentInstance } from 'vue'
export default function useMyDialog(dialogComponent) {
  const dialogRef = shallowRef()
  const Component = () =>
    h(dialogComponent, { ref: dialogRef, appendToBody: false, props: { a: { type: String, default: '123123' } } })
  const show = async (...args) => {
    try {
      console.log(111, dialogRef.value)
      await dialogRef.value.show(...args)
    } catch (e) {
      console.log(e)
    }
  }
  let container = document.createElement('div')
  onBeforeMount(() => {
    const vnode = h(Component)
    vnode.appContext = getCurrentInstance()?.appContext || null
    render(vnode, container)
    document.body.appendChild(container)
  })
  onMounted(() => {
    // if (container) {
    //     render(null, container);
    //     document.body.removeChild(container);
    //     container = null;
    // }
  })
  return { show }
}
