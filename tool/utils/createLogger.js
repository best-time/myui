export function createLogger(prefix, type) {
  return (msg, ...args) => {
    console[type](`${prefix}: ${msg}`, ...args)
  }
}
//# sourceMappingURL=createLogger.js.map
