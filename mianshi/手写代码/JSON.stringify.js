/*
JSON.stringify(value[, replacer [, space]])：


Boolean | Number| String 类型会自动转换成对应的原始值。
undefined、任意函数以及symbol，会被忽略（出现在非数组对象的属性值中时），或者被转换成 null（出现在数组中时）。
不可枚举的属性会被忽略
如果一个对象的属性值通过某种间接的方式指回该对象本身，即循环引用，属性也会被忽略。

 */

function jsonStringify(obj) {
  let type = typeof obj

  if (type !== 'object') {
    if (/string|undefined|function/i.test(type)) {
      obj = `"${obj}"`
    }
    return String(obj)
  }

  let json = []
  let arr = Array.isArray(obj)
  for (let k in obj) {
    let v = obj[k]
    let type = typeof v
    if (/string|undefined|function/i.test(type)) {
      v = `"${v}"`
    } else if (type === 'object') {
      v = jsonStringify(v)
    }
    json.push((arr ? '' : `"${k}": `) + String(v))
  }
  const start = arr ? '[' : '{'
  const end = arr ? ']' : '}'
  return start + json.join(',') + end
}

console.log(jsonStringify({ a: 1 }))
console.log(jsonStringify(1))
console.log(jsonStringify(function A() {}))
console.log(jsonStringify(null))
