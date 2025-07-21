/**
 * 创建一个只能执行一次的函数
 *
 *        .10.29 23:35
 */
export function runOnce<Run extends (...args: any) => void>(run: Run): Run {
  let done = false
  return ((...args: any[]) => {
    if (!done) {
      run(...args)
      done = true
    }
  }) as any
}
