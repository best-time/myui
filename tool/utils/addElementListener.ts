export function addElementListener<EL extends HTMLElement, K extends keyof HTMLElementEventMap>(
  el: EL,
  type: K,
  listener: (this: EL, ev: HTMLElementEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions
) {
  el.addEventListener(type, listener as any, options)
  return () => {
    el.removeEventListener(type, listener as any)
  }
}
