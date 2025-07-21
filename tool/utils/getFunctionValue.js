export function getFunctionValue(val, defaultValue) {
  if (val == null) {
    return defaultValue
  }
  // @ts-ignore
  return typeof val == 'function' ? val() : val
}
//# sourceMappingURL=getFunctionValue.js.map
