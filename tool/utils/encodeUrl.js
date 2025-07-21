/**
 * 根据传入的参数params，生成url
 *
 *        11/5 20:40
 */
import { isPlainObject } from './isPlainObject'
import { encode } from './encode'
import { isDate } from './isDate'
export const encodeUrl = (url, params) => {
  if (!params) return url
  const parts = []
  Object.keys(params).forEach((key) => {
    const val = params[key]
    if (val === null || typeof val === 'undefined') {
      return
    }
    let values = []
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }
    values.forEach((val) => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })
  let serializedParams = parts.join('&')
  if (serializedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) url = url.slice(0, markIndex)
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }
  return url
}
//# sourceMappingURL=encodeUrl.js.map
