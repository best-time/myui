/**
 * 防抖
 *
 *        11/16 19:31
 */
export const debounce = (func, wait, immediate) => {
  let timeout
  return function (...args) {
    // @ts-ignore
    const context = this
    clearTimeout(timeout)
    if (immediate) {
      let callNow = !timeout
      // @ts-ignore
      if (callNow) func.apply(this, args)
    }
    timeout = setTimeout(() => {
      func.apply(context, args)
      timeout = null
    }, wait)
  }
}
//# sourceMappingURL=debounce.js.map
