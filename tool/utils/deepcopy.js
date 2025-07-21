/**
 * 深度复制数据
 *
 *        11/5 20:23
 */
import { typeOf } from './typeOf'
export function deepcopy(data, cacheMap) {
  let val = data
  if (!cacheMap) {
    cacheMap = new WeakMap()
  }
  /*如果值的类型是对象，先判断是否复制过，已经复制过的话就返回复制过的对象引用*/
  if (typeof val === 'object') {
    let cacheValue = cacheMap.get(val)
    if (cacheValue != undefined) {
      return cacheValue
    }
  }
  let newVal
  switch (typeOf(val)) {
    case 'array':
      /*先把对象引用塞到cacheMap中*/
      newVal = []
      cacheMap.set(val, newVal)
      val.forEach((item) => {
        newVal.push(deepcopy(item, cacheMap))
      })
      return newVal
    case 'object':
      /*先把对象引用塞到cacheMap中*/
      newVal = {}
      cacheMap.set(val, newVal)
      Object.keys(val).map((key) => {
        newVal[key] = deepcopy(val[key], cacheMap)
      })
      return newVal
    case 'date':
      const newDate = new Date()
      newDate.setTime(val.getTime())
      cacheMap.set(val, newDate)
      return newDate
    case 'regexp':
      let pattern = val.valueOf()
      let flags = ''
      flags += pattern.global ? 'g' : ''
      flags += pattern.ignoreCase ? 'i' : ''
      flags += pattern.multiline ? 'm' : ''
      newVal = new RegExp(pattern.source, flags)
      cacheMap.set(val, newVal)
      return newVal
    default:
      return val
  }
}
//# sourceMappingURL=deepcopy.js.map
