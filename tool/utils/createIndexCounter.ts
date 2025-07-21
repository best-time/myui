export function createIndexCounter(initialIndex = 1500) {
  return () => {
    return initialIndex++
  }
}
