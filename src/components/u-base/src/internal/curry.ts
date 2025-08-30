function curry(fn: Function, arity: number = fn.length) {
  return (function nextCurried(prevArgs) {
    return function curried(nextArgs: never) {
      let args = prevArgs.concat([nextArgs])
      if (args.length >= arity) {
        return fn(...args)
      } else {
        return nextCurried(args)
      }
    }
  })([])
}

export default curry
