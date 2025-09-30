export function createLogger(prefix: string, type: 'log' | 'error' | 'warn') {
  return (msg: string, ...args: any[]) => {
    console[type](`${prefix}: ${msg}`, ...args)
  }
}
