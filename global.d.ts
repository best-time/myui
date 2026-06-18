export {}

declare global {
  type AnyFn = (...args: any[]) => any
  type IfAny<T, Y, N> = 0 extends (1 & T) ? Y : N
  type IsAny<T> = IfAny<T, true, false>
  type TimerHandle = ReturnType<typeof setTimeout> | undefined


  interface Window {
    logoutSystem: any
    __APP_ENV__: string | undefined
  }
  type BaseKey<T> = string | number | T
  type ValueOf<T> = T[keyof T]
  type PropertyKey<T> = BaseKey<T> | symbol
  type ObjectLike<T = string, R = any> = Record<T, R>
  type Recordable<T = any> = ObjectLike<string, T>
  type ArrayAble<T> = T[] | T
  type EventTargetLike =
    | EventTarget
    | HTMLElement
    | Window
    | Document
    | null
    | undefined

  interface Fn<T = any, R = T> {
    (...arg: T[]): R
  }

  type ChangeEvent = Event & {
    target: {
      value?: string | undefined
    }
  }
  interface JavaScriptType {
    string: string
    number: number
    boolean: boolean
    null: null
    undefined: undefined
    array: any[]
    object: object
    regexp: RegExp
    function: (...args: any[]) => any
    asyncfunction: (...params: any) => Promise<any>
    promise: Promise<any>
    formdata: FormData
    symbol: symbol
    date: Date
  }
  type JavaScriptTypes = keyof JavaScriptType

  type LabelValue<T = string | number> = {
    label: T
    value: T | boolean | number
  }
}
