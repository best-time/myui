import { getCurrentInstance, computed } from 'vue'
export function useVmModel(props, name) {
  const emit = getCurrentInstance().emit
  return computed({
    get() {
      return props[name]
    },
    set(v) {
      emit(`update:${name}`, v)
    }
  })
}

// const value = useVmModel(props, 'value')
