
/*
AbortController 的工作原理非常简单：
  创建一个 AbortController 实例。
  从实例中获取一个 signal 对象。
  将这个 signal 作为 fetch 请求的配置项之一传入。
  在需要的时候，调用 controller.abort() 方法。

  一旦 abort() 被调用，与该 signal 关联的 fetch 请求就会立即被中止，
  并且其 Promise 会被 reject，抛出一个名为 AbortError 的错误。
 */
let controller

async function handleSearch(query) {
  // 如果上一个请求正在进行，取消它
  if (controller) {
    controller.abort()
  }

  // 为新请求创建一个新的控制器
  controller = new AbortController()
  const signal = controller.signal

  try {
    const response = await fetch(`/api/search?q=${query}`, { signal })
    const data = await response.json()
    console.log('Search results:', data)
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Fetch aborted')
    } else {
      console.error('Fetch error:', error)
    }
  }
}

const header = {
  'Content-Type': 'application/json',
  //   'omit': 不发送 Cookie（默认值）
  // 'same-origin': 仅在同源请求中发送 Cookie
  // 'include': 无论同源或跨域请求均发送 Cookie
  credentials: 'include'
  // 'Authorization
}

async function fetchWithTimeout(resource, options = {}, timeout = 300000) {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)
  const response = await fetch(resource, {
    ...options,
    signal: controller.signal
  })
  clearTimeout(id)
  return response
}

try {
  const response = await fetchWithTimeout('/api/data', {}, 300000)
  const data = await response.json()
  console.log(data)
} catch(error) {
  if (error.name === 'AbortError') {
    console.error('Request timed out')
  } else {
    console.error('Fetch error:', error)
  }
}
