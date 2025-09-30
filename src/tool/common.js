import { isFunction } from './ts-base/internal/base.ts'

export const isArray = (a) => Array.isArray(a)
export const isNil = (v) => v === null || v === undefined
export const noop = () => {}
/**
 * list转map
 * [
 *  {value:1,label:'启用’}
 *  {value:2,label:'停用’}
 * ]
 * 转换为
 * {1：启用，2：停用}
 */
const listToMapFnGenerator = (valueKey, textKey) => (list) => {
  const obj = {}
  list.forEach((item) => {
    obj[item[valueKey]] = item[textKey]
  })

  return obj
}
// listToMapFnGenerator('value', 'label')(list)

//
export class ErrorResult extends Error {
  constructor(data) {
    super()
    this.code = data.code
    this.msg = data.msg
  }
}

export const toResult = (p) => {
  return p
    .then((v) => {
      if (v.data.success && v.data.code === 200) {
        return Promise.resolve([null, v.data.data])
      } else {
        return Promise.reject(new ErrorResult(v.data))
      }
    })
    .catch((e) => Promise.resolve([e, null]))
}

// 数组中找item
export const findO = (v, listKey, list) => {
  if (!list) {
    list = listKey || []
    listKey = 'value'
  }
  return list.find((it) => `${it[listKey]}` === `${v}`)
}

// 数组中找index
export const findI = (v, listKey, list) => {
  if (!list) {
    list = listKey || []
    return list.findIndex((it) => `${it}` === `${v}`)
  }
  return list.findIndex((it) => `${it[listKey]}` === `${v}`)
}

const _base = {
  falsy(key) {
    if (isArray(key)) {
      key.forEach((k) => {
        this[k] = false
      })
    } else {
      this[key] = false
    }
    return this
  },
  truy(key) {
    if (isArray(key)) {
      key.forEach((k) => {
        this[k] = true
      })
    } else {
      this[key] = true
    }
    return this
  }
}

export const compose = (...fns) => {
  if (!fns.length) {
    return (arg) => arg
  } else if (fns.length - 1 === 0) {
    return fns[0]
  }
  return fns.reduce((a, b) => {
    return (...args) => {
      console.log(a, b, args, '---')
      return a(b(...args))
    }
  })
}

// function add (a, b=100) {
//   return a + b;
// }
// function xx (a, b = 10) {
//   return a * b;
// }
// let r = compose (add, xx)(1, 3, 4);
// console.log (r);

function compose2(...fns) {
  return function composed(result) {
    // 拷贝一份保存函数的数组
    let list = fns.slice()

    while (list.length > 0) {
      // 将最后一个函数从列表尾部拿出
      // 并执行它
      result = list.pop()(result)
    }

    return result
  }
}

export const composePromise = function (...args) {
  const init = args.pop()
  return function (...arg) {
    return args.reverse().reduce(
      function (sequence, func) {
        return sequence.then(function (result) {
          return func.call(null, result)
        })
      },
      Promise.resolve(init.apply(null, arg))
    )
  }
}

// 删除提交的查询表单空值属性
export const deleteEmptyProps = (form, excludeList) => {
  for (let paramName in form) {
    if (form.hasOwnProperty(paramName)) {
      if (!form[paramName] && (!excludeList || (excludeList && excludeList.indexOf(paramName) < 0))) {
        delete form[paramName]
      }
    }
  }
  return form
}

let isType = (type) => {
  return function (value) {
    return Object.prototype.toString.call(value) === `[object ${type}]`
  }
}

let isObject = isType('Object')
let isArray = isType('Array')

/**
 * map转list
 * {1：启用，2：停用}
 * 转换为
 * [
 *  {value:1,label:'启用’}
 *  {value:2,label:'停用’}
 * ]
 */
export const mapToList = (map, type = 'number', isSort = false) => {
  let list = []
  let keyArr = Object.keys(map).sort((a, b) => a - b)
  keyArr.forEach((key) => {
    list.push({
      value: type === 'number' ? Number(key) : key,
      label: map[key]
    })
  })
  return list
}
/**
 * list转map
 * [
 *  {value:1,label:'启用’}
 *  {value:2,label:'停用’}
 * ]
 * 转换为
 * {1：启用，2：停用}
 */
