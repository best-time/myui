export function getElementParents(el: HTMLElement) {
  let val = el.parentElement
  let parents: (HTMLElement | null)[] = [val]
  while (!!val) {
    val = val.parentElement
    parents.push(val)
  }
  return parents
}
