const partial = function(fn: Function, ...presetArgs: any[]) {
  return function partiallyApplied(...laterArgs: any[]) {
    return fn(...presetArgs, ...laterArgs)
  }
}


export default partial