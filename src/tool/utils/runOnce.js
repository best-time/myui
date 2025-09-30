/**
 * 创建一个只能执行一次的函数
 *
 *        .10.29 23:35
 */
export function runOnce(run) {
  let done = false
  return (...args) => {
    if (!done) {
      run(...args)
      done = true
    }
  }
}
//# sourceMappingURL=runOnce.js.map
