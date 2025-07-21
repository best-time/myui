export function loadFile(filePath, globalName, Win) {
  const _window = Win || window
  return new Promise((resolve, reject) => {
    if (/\.js(\?.*)?/.test(filePath)) {
      const el = _window.document.createElement('script')
      el.setAttribute('src', filePath)
      el.onload = () => resolve(!globalName ? undefined : _window[globalName])
      el.onerror = reject
      _window.document.body.appendChild(el)
    } else if (/\.css(\?.*)?/.test(filePath)) {
      const el = _window.document.createElement('link')
      el.setAttribute('rel', 'stylesheet')
      el.setAttribute('type', 'text/css')
      el.setAttribute('href', filePath)
      el.onload = () => resolve(undefined)
      el.onerror = reject
      _window.document.body.appendChild(el)
    }
  })
}
//# sourceMappingURL=loadFile.js.map
