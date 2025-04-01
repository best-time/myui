function deepCopy(obj) {
  //判断是否是简单数据类型，
  if (typeof obj == 'object') {
    //复杂数据类型
    const result = Array.isArray(obj) ? [] : {}
    for (let i in obj) {
      result[i] = typeof obj[i] == 'object' ? deepCopy(obj[i]) : obj[i]
    }
    return result
  }
  return obj
}

const a = { a: 1, b: 2, c: 3, d: 4 }
const a1 = deepCopy(a)
a.a = 111
console.log(a)
console.log(a1)
