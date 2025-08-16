// 深度对比两个对象
let a = { a: [], b: 2 }
let b = { a: [], b: {} }

const toStr = Object.prototype.toString
function isObj(v) {
  return toStr.call(v) === `[object Object]`
}
function isArray(v) {
  return toStr.call(v) === `[object Array]`
}

function compare(oldData, newData) {
  if (oldData === newData) return true
  const arg = Array.prototype.slice.call(arguments)
  if (arg.every((obj) => isObj(obj)) && Object.keys(oldData).length === Object.keys(newData).length) {
    // 参数object
    for (const key in oldData) {
      if (oldData.hasOwnProperty(key) && !compare(oldData[key], newData[key])) return false
    }
  } else if (
    // 参数是数组
    arg.every((obj) => isArray(obj)) &&
    oldData.length === newData.length
  ) {
    for (const key in oldData) {
      if (!compare(oldData[key], newData[key])) return false
    }
  } else {
    return false
  }
  return true
}

console.log(compare(a, b))

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
  })
    .then((res) => {
      let str = res.headers['content-disposition']
      if (!res || !str) {
        return
      }
      let suffix = ''
      // 截取文件名和文件类型
      if (str.lastIndexOf('.')) {
        fileName ? '' : (fileName = decodeURI(str.substring(str.indexOf('=') + 1, str.lastIndexOf('.'))))
        suffix = str.substring(str.lastIndexOf('.'), str.length)
      }
      //  如果支持微软的文件下载方式(ie10+浏览器)
      if (window.navigator.msSaveBlob) {
        try {
          const blobObject = new Blob([res.data])
          window.navigator.msSaveBlob(blobObject, fileName + suffix)
        } catch (e) {
          console.log(e)
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
        window.URL.revokeObjectURL(link.href)
      }
    })
    .catch((err) => {
      console.log(err.message)
    })
}

// downloadFile('/api/download', {id}, '文件名')

