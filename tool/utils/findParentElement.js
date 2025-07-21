export function findParentElement(el, isMatch, includeSelf) {
  let parent = includeSelf ? el : el.parentElement
  if (!parent) {
    return null
  }
  let count = 50
  while (!!parent && !isMatch(parent) && count > 0) {
    count--
    parent = parent.parentElement
  }
  return parent
}
//# sourceMappingURL=findParentElement.js.map
