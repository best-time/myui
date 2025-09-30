export function omit<T extends Record<string, any>, K extends keyof T>(
  target: T,
  keys: K[]
): { [k in Exclude<keyof T, K>]: k extends keyof T ? T[k] : never } {
  return Object.entries(target).reduce((prev, [key, value]) => {
    if (keys.indexOf(key as any) == -1) {
      prev[key] = value
    }
    return prev
  }, {} as any)
}
