/**
 * 解析url，得到纯净的url，params参数以及哈希值
 *
 *        11/5 20:52
 */
export const decodeUrl = (url) => {
  if (!url) return null
  let parts = url.split(/[?#]/)
  if (parts.length === 0) {
    console.error('地址解析失败！url=' + url)
    return null
  }
  let params = {}
  if (parts.length >= 2) {
    const paramParts = parts[1].split('&')
    paramParts.forEach((item) => {
      if (!item) return
      const [key, value] = item.split('=')
      params[decodeURIComponent(key)] = decodeURIComponent(value)
    })
  }
  return {
    url: parts[0],
    params,
    hash: parts[2]
  }
}
//# sourceMappingURL=decodeUrl.js.map
