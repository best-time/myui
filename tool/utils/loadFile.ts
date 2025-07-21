export function loadFile<T = any>(filePath: string, globalName?: string, Win?: Window): Promise<T> {
  const _window = Win || window
  return new Promise<T>((resolve, reject) => {
    if (/\.js(\?.*)?/.test(filePath)) {
      const el = _window.document.createElement('script') as HTMLScriptElement
      el.setAttribute('src', filePath)
      el.onload = () => resolve(!globalName ? undefined : (_window as any)[globalName])
      el.onerror = reject
      _window.document.body.appendChild(el)
    } else if (/\.css(\?.*)?/.test(filePath)) {
      const el = _window.document.createElement('link') as HTMLLinkElement
      el.setAttribute('rel', 'stylesheet')
      el.setAttribute('type', 'text/css')
      el.setAttribute('href', filePath)
      el.onload = () => resolve(undefined as any)
      el.onerror = reject
      _window.document.body.appendChild(el)
    }
  })
}
