import { onMounted, onBeforeUnmount, nextTick, ref } from 'vue'
import useEventListener from './useEventListener'

export default function useWinResize(Action = () => {}) {
  const fn = () => {
    nextTick(() => {
      Action()
    })
  }
  const stopEvent = useEventListener(window, 'resize', fn)
  
  onBeforeUnmount(() => {
    stopEvent?.()
  })
  return null
}
