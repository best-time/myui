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

// extends 使用

type ButtonProps<T extends boolean> = {
  loading: T
} & (T extends true ? { onClick?: never; disabled: true } : { onClick: () => void; disabled?: boolean })

// 当 loading 是 true 时，onClick 属性就得“滚蛋”，而且 disabled 必须为 true
const loadingButton: ButtonProps<true> = {
  loading: true,
  disabled: true
  // onClick: () => {} // ❌ 类型错误！loading 的时候不准点！
}

// 当 loading 是 false 时，onClick 就是必须的了
const normalButton: ButtonProps<false> = {
  loading: false,
  onClick: () => console.log('点我呀!'),
  disabled: false
}

// 类型 '分发'
// 这就是“裸类型”—— T 直接出现在 extends 子句里
type ToArray<T> = T extends any ? T[] : never

type Result = ToArray<'a' | 'b' | 'c'>
// 结果是： 'a'[] | 'b'[] | 'c'[]
// 而不是： ('a' | 'b' | 'c')[]

// 用方括号把 T 包起来，让它不再“裸奔”
type NoDistribute<T> = [T] extends [any] ? T[] : never

type Result2 = NoDistribute<'a' | 'b' | 'c'>
// 结果就变成了： ('a' | 'b' | 'c')[]

// 注意 result result2的区别

// 实战
type NonNullable<T> = T extends null | undefined ? never : T

type Clean = NonNullable<string | null | number | undefined>
// Clean 的结果是： string | number
// null 和 undefined 被自动过滤掉了，干净！
