/**
 * 创建一个支持异步的hook
 *
 *        /2/20 12:25
 */
export function createHooks() {
  const innerHandlers = []
  const use = (handler) => {
    innerHandlers.push(handler)
    return () => eject(handler)
  }
  const eject = (handler) => {
    const index = innerHandlers.indexOf(handler)
    if (index > -1) {
      innerHandlers.splice(index, 1)
    }
  }
  const exec = async (arg) => {
    if (innerHandlers.length === 0) {
      return arg
    }
    let index = 0
    let innerHandler = innerHandlers[index]
    while (!!innerHandler) {
      let newArg = await innerHandler(arg)
      if (newArg !== undefined) {
        arg = newArg
      }
      index++
      innerHandler = innerHandlers[index]
    }
    return arg
  }
  return { use, eject, exec, getListeners: () => [...innerHandlers] }
}
//# sourceMappingURL=createHooks.js.map
