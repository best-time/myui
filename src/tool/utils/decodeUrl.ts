/**
 * 解析url，得到纯净的url，params参数以及哈希值
 *
 *        11/5 20:52
 */
export const decodeUrl = (url: string): null | { url: string; params: object; hash: string } => {
  if (!url) return null

  let parts = url.split(/[?#]/)

  if (parts.length === 0) {
    console.error('地址解析失败！url=' + url)
    return null
  }

  let params = {} as any
  if (parts.length >= 2) {
    const paramParts = parts[1].split('&')
    paramParts.forEach((item: string) => {
      if (!item) return
      const [key, value] = item.split('=')
      params[decodeURIComponent(key)] = decodeURIComponent(value)
    })
  }

  return {
    url: parts[0] as string,
    params,
    hash: parts[2] as string
  }
}
