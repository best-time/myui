import { computed, onMounted, nextTick } from 'vue'
import { useDark, useTitle, useMouse, onClickOutside } from '@vueuse/core'

export function useBase({el}) {
  const isDark = useDark()
  const title = computed(() => (isDark.value ? '🌙 Good evening!' : '☀️ Good morning!'))

  useTitle(title)

    // const title = useTitle('Hello')

    const { x, y } = useMouse()
    console.log(x, y);
    
    function close() {
        console.log('close');
    }
   
    onMounted(() => {
        el && onClickOutside(el, close)
    })

  return {
    name: 'hook',
    x, y
  }
}
