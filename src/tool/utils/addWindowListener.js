/**
 * 监听window派发的事件
 *
 *        10/18 15:56
 */
export function addWindowListener(type, listener, options) {
  window.addEventListener(type, listener, options)
  return () => {
    window.removeEventListener(type, listener)
  }
}
//# sourceMappingURL=addWindowListener.js.map
