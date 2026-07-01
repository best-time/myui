/*
基础类型直接三等比较；
引用类型先判断是否同一引用，相同直接 true；
区分数组、普通对象、null、Date、正则等特殊引用；
递归遍历数组 / 对象每一项，逐层深度对比；
处理循环引用（可选进阶）。
 */

function isEqual(a, b) {
  // 1. 基础类型 / 同一引用直接判断
  if (a === b) {
    // 区分 0 和 -0
    return a !== 0 || 1 / a === 1 / b;
  }

  // 任一为 null / 非对象直接 false
  if (a == null || typeof a !== 'object' || b == null || typeof b !== 'object') {
    return false;
  }

  // 2. 构造函数不同直接不相等
  const aCtor = a.constructor;
  const bCtor = b.constructor;
  if (aCtor !== bCtor) {
    return false
  }

  // 3. Date 对比时间戳
  if (a instanceof Date) {
    return a.getTime() === b.getTime();
  }

  // 4. 正则对比源码与标志位
  if (a instanceof RegExp) {
    const aList = ['source', 'flags', 'global', 'ignoreCase', 'multiline']
    return (
      a.source === b.source &&
      a.flags === b.flags &&
      a.global === b.global &&
      a.ignoreCase === b.ignoreCase &&
      a.multiline === b.multiline
    );
  }

  // 5. 数组对比
  if (Array.isArray(a)) {
    // 长度不一致
    if (a.length !== b.length) {
      return false
    }
    // 递归每一项
    for (let i = 0; i < a.length; i++) {
      if (!isEqual(a[i], b[i])) return false;
    }
    return true;
  }

  // 6. 普通对象对比
  const aKeys = Reflect.ownKeys(a);
  const bKeys = Reflect.ownKeys(b);
  // key 数量不同
  if (aKeys.length !== bKeys.length) {
    return false
  }

  // 遍历所有key递归比较
  for (const key of aKeys) {
    if (!b.hasOwnProperty(key) || !isEqual(a[key], b[key])) {
      return false;
    }
  }

  return true;
}


// ---------------------------

/*
  先判断基础类型与引用地址完全相等的场景，特殊处理 0 和 -0；
  区分 null、基础类型，直接返回 false；
  针对 Date、RegExp 等特殊引用类型单独对比内部值；
  数组先比较长度，再递归每一个元素深度对比；
  普通对象对比全部自有属性 key，逐个递归深度比较值；
  存在循环引用场景时，使用 WeakMap 缓存已对比对象，避免无限递归栈溢出。
 */

function isEqualCycle(a, b, cache = new WeakMap()) {
  if (a === b) {
    return a !== 0 || 1 / a === 1 / b
  }
  if (a == null || typeof a !== 'object' || b == null || typeof b !== 'object') {
    return false
  }

  if (cache.get(a) === b) {
    return true
  }
  cache.set(a, b);

  const aCtor = a.constructor
  const bCtor = b.constructor;
  if (aCtor !== bCtor) {
    return false
  }

  if (a instanceof Date) {
    return a.getTime() === b.getTime()
  }
  if (a instanceof RegExp) {
    return a.source === b.source && a.flags === b.flags
  }

  if (Array.isArray(a)) {
    if (a.length !== b.length) {
      return false
    }
    for (let i = 0; i < a.length; i++) {
      if (!isEqualCycle(a[i], b[i], cache)) {
        return false
      }
    }
    return true;
  }

  const aKeys = Reflect.ownKeys(a);
  const bKeys = Reflect.ownKeys(b);
  if (aKeys.length !== bKeys.length) {
    return false
  }
  for (const k of aKeys) {
    if (!b.hasOwnProperty(k) || !isEqualCycle(a[k], b[k], cache)) {
      return false
    }
  }
  return true;
}

// 循环对象测试
const x = {};
const y = {};
x.self = x;
y.self = y;
// console.log(isEqualCycle(x, y)); // true
console.log(isEqualCycle(null, null)); // true
