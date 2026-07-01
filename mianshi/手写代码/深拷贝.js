
/*
无法拷贝 undefined、Function、Symbol
丢失 Date 变为字符串、RegExp 变成空对象
无法处理循环引用，直接报错
忽略原型链、不可枚举属性
 */
function deepCopySimple(obj) {
  return JSON.parse(JSON.stringify(obj));
}


/*
  1.基础类型判断：null /string/number/boolean 直接返回原值；
  2. 循环引用处理：使用 WeakMap 缓存已拷贝对象，递归前查询，防止栈溢出；
  3. 特殊对象单独处理
    Date：new Date (原日期)
    RegExp：new RegExp (源码、标志位)
    Function：直接返回，无需拷贝
  4.区分数组与普通对象，初始化空容器 []/{}；
  5.通过 Reflect.ownKeys 遍历全部自有属性（包含 Symbol、不可枚举 key）；
  6.递归拷贝每一个属性值，赋值给新对象；
  7.返回全新对象，原对象与拷贝对象引用完全隔离。

 */

function deepClone(target, cache = new WeakMap()) {
  // 1. 基础类型直接返回
  if (target === null || typeof target !== 'object') {
    return target;
  }

  // 2. 处理循环引用
  if (cache.has(target)) {
    return cache.get(target)
  }

  // 3. 区分特殊引用类型
  let cloneTarget;
  // Date
  if (target instanceof Date) {
    cloneTarget = new Date(target);
    cache.set(target, cloneTarget);
    return cloneTarget;
  }
  // 正则
  if (target instanceof RegExp) {
    cloneTarget = new RegExp(target.source, target.flags);
    cache.set(target, cloneTarget);
    return cloneTarget;
  }
  // 函数直接复用（函数无需拷贝）
  if (typeof target === 'function') {
    return target;
  }

  // 4. 数组 / 普通对象
  cloneTarget = Array.isArray(target) ? [] : {};
  // 存入缓存，解决循环引用
  cache.set(target, cloneTarget);

  // 5. 遍历所有自有属性（包含 Symbol key）
  const keys = Reflect.ownKeys(target);
  for (const key of keys) {
    cloneTarget[key] = deepClone(target[key], cache);
  }

  return cloneTarget;
}

/*
可能追问
1. 递归深拷贝和 JSON 方法区别？
JSON 方案只能拷贝纯粹 JSON 数据，丢失函数、日期、正则、Symbol，不支持循环引用；递归手写版可完整处理各类引用类型、循环引用。

2. 为什么用 WeakMap 而不是 Map？
WeakMap 的 key 是弱引用，拷贝完成后无其他引用时对象可被 GC 回收，不会造成内存泄漏；Map 是强引用，会长期占用内存。

3. 函数为什么不拷贝？
函数本身不存在可修改的数据，多个对象共享同一个函数不产生副作用，拷贝无意义。

4. Reflect.ownKeys 和 Object.keys 区别？
Object.keys 仅获取可枚举字符串键；Reflect.ownKeys 包含不可枚举属性、Symbol 类型键，拷贝更完整。
 */



// 测试
// 构造带循环引用、Date、RegExp、Symbol、数组、函数的复杂对象
const origin = {
  num: 123,
  str: 'abc',
  flag: true,
  empty: null,
  dt: new Date('2026-01-01'),
  reg: /test/gi,
  fn: () => console.log('hello'),
  sym: Symbol('demo'),
  list: [1, { inner: 999 }]
};
// 循环引用
origin.self = origin;

const copy = deepClone(origin);

console.log(copy !== origin); // true
console.log(copy.list !== origin.list); // true
console.log(copy.self === copy); // true 循环引用正常
console.log(copy.dt.getTime() === origin.dt.getTime()); // true
console.log(copy.reg.source === origin.reg.source); // true