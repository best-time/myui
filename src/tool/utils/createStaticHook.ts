/**
 * 创建一个hook，类似于观察者模式，实际上是拦截器模式
 *
 *        /2/20 12:27
 */
export function createStaticHook<
  Handler extends (arg: any) => any,
  InnerHandler = (arg: Parameters<Handler>['0']) => void | Parameters<Handler>['0']
>() {
  const state: { innerHandlers: InnerHandler[] } = { innerHandlers: [] as InnerHandler[] }
  const use = (handler: InnerHandler) => {
    state.innerHandlers = [...state.innerHandlers, handler] as any
    return () => eject(handler)
  }
  const eject = (handler: InnerHandler) => {
    state.innerHandlers = state.innerHandlers.filter((i) => i !== handler)
  }
  const exec = (arg: Parameters<Handler>['0']): Parameters<Handler>['0'] => {
    if (state.innerHandlers.length === 0) {
      return arg
    }
    let index = 0
    const innerHandlers = [...state.innerHandlers]
    let innerHandler: InnerHandler | undefined = innerHandlers[index]
    while (!!innerHandler) {
      let newArg = (innerHandler as any)(arg)
      if (newArg !== undefined) {
        arg = newArg
      }
      index++
      innerHandler = innerHandlers[index] as any
    }
    return arg
  }
  return { use, eject, exec, state, getListeners: () => [...state.innerHandlers] }
}
