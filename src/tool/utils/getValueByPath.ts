export function getValueByPath(data: Record<string, any>, paths: string[]) {
  paths = [...paths]
  if (!paths.length) {
    return data
  }
  while (paths.length && !!data) {
    const path = paths.shift()!
    const value = data[path]
    if (!paths.length) {
      return value
    }
    data = value
  }
  return undefined
}
