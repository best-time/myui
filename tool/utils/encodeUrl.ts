/**
 * 根据传入的参数params，生成url
 *
 *        11/5 20:40
 */
import { isPlainObject } from './isPlainObject'
import { encode } from './encode'
import { isDate } from './isDate'

export const encodeUrl = (url: string, params: object) => {
  if (!params) return url

  const parts: string[] = []
  Object.keys(params).forEach((key) => {
    const val = (params as any)[key] as any
    if (val === null || typeof val === 'undefined') {
      return
    }
    let values = [] as any[]
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
