;(function (l, r) {
  if (!l || l.getElementById('livereloadscript')) return
  r = l.createElement('script')
  r.async = 1
  r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'
  r.id = 'livereloadscript'
  l.getElementsByTagName('head')[0].appendChild(r)
})(self.document)
;('use strict')

Object.defineProperty(exports, '__esModule', { value: true })

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function (d, b) {
  extendStatics =
    Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array &&
      function (d, b) {
        d.__proto__ = b
      }) ||
    function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]
    }
  return extendStatics(d, b)
}

function __extends(d, b) {
  if (typeof b !== 'function' && b !== null)
    throw new TypeError('Class extends value ' + String(b) + ' is not a constructor or null')
  extendStatics(d, b)
  function __() {
    this.constructor = d
  }
  d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __())
}

function __read(o, n) {
  var m = typeof Symbol === 'function' && o[Symbol.iterator]
  if (!m) return o
  var i = m.call(o),
    r,
    ar = [],
    e
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value)
  } catch (error) {
    e = { error: error }
  } finally {
    try {
      if (r && !r.done && (m = i['return'])) m.call(i)
    } finally {
      if (e) throw e.error
    }
  }
  return ar
}

/** @deprecated */
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]))
  return ar
}

var toStr = Object.prototype.toString
var isArray = function (p) {
  return Array.isArray ? Array.isArray(p) : toStr.call(p) === '[object Array]'
}
var isString = function (s) {
  return typeof s === 'string'
}
var isFunction = function (p) {
  return toStr.call(p) === '[object Function]'
}
var isPlainObject = function (v) {
  return !!v && typeof v === 'object' && (v.__proto__ === null || v.__proto__ === Object.prototype)
}
var zeroFill = function (v) {
  if (typeof +v !== 'number' || isNaN(+v)) return v
  return +v < 10 ? '0' + +v : +v
}
var compose = function () {
  var fns = []
  for (var _i = 0; _i < arguments.length; _i++) {
    fns[_i] = arguments[_i]
  }
  return function (x) {
    return fns.reduce(function (y, f) {
      return f(y)
    }, x)
  }
}
var map = function (fn, list) {
  var idx = 0
  var len = list.length
  var result = Array(len)
  while (idx < len) {
    result[idx] = fn(list[idx])
    idx += 1
  }
  return result
}
var ErrorResult = (function (_super) {
  __extends(ErrorResult, _super)
  function ErrorResult(data) {
    var _this = _super.call(this) || this
    _this.code = data.code
    _this.message = data.msg
    return _this
  }
  return ErrorResult
})(Error)
var getObjKeys = function (o) {
  if (!isPlainObject(o)) return []
  return Object.keys(o)
}
var deepGet = function (object, path, defaultValue) {
  return (
    (!Array.isArray(path) ? path.replace(/\[/g, '.').replace(/\]/g, '').split('.') : path).reduce(function (o, k) {
      return (o || {})[k]
    }, object) || defaultValue
  )
}
var filterObj = function (object, predicate) {
  var result = {}
  var isArray = Array.isArray(predicate)
  getObjKeys(object).forEach(function (key) {
    var value = object[key]
    if (isArray ? predicate.includes(key) : predicate(key, value, object)) {
      result[key] = value
    }
  })
  return result
}

var extend = function (orig, target, deep) {
  if (deep === void 0) {
    deep = true
  }
  orig = orig || {}
  for (var i in target) {
    if (deep === true && target.hasOwnProperty(i)) {
      if (typeof target[i] === 'object') {
        if (!orig[i]) {
          orig[i] = isArray(target[i]) ? [] : {}
        }
        extend(orig[i], target[i])
      } else {
        orig[i] = target[i]
      }
    } else orig[i] = target[i]
  }
  return orig
}

var omit = function (obj, keys) {
  return getObjKeys(obj)
    .filter(function (k) {
      return !keys.includes(k)
    })
    .reduce(function (res, k) {
      var _a
      return Object.assign(res, ((_a = {}), (_a[k] = obj[k]), _a))
    }, {})
}

var pick = function (obj, keys) {
  return getObjKeys(obj)
    .filter(function (k) {
      return keys.includes(k)
    })
    .reduce(function (res, k) {
      var _a
      return Object.assign(res, ((_a = {}), (_a[k] = obj[k]), _a))
    }, {})
}

