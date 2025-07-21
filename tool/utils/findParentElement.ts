export function findParentElement(
  el: HTMLElement,
  isMatch: (parent: HTMLElement) => boolean,
  includeSelf?: boolean
): HTMLElement | null {
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
