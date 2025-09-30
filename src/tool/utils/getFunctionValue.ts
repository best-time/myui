export function getFunctionValue<T, D>(val: T | (() => T) | undefined | null, defaultValue?: D): T | D | undefined {
  if (val == null) {
    return defaultValue
  }
  // @ts-ignore
  return typeof val == 'function' ? val() : val
}
