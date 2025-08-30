export function isArray(value) {
  if (typeof Array.isArray === 'function') {
    return Array.isArray(value)
  } else {
    return Object.prototype.toString.call(value) === '[object Array]'
  }
}

export function isObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]'
}

export function isNumber(value) {
  return !isNaN(Number(value))
}

export function isFunction(value) {
  return typeof value === 'function'
}

export function isString(value) {
  return typeof value === 'string'
}

export function isNull(value) {
  return !value && value !== 0
}

export function isBoolean(value) {
  return typeof value === 'boolean'
}

export function isEmpty(value) {
  if (isArray(value)) {
    return value.length === 0
  }

  if (isObject(value)) {
    return Object.keys(value).length === 0
  }

  return value === '' || value === undefined || value === null
}

export function deepMerge(a, b) {
  let k
  for (k in b) {
    a[k] = a[k] && a[k].toString() === '[object Object]' ? deepMerge(a[k], b[k]) : (a[k] = b[k])
  }
  return a
}

// export function mergeConfig(a, b) {
//     return b ? mergeProps(a, b) : a;
// }

export function debounce(fn, delay, immediate) {
  let timer
  let result
  return function (...args) {
    if (timer) clearTimeout(timer)

    if (immediate) {
      if (timer) {
        timer = setTimeout(() => (timer = null), delay)
      } else {
        result = fn.apply(this, args)
        return result
      }
    } else {
      timer = setTimeout(() => fn.apply(this, args), delay)
    }
  }
}

export function addClass(el, name) {
  if (isString(el?.className)) {
    const f = el.className.includes(name)

    if (!f) {
      el.className = el.className + ' ' + name
    }
  }
}

export function removeClass(el, name) {
  if (isString(el.className)) {
    el.className = el.className.replace(name, '')
  }
}