var num = {
  digitLength: function (num) {
    var len = (num.toString().split('.')[1] || '').length
    return len > 0 ? len : 0
  },
  float2Fixed: function (num) {
    return Number(num.toString().replace('.', ''))
  },
  plus: function (num1, num2) {
    var baseNum = Math.pow(10, Math.max(this.digitLength(num1), this.digitLength(num2)))
    return (num1 * baseNum + num2 * baseNum) / baseNum
  },
  minus: function (num1, num2) {
    var baseNum = Math.pow(10, Math.max(this.digitLength(num1), this.digitLength(num2)))
    return (num1 * baseNum - num2 * baseNum) / baseNum
  },
  times: function (num1, num2) {
    var num1Changed = this.float2Fixed(num1)
    var num2Changed = this.float2Fixed(num2)
    var baseNum = this.digitLength(num1) + this.digitLength(num2)
    var leftValue = num1Changed * num2Changed
    return leftValue / Math.pow(10, baseNum)
  },
  divide: function (num1, num2) {
    var num1Changed = this.float2Fixed(num1)
    var num2Changed = this.float2Fixed(num2)
    return (num1Changed / num2Changed) * Math.pow(10, this.digitLength(num2) - this.digitLength(num1))
  },
  round: function (num, ratio) {
    var base = Math.pow(10, ratio)
    return this.divide(Math.round(this.times(num, base)), base)
  }
}

var partial = function (fn) {
  var presetArgs = []
  for (var _i = 1; _i < arguments.length; _i++) {
    presetArgs[_i - 1] = arguments[_i]
  }
  return function partiallyApplied() {
    var laterArgs = []
    for (var _i = 0; _i < arguments.length; _i++) {
      laterArgs[_i] = arguments[_i]
    }
    return fn.apply(void 0, __spread(presetArgs, laterArgs))
  }
}

function curry(fn, arity) {
  if (arity === void 0) {
    arity = fn.length
  }
  return (function nextCurried(prevArgs) {
    return function curried(nextArgs) {
      var args = prevArgs.concat([nextArgs])
      if (args.length >= arity) {
        return fn.apply(void 0, __spread(args))
      } else {
        return nextCurried(args)
      }
    }
  })([])
}

var ymd = function (gutter, t) {
  var date = t ? new Date(t) : new Date()
  var year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate()
  if (isString(gutter)) {
    return '' + year + gutter + zeroFill(month) + gutter + zeroFill(day)
  }
  return '' + year + zeroFill(month) + zeroFill(day)
}
var ymdFull = function (gutter, t) {
  var date = t ? new Date(t) : new Date()
  var h = date.getHours()
  var i = date.getMinutes()
  var s = date.getSeconds()
  return ymd(gutter, t) + ' ' + h + ':' + zeroFill(i) + ':' + zeroFill(s)
}
var countDaysInMonth = function (year, month) {
  var date = new Date()
  date.setFullYear(year, month - 1, 0)
  return date.getDate()
}

var baseTool = {
  toResult: function (p) {
    return p
      .then(function (v) {
        if (!v.data.success) return Promise.reject(new ErrorResult(v.data))
        return Promise.resolve([null, v.data.data])
      })
      .catch(function (e) {
        return Promise.resolve([e, null])
      })
  },
  deepCopy: function (dist, target) {
    return extend(dist, target, true)
  },
  copy: function (dist, target) {
    return extend(dist, target, false)
  },
  filterEmptyParams: function (o) {
    var tar = {}
    getObjKeys(o).forEach(function (i) {
      if (o[i] && o[i] - -1 !== 0) {
        tar[i] = o[i]
      }
    })
    return tar
  }
}
var tool = baseTool

exports.ErrorResult = ErrorResult
exports.compose = compose
exports.countDaysInMonth = countDaysInMonth
exports.curry = curry
exports.deepGet = deepGet
exports.extend = extend
exports.filterObj = filterObj
exports.getObjKeys = getObjKeys
exports.isArray = isArray
exports.isFunction = isFunction
exports.isPlainObject = isPlainObject
exports.isString = isString
exports.map = map
exports.num = num
exports.omit = omit
exports.partial = partial
exports.pick = pick
exports.tool = tool
exports.ymd = ymd
exports.ymdFull = ymdFull
exports.zeroFill = zeroFill
//# sourceMappingURL=bundle.cjs.js.map
