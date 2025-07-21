import { typeOf } from './typeOf'

export const deepEqual = (source: any, target: any): boolean => {
  switch (typeOf(source)) {
    case 'number':
      return Number(source) === Number(target)
    case 'string':
      return source == target
    case 'boolean':
    case 'function':
      return source === target
    case 'null':
    case 'undefined':
      return source == target
    case 'array':
      if (typeOf(target) !== 'array') return false
      let len = source.length > target.length ? source.length : target.length
      for (let i = 0; i < len; i++) {
        const item = source[i]
        let targetItem = target[i]
        let flag = deepEqual(item, targetItem)
        if (!flag) return false
      }
      return true
    case 'object':
      if (typeOf(target) !== 'object') return false
      let keys = Array.from(new Set([...Object.keys(source), ...Object.keys(target)]))
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        let flag = deepEqual(source[key], target[key])
        if (!flag) return false
      }
      return true
  }

  return false
}
