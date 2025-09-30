/**
 * 数组分块
 *
 *        11/5 21:06
 */
export const chunk = <T>(array: T[], size: number): T[][] => {
  size = Math.max(size, 0)
  const length = array == null ? 0 : array.length
  if (!length || size < 1) {
    return []
  }

  let index = 0
  let resIndex = 0
  const result = new Array(Math.ceil(length / size))

  while (index < length) {
    result[resIndex++] = array.slice(index, (index += size))
  }
  return result
}