export const listToMap = (list) => {
  let map = {}
  list.forEach((item) => {
    map[item.value] = item.label
  })
  return map
}

const stripHtml = (html) => new DOMParser().parseFromString(html, 'text/html').body.textContent || ''

// stripHtml('<div>test</div>') // 'test'
// stripHtml('<div>test<i>aaaa</i></div>') // 'testaaaa'

function multiply(a, b) {
  return a * b
}
let double = multiply.bind(null, 2)
// console.log(double(5)); // 10

/**
 * poolLimit: 并发数
 * iterable: 并发迭代数组
 * iteratorFn: 并发执行函数
 */
async function asyncPool(poolLimit, iterable, iteratorFn) {
  //用于保存所有异步请求
  const ret = []
  //用户保存正在进行的请求
  const executing = new Set()
  for (const item of iterable) {
    //构造出请求Promise
    const p = Promise.resolve().then(() => iteratorFn(item, iterable))
    ret.push(p)
    executing.add(p)
    //请求执行结束后从正在进行的数组中移除
    const clean = () => executing.delete(p)
    p.then(clean).catch(clean)
    //如果正在执行的请求数大于并发数，就使用Promise.race等待一个最快执行完的请求
    if (executing.size >= poolLimit) {
      await Promise.race(executing)
    }
  }
  //返回所有结果
  return Promise.all(ret)
}

// 使用方法
const timeout = (i) => new Promise((resolve) => setTimeout(() => resolve(i), i))
asyncPool(2, [1000, 5000, 3000, 2000], timeout).then((results) => {
  console.log(results)
})

/*
Object.getOwnPropertyNames唯一已知的缺点是无法获取以Symbol为名的属性。
而Object.getOwnPropertySymbols 只能获取以Symbol为名的属性。所以这两个方法是相互补充，一拍即合。
 */
function emptyObj(obj) {
  return Object.getOwnPropertyNames(obj).concat(Object.getOwnPropertySymbols(obj)).length
}

const a = Symbol()
const obj1 = { [a]: 1 }
const obj2 = { b: 2 }
const obj3 = {}
Object.defineProperty(obj3, 'a', {
  value: 1,
  enumerable: false
})
const obj4 = {}
// console.log(Reflect.ownKeys(obj1).length === 0)  // false
// console.log(Reflect.ownKeys(obj2).length === 0)  // false
// console.log(Reflect.ownKeys(obj3).length === 0)  // false
// console.log(Reflect.ownKeys(obj4).length === 0) // true

/*
<template v-for="(_val,name)in $slots" #[name]="options">
<slot :name="name" v-bind="options || {}"></slot>
</template>


 */

;(function () {
  // 将内容复制到剪贴板
  const copyToClipboard = (content) => {
    const textarea = document.createElement('textarea')

    textarea.value = content
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('Copy')
    textarea.remove()
  }
})()
;(function () {
  // 使用URLSearchParams获取URL的搜索参数
  const getQueryByName = (name) => {
    const query = new URLSearchParams(location.search)
    return decodeURIComponent(query.get(name))
  }
  // url: https://sunday.com/?name=fatfish&age=100
  const name = getQueryByName('name') // fatfish
  const age = getQueryByName('age') // 100
  const gender = getQueryByName('gender') // null
})()
;(function () {
  // 平滑滚动顶部
  const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop

    if (c > 0) {
      window.requestAnimationFrame(scrollToTop)
      window.scrollTo(0, c - c / 8)
    }
  }
})()
;(function () {
  // 获取滚动距离
  const getScrollPosition = (el = window) => ({
    x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
    y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
  })

  getScrollPosition() // { x: 0, y: 215 }
})()
;(function () {
  const listToMapFnGenerator = (valueKey, textKey) => (list) => {
    const obj = {}
    list.forEach((item) => {
      obj[item[valueKey]] = item[textKey]
    })

    return obj
  }
})()
function callWithCatch(fn, errorHandler = noop) {
  try {
    if (isFunction(fn)) {
      fn()
    }
  } catch (err) {
    errorHandler(err)
  }
}
;(function () {})()
;(function () {})()
;(function () {})()
;(function () {})()
