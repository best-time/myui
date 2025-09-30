/**
 * 在数组中移除某一项
 *
 *        11/5 21:02
 */
export const removeSome = <T>(array: T[], fn: (item: T, index: number) => boolean): number => {
  let count = 0
  if (!array) return count

  for (let i = 0; i < array.length; i++) {
    const item = array[i]
    if (fn(item, i)) {
      array.splice(i, 1)
      i--
      count++
    }
  }

  return count
}
