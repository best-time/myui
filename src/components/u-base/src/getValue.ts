import { isArray, isPlainObject } from './internal/base'

// let a = { b: { c: { d: 1 } } };
// toV(a, 'a.b.c.d')     // 1
export const toV = (obj: Object, key: String): any => {
  if (!isPlainObject(obj)) return
  let result = obj
  let keys: string[] = key.split('.')
  let len: number = keys.length
  for (let i = 0; i < len; i++) {
    if (result[keys[i]] !== undefined) {
      result = result[keys[i]]
    } else {
      return undefined
    }
  }
  return result
}

// setV({}, 'a.b.c.d', 'xuxi')
export const setV = (obj: Object, key: String | string[], value: any) => {
  if (!isPlainObject(obj)) return

  let result = obj
  let keys: string[] = []
  if (!isArray(key)) {
    keys = (<string>key).split('.')
  } else {
    keys = <string[]>key
  }
  let len: number = keys.length
  for (let i = 0; i < len; i++) {
    let k = keys[i]
    if (!(result[k] instanceof Object)) {
      // throw new Error('is not Object');
      result[k] = {}
    }
    if (len - i === 1) {
      result[k] = value
    } else {
      result = result[k]
    }
  }
  return obj
}

function enhancedArray(arr: any) {
  return new Proxy(arr, {
    get(target, property: any, receiver) {
      const indices = getRange(property) || getIndices(property)
      const values = indices.map((index) => {
        const key = index < 0 ? `${target.length + index}` : index
        return Reflect.get(target, key, receiver)
      })
      return values.length === 1 ? values[0] : values
    }
  })

  function getRange(str: any) {
    let [start, end] = `${str}`.split(':').map(Number)

    if (typeof end === 'undefined') return false

    let range = []
    for (let i = start; i < end; i++) {
      range = range.concat(i)
    }
    return range
  }

  function getIndices(str: any) {
    return `${str}`.split(',').map(Number)
  }
}

/*
const arr = enhancedArray([1, 2, 3, 4, 5]);

console.log(arr[-1]); //=> 5
console.log(arr[[2, 4]]); //=> [ 3, 5 ]
console.log(arr[[2, -2, 1]]); //=> [ 3, 4, 2 ]
console.log(arr["2:4"]); //=> [ 3, 4]
console.log(arr["-2:3"]); //=> [ 4, 5, 1, 2, 3 ]

*/
