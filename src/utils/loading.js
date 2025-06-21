import { customRef } from 'vue'

export const loading = customRef((track, trigger) => {
  let loadingCount = 0
  return {
    get() {
      track()
      return loadingCount > 0
    },
    set(value) {
      loadingCount += value ? 1 : -1
      loadingCount = Math.max(0, loadingCount)
      trigger()
    }
  }
})
