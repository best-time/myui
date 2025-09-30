/**
 * 添加字符单位
 *
 *        1/10 10:56
 */

export const unit = (data: string | number | undefined | null, unit = 'px'): string | null => {
  if (data == null) return null
  data = String(data)
  if (/^-?[\d]+$/.test(String(data))) {
    return `${data}${unit}`
  }
  return data
}
