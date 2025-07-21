/**
 * 判断变量类型
 *
 *     11/19
 */
export const typeOf = (obj) => {
  const toString = Object.prototype.toString
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object AsyncFunction]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
    '[object Promise]': 'promise'
  }
  const desc = toString.call(obj)
  if (map.hasOwnProperty(desc)) {
    // @ts-ignore
    return map[desc]
  } else {
    console.log('unable to recognise type:' + desc)
    return null
  }
}
//# sourceMappingURL=typeOf.js.map
