/**
 * 判断是否为普通对象
 *
 *        10/15 22:19
 */
import { typeOf } from './typeOf'
export const isPlainObject = (val) => {
  return typeOf(val) === 'object'
}
//# sourceMappingURL=isPlainObject.js.map
