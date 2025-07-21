/**
 * 从target中挑选部分字段出来
 *
 *        1/10 15:00
 */
export function pick(target, keys) {
  return keys.reduce((prev, key) => {
    prev[key] = target[key]
    return prev
  }, {})
}
//# sourceMappingURL=pick.js.map
