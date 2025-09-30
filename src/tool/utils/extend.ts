import { deepcopy } from './deepcopy'

/**
 * 继承属性
 *
 *        11/10 17:52
 */
export const extend = <T, U>(to: T, from: U): T & U => {
  const ret = deepcopy(to) as T & U
  for (const key in from) {
    ret[key] = from[key] as any
  }
  return ret as T & U
}
