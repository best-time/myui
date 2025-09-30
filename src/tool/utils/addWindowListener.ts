/**
 * 监听window派发的事件
 *
 *        10/18 15:56
 */
export function addWindowListener<K extends keyof WindowEventMap>(
  type: K,
  listener: (this: Window, ev: WindowEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions
): () => void {
  window.addEventListener(type, listener, options)
  return () => {
    window.removeEventListener(type, listener)
  }
}
