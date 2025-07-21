/**
 * 移除字符单位
 *
 *        11/5 20:20
 */
export const removeUnit = (data, unit = 'px') => {
  if (!data) return ''
  data = String(data)
  if (data.indexOf(unit) > -1) {
    return data.replace(unit, '')
  } else {
    return data
  }
}
//# sourceMappingURL=removeUnit.js.map
