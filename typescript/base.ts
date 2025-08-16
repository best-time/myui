import type { Ref, ComponentPublicInstance } from 'vue'

type ArrayAble<T> = T[] | T
type Recordable<T = any> = Record<string, T>

type TargetValue<T> = T | undefined | null

type Objectable<T extends object> = {
  [P in keyof T]: T[P]
} & Recordable

type TimeoutHandle = ReturnType<typeof setTimeout>
type IntervalHandle = ReturnType<typeof setInterval>

// Event

type EventTarget = HTMLElement | Window | Document | null | undefined
type TargetType = HTMLElement | Element | Window | Document | ComponentPublicInstance

type Events = ArrayAble<string> | ArrayAble<keyof WindowEventMap> | ArrayAble<keyof DocumentEventMap>

export type BasicTarget<T extends TargetType = Element> = (() => TargetValue<T>) | TargetValue<T> | Ref<TargetValue<T>>
// as const
// as const 将数组变为 readonly 的元组类型
const APP = ['TaoBao', 'Tmall', 'Alipay'] as const
type app = (typeof APP)[number] // "TaoBao" | "Tmall" | "Alipay"
// 条件约束
// 条件类型约束
type MessageOf<T extends { message: unknown }> = T['message']
// ------------------------------------------------------------------------

// infer
// 使用infer推断
type Flatten<Type> = Type extends Array<infer Item> ? Item : Type

// #demo
type Flatten1 = Flatten<string[]> // string
type Flatten2 = Flatten<number> // number

// ------------------------------------------------------------------------
// 推断函数返回值类型
type GetReturnType<Type> = Type extends (...args: never[]) => infer Return ? Return : never

// ------------------------------------------------------------------------

// toArray
type ToArray<Type> = Type extends any ? Type[] : never

type StrArrOrNumArr = ToArray<string | number>
// type StrArrOrNumArr = string[] | number[]

// 注意和上面返回的不同
type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never
// 'StrArrOrNumArr' is no longer a union.
type StrArrOrNumArr2 = ToArrayNonDist<string | number>
// type StrArrOrNumArr = (string | number)[]

type FunctionInfo<T> = T extends (first: infer A, second: infer B) => infer R ? { args: [A, B]; return: R } : never

type LoginFunction = (username: string, password: string) => Promise<boolean>

type LoginInfo = FunctionInfo<LoginFunction>
// LoginInfo is: { args: [string, string]; return: Promise<boolean> }

// infer 和extend

const a = (a: number) => `${a + 1}`

type ExtractParamsAndReturn<T> = T extends (a: infer Params) => infer Return ? [Params, Return] : never

let sayType: ExtractParamsAndReturn<typeof a>
