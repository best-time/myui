/**
 * 从target中挑选部分字段出来
 *
 *        1/10 15:00
 */
export function pick<T, K extends keyof T>(target: T, keys: K[]): Pick<T, K> {
  return keys.reduce((prev, key) => {
    prev[key] = (target as any)[key]
    return prev
  }, {} as any)
}
