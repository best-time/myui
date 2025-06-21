import { reactive } from 'vue'
function clone(value: any): any {
  if (value === null || typeof value !== 'object') {
    return value
  }
  return JSON.parse(JSON.stringify(value))
}

type Resettable<T> = [T, () => void] & { state: T; reset: () => void }

export function useResettableReactive<T extends object>(value: T): Resettable<T> {
  const state = reactive(clone(value)) as T

  const reset = () => {
    Object.keys(state).forEach((key: string) => delete state[key])
    Object.assign(state, clone(value))
  }

  return Object.assign([state, reset], { state, reset }) as unknown as Resettable<T>
}

// 使用
const [state, reset] = useResettableReactive({
  a: 1,
  b: 2,
  c: [1, 2, 3]
})

/*
state.a++
state.c.push(Math.random())
 */
