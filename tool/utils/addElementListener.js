export function addElementListener(el, type, listener, options) {
  el.addEventListener(type, listener, options)
  return () => {
    el.removeEventListener(type, listener)
  }
}
//# sourceMappingURL=addElementListener.js.map
