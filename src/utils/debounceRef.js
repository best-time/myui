import { customRef } from 'vue'

export function debounceRef(value, delay) {
  let timer = null
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(val) {
        timer && clearTimeout(timer)
        setTimeout(() => {
          value = val
          trigger()
        }, delay)
      }
    }
  })
}
