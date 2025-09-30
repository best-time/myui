/**
 * 防抖
 *
 *        11/16 19:31
 */
export const debounce = <T extends Function>(func: T, wait: number, immediate?: boolean): T => {
  let timeout: any

  return function (...args: any[]) {
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
  } as any
}
