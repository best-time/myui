/**
 * 添加字符单位
 *
 *        1/10 10:56
 */
export const unit = (data, unit = 'px') => {
  if (data == null) return null
  data = String(data)
  if (/^-?[\d]+$/.test(String(data))) {
    return `${data}${unit}`
  }
  return data
}
//# sourceMappingURL=unit.js.map
