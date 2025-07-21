export function omit(target, keys) {
  return Object.entries(target).reduce((prev, [key, value]) => {
    if (keys.indexOf(key) == -1) {
      prev[key] = value
    }
    return prev
  }, {})
}
//# sourceMappingURL=omit.js.map
