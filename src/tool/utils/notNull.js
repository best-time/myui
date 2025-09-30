export function notNull(val, defaultValue) {
  // @ts-ignore
  return val != null ? val : typeof defaultValue === 'function' ? defaultValue() : defaultValue
}
export function notNullFunction(val, defaultValue) {
  // @ts-ignore
  return val != null ? val : defaultValue
}
//# sourceMappingURL=notNull.js.map
