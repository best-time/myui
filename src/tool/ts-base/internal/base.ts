const toStr = Object.prototype.toString;
const ArrayProto = Array.prototype;
const slice = ArrayProto.slice;
const unDef = void 0;

export const isArray = (p: any): boolean =>
  Array.isArray ? Array.isArray(p) : toStr.call(p) === '[object Array]';
export const isString = (s: any): boolean => typeof s === 'string';
export const isFunction = (p: any): boolean =>
  toStr.call(p) === '[object Function]';

export const isPlainObject = (v: any): boolean => {
  return (
    !!v &&
    typeof v === 'object' &&
    (v.__proto__ === null || v.__proto__ === Object.prototype)
  );
};

export const zeroFill = (v: any) => {
  if (typeof +v !== 'number' || isNaN(+v)) return v;
  return +v < 10 ? `0${+v}` : +v;
};

export const NOOP = () => {};

export const compose = (...fns: any[]) => {
  return (x: any) => fns.reduce((y, f) => f(y), x);
};

export const map = (fn: Function, list: []) => {
  let idx = 0;
  let len = list.length;
  let result = Array(len);
  while (idx < len) {
    result[idx] = fn(list[idx]);
    idx += 1;
  }
  return result;
};

export class ErrorResult extends Error {
  code: any;
  constructor(data: any) {
    super();
    this.code = data.code;
    this.message = data.msg;
  }
}

export const getObjKeys = (o: any) => {
  if (!isPlainObject(o)) return [];
  return Object.keys(o);
};

/**
 *
  var obj = { 'a': [{ 'b': { 'c': 3 } }] };

var result =deepGet(obj, 'a[0].b.c');
console.log(result);
// => 3

result=deepGet(obj, ['a', '0', 'b', 'c']);
console.log(result);
// => 3

result=deepGet(obj, 'a.b.c', 'default');
console.log(result);
// => 'default'
 */
export const deepGet = (object: any, path: [] | string, defaultValue: any) => {
  return (
    (!Array.isArray(path)
      ? path.replace(/\[/g, '.').replace(/\]/g, '').split('.')
      : path
    ).reduce((o, k) => (o || {})[k], object) || defaultValue
  );
};

/*
var object = {
	foo: true,
	bar: false
};

const newObject = filterObject(object, (key, value) => value === true);
//=> {foo: true}
*/
export const filterObj = (object: any, predicate: any) => {
  let result: any = {};
  const isArray = Array.isArray(predicate);
  getObjKeys(object).forEach((key) => {
    let value = object[key];
    if (isArray ? predicate.includes(key) : predicate(key, value, object)) {
      result[key] = value;
    }
  });
  return result;
};

export const existy = (v: any) => {
  return v !== null && v !== unDef;
};

export const not = (func: Function): Function => {
  return function () {
    return !func.apply(null, slice.call(arguments));
  };
};
