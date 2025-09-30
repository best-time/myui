export function getClassNameAttr(el) {
  const { className } = el
  if (!className || typeof className != 'string') {
    return ''
  }
  return className
}
//# sourceMappingURL=getClassNameAttr.js.map