export const hideMobile = (mobile) => {
  return mobile.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
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

export const smoothScroll = (element) => {
  document.querySelector(element).scrollIntoView({
    behavior: 'smooth'
  })
}

class MyCache {
  constructor(isLocal = true) {
    this.storage = isLocal ? localStorage : sessionStorage
  }

  setItem(key, value) {
    if (typeof value === 'object') value = JSON.stringify(value)
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

;(function () {
  import { Dimensions } from 'react-native'
  let layoutWidth = Dimensions.get('window').width
  let layoutHeight = Dimensions.get('window').height
  export const setLayoutWidth = (width) => {
    layoutWidth = width
  }
  export const setLayoutHeight = (height) => {
    layoutHeight = height
  }
  export const getLayoutWidth = () => layoutWidth
  export const getLayoutHeight = () => layoutHeight

  export const NOOP = () => {}
  export const NULL = () => null
  export const EMPTY_OBJECT = {}
  export const PURE_EMPTY_OBJECT = Object.create(null)

  // 类型检测
  export const type = {
    isArray(t) {
      return Array.isArray(t)
    },
    isNumber(t) {
      return !Number.isNaN(t) && isFinite(t) && typeof t === 'number'
    },
    isFunction(t) {
      return typeof t === 'function'
    }
  }
  ;['Null', 'Undefined', 'Object', 'String', 'RegExp'].map((item) => {
    type['is' + item] = (expectType) => ({}).toString.call(expectType) === '[object ' + item + ']'
  })
  // []/{} 深度拷贝
  export const extend = (dest, obj) => {
    if ((type.isArray(dest) && type.isArray(obj)) || (type.isObject(dest) && type.isObject(obj))) {
      let keys = Object.keys(obj),
        len = keys.length,
        i = len,
        tmp
      while (--i >= 0) {
        tmp = keys[i]
        if (typeof obj[tmp] === 'object') {
          if (!dest[tmp]) {
            dest[tmp] = type.isArray(obj[tmp]) ? [] : {}
          }
          extend(dest[tmp], obj[tmp])
        } else {
          dest[tmp] = obj[tmp]
        }
      }
      return dest
    }
  }

  // 闰年
  const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0

  // 获取年/月的 总天数
  export const getTotalDays = (year = 0, month = 0) => {
    ;(year = +year), (month = +month)
    if (!(year > 0 && month > 0)) return
    if (month - 2 === 0) {
      if (isLeapYear(year)) return 29
      return 28
    } else {
      if ([1, 3, 5, 7, 8, 10, 12].includes(month)) return 31
      return 30
    }
  }
  // 获取年/月从星期几开始
  export const getDayOfWeekFromYearAndMonth = (year = 0, month = 0) => {
    ;(year = +year), (month = +month)
    if (!(year > 0 && month > 0)) return
    let day = new Date(year, month - 1),
      dayCount = day.getDay()
    return dayCount === 0 ? 7 : dayCount
  }

  // 小于10, 补 '0'
  export const zeroFill = (n = 0) => (+n < 10 ? '0' : '') + +n

  // 'yyyy-mm-dd hh:mm:ss' => { year, month, day, hour, minute, second }
  const dateReg = /^\d{4}(\-|\/)\d{1,2}\1\d{1,2}$/
  export const splitDate = (str = '') => {
    // if(!(dateReg).test(str)) return {}
    str += ''
    let arr = str.split(' '),
      arr1 = arr[0],
      arr2 = arr[1],
      year,
      month,
      day,
      hour,
      minute,
      second

    if (arr1 && arr1.length > 0) {
      let ar = arr1.split('-'),
        s = new Date(+ar[0], +ar[1] - 1, +ar[2])
      ;(year = s.getFullYear()), (month = s.getMonth() + 1), (day = s.getDate())
    }
    if (arr2 && arr2.length > 0) {
      let ar = arr2.split(':')
      ;(hour = ar[0] ? +ar[0] : 0), (minute = ar[1] ? +ar[1] : 0), (second = ar[2] ? +ar[2] : 0)
    }
    return { year, month, day, hour, minute, second }
  }

  // 范围数组
  export const fetchRangeArray = (start, end, isFillZero = true) => {
    end = +end
    let i = +start,
      arr = []
    while (i <= end) {
      arr[arr.length] = isFillZero ? zeroFill(i) : i
      ++i
    }
    return arr
  }

  // yyyy-mm-dd  ( new Date() 1970年之前判断有问题 )
  export const compareDate = (date1, date2) => {
    let { year: year1, month: month1, day: day1 } = splitDate(date1),
      { year: year2, month: month2, day: day2 } = splitDate(date2)
    if (!(year1 && year2)) return
    if (year1 - year2 > 0) {
      return 1
    } else if (year1 - year2 === 0) {
      if (month1 > month2) {
        return 1
      } else if (month1 - month2 === 0) {
        if (day1 - day2 > 0) {
          return 1
        } else if (day1 - day2 === 0) {
          return 0
        } else {
          return -1
        }
      } else {
        return -1
      }
    } else {
      return -1
    }
  }
})()
;(function () {
  let ArrayProto = Array.prototype,
    push = ArrayProto.push,
    slice = ArrayProto.slice

  let ObjProto = Object.prototype,
    toString = ObjProto.toString,
    hasOwnProperty = ObjProto.hasOwnProperty

  const T = () => true
  const F = () => false

  const arrayRepeat = (len = 0, item = []) => new Array(len).fill(item)
  const NOOP = () => {}
  const NULL = () => null
  const EMPTY_OBJECT = {}
  const PURE_EMPTY_OBJECT = Object.create(null)

  function throwError(str = '') {
    throw new Error(str)
  }

  function property(key) {
    return function (obj) {
      return obj == null ? void 0 : obj[key]
    }
  }

  function existy(value) {
    return value != null
  }

  function not(func = NOOP) {
    return function () {
      return !func.apply(null, slice.call(arguments))
    }
  }

  // curry 通俗来讲: 只传递给函数一部分参数来调用它，让它返回一个新函数去处理剩下的参数
  const _curry1 = (fn = NOOP) => {
    return function f1(a) {
      if (arguments.length) {
        return fn.apply(this, arguments)
      } else {
        return f1
      }
    }
  }

  const _curry2 = (fn = NOOP) => {
    return function f2(a, b) {
      switch (arguments.length) {
        case 0:
          return f2
        case 1:
          if (!a) {
            return f2
          } else {
            return _curry1(function (_b) {
              return fn(a, _b)
            })
          }
        default:
          if (!a && !b) {
            return f2
          } else if (!a) {
            return _curry1(function (_a) {
              return fn(_a, b)
            })
          } else if (!b) {
            _curry1(function (_b) {
              return fn(a, _b)
            })
          } else {
            return fn(a, b)
          }
      }
    }
  }

  /**
   *      type({}); //=> "Object"
   *      type(1); //=> "Number"
   *      type(false); //=> "Boolean"
   *      type('s'); //=> "String"
   *      type(null); //=> "Null"
   *      type([]); //=> "Array"
   *      type(/[A-z]/); //=> "RegExp"
   *      type(() => {}); //=> "Function"
   *      type(undefined); //=> "Undefined"
   */
  const type = _curry1(function type(val) {
    return val === null ? 'Null' : val === undefined ? 'Undefined' : toString.call(val).slice(8, -1)
  })

  // String Boolean Number(not NaN)  不为 undefined null
  const _baseEqual = (a, b, force = false) => {
    if (force && type(a) !== type(b)) return false
    if (type(a) === 'Undefined' || type(b) === 'Undefined' || type(a) === 'Null' || type(b) === 'Null') return false
    if (a !== a || b !== b) return false
    return force ? a === b : a === b || a == b
  }

  const _equal = (a, b, force = false) => {
    let r = _baseEqual(a, b, force)
    return r
  }

  return { type, baseEqual: _baseEqual, equal: _equal }
})()(function () {
  import React, { Component, memo } from 'react'
  import {
    AsyncStorage,
    PermissionsAndroid,
    View,
    Image,
    Text,
    Clipboard,
    NativeModules,
    Platform,
    Keyboard,
    Dimensions,
    DeviceEventEmitter
  } from 'react-native'
  import { Actions, ActionConst } from 'fs-router'
  import { FsToast, FsLoading, FsModal } from 'fs-mobile-components'
  import DeviceInfo from 'react-native-device-info'
  import uuidv4 from 'uuid/v4'
  import { host, versionNo } from './configuration'
  import set5AGPoint from '../services/buryPointService'
  import FsMd from 'fs-md'
  this.Geolocation = require('Geolocation')

  const deviceWidth = Dimensions.get('window').width // 设备的宽度
  const deviceHeight = Dimensions.get('window').height // 设备的高度
  export const deviceId = DeviceInfo.getUniqueID()
  export const deviceModelNo = DeviceInfo.getModel()
  export const deviceName = DeviceInfo.getManufacturer()

  export const isIOS = Platform.OS === 'ios'
  export const isANDROID = Platform.OS === 'android'
  // loading 图片
  const loadingImage = [require('../images/commonIcons/loading.gif')]
  // loading view
  const renderLoadingView = ({ width = 40, height = 40 } = {}) => {
    return <Image source={loadingImage[0]} style={{ width: width, height: height, marginTop: 10 }} />
  }
  const renderLoadingText = () => {
    return (
      <Text allowFontScaling={false} adjustsFontSizeToFit={false}>
        加载中...
      </Text>
    )
  }
  // export const loadingImg = renderLoadingView()
  export const loadingImg = renderLoadingText()
  export const FsLoadingIcon = {
    show({
      preventPress = true,
      loadingType = 1,
      width,
      height,
      loadingView = renderLoadingView({ width, height })
    } = {}) {
      FsLoading.show({ preventPress, loadingType, loadingView })
    }
  }

  let _curry1 = (fn) => {
    return function f1(a) {
      if (arguments.length) {
        return fn.apply(this, arguments)
      } else {
        return f1
      }
    }
  }

  let _curry2 = (fn) => {
    return function f2(a, b) {
      switch (arguments.length) {
        case 0:
          return f2
        case 1:
          if (!a) {
            return f2
          } else {
            return _curry1(function (_b) {
              return fn(a, _b)
            })
          }
        default:
          if (!a && !b) {
            return f2
          } else if (!a) {
            return _curry1(function (_a) {
              return fn(_a, b)
            })
          } else if (!b) {
            _curry1(function (_b) {
              return fn(a, _b)
            })
          } else {
            return fn(a, b)
          }
      }
    }
  }

  export const normalSort = (a, b) => {
    return a.charCodeAt() - b.charCodeAt()
  }

  export const getTime = (time) => {
    time = time.replace(/-/g, ':').replace(' ', ':')
    time = time.split(':')
    return new Date(time[0], time[1] - 1, time[2], time[3], time[4], time[5]).getTime()
  }
  export const getNowDate = (split = '') => {
    let date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth() + 1,
      d = date.getDate()
    return '' + y + split + (m < 10 ? '0' + m : m) + split + (d < 10 ? '0' + d : d)
  }
  export const getItem = (key) =>
    AsyncStorage.getItem(key, (err, value) => {
      return JSON.parse(value)
    })
  export const formatDateTime = (time, type) => {
    const date = new Date(time)
    let y = date.getFullYear()
    let m = date.getMonth() + 1
    m = m < 10 ? '0' + m : m
    let d = date.getDate()
    d = d < 10 ? '0' + d : d
    if (type && type === 'time') {
      let h = date.getHours()
      h = h < 10 ? '0' + h : h
      let minute = date.getMinutes()
      let second = date.getSeconds()
      minute = minute < 10 ? '0' + minute : minute
      second = second < 10 ? '0' + second : second
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
    } else {
      return y + '-' + m + '-' + d
    }
  }

  export const getYearMonthDay = () => {
    let date = formatDateTime(new Date().getTime()),
      dateArr = date.split('-')
    if (dateArr && dateArr.length) {
      return { year: dateArr[0], month: dateArr[1], day: dateArr[2] }
    }
    return null
  }

  export const tomorrowDate = () => {
    const date = new Date()
    let year = date.getFullYear(),
      m = date.getMonth() + 1,
      d = date.getDate()
    let month = m < 10 ? '0' + m : m
    // let day = d < 10 ? ('0' + d) : d;
    if (d - getTotalDays(year, m) === 0) {
      let m1 = m + 1
      let month1 = m1 < 10 ? '0' + m1 : m1
      return year + '-' + month1 + '-01'
    } else {
      let d1 = d + 1
      let day1 = d1 < 10 ? '0' + d1 : d1
      return year + '-' + month + '-' + day1
    }
  }

  // 日期转成时间戳
  export const formatDateToTimestamp = (date = '') => {
    let d = (date + '').replace(/-/gim, '/')
    return +new Date(d)
  }

  export const emojiTrim = (s = '') => {
    let emojiReg =
      /(?:\u{1F3F4}(?:\u{E0067}\u{E0062}(?:\u{E0065}\u{E006E}\u{E0067}|\u{E0077}\u{E006C}\u{E0073}|\u{E0073}\u{E0063}\u{E0074})\u{E007F}|\u200D\u2620\uFE0F)|\u{1F469}\u200D\u{1F469}\u200D(?:\u{1F466}\u200D\u{1F466}|\u{1F467}\u200D[\u{1F466}\u{1F467}])|\u{1F468}(?:\u200D(?:\u2764\uFE0F\u200D(?:\u{1F48B}\u200D)?\u{1F468}|[\u{1F468}\u{1F469}]\u200D(?:\u{1F466}\u200D\u{1F466}|\u{1F467}\u200D[\u{1F466}\u{1F467}])|\u{1F466}\u200D\u{1F466}|\u{1F467}\u200D[\u{1F466}\u{1F467}]|[\u{1F33E}\u{1F373}\u{1F393}\u{1F3A4}\u{1F3A8}\u{1F3EB}\u{1F3ED}\u{1F4BB}\u{1F4BC}\u{1F527}\u{1F52C}\u{1F680}\u{1F692}\u{1F9B0}-\u{1F9B3}])|[\u{1F3FB}-\u{1F3FF}]\u200D[\u{1F33E}\u{1F373}\u{1F393}\u{1F3A4}\u{1F3A8}\u{1F3EB}\u{1F3ED}\u{1F4BB}\u{1F4BC}\u{1F527}\u{1F52C}\u{1F680}\u{1F692}\u{1F9B0}-\u{1F9B3}])|\u{1F469}\u200D(?:\u2764\uFE0F\u200D(?:\u{1F48B}\u200D[\u{1F468}\u{1F469}]|[\u{1F468}\u{1F469}])|[\u{1F33E}\u{1F373}\u{1F393}\u{1F3A4}\u{1F3A8}\u{1F3EB}\u{1F3ED}\u{1F4BB}\u{1F4BC}\u{1F527}\u{1F52C}\u{1F680}\u{1F692}\u{1F9B0}-\u{1F9B3}])|\u{1F469}\u200D\u{1F466}\u200D\u{1F466}|(?:\u{1F441}\uFE0F\u200D\u{1F5E8}|\u{1F469}[\u{1F3FB}-\u{1F3FF}]\u200D[\u2695\u2696\u2708]|\u{1F468}(?:[\u{1F3FB}-\u{1F3FF}]\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:[\u26F9\u{1F3CB}\u{1F3CC}\u{1F575}]\uFE0F|[\u{1F46F}\u{1F93C}\u{1F9DE}\u{1F9DF}])\u200D[\u2640\u2642]|[\u26F9\u{1F3CB}\u{1F3CC}\u{1F575}][\u{1F3FB}-\u{1F3FF}]\u200D[\u2640\u2642]|[\u{1F3C3}\u{1F3C4}\u{1F3CA}\u{1F46E}\u{1F471}\u{1F473}\u{1F477}\u{1F481}\u{1F482}\u{1F486}\u{1F487}\u{1F645}-\u{1F647}\u{1F64B}\u{1F64D}\u{1F64E}\u{1F6A3}\u{1F6B4}-\u{1F6B6}\u{1F926}\u{1F937}-\u{1F939}\u{1F93D}\u{1F93E}\u{1F9B8}\u{1F9B9}\u{1F9D6}-\u{1F9DD}](?:[\u{1F3FB}-\u{1F3FF}]\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\u{1F469}\u200D[\u2695\u2696\u2708])\uFE0F|\u{1F469}\u200D\u{1F467}\u200D[\u{1F466}\u{1F467}]|\u{1F469}\u200D\u{1F469}\u200D[\u{1F466}\u{1F467}]|\u{1F468}(?:\u200D(?:[\u{1F468}\u{1F469}]\u200D[\u{1F466}\u{1F467}]|[\u{1F466}\u{1F467}])|[\u{1F3FB}-\u{1F3FF}])|\u{1F3F3}\uFE0F\u200D\u{1F308}|\u{1F469}\u200D\u{1F467}|\u{1F469}[\u{1F3FB}-\u{1F3FF}]\u200D[\u{1F33E}\u{1F373}\u{1F393}\u{1F3A4}\u{1F3A8}\u{1F3EB}\u{1F3ED}\u{1F4BB}\u{1F4BC}\u{1F527}\u{1F52C}\u{1F680}\u{1F692}\u{1F9B0}-\u{1F9B3}]|\u{1F469}\u200D\u{1F466}|\u{1F1F6}\u{1F1E6}|\u{1F1FD}\u{1F1F0}|\u{1F1F4}\u{1F1F2}|\u{1F469}[\u{1F3FB}-\u{1F3FF}]|\u{1F1ED}[\u{1F1F0}\u{1F1F2}\u{1F1F3}\u{1F1F7}\u{1F1F9}\u{1F1FA}]|\u{1F1EC}[\u{1F1E6}\u{1F1E7}\u{1F1E9}-\u{1F1EE}\u{1F1F1}-\u{1F1F3}\u{1F1F5}-\u{1F1FA}\u{1F1FC}\u{1F1FE}]|\u{1F1EA}[\u{1F1E6}\u{1F1E8}\u{1F1EA}\u{1F1EC}\u{1F1ED}\u{1F1F7}-\u{1F1FA}]|\u{1F1E8}[\u{1F1E6}\u{1F1E8}\u{1F1E9}\u{1F1EB}-\u{1F1EE}\u{1F1F0}-\u{1F1F5}\u{1F1F7}\u{1F1FA}-\u{1F1FF}]|\u{1F1F2}[\u{1F1E6}\u{1F1E8}-\u{1F1ED}\u{1F1F0}-\u{1F1FF}]|\u{1F1F3}[\u{1F1E6}\u{1F1E8}\u{1F1EA}-\u{1F1EC}\u{1F1EE}\u{1F1F1}\u{1F1F4}\u{1F1F5}\u{1F1F7}\u{1F1FA}\u{1F1FF}]|\u{1F1FC}[\u{1F1EB}\u{1F1F8}]|\u{1F1FA}[\u{1F1E6}\u{1F1EC}\u{1F1F2}\u{1F1F3}\u{1F1F8}\u{1F1FE}\u{1F1FF}]|\u{1F1F0}[\u{1F1EA}\u{1F1EC}-\u{1F1EE}\u{1F1F2}\u{1F1F3}\u{1F1F5}\u{1F1F7}\u{1F1FC}\u{1F1FE}\u{1F1FF}]|\u{1F1EF}[\u{1F1EA}\u{1F1F2}\u{1F1F4}\u{1F1F5}]|\u{1F1F8}[\u{1F1E6}-\u{1F1EA}\u{1F1EC}-\u{1F1F4}\u{1F1F7}-\u{1F1F9}\u{1F1FB}\u{1F1FD}-\u{1F1FF}]|\u{1F1EE}[\u{1F1E8}-\u{1F1EA}\u{1F1F1}-\u{1F1F4}\u{1F1F6}-\u{1F1F9}]|\u{1F1FF}[\u{1F1E6}\u{1F1F2}\u{1F1FC}]|\u{1F1EB}[\u{1F1EE}-\u{1F1F0}\u{1F1F2}\u{1F1F4}\u{1F1F7}]|\u{1F1F5}[\u{1F1E6}\u{1F1EA}-\u{1F1ED}\u{1F1F0}-\u{1F1F3}\u{1F1F7}-\u{1F1F9}\u{1F1FC}\u{1F1FE}]|\u{1F1E9}[\u{1F1EA}\u{1F1EC}\u{1F1EF}\u{1F1F0}\u{1F1F2}\u{1F1F4}\u{1F1FF}]|\u{1F1F9}[\u{1F1E6}\u{1F1E8}\u{1F1E9}\u{1F1EB}-\u{1F1ED}\u{1F1EF}-\u{1F1F4}\u{1F1F7}\u{1F1F9}\u{1F1FB}\u{1F1FC}\u{1F1FF}]|\u{1F1E7}[\u{1F1E6}\u{1F1E7}\u{1F1E9}-\u{1F1EF}\u{1F1F1}-\u{1F1F4}\u{1F1F6}-\u{1F1F9}\u{1F1FB}\u{1F1FC}\u{1F1FE}\u{1F1FF}]|[#\*0-9]\uFE0F\u20E3|\u{1F1F1}[\u{1F1E6}-\u{1F1E8}\u{1F1EE}\u{1F1F0}\u{1F1F7}-\u{1F1FB}\u{1F1FE}]|\u{1F1E6}[\u{1F1E8}-\u{1F1EC}\u{1F1EE}\u{1F1F1}\u{1F1F2}\u{1F1F4}\u{1F1F6}-\u{1F1FA}\u{1F1FC}\u{1F1FD}\u{1F1FF}]|\u{1F1F7}[\u{1F1EA}\u{1F1F4}\u{1F1F8}\u{1F1FA}\u{1F1FC}]|\u{1F1FB}[\u{1F1E6}\u{1F1E8}\u{1F1EA}\u{1F1EC}\u{1F1EE}\u{1F1F3}\u{1F1FA}]|\u{1F1FE}[\u{1F1EA}\u{1F1F9}]|[\u{1F3C3}\u{1F3C4}\u{1F3CA}\u{1F46E}\u{1F471}\u{1F473}\u{1F477}\u{1F481}\u{1F482}\u{1F486}\u{1F487}\u{1F645}-\u{1F647}\u{1F64B}\u{1F64D}\u{1F64E}\u{1F6A3}\u{1F6B4}-\u{1F6B6}\u{1F926}\u{1F937}-\u{1F939}\u{1F93D}\u{1F93E}\u{1F9B8}\u{1F9B9}\u{1F9D6}-\u{1F9DD}][\u{1F3FB}-\u{1F3FF}]|[\u26F9\u{1F3CB}\u{1F3CC}\u{1F575}][\u{1F3FB}-\u{1F3FF}]|[\u261D\u270A-\u270D\u{1F385}\u{1F3C2}\u{1F3C7}\u{1F442}\u{1F443}\u{1F446}-\u{1F450}\u{1F466}\u{1F467}\u{1F470}\u{1F472}\u{1F474}-\u{1F476}\u{1F478}\u{1F47C}\u{1F483}\u{1F485}\u{1F4AA}\u{1F574}\u{1F57A}\u{1F590}\u{1F595}\u{1F596}\u{1F64C}\u{1F64F}\u{1F6C0}\u{1F6CC}\u{1F918}-\u{1F91C}\u{1F91E}\u{1F91F}\u{1F930}-\u{1F936}\u{1F9B5}\u{1F9B6}\u{1F9D1}-\u{1F9D5}][\u{1F3FB}-\u{1F3FF}]|[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55\u{1F004}\u{1F0CF}\u{1F18E}\u{1F191}-\u{1F19A}\u{1F1E6}-\u{1F1FF}\u{1F201}\u{1F21A}\u{1F22F}\u{1F232}-\u{1F236}\u{1F238}-\u{1F23A}\u{1F250}\u{1F251}\u{1F300}-\u{1F320}\u{1F32D}-\u{1F335}\u{1F337}-\u{1F37C}\u{1F37E}-\u{1F393}\u{1F3A0}-\u{1F3CA}\u{1F3CF}-\u{1F3D3}\u{1F3E0}-\u{1F3F0}\u{1F3F4}\u{1F3F8}-\u{1F43E}\u{1F440}\u{1F442}-\u{1F4FC}\u{1F4FF}-\u{1F53D}\u{1F54B}-\u{1F54E}\u{1F550}-\u{1F567}\u{1F57A}\u{1F595}\u{1F596}\u{1F5A4}\u{1F5FB}-\u{1F64F}\u{1F680}-\u{1F6C5}\u{1F6CC}\u{1F6D0}-\u{1F6D2}\u{1F6EB}\u{1F6EC}\u{1F6F4}-\u{1F6F9}\u{1F910}-\u{1F93A}\u{1F93C}-\u{1F93E}\u{1F940}-\u{1F945}\u{1F947}-\u{1F970}\u{1F973}-\u{1F976}\u{1F97A}\u{1F97C}-\u{1F9A2}\u{1F9B0}-\u{1F9B9}\u{1F9C0}-\u{1F9C2}\u{1F9D0}-\u{1F9FF}]|[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299\u{1F004}\u{1F0CF}\u{1F170}\u{1F171}\u{1F17E}\u{1F17F}\u{1F18E}\u{1F191}-\u{1F19A}\u{1F1E6}-\u{1F1FF}\u{1F201}\u{1F202}\u{1F21A}\u{1F22F}\u{1F232}-\u{1F23A}\u{1F250}\u{1F251}\u{1F300}-\u{1F321}\u{1F324}-\u{1F393}\u{1F396}\u{1F397}\u{1F399}-\u{1F39B}\u{1F39E}-\u{1F3F0}\u{1F3F3}-\u{1F3F5}\u{1F3F7}-\u{1F4FD}\u{1F4FF}-\u{1F53D}\u{1F549}-\u{1F54E}\u{1F550}-\u{1F567}\u{1F56F}\u{1F570}\u{1F573}-\u{1F57A}\u{1F587}\u{1F58A}-\u{1F58D}\u{1F590}\u{1F595}\u{1F596}\u{1F5A4}\u{1F5A5}\u{1F5A8}\u{1F5B1}\u{1F5B2}\u{1F5BC}\u{1F5C2}-\u{1F5C4}\u{1F5D1}-\u{1F5D3}\u{1F5DC}-\u{1F5DE}\u{1F5E1}\u{1F5E3}\u{1F5E8}\u{1F5EF}\u{1F5F3}\u{1F5FA}-\u{1F64F}\u{1F680}-\u{1F6C5}\u{1F6CB}-\u{1F6D2}\u{1F6E0}-\u{1F6E5}\u{1F6E9}\u{1F6EB}\u{1F6EC}\u{1F6F0}\u{1F6F3}-\u{1F6F9}\u{1F910}-\u{1F93A}\u{1F93C}-\u{1F93E}\u{1F940}-\u{1F945}\u{1F947}-\u{1F970}\u{1F973}-\u{1F976}\u{1F97A}\u{1F97C}-\u{1F9A2}\u{1F9B0}-\u{1F9B9}\u{1F9C0}-\u{1F9C2}\u{1F9D0}-\u{1F9FF}]\uFE0F|[\u261D\u26F9\u270A-\u270D\u{1F385}\u{1F3C2}-\u{1F3C4}\u{1F3C7}\u{1F3CA}-\u{1F3CC}\u{1F442}\u{1F443}\u{1F446}-\u{1F450}\u{1F466}-\u{1F469}\u{1F46E}\u{1F470}-\u{1F478}\u{1F47C}\u{1F481}-\u{1F483}\u{1F485}-\u{1F487}\u{1F4AA}\u{1F574}\u{1F575}\u{1F57A}\u{1F590}\u{1F595}\u{1F596}\u{1F645}-\u{1F647}\u{1F64B}-\u{1F64F}\u{1F6A3}\u{1F6B4}-\u{1F6B6}\u{1F6C0}\u{1F6CC}\u{1F918}-\u{1F91C}\u{1F91E}\u{1F91F}\u{1F926}\u{1F930}-\u{1F939}\u{1F93D}\u{1F93E}\u{1F9B5}\u{1F9B6}\u{1F9B8}\u{1F9B9}\u{1F9D1}-\u{1F9DD}]|\u{200D})+/gu
    return s.replace(emojiReg, '')
  }
  //校验所输入的值是否为 数字 英文 汉字 常用符号包括空格和空
  export const checkInput = (e) => {
    const patrnAlphabetic =
      /^[0-9a-zA-Z\u4e00-\u9fa5 `~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、\n]+$/
    if (patrnAlphabetic.test(e) || e === '') {
      return true
    }
    return false
  }

  export const blankAndBrTrim = (s = '') => {
    return s.replace(/(\r\n)|(\n)/g, '')
  }

  export const checkFsPassword = (param) => {
    return /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,15}$/.test(param)
  }
  export const checkTelephone = (param) => {
    return /^((((13[0-9])|(14[5-8])|(15[0-3,5-9])|(166)|(17[0-4,5-8])|(18[0-9])|(19[0-9])|(147))\d{8})|((0\d{2,3}\d{7,8})))$/.test(
      param
    )
  }
  export const getWeekday = (params) => {
    const arys1 = params.split('-') //日期为输入日期，格式为 2013-3-10
    const ssdate = new Date(arys1[0], parseInt(arys1[1] - 1), arys1[2])
    const week1 = String(ssdate.getDay())
      .replace('0', '日')
      .replace('1', '一')
      .replace('2', '二')
      .replace('3', '三')
      .replace('4', '四')
      .replace('5', '五')
      .replace('6', '六') //就是你要的星期几
    return '星期' + week1
  }
  export const getDeptInfo = (params) => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('loginInfo', (err, stores) => {
        if (JSON.parse(stores)) {
          if (params === 'dept') {
            resolve(JSON.parse(stores).erpDept.find((value) => value.isPrimay === 'P'))
          } else if (params === 'erpPersonId') {
            resolve(JSON.parse(stores).erpPersonId)
          } else {
            resolve(JSON.parse(stores))
          }
        } else {
          Actions.login({ type: ActionConst.POP_TO })
        }
      })
    })
  }

  export const reviewImage = (index, urlArr) => {
    let param = { index, datas: urlArr, hideDownButton: 1, hideBackButton: 1 } //hideDownButton:1 隐藏下载按钮   hideBackButton:1 隐藏返回按钮
    if (isANDROID) {
      NativeModules.UtilsModule.reviewPhotoManager(JSON.stringify(param))
    } else if (isIOS) {
      NativeModules.UtilsModule.reviewPhotoManager(param)
    }
  }

  export const newLine = (str = '') => (str + '').replace(/(\n|\\n)/gim, '\n')

  export const ts = () => new Date().getTime()

  export const dismiss = () => {
    Keyboard && Keyboard.dismiss()
  }

  export async function requestPermission() {
    try {
      const checked = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(
        (result) => log('result', result)
      )
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
        title: '申请定位权限',
        message: '一个很牛逼的应用想借用你的 GPS，' + '然后你就可以不用选择地区了。'
      })
      log('granted', granted)
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        log('现在你获得摄像头权限了')
      } else {
        log('用户并不屌你')
      }
    } catch (err) {
      console.warn(err)
    }
  }
  export const getStringLength = (str) => {
    str += ''
    let len = str.length,
      i = len,
      sum = 0
    while (--i > -1) {
      sum += (str.charCodeAt(i) & 0xff00) !== 0 ? 2 : 1
    }
    return sum
  }

  export const twoDecimal = (n = 0) => (Math.round(n * 100) / 100).toFixed(2)

  const strategies = {
    isNonEmpty(value, errorMsg) {
      return value === '' ? errorMsg : void 0
    },
    maxLength(value, maxLen, errorMsg) {
      return value.length > maxLen ? '长度限制为' + maxLen : void 0
    },
    isTelephone: (param, errorMsg) => {
      return checkTelephone(param) ? '' : errorMsg
    }
  }

  export const getQueryString = (str = '', name = '') => {
    let i = str.indexOf('?')
    if (i > -1) {
      let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      str = str.slice(i + 1)
      let r = str.match(reg) //search,查询？后面的参数，并匹配正则
      if (r != null) return unescape(r[2])
      return null
    }
    return null
  }

  export const getUrlParams = (p) => {
    let url = p + '',
      idx = url.indexOf('?'),
      r = {}
    if (idx > -1) {
      let str = url.substr(idx + 1),
        strs = str.split('&')
      for (let i = 0; i < strs.length; i++) {
        r[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
      }
      return r
    }
    return null
  }

  // 校验Textinput收集器
  export const validator = {
    cache: [],
    add(value, rules) {
      let val = value
      for (let rule of rules) {
        let strategyAry = rule.strategy.split(':'),
          len = strategyAry.length,
          errorMsg = rule.errorMsg || ''
        this.cache[this.cache.length] = () => {
          if (len > 1) {
            return strategies[strategyAry[0]](val, +strategyAry[1], errorMsg)
          } else {
            return strategies[strategyAry[0]](val, errorMsg)
          }
        }
      }
      return this
    },
    start() {
      if (this.cache.length === 0) return
      let errorMsg = ''
      for (let validatorFunc of this.cache) {
        errorMsg = validatorFunc()
        if (errorMsg) {
          this.cache = []
          return errorMsg
        }
      }
    }
  }

  let gestureBack = true
  export const setGestureBack = (r = false) => {
    gestureBack = r
  }
  export const getGestureBack = () => gestureBack

  export const arrayRepeat = (len = 0, item) => new Array(len).fill(item)
  export const NOOP = () => {}
  export const NULL = () => null
  export const EMPTY_OBJECT = {}
  export const PURE_EMPTY_OBJECT = Object.create(null)
  export const WATER_MARK_SHOW = true

  /**
   * 全局倒计时
   */
  export const countDown = ({ countDownTime = 60, method }) => {
    let timer
    timer = setInterval(() => {
      if (countDownTime === 0) {
        clearInterval(timer)
        method && method(countDownTime)
      } else {
        countDownTime--
        method && method(countDownTime)
      }
    }, 1000)
  }
  export const clearCountDown = () => {
    clearInterval(timer)
  }
  // 类型检测
  export const type = {}
  ;['Null', 'Undefined', 'Object', 'Array', 'String', 'Number', 'Boolean', 'Function', 'RegExp'].forEach((item) => {
    type['is' + item] = (expectType) => EMPTY_OBJECT.toString.call(expectType) === '[object ' + item + ']'
  })

  // []/{} 深度拷贝
  export const extend = (dest, obj) => {
    if ((type.isArray(dest) && type.isArray(obj)) || (type.isObject(dest) && type.isObject(obj))) {
      let keys = Object.keys(obj),
        len = keys.length,
        i = len,
        tmp
      while (--i >= 0) {
        tmp = keys[i]
        if (typeof obj[tmp] === 'object') {
          if (!dest[tmp]) {
            dest[tmp] = type.isArray(obj[tmp]) ? [] : obj[tmp] === null ? null : {}
          }
          extend(dest[tmp], obj[tmp])
        } else {
          dest[tmp] = obj[tmp]
        }
      }
      return dest
    }
  }

  let tabIndex = 1
  export const setTabIndex = (n) => {
    tabIndex = n
  }
  export const getTabIndex = () => tabIndex

  // 数组对象去重
  export const filterDuplication = (arr, key) => {
    let obj = {}
    let res = arr.reduce((item, next) => {
      let k = next[key]
      obj[k] ? '' : (obj[k] = true && item.push(next))
      return item
    }, [])
    return [...res]
  }

  export const trimSpecialCharacter = (str = '') => {
    str += ''
    return str.replace(/\s+/gi, '')
  }

  export const tips = (
    msg = '',
    tms = 2000,
    position = 'center',
    positionValue = 120,
    delayAfterFunc = NOOP,
    contentStyle = {},
    textStyle = {}
  ) => {
    if (msg) {
      FsToast.showString(msg, tms, position, positionValue, delayAfterFunc, contentStyle, textStyle)
    }
    return false
  }

  //金额小数点校验
  export const clearNoNum = (value) => {
    value = value.replace(/[^\d.]/g, '') //清除“数字”和“.”以外的字符
    value = value.replace(/\.{2,}/g, '.') //只保留第一个. 清除多余的
    value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
    value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3') //只能输入两个小数
    if (value.indexOf('.') < 0 && value != '') {
      //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
      value = parseFloat(value)
    }
    return value
  }

  export const hasRouter = (rName = '') => {
    // rName 路由名
    rName += ''
    if (rName) {
      return Actions.state.routes.find((v) => v.routeName === rName)
    }
    return false
  }

  export const removeRouter = (rName = '') => {
    rName += ''
    rName && Actions.state.removeRoute(rName)
  }

  export const routesList = () => {
    return Actions.state.routes
  }

  export const IMLogout = (param) => {
    param = { ...param, uuid: uuidv4() }
    NativeModules.IMModule && NativeModules.IMModule.logout && NativeModules.IMModule.logout(JSON.stringify(param))
  }

  //埋点
  //埋点类型一路由进入
  export const enterRouter = ({ eventId = '', params = {} }) => {
    set5AGPoint({
      eventId: 'enterRouter',
      params: { routeName: params.routeName, routeCode: params.routeCode }
    })

    AsyncStorage.getItem('username').then((value) => {
      params = { ...params, username: value }
      if (isIOS) {
        NativeModules.UtilsModule.trackCustomKeyValueEventBeginWithJSON({
          event_id: eventId,
          jsonStr: { ...params }
        })
      } else {
        NativeModules.UtilsModule.trackCustomKeyValueEventBeginWithJSON(eventId, JSON.stringify(params))
      }
    })
  }

  //埋点类型二路由退出
  // export const exitRouter = (routeName) => {
  export const exitRouter = ({ eventId = '', params = {} }) => {
    set5AGPoint({
      eventId: 'exitRouter',
      params: { routeName: params.routeName }
    })

    AsyncStorage.getItem('username').then((value) => {
      params = { ...params, username: value }
      if (isIOS) {
        NativeModules.UtilsModule.trackCustomKeyValueEventEndWithJSON({
          event_id: eventId,
          jsonStr: { ...params }
        })
      } else {
        NativeModules.UtilsModule.trackCustomKeyValueEventEndWithJSON(eventId, JSON.stringify(params))
      }
    })
  }

  //埋点类型三参数传递
  export const paramsDelivery = ({ eventId = '', params = {}, username = '' }) => {
    set5AGPoint({ eventId, params })
    if (username) {
      let value = username
      if (isIOS) {
        NativeModules.UtilsModule.trackCustomKeyValueEventWithJSON({
          event_id: eventId,
          jsonStr: { ...params, username: value }
        })
      } else {
        NativeModules.UtilsModule.trackCustomKeyValueEventWithJSON(
          eventId,
          JSON.stringify({ ...params, username: value })
        )
      }
    } else {
      AsyncStorage.getItem('username').then((value) => {
        if (isIOS) {
          NativeModules.UtilsModule.trackCustomKeyValueEventWithJSON({
            event_id: eventId,
            jsonStr: { ...params, username: value }
          })
        } else {
          NativeModules.UtilsModule.trackCustomKeyValueEventWithJSON(
            eventId,
            JSON.stringify({ ...params, username: value })
          )
        }
      })
    }
  }

  // 复制内容到剪切板
  export const _setClipboardContent = async (str) => {
    str += ''
    Clipboard.setString(str)
    try {
      let content = await Clipboard.getString()
      FsToast.showString('复制成功', 2000, 'center')
    } catch (e) {
      FsToast.showString('复制失败，请重试', 2000, 'center')
      log(e.message)
    }
  }

  const firstWordUpperCase = (str = '') => {
    return str.replace(/(\s|^)[a-z]/g, (char) => {
      return char.toUpperCase()
    })
  }

  export const setState = (t, arr = []) => {
    let r = {}
    if (arr.length > 0) {
      arr.map((it) => {
        if (type.isString(it)) {
          r['set' + firstWordUpperCase(it)] = (v) => {
            t.setState && t.setState({ [`${it}`]: v })
          }
        } else if (type.isObject(it)) {
          let k = Object.keys(it)
          k.map((kk) => {
            t[kk] = it[kk]
          })
        }
      })
    }
    return r
  }

  export const assign = (t, arr = []) => {
    Object.assign(t, setState(t, arr))
  }

  export const isIphoneX = () => {
    return isIOS && !Platform.isPad && !Platform.isTVOS && (deviceHeight === 812 || deviceWidth === 812)
  }

  export const callPhone = (phone) => {
    phone && NativeModules.UtilsModule.callPhone(phone)
  }

  // 闰年
  const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0

  // 获取年/月的 总天数
  export const getTotalDays = (year = 0, month = 0) => {
    ;(year = +year), (month = +month)
    if (!(year > 0 && month > 0)) return
    if (month - 2 === 0) {
      if (isLeapYear(year)) return 29
      return 28
    } else {
      if ([1, 3, 5, 7, 8, 10, 12].includes(month)) return 31
      return 30
    }
  }
  // 获取年/月从星期几开始
  export const getDayOfWeekFromYearAndMonth = (year = 0, month = 0) => {
    ;(year = +year), (month = +month)
    if (!(year > 0 && month > 0)) return
    let day = new Date(year, month - 1),
      dayCount = day.getDay()
    return dayCount === 0 ? 7 : dayCount
  }

  // 小于10, 补 '0'
  export const zeroFill = (n = 0) => (+n < 10 ? '0' : '') + +n

  // 'yyyy-mm-dd hh:mm:ss' => { year, month, day, hour, minute, second }
  const dateReg = /^\d{4}(\-|\/)\d{1,2}\1\d{1,2}$/
  export const splitDate = (str = '') => {
    // if(!(dateReg).test(str)) return {}
    str += ''
    let arr = str.split(' '),
      arr1 = arr[0],
      arr2 = arr[1],
      year,
      month,
      day,
      hour,
      minute,
      second

    if (arr1 && arr1.length > 0) {
      let ar = arr1.split('-'),
        s = new Date(+ar[0], +ar[1] - 1, +ar[2])
      ;(year = s.getFullYear()), (month = s.getMonth() + 1), (day = s.getDate())
    }
    if (arr2 && arr2.length > 0) {
      let ar = arr2.split(':')
      ;(hour = ar[0] ? +ar[0] : 0), (minute = ar[1] ? +ar[1] : 0), (second = ar[2] ? +ar[2] : 0)
    }
    return { year, month, day, hour, minute, second }
  }

  // 范围数组
  export const fetchRangeArray = (start, end, isFillZero = true) => {
    end = +end
    let i = +start,
      arr = []
    while (i <= end) {
      arr[arr.length] = isFillZero ? zeroFill(i) : i
      ++i
    }
    return arr
  }

  export const functionCall = (dispatch = NOOP) => {
    return (name = '', args = {}) => {
      dispatch({ type: name, ...args })
    }
  }

  export const _for = (array, cb) => {
    if (!type.isArray(array)) return
    let len = array.length,
      i = len,
      arr = []
    while (i > 0) {
      arr[arr.length] = cb(array[len - i], len - i)
      --i
    }
    return arr
  }

  export let locationListener = null
  //定位经纬度
  let locationHandler = (props, callback, flag) => {
    if (isANDROID) {
      locationListener && locationListener.remove()
      DeviceEventEmitter.removeAllListeners('onReceiveLocation')
      locationListener = DeviceEventEmitter.addListener('onReceiveLocation', (event) => {
        let locationInfo = ''
        try {
          locationInfo = JSON.parse(event.location)
        } catch (e) {
          log(e, 'onReceiveLocation-catch')
        }
        if (locationInfo === '') {
          FsToast.showString('定位失败', 2000, 'center')
          flag && callback()
        } else {
          //市名_regioncode
          let regionArr = locationInfo.location && locationInfo.location.split('_')
          if (regionArr && regionArr.length === 2) {
            props.dispatch({
              type: 'region/GetRegion',
              longitude: regionArr[0],
              latitude: regionArr[1],
              callback
            })
          } else {
            FsToast.showString('定位失败', 2000, 'center')
            flag && callback()
          }
        }
        DeviceEventEmitter.removeAllListeners('onReceiveLocation')
      })
      NativeModules.UtilsModule.getLocation()
    } else {
      this.Geolocation.getCurrentPosition(
        (location) => {
          props
            .dispatch({
              type: 'region/coordinateTransform',
              longitude: location.coords.longitude,
              latitude: location.coords.latitude
            })
            .then((e) => {
              props.dispatch({
                type: 'region/GetRegion',
                longitude: e.longitude,
                latitude: e.latitude,
                callback
              })
            })
        },
        (error) => {
          log('error', error)
          FsToast.showString('定位失败', 2000, 'center')
          flag && callback()
        }
      )
    }
  }
  //检查是否开启定位权限，如果开启就去定位经纬度，如果没有开启，则弹出提示框
  export const checkLoactionLimit = (props, callback = NOOP, flag, title, butText, Icon) => {
    NativeModules.UtilsModule.checkLocation().then((e) => {
      if (JSON.parse(e).data) {
        this.locationHandler(props, callback, flag)
      } else {
        if (flag) {
          callback()
        } else {
          FsModal.show({
            title: title || '请开启定位权限，若不开启则无法进行预存/转存操作',
            type: 'alert',
            onPressOkClose: true,
            singleButton: false,
            Icon: Icon || null,
            affirmText: <Text style={[{ fontSize: 16, color: '#1A8AFA' }]}>{butText || '允许'}</Text>,
            titleStyle: title ? { flexDirection: 'row' } : null,
            onOk: () => {
              NativeModules.UtilsModule.openLocationLimitSet()
            },
            IconStyle: title ? { marginBottom: 0 } : null
          })
          // 未开启定位给页面的判断
          butText &&
            props.dispatch({
              type: 'Renew/changeIsFalg',
              isFalg: true
            })
        }
      }
    })
  }

  export const rMemo = (render, shouldUpdate) => {
    return memo(render, shouldUpdate)
  }

  // ================================== 路由跳转 ================================
  const _pop = () => {
    Actions.pop()
  }

  const _onBack = (cb) => {
    if (type.isFunction(cb)) {
      cb(Actions)
    } else {
      _pop()
    }
  }

  const _linkTo = (routeName = '', routeData = {}) => {
    routeName += ''
    if (Actions[routeName]) {
      Actions[routeName](routeData)
    }
  }

  const _replace = (routeName = '', routeData = {}) => {
    _linkTo(routeName, { ...routeData, type: ActionConst.REPLACE })
  }

  const _popTo = (routeName = '', routeData = {}) => {
    _linkTo(routeName, { ...routeData, type: ActionConst.POP_TO })
  }

  const _reset = (routeName = '', routeData = {}) => {
    _linkTo(routeName, { ...routeData, type: ActionConst.RESET })
  }

  const _removeRoute = (routeName = '') => {
    routeName += ''
    if (routeName && hasRouter(routeName)) {
      type.isFunction(Actions.state.removeRoute) && Actions.state.removeRoute(routeName)
    }
  }

  export const onBack = _onBack
  export const pop = _pop
  export const linkTo = _linkTo
  export const replace = _replace
  export const popTo = _popTo
  export const reset = _reset
  export const removeRoute = _removeRoute

  // ================================== 路由跳转 ================================

  // 埋点数据
  export const paramsDeliveryData = {
    '013': '新闻公告',
    '012': '云课堂',
    '032': '内部招聘',
    '028': '圈友绩效',
    '030': '体验版',
    '034': '移动巡检'
  }
})()
;(function () {
  import { getToken } from './util.js'
  import axios from 'axios'
  import Vue from 'vue'

  export const isEmptyObject = (obj) => {
    for (var key in obj) {
      return false
    }
    return true
  }

  export const forEach = (arr, fn) => {
    if (!arr || !arr.length || !fn) return
    let i = -1
    let len = arr.length
    while (++i < len) {
      let item = arr[i]
      fn(item, i, arr)
    }
  }

  /**
   * @param {Array} arr1
   * @param {Array} arr2
   * @description 得到两个数组的交集, 两个数组的元素为数值或字符串
   */
  export const getIntersection = (arr1, arr2) => {
    let len = Math.min(arr1.length, arr2.length)
    let i = -1
    let res = []
    while (++i < len) {
      const item = arr2[i]
      if (arr1.indexOf(item) > -1) res.push(item)
    }
    return res
  }

  /**
   * @param {Array} date1
   * @param {Array} date2
   * @description 判断两个时间是否相交
   */
  export const hasDatesection = (date1, date2) => {
    let res = []
    let startTime1 = Date.parse(date1[0])
    let endTime1 = Date.parse(date1[1])
    let startTime2 = Date.parse(date2[0])
    let endTime2 = Date.parse(date2[1])
    if (endTime1 < startTime2) {
      return true
    } else if (startTime1 > endTime2) {
      return true
    } else {
      return false
    }
  }

  /**
   * @param {Array} arr1
   * @param {Array} arr2
   * @description 得到两个数组的并集, 两个数组的元素为数值或字符串
   */
  export const getUnion = (arr1, arr2) => {
    return Array.from(new Set([...arr1, ...arr2]))
  }

  /**
   * @param {Array} target 目标数组
   * @param {Array} arr 需要查询的数组
   * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
   */
  export const hasOneOf = (targetarr, arr) => {
    return targetarr.some((_) => arr.indexOf(_) > -1)
  }

  /**
   * @param {String|Number} value 要验证的字符串或数值
   * @param {*} validList 用来验证的列表
   */
  export function oneOf(value, validList) {
    for (let i = 0; i < validList.length; i++) {
      if (value === validList[i]) {
        return true
      }
    }
    return false
  }

  /**
   * @param {Number} timeStamp 判断时间戳格式是否是毫秒
   * @returns {Boolean}
   */
  const isMillisecond = (timeStamp) => {
    const timeStr = String(timeStamp)
    return timeStr.length > 10
  }

  /**
   * @param {Number} timeStamp 传入的时间戳
   * @param {Number} currentTime 当前时间时间戳
   * @returns {Boolean} 传入的时间戳是否早于当前时间戳
   */
  const isEarly = (timeStamp, currentTime) => {
    return timeStamp < currentTime
  }

  /**
   * @param {Number} num 数值
   * @returns {String} 处理后的字符串
   * @description 如果传入的数值小于10，即位数只有1位，则在前面补充0
   */
  const getHandledValue = (num) => {
    return num < 10 ? '0' + num : num
  }

  /**
   * @param {Number} timeStamp 传入的时间戳
   * @param {Number} startType 要返回的时间字符串的格式类型，传入'year'则返回年开头的完整时间
   */
  const getDate = (timeStamp, startType) => {
    const d = new Date(timeStamp * 1000)
    const year = d.getFullYear()
    const month = getHandledValue(d.getMonth() + 1)
    const date = getHandledValue(d.getDate())
    const hours = getHandledValue(d.getHours())
    const minutes = getHandledValue(d.getMinutes())
    const second = getHandledValue(d.getSeconds())
    let resStr = ''
    if (startType === 'year') resStr = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + second
    else resStr = month + '-' + date + ' ' + hours + ':' + minutes
    return resStr
  }

  /**
   * @param {String|Number} timeStamp 时间戳
   * @returns {String} 相对时间字符串
   */
  export const getRelativeTime = (timeStamp) => {
    // 判断当前传入的时间戳是秒格式还是毫秒
    const IS_MILLISECOND = isMillisecond(timeStamp)
    // 如果是毫秒格式则转为秒格式
    if (IS_MILLISECOND) Number((timeStamp /= 1000))
    // 传入的时间戳可以是数值或字符串类型，这里统一转为数值类型
    timeStamp = Number(timeStamp)
    // 获取当前时间时间戳
    const currentTime = Number(Date.parse(new Date()) / 1000)
    // 判断传入时间戳是否早于当前时间戳
    const IS_EARLY = isEarly(timeStamp, currentTime)
    // 获取两个时间戳差值
    let diff = currentTime - timeStamp
    // 如果IS_EARLY为false则差值取反
    if (!IS_EARLY) diff = -diff
    let resStr = ''
    const dirStr = IS_EARLY ? '前' : '后'
    // 少于等于59秒
    if (diff <= 59) resStr = diff + '秒' + dirStr
    // 多于59秒，少于等于59分钟59秒
    else if (diff > 59 && diff <= 3599) resStr = Math.floor(diff / 60) + '分钟' + dirStr
    // 多于59分钟59秒，少于等于23小时59分钟59秒
    else if (diff > 3599 && diff <= 86399) resStr = Math.floor(diff / 3600) + '小时' + dirStr
    // 多于23小时59分钟59秒，少于等于29天59分钟59秒
    else if (diff > 86399 && diff <= 2623859) resStr = Math.floor(diff / 86400) + '天' + dirStr
    // 多于29天59分钟59秒，少于364天23小时59分钟59秒，且传入的时间戳早于当前
    else if (diff > 2623859 && diff <= 31567859 && IS_EARLY) resStr = getDate(timeStamp)
    else resStr = getDate(timeStamp, 'year')
    return resStr
  }

  /**
   * @returns {String} 当前浏览器名称
   */
  export const getExplorer = () => {
    const ua = window.navigator.userAgent
    const isExplorer = (exp) => {
      return ua.indexOf(exp) > -1
    }
    if (isExplorer('MSIE')) return 'IE'
    else if (isExplorer('Firefox')) return 'Firefox'
    else if (isExplorer('Chrome')) return 'Chrome'
    else if (isExplorer('Opera')) return 'Opera'
    else if (isExplorer('Safari')) return 'Safari'
  }

  /**
   * @description 绑定事件 on(element, event, handler)
   */
  export const on = (function () {
    if (document.addEventListener) {
      return function (element, event, handler) {
        if (element && event && handler) {
          element.addEventListener(event, handler, false)
        }
      }
    } else {
      return function (element, event, handler) {
        if (element && event && handler) {
          element.attachEvent('on' + event, handler)
        }
      }
    }
  })()

  /**
   * @description 解绑事件 off(element, event, handler)
   */
  export const off = (function () {
    if (document.removeEventListener) {
      return function (element, event, handler) {
        if (element && event) {
          element.removeEventListener(event, handler, false)
        }
      }
    } else {
      return function (element, event, handler) {
        if (element && event) {
          element.detachEvent('on' + event, handler)
        }
      }
    }
  })()

  /**
   * 判断一个对象是否存在key，如果传入第二个参数key，则是判断这个obj对象是否存在key这个属性
   * 如果没有传入key这个参数，则判断obj对象是否有键值对
   */
  export const hasKey = (obj, key) => {
    if (key) return key in obj
    else {
      let keysArr = Object.keys(obj)
      return keysArr.length
    }
  }

  /**
   * @param {*} obj1 对象
   * @param {*} obj2 对象
   * @description 判断两个对象是否相等，这两个对象的值只能是数字或字符串
   */
  export const objEqual = (obj1, obj2) => {
    const keysArr1 = Object.keys(obj1)
    const keysArr2 = Object.keys(obj2)
    if (keysArr1.length !== keysArr2.length) return false
    else if (keysArr1.length === 0 && keysArr2.length === 0) return true
    /* eslint-disable-next-line */ else return !keysArr1.some((key) => obj1[key] != obj2[key])
  }

  /**
   * @param {Array} data 对象数组
   * @param {String} id 自身标识
   * @param {String} pid 父级标识
   * @return {Array} res 树形结构
   * @description 将同级结构的数据转化成树形结构
   */
  export function treeDataTranslate(data, id = 'id', pid = 'parentId') {
    var res = []
    var temp = {}
    for (var i = 0; i < data.length; i++) {
      temp[data[i][id]] = data[i]
    }
    for (var k = 0; k < data.length; k++) {
      if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
        if (!temp[data[k][pid]]['children']) {
          temp[data[k][pid]]['children'] = []
        }
        if (!temp[data[k][pid]]['_level']) {
          temp[data[k][pid]]['_level'] = 1
        }
        data[k]['_level'] = temp[data[k][pid]]._level + 1
        temp[data[k][pid]]['children'].push(data[k])
      } else {
        res.push(data[k])
      }
    }
    return res
  }

  /**
   * @param {Array} menuIdList 存储包含半选节点的uuid数组
   * @param {Array} showIdlist 存储不包含半选节点的uuid数组
   * @param {Array} listData iview树形控件返回的勾选数组
   * @param {Array} data 无级树总数组
   * @description iview树形控件勾选优化,勾选半选节点
   */
  export function getCheckedNode(menuIdList, showIdlist, listData, data) {
    let temp = false
    for (let l = 0; l < data.length; l++) {
      menuIdList.push(data[l].uuid) // 加入该选中项
      showIdlist.push(data[l].uuid)
    }
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < listData.length; j++) {
        if (data[i].resourceParent === listData[j].uuid) {
          // 找到该选中项的父节点
          for (let h = 0; h < menuIdList.length; h++) {
            // 看看该父节点是否已经添加
            if (data[i].resourceParent === menuIdList[h]) {
              temp = true
              break
            }
          }
          if (temp === false) {
            // 该父节点未被添加
            menuIdList.push(data[i].resourceParent) // 加入该父节点
            data.push(listData[j]) // 把该也加入循环队列，以供寻找该父节点的父节点
          }
          temp = false
        }
      }
    }
  }

  /**
   * @param {Array} listData 无级树总数组
   * @param {Array} data 包含父节点的id数组
   * @return {Array} data 不包含父节点的id数组
   * @description iview树形控件回显优化,去除勾选项中的父节点
   */
  export function popParentNode(listData, data, parentId = 'resourceParent') {
    for (let i = 0; i < listData.length; i++) {
      for (let j = 0; j < data.length; j++) {
        if (listData[i][parentId] === data[j]) {
          data.splice(j, 1)
        }
      }
    }
    return data
  }

  /**
   * @param {String} testValue 待校验字符串
   * @param {String} type 校验类型
   * @return {Boolean} 校验结果
   * @description 正则校验
   */
  export const regTest = (testValue, type) => {
    var mobile = /^(0|86|17951)?(13[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9]|14[0-9])[0-9]{8}$/
    var phone = /^([0-9]{3,4}-)?[0-9]{7,8}$/
    var email = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
    switch (type) {
      case 'phone&mobile':
        return phone.test(testValue) || mobile.test(testValue)
      case 'phone':
        return phone.test(testValue)
      case 'mobile':
        return mobile.test(testValue)
      case 'email':
        return email.test(testValue)
      default:
        return false
    }
  }

  /**
   * @param {Object} allFields 所有table列
   * @param {Array} selectIds 展示的id表
   * @description 返回id表中存在的table列
   */
  export const getCustomFields = (allFields, selectIds) => {
    let arr = []
    for (let i = 0; i < allFields.length; i++) {
      for (let j = 0; j < selectIds.length; j++) {
        if (allFields[i].key === selectIds[j]) {
          arr.push(allFields[i])
        }
      }
    }
    if (!arr.length) {
      for (let i = 0; i < allFields.length; i++) {
        arr.push(allFields[i])
      }
    }
    return arr
  }

  /**
   * @param {Object} param 搜索参数
   * @param {String} url 请求api地址
   * @description 导出文件
   */
  export const exportFile = (param, url) => {
    axios({
      method: 'post',
      // headers: {'SESSIONID': getToken()},
      headers: { Authorization: getToken() },
      url: Vue.prototype._baseUrl + url,
      data: param,
      responseType: 'blob' // 如果项目中引入了mock模块，会更改blob数据，返回乱码
    })
      .then(function (res) {
        if (res.data) fileDownload(res.data, 'downloadFiles.csv')
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  /**
   * @description 数组转字符串
   */
  export const arrStringify = (arr) => {
    let str = ''
    let arr1 = JSON.parse(JSON.stringify(arr))
    arr1.forEach(function (item, index) {
      if (index !== arr1.length - 1) {
        str += JSON.stringify(item) + ';'
      } else {
        str += JSON.stringify(item)
      }
    })

    return str
  }

  /**
   * @description 字符串转数组
   */
  export const strParse = (str) => {
    let arr = str.split(';')
    let arr2 = []
    arr.forEach(function (item, index) {
      arr2.push(JSON.parse(item))
    })

    return arr2
  }

  /**
   * @param {Array} arr 树
   * @param {String} key key名
   * @param {String} targetKey 目标key名
   * @description 为树更改字段
   */
  export const changeKeyMethod = (arr, key = 'title', targetKey = 'label') => {
    changeKey(arr, key, targetKey)
    function changeKey(arr, key, targetKey) {
      for (let i = 0; i < arr.length; i++) {
        arr[i][targetKey] = arr[i][key]
        if (typeof arr[i].children !== 'undefined') {
          changeKey(arr[i].children, key, targetKey)
        }
      }
    }
  }

  /**
   * @param {Array} treeArr 树
   * @param {Array} ids 目标id数组
   * @description 从省市运营商树中提取目标id的title
   */
  export const selectLabelByIds = (treeArr, ids) => {
    let labelList = []
    recursion(treeArr, ids, labelList)
    function recursion(treeArr, ids, labelList) {
      for (let i = 0; i < treeArr.length; i++) {
        for (let j = 0; j < ids.length; j++) {
          if (treeArr[i].uuid === ids[j]) {
            labelList.push({
              title: treeArr[i].title
            })
          }
        }
        if (typeof treeArr[i].children !== 'undefined') {
          recursion(treeArr[i].children, ids, labelList)
        }
      }
    }

    return labelList
  }

  /**
   *  @param {Array}  校验数组
   *  @description 校验数组中是否某项重复
   */
  export const sthIsRepeated = (oriArr, key) => {
    for (let index = 0; index < oriArr.length; index++) {
      if (oriArr.length == 1) {
        return true
        // break
      } else {
        for (let j = index + 1; j < oriArr.length; ) {
          if (oriArr[index][key] == oriArr[j][key]) {
            return false
          } else {
            return true
          }
        }
      }
    }
  }

  export function throttle(fn, delay = 250) {
    let last = 0,
      timer = null

    return function () {
      let context = this
      let args = arguments
      let now = +new Date()

      if (now - last < delay) {
        clearTimeout(timer)
        timer = setTimeout(function () {
          last = now
          fn.apply(context, args)
        }, delay)
      } else {
        last = now
        fn.apply(context, args)
      }
    }
  }

  export function debounce(fn, delay = 250) {
    let timer = null

    return function () {
      let context = this
      let args = arguments

      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(function () {
        fn.apply(context, args)
      }, delay)
    }
  }

  /**
   * @description 根据秒获取时分秒
   * @returns 时分秒字符串或者null
   */

  export function getHMSBySeconds(value) {
    var seconds = parseInt(value) // 秒
    if (!seconds || !Number.isInteger(seconds)) {
      return null
    }
    var minutes = 0 // 分
    var hours = 0 // 小时
    if (seconds > 60) {
      minutes = parseInt(seconds / 60)
      seconds = parseInt(seconds % 60)
      if (minutes > 60) {
        hours = parseInt(minutes / 60)
        minutes = parseInt(minutes % 60)
      }
    }
    var result = '' + parseInt(seconds)
    if (result < 10) {
      result = '0' + result
    }
    if (minutes > 0) {
      result = '' + parseInt(minutes) + ':' + result
      if (minutes < 10) {
        result = '0' + result
      }
    } else {
      result = '00:' + result
    }
    if (hours > 0) {
      result = '' + parseInt(hours) + ':' + result
      if (hours < 10) {
        result = '0' + result
      }
    } else {
      result = '00:' + result
    }
    return result
  }

  /**
   * @param {Array} cpList 所有省市数据
   * @param {String} key value所对应的键名
   * @description 省市数据结构化
   */
  export const cpTranslate = (cpList, provinceKey = '', citykey = '', cityList = '') => {
    let arr = JSON.parse(JSON.stringify(cpList))
    if (provinceKey === '') {
      arr.forEach(function (item, index) {
        item.value = item.provinceID
        item.label = item.province
        item.children = item.nodes || item[cityList] || item.citys
        item.children.forEach(function (_item, _index) {
          _item.value = _item.cityID
          _item.label = _item.city
        })
      })
    } else {
      arr.forEach(function (item, index) {
        item.value = item[provinceKey]
        item.label = item.province
        item.children = item.nodes || item[cityList]
        item.children.forEach(function (_item, _index) {
          _item.value = _item[citykey]
          _item.label = _item.city
        })
      })
    }
    return arr
  }

  export const getCopyJsonData = (data) => {
    return JSON.parse(JSON.stringify(data))
  }

  /**
   * 把接口返回的业务线产品线车型三级数据改造成{value, label, children}的三级和二级数据，同时返回一个枚举表map['1[#1[#1]]']
   * @param {Array} data
   * @param {Array} data
   * @returns { Object }
   */
  export const normalBPCData = (data, bizTypeData) => {
    const treeData = [] // 三级数据
    const simpleTreeData = [] // 两级数据
    const enumMap = {} // 标签枚举表
    const bizLineList = [] // 业务线list
    const bizLineMap = {} // 业务线map
    const bizTypeList = [] // 产品线的list不包含业务线
    const bizTypeMap = {} // 产品线的map
    const vehicleLevelList = [] // 车型的list
    const vehicleLevelMap = {} // 车型的map
    let businessItem
    let simpleBusinessItem
    data.forEach((item) => {
      businessItem = {
        ...item,
        value: Number(item.expandBizLine),
        label: item.expandBizLineName
      }
      bizLineList.push(businessItem)
      if (!bizLineMap[item.expandBizLine]) {
        bizLineMap[item.expandBizLine] = item.expandBizLineName
      }
      simpleBusinessItem = { ...businessItem }
      if (item.bizTypeList) {
        businessItem.children = []
        simpleBusinessItem.children = []
        let productItem
        let simpleProductItem
        item.bizTypeList.forEach((itm) => {
          productItem = {
            ...itm,
            value: itm.bizType,
            label: itm.bizTypeName
          }
          simpleProductItem = { ...productItem }
          if (itm.levels) {
            productItem.children = []
            itm.levels.forEach((it) => {
              // enumMap[item.expandBizLine + "#" + itm.bizType + '#' + it.vehicleLevel] = it.vehicleName;
              enumMap['##' + it.vehicleLevel] = it.vehicleName
              productItem.children.push({
                ...it,
                value: it.vehicleLevel,
                label: it.vehicleName
              })
            })
          }
          // enumMap[item.expandBizLine + "#" + itm.bizType] = itm.bizTypeName;
          enumMap['#' + itm.bizType] = itm.bizTypeName
          businessItem.children.push(productItem)
          simpleBusinessItem.children.push(simpleProductItem)
        })
      }
      enumMap[item.expandBizLine] = item.expandBizLineName
      treeData.push(businessItem)
      simpleTreeData.push(simpleBusinessItem)
    })
    bizTypeData.forEach((item) => {
      item = {
        value: item.bizType,
        label: item.bizTypeName,
        ...item
      }
      if (!bizTypeMap[item.value]) {
        bizTypeMap[item.value] = item.label // 给产品线map赋值
        if (item.levels && item.levels.length > 0) {
          item.children = []
          item.levels.forEach((iitem) => {
            iitem = {
              value: iitem.vehicleLevel,
              label: iitem.vehicleName,
              ...iitem
            }
            if (!vehicleLevelMap[iitem.value]) {
              vehicleLevelMap[iitem.value] = iitem.label
              vehicleLevelList.push(iitem)
            }
            item.children.push(iitem)
          })
        }
        bizTypeList.push(item)
      }
    })
    return {
      treeData,
      simpleTreeData,
      enumMap,
      bizLineList,
      bizLineMap,
      bizTypeList,
      bizTypeMap,
      vehicleLevelList,
      vehicleLevelMap
    }
  }
})()
;(function () {
  /**
   * 获取 blob
   * @param  {String} url 目标文件地址
   * @return {Promise}
   */
  function getBlob(url) {
    return new Promise((resolve) => {
      const xhr = new XMLHttpRequest()

      xhr.open('GET', url, true)
      xhr.responseType = 'blob'
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(xhr.response)
        }
      }

      xhr.send()
    })
  }

  /**
   * 保存
   * @param  {Blob} blob
   * @param  {String} filename 想要保存的文件名称
   */
  function saveAs(blob, filename) {
    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob, filename)
    } else {
      const link = document.createElement('a')
      const body = document.querySelector('body')

      link.href = window.URL.createObjectURL(blob)
      link.download = filename

      // fix Firefox
      link.style.display = 'none'
      body.appendChild(link)

      link.click()
      body.removeChild(link)

      window.URL.revokeObjectURL(link.href)
    }
  }

  /**
   * 下载
   * @param  {String} url 目标文件地址
   * @param  {String} filename 想要保存的文件名称
   */
  export const downloadFile = (url, filename) => {
    if (/^(png|jpg|gif|jpeg|webp)$/i.test(url.slice(-3))) {
      urlToBase64(url).then((res) => {
        const aLink = document.createElement('a')
        aLink.download = filename || new Date().getTime() + '.png'
        aLink.href = res
        aLink.dispatchEvent(new MouseEvent('click', {}))
      })
      return
    }
    getBlob(url).then((blob) => {
      saveAs(blob, filename)
    })
  }
  /**
   * @description url 转base64
   * @param url
   * @returns {Promise<unknown>}
   */
  export const urlToBase64 = (url) => {
    return new Promise((resolve, reject) => {
      let image = new Image()
      image.onload = function () {
        let canvas = document.createElement('canvas')
        console.log(image.width)
        canvas.width = image.width
        canvas.height = image.height
        canvas.getContext('2d').drawImage(image, 0, 0)
        let result = canvas.toDataURL('image/png')
        resolve(result)
      }
      image.setAttribute('crossOrigin', 'anonymous')
      image.src = url + '?' + new Date().getTime()
      image.onerror = () => {
        reject(new Error('图片流异常'))
      }
    })
  }

  /**
   * @param {String} testValue 待校验字符串
   * @param {String} type 校验类型
   * @return {Boolean} 校验结果
   * @description 正则校验
   */
  export const regTest = (testValue, type) => {
    var mobile = /^(0|86|17951)?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[0-9]|19[0-9]|16[0-9])[0-9]{8}$/
    // 仅校验11位手机号，1开头
    var relexMobile = /^1[0-9]{10}$/
    var phone = /^([0-9]{3,4}-)?[0-9]{7,8}$/
    var email = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
    var url = /((ht|f)tps?:)\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g
    var password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[1-9]).{8,}$/
    switch (type) {
      case 'phone&mobile':
        return phone.test(testValue) || mobile.test(testValue)
      case 'relexMobile':
        return relexMobile.test(testValue)
      case 'phone':
        return phone.test(testValue)
      case 'mobile':
        return mobile.test(testValue)
      case 'email':
        return email.test(testValue)
      case 'url':
        return url.test(testValue)
      case 'password':
        return password.test(testValue)
      default:
        return false
    }
  }
})()
;(function () {})()
;(function () {})()
;(function () {
  // 要将文本复制到剪贴板，只需调用 writeText()

  async function copyPageUrl() {
    try {
      await navigator.clipboard.writeText(location.href)
      console.log('Page URL copied to clipboard')
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  // 读取文本
  async function getClipboardContents() {
    try {
      const text = await navigator.clipboard.readText()
      console.log('Pasted content: ', text)
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err)
    }
  }

  const get = (from, ...selectors) =>
    [...selectors].map((s) =>
      s
        .replace(/\[([^\[\]]*)\]/g, '.$1.')
        .split('.')
        .filter((t) => t !== '')
        .reduce((prev, cur) => prev && prev[cur], from)
    )
  const obj = { selector: { to: { val: 'val to select' } }, target: [1, 2, { a: 'test' }] }

  // Example
  get(obj, 'selector.to.val', 'target[0]', 'target[2].a')
  // ['val to select', 1, 'test']

  const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
    const { top, left, bottom, right } = el.getBoundingClientRect()
    const { innerHeight, innerWidth } = window
    return partiallyVisible
      ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
          ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
      : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth
  }

  // 事例
  elementIsVisibleInViewport(el) // 需要左右可见
  elementIsVisibleInViewport(el, true) // 需要全屏(上下左右)可以见
})()
