/**
 * 判断元素是否拥有某个cls
 *
 *        11/5 21:10
 */
import { getClassNameAttr } from './getClassNameAttr'

export const hasClass = (el: HTMLElement, cls: string | string[]): boolean => {
  const clsList = Array.isArray(cls) ? cls : [cls]
  const classList =
    !!el.classList && !!el.classList.value ? el.classList.value.split(' ') : getClassNameAttr(el).split(' ')
  return clsList.some((item) => classList.indexOf(item) > -1)
}
