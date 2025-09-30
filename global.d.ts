export {}

declare global {
  type Recordable<T = any> = Record<string, T>
  type Fn = () => void
  type AnyFn = (...args: any[]) => any
  type IfAny<T, Y, N> = 0 extends (1 & T) ? Y : N
  type IsAny<T> = IfAny<T, true, false>
  type TimerHandle = ReturnType<typeof setTimeout> | undefined

}
