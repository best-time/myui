// 防抖动函数
function debounce(fn = () => {}, wait = 100, immediate = false) {
  let timer
  return function () {
    if (immediate) {
      fn.apply(this, arguments)
    }
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, wait)
  }
}
