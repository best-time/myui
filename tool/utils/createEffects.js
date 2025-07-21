export function createEffects() {
  let list = []
  const clear = () => {
    list.forEach((i) => i())
    list.splice(0, list.length)
  }
  const push = (effect) => {
    list.push(effect)
  }
  return { effects: { list, push, clear } }
}
//# sourceMappingURL=createEffects.js.map
