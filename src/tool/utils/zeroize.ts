/**
 * 填充0字符
 *
 *        10/28 20:40
 */
export const zeroize = (value: string | number, length = 2): string => {
  if (value == null) {
    value = ''
  }

  value = String(value)
  const zeroLen = length - value.length
  if (zeroLen <= 0) return value

  return new Array(zeroLen).fill('0').join('') + value
}
