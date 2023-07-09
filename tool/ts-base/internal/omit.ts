import {getObjKeys} from './base';

// omit({a: '1', b: '2', c: '3'}, ['a', 'b']);     // returns { c: '3' }
const omit = (obj: any, keys: any) =>
  getObjKeys(obj)
    .filter((k: any) => !keys.includes(k))
    .reduce((res, k) => Object.assign(res, {[k]: obj[k]}), {});

export default omit;
