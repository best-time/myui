/**
 * 填充0字符
 *
 *        10/28 20:40
 */
export const zeroize = (value, length = 2) => {
  if (value == null) {
    value = ''
  }
  value = String(value)
  const zeroLen = length - value.length
  if (zeroLen <= 0) return value
  return new Array(zeroLen).fill('0').join('') + value
}
//# sourceMappingURL=zeroize.js.map
