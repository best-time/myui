const hasOwn = {}.hasOwnProperty
export function classnames(...args) {
  const classes = []
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (!arg) continue
    let argType = typeof arg
    if (argType === 'string' || argType === 'number') {
      classes.push(arg)
    } else if (Array.isArray(arg) && arg.length) {
      let inner = classnames.apply(null, arg)
      if (inner) {
        classes.push(inner)
      }
    } else if (argType === 'object') {
      for (let key in arg) {
        if (hasOwn.call(arg, key) && arg[key]) {
          classes.push(key)
        }
      }
    }
  }
  return classes.join(' ')
}
//# sourceMappingURL=classnames.js.map
