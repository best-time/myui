import { getObjKeys } from './base'
const pick = (obj: any, keys: any) =>
  getObjKeys(obj)
    .filter((k) => keys.includes(k))
    .reduce((res, k) => Object.assign(res, { [k]: obj[k] }), {})

// pick({ a: '1', b: '2', c: '3' }, ['a', 'b']);   // returns { a: '1', b: '2' }
export default pick
