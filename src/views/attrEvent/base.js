import { ref } from 'vue'

export const useBasic = () => {
  const compIns = ref()
  function register(ins) {
    compIns.value = ins
  }
  function changeShow() {
    compIns.value?.changeShow()
  }
  return [register, { changeShow, register }]
}
