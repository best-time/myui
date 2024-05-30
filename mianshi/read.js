// 深度对比两个对象
let a = { a: [], b: 2 };
let b = { a: [], b: {} };

const toStr = Object.prototype.toString;
function isObj(v) {
  return toStr.call(v) === `[object Object]`;
}
function isArray(v) {
  return toStr.call(v) === `[object Array]`;
}

function compare(oldData, newData) {
  if (oldData === newData) return true;
  const arg = Array.prototype.slice.call(arguments);
  if (
    arg.every((obj) => isObj(obj)) &&
    Object.keys(oldData).length === Object.keys(newData).length
  ) { // 参数object
    for (const key in oldData) {
      if (oldData.hasOwnProperty(key) && !compare(oldData[key], newData[key]))
        return false;
    }
  } else if ( // 参数是数组
    arg.every((obj) => isArray(obj)) &&
    oldData.length === newData.length
  ) {
    for (const key in oldData) {
      if (!compare(oldData[key], newData[key])) return false;
    }
  } else {
    return false;
  }
  return true;
}

console.log(compare(a, b));





/*
* api 接口
params 请求参数
fileName 文件名
* */

const downloadFile = (api, params, fileName, type = 'get') => {
  axios({
    method: type,
    url: api,
    responseType: 'blob',
    params: params
  }).then((res) => {
    let str = res.headers['content-disposition']
    if (!res || !str) {
      return
    }
    let suffix = ''
    // 截取文件名和文件类型
    if (str.lastIndexOf('.')) {
      fileName ? '' : fileName = decodeURI(str.substring(str.indexOf('=') + 1, str.lastIndexOf('.')))
      suffix = str.substring(str.lastIndexOf('.'), str.length)
    }
    //  如果支持微软的文件下载方式(ie10+浏览器)
    if (window.navigator.msSaveBlob) {
      try {
        const blobObject = new Blob([res.data]);
        window.navigator.msSaveBlob(blobObject, fileName + suffix);
      } catch (e) {
        console.log(e);
      }
    } else {
      //  其他浏览器
      let url = window.URL.createObjectURL(res.data)
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', fileName + suffix)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(link.href);
    }
  }).catch((err) => {
    console.log(err.message);
  })
}

// downloadFile('/api/download', {id}, '文件名')



export const hideMobile = (mobile) => {
  return mobile.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2")
}

// str 待转换的字符串
// type 1-全大写 2-全小写 3-首字母大写

export const turnCase = (str, type) => {
  switch (type) {
    case 1:
      return str.toUpperCase()
    case 2:
      return str.toLowerCase()
    case 3:
      //return str[0].toUpperCase() + str.substr(1).toLowerCase() // substr 已不推荐使用
      return str[0].toUpperCase() + str.substring(1).toLowerCase()
    default:
      return str
  }
}

export const getSearchParams = () => {
  const searchPar = new URLSearchParams(window.location.search)
  const paramsObj = {}
  for (const [key, value] of searchPar.entries()) {
    paramsObj[key] = value
  }
  return paramsObj
}

export const smoothScroll = element =>{
  document.querySelector(element).scrollIntoView({
    behavior: 'smooth'
  });
};


class MyCache {
  constructor(isLocal = true) {
    this.storage = isLocal ? localStorage : sessionStorage
  }

  setItem(key, value) {
    if (typeof (value) === 'object') value = JSON.stringify(value)
    this.storage.setItem(key, value)
  }

  getItem(key) {
    try {
      return JSON.parse(this.storage.getItem(key))
    } catch (err) {
      return this.storage.getItem(key)
    }
  }

  removeItem(key) {
    this.storage.removeItem(key)
  }

  clear() {
    this.storage.clear()
  }

  key(index) {
    return this.storage.key(index)
  }

  length() {
    return this.storage.length
  }
}



