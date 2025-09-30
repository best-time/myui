/**
 * 转为驼峰命名
 *
 *        10/28 20:17
 */
export const camelCase = (str: string | null): string | null => {
  if (!str) return null
  const SPECIAL_CHARS_REGEXP = /([:\-_]+(.))/g
  const MOZ_HACK_REGEXP = /^moz([A-Z])/
  str = str
    .replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
      return offset ? letter.toUpperCase() : letter
    })
    .replace(MOZ_HACK_REGEXP, 'Moz$1')

  if (str.length > 1 && /[a-z]/.test(str.charAt(0))) {
    return str.charAt(0).toUpperCase() + str.substring(1)
  } else {
    return str
  }
}
