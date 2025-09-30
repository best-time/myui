/**
 * 判断是否为普通对象
 *
 *        10/15 22:19
 */
import { typeOf } from './typeOf'

export const isPlainObject = (val: any): val is Object => {
  return typeOf(val) === 'object'
}

export type PlainObject = Record<string, any>
