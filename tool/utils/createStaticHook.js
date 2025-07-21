/**
 * 创建一个hook，类似于观察者模式，实际上是拦截器模式
 *
 *        /2/20 12:27
 */
export function createStaticHook() {
  const state = { innerHandlers: [] }
  const use = (handler) => {
    state.innerHandlers = [...state.innerHandlers, handler]
    return () => eject(handler)
  }
  const eject = (handler) => {
    state.innerHandlers = state.innerHandlers.filter((i) => i !== handler)
  }
  const exec = (arg) => {
    if (state.innerHandlers.length === 0) {
      return arg
    }
    let index = 0
    const innerHandlers = [...state.innerHandlers]
    let innerHandler = innerHandlers[index]
    while (!!innerHandler) {
      let newArg = innerHandler(arg)
      if (newArg !== undefined) {
        arg = newArg
      }
      index++
      innerHandler = innerHandlers[index]
    }
    return arg
  }
  return { use, eject, exec, state, getListeners: () => [...state.innerHandlers] }
}
//# sourceMappingURL=createStaticHook.js.map
