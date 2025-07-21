/**
 * 删除class
 *
 *     11/19
 */
import { getClassNameAttr } from './getClassNameAttr'
export const removeClass = (el, rmCls) => {
  if (!el || !rmCls) return
  let rmClasses
  if (Array.isArray(rmCls)) {
    rmClasses = rmCls
  } else {
    rmClasses = rmCls.split(' ')
  }
  if (!!el.classList && !!el.classList.value) {
    rmClasses.forEach((item) => el.classList.remove(item))
  } else {
    const curClasses = getClassNameAttr(el).split(' ')
    for (let i = 0; i < rmClasses.length; i++) {
      const rmClass = rmClasses[i]
      const index = curClasses.indexOf(rmClass)
      if (index > -1) {
        curClasses.splice(index, 1)
        i--
      }
    }
    el.className = curClasses.join(' ')
  }
}
//# sourceMappingURL=removeClass.js.map
