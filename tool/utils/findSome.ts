/**
 * 从数组中查找多个
 *
 *        1/10 10:57
 */
export const findSome = <T>(array: T[], fn: (item: T, index: number) => boolean): T[] => {
  const ret = [] as T[]
  for (let i = 0; i < array.length; i++) {
    const item = array[i]
    if (fn(item, i)) ret.push(item)
  }
  return ret
}
