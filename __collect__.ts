import { watch, getCurrentInstance, nextTick, onMounted, onUnmounted, onBeforeUnmount, onBeforeMount } from 'vue'
import type { WatchCallback, WatchOptions, WatchSource, WatchStopHandle } from 'vue'

type Fn = () => void

const toString = Object.prototype.toString
export const hasOwn = <T extends object, K extends keyof T>(val: T, key: K): key is K =>
  Object.prototype.hasOwnProperty.call(val, key)

/*
await promiseTimeout(100, true).catch((error) => {
      expect(error).toBe('Timeout')
    })
 */
export function promiseTimeout(ms: number, throwOnTimeout = false, reason = 'Timeout'): Promise<void> {
  return new Promise((resolve, reject) => {
    if (throwOnTimeout) setTimeout(() => reject(reason), ms)
    else setTimeout(resolve, ms)
  })
}

export function identity<T>(arg: T): T {
  return arg
}

/*
await new Promise<void>((resolve, reject) => {
      const r = shallowRef(0)

      invoke(async () => {
        expect(r.value).toBe(0)
        const x = await until(r).changed()
        expect(x).toBe(1)
        resolve()
      }).catch(reject)

      setTimeout(() => {
        r.value = 1
      }, 100)
      vi.advanceTimersByTime(100)
    })
 */
export function invoke<T>(fn: () => T): T {
  return fn()
}
// containsProp(obj, 'formIndex', 'comparator')
export function containsProp(obj: object, ...props: string[]) {
  return props.some((k) => k in obj)
}

//     expect(objectPick({ a: 1, b: 2, c: 3 }, ['a', 'b'])).toEqual({ a: 1, b: 2 })
//     expect(objectPick({ a: 1, b: 2, c: undefined }, ['a', 'b'], true)).toEqual({ a: 1, b: 2 })
export function objectPick<O extends object, T extends keyof O>(obj: O, keys: T[], omitUndefined = false) {
  return keys.reduce(
    (n, k) => {
      if (k in obj) {
        if (!omitUndefined || obj[k] !== undefined) n[k] = obj[k]
      }
      return n
    },
    {} as Pick<O, T>
  )
}

/*
expect(objectOmit(obj, ['a', 'b'])).toEqual({ c: 3 })
    expect(objectOmit({ a: 1, b: 2, c: undefined }, ['a', 'b'], true)).toEqual({})
    expect(objectOmit({ a: 1, b: 2, c: undefined }, ['b', 'c'], true)).toEqual({ a: 1 })
 */
export function objectOmit<O extends object, T extends keyof O>(obj: O, keys: T[], omitUndefined = false) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => {
      return (!omitUndefined || value !== undefined) && !keys.includes(key as T)
    })
  ) as Omit<O, T>
}

export function objectEntries<T extends object>(obj: T) {
  return Object.entries(obj) as Array<[keyof T, T[keyof T]]>
}

export function toArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value]
}

export const assert = (condition: boolean, ...infos: any[]) => {
  if (!condition) console.warn(...infos)
}

export const isObject = (val: any): val is object => toString.call(val) === '[object Object]'

export function getLifeCycleTarget(target?: any) {
  return target || getCurrentInstance()
}

/**
 * Call onBeforeMount() if it's inside a component lifecycle, if not, just call the function
 *
 * @param fn
 * @param sync if set to false, it will run in the nextTick() of Vue
 * @param target
 */
export function tryOnBeforeMount(fn: Fn, sync = true, target?: any) {
  const instance = getLifeCycleTarget(target)
  if (instance) onBeforeMount(fn, target)
  else if (sync) fn()
  else nextTick(fn)
}

/**
 * Call onBeforeUnmount() if it's inside a component lifecycle, if not, do nothing
 *
 * @param fn
 * @param target
 */
export function tryOnBeforeUnmount(fn: Fn, target?: any) {
  const instance = getLifeCycleTarget(target)
  if (instance) onBeforeUnmount(fn, target)
}

/**
 * Call onMounted() if it's inside a component lifecycle, if not, just call the function
 *
 * @param fn
 * @param sync if set to false, it will run in the nextTick() of Vue
 * @param target
 */
export function tryOnMounted(fn: Fn, sync = true, target?: any) {
  const instance = getLifeCycleTarget(target)
  if (instance) onMounted(fn, target)
  else if (sync) fn()
  else nextTick(fn)
}

/**
 * Call onUnmounted() if it's inside a component lifecycle, if not, do nothing
 *
 * @param fn
 * @param target
 */
export function tryOnUnmounted(fn: Fn, target?: any) {
  const instance = getLifeCycleTarget(target)
  if (instance) onUnmounted(fn, target)
}

export function watchDeep<T = any, Immediate extends Readonly<boolean> = false>(
  source: T | WatchSource<T>,
  cb: any,
  options?: Omit<WatchOptions<Immediate>, 'deep'>
) {
  return watch(source as any, cb, {
    ...options,
    deep: true
  })
}

export function watchImmediate<T = any>(source: T, cb: any, options?: Omit<WatchOptions, 'immediate'>) {
  return watch(source as any, cb, {
    ...options,
    immediate: true
  })
}

export function watchOnce<T = any>(source: T, cb: any, options?: Omit<WatchOptions, 'once'>) {
  return watch(
    source as any,
    cb,
    {
      ...options,
      once: true,
    },
  )
}
