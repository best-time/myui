import type { SimpleFunction } from './event'

export function createEffects() {
  let list: SimpleFunction[] = []

  const clear = () => {
    list.forEach((i) => i())
    list.splice(0, list.length)
  }
  const push = (effect: SimpleFunction) => {
    list.push(effect)
  }

  return { effects: { list, push, clear } }
}

export type iEffects = ReturnType<typeof createEffects>['effects']
