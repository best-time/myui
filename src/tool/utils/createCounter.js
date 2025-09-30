export function createCounter(prefixString) {
  let count = 0
  return () => (!!prefixString ? `${prefixString}_` : '') + count++
}
//# sourceMappingURL=createCounter.js.map
