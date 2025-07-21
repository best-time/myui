export function notNull<T, D>(val: T, defaultValue: D | (() => D)): Exclude<T, null | undefined> | D {
  // @ts-ignore
  return val != null ? val : typeof defaultValue === 'function' ? defaultValue() : defaultValue
}

export function notNullFunction<T, D>(val: T, defaultValue: D): Exclude<T, null | undefined> | D {
  // @ts-ignore
  return val != null ? val : defaultValue
}
