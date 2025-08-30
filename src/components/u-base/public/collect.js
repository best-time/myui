function copyToBoard(value) {
  const element = document.createElement('textarea')
  document.body.appendChild(element)
  element.value = value
  element.select()
  if (document.execCommand('copy')) {
    document.execCommand('copy')
    document.body.removeChild(element)
    return true
  }
  document.body.removeChild(element)
  return false
}

//如果复制成功返回true
copyToBoard('lalallala')

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

//使用方式
// const fetchData=async()=>{
// await sleep(1000)
// }

function deepCopy(obj) {
  if (typeof obj != 'object') {
    return obj
  }
  if (obj == null) {
    return obj
  }
  return JSON.parse(JSON.stringify(obj))
}
// 复制代码
// 缺陷：只拷贝对象、数组以及对象数组，对于大部分场景已经足够
const person = { name: 'xiaoming', child: { name: 'Jack' } }
deepCopy(person) //new person

function getFormData(object) {
  const formData = new FormData()
  Object.keys(object).forEach((key) => {
    const value = object[key]
    if (Array.isArray(value)) {
      value.forEach((subValue, i) => formData.append(key + `[${i}]`, subValue))
    } else {
      formData.append(key, object[key])
    }
  })
  return formData
}

// 去除对象中value为空(null,undefined,'')的属性
const isFalsy = (value) => (value === 0 ? false : !value)

const isVoid = (value) => value === undefined || value === null || value === ''

const cleanObject = (object) => {
  // Object.assign({}, object)
  if (!object) {
    return {}
  }
  const result = { ...object }
  Object.keys(result).forEach((key) => {
    const value = result[key]
    if (isVoid(value)) {
      delete result[key]
    }
  })
  return result
}

// 在浏览器下载dom内容
/**
 * 浏览器下载静态文件
 * @param {String} name 文件名
 * @param {String} content 文件内容
 */
function downloadFile(name, content) {
  if (typeof name == 'undefined') {
    throw new Error('The first parameter name is a must')
  }
  if (typeof content == 'undefined') {
    throw new Error('The second parameter content is a must')
  }
  if (!(content instanceof Blob)) {
    content = new Blob([content])
  }
  const link = URL.createObjectURL(content)
  download(link, name)
}
//下载一个链接
function download(link, name) {
  if (!name) {
    //如果没有提供名字，从给的Link中截取最后一坨
    name = link.slice(link.lastIndexOf('/') + 1)
  }
  let eleLink = document.createElement('a')
  eleLink.download = name
  eleLink.style.display = 'none'
  eleLink.href = link
  document.body.appendChild(eleLink)
  eleLink.click()
  document.body.removeChild(eleLink)
}

// downloadFile('1.txt','lalalallalalla')
// downloadFile('1.json',JSON.stringify({name:'hahahha'}))

function swap(A, i, j) {
  const t = A[i]
  A[i] = A[j]
  A[j] = t
}

/**
 *
 * @param {*} A  数组
 * @param {*} p  起始下标
 * @param {*} r  结束下标 + 1
 */
function divide(A, p, r) {
  const x = A[r - 1]
  let i = p - 1

  for (let j = p; j < r - 1; j++) {
    if (A[j] <= x) {
      i++
      swap(A, i, j)
    }
  }

  swap(A, i + 1, r - 1)

  return i + 1
}

/**
 *
 * @param {*} A  数组
 * @param {*} p  起始下标
 * @param {*} r  结束下标 + 1
 */
function qsort(A, p = 0, r) {
  r = r || A.length

  if (p < r - 1) {
    const q = divide(A, p, r)
    qsort(A, p, q)
    qsort(A, q + 1, r)
  }

  return A
}
var ar = [15, 12, 3, 2, 7]

qsort(ar)
