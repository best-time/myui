export function getElementParents(el) {
  let val = el.parentElement
  let parents = [val]
  while (!!val) {
    val = val.parentElement
    parents.push(val)
  }
  return parents
}
//# sourceMappingURL=getElementParents.js.map
