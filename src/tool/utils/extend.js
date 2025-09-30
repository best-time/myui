import { deepcopy } from './deepcopy'
/**
 * 继承属性
 *
 *        11/10 17:52
 */
export const extend = (to, from) => {
  const ret = deepcopy(to)
  for (const key in from) {
    ret[key] = from[key]
  }
  return ret
}
//# sourceMappingURL=extend.js.map
