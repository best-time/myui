window.addEventListener('beforeunload', function () {
  blobData()
})

function blobData() {
  const data = JSON.stringify({ event: 'tab_close', userData: getAnalyticsData() })
  // 使用 Blob 设置 JSON 类型
  const blob = new Blob([data], { type: 'application/json; charset=UTF-8' }) // 加入请求队列
  navigator.sendBeacon('https://xxxxx.com/track', blob)
}

function fetchData() {
  const formData = new FormData()
  formData.append('userId', 123)
  formData.append('sessionId', 'abc123')
  fetch('/xxx/xxxxx', { method: 'POST', body: formData, keepalive: true })
}

function xhrData() {
  const xhr = new XMLHttpRequest()
  xhr.open('POST', 'https://xxxxx.com/track', false) // 同步模式
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.send(JSON.stringify({ timestamp: Date.now() }))
}

function imgData() {
  const queryString = 'action=page_close&user_id=123'
  const img = new Image()
  img.src = `https://xxxxx.com/track?${queryString}`
}

// 建立 WebSocket 连接
const socket = new WebSocket('ws://xxxx-server.com')
function socketData() {
  socket.send(JSON.stringify({ data: 'your data', action: 'tab-close' }))
}

function sendNormalData(data) {
  // 请求地址
  const url = '/api/postxxxx' // 请求数据（以JSON类型为例）
  const jsonData = JSON.stringify(data)
  // 方式1：若已建立WebSocket连接，优先用长连接发送（最可靠）  // 前面建立WebSocket连接时 已经赋值到 window.globalSocket 中了
  if (window.globalSocket && window.globalSocket.readyState === WebSocket.OPEN) {
    window.globalSocket.send(jsonData)
    return
  } // 方式2：sendBeacon（简单高效）
  if (navigator.sendBeacon) {
    const blob = new Blob([jsonData], { type: 'application/json' })
    navigator.sendBeacon(url, blob)
    return
  }
  // 方式3：fetch+keepalive（降级）
  if (window.fetch && 'keepalive' in new Request('')) {
    fetch(url, { method: 'POST', body: jsonData, keepalive: true })
    return
  }
  // 方式4：img元素GET请求（最终兜底）  // 将数据转为URL参数（仅适合少量键值对）
  const params = new URLSearchParams(data)
  const img = new Image() // 注意：这里请求的是get类型的接口地址 不是上面的post类型接口地址
  img.src = `/api/getxxxx?${params.toString()}`
}

// PC端
window.addEventListener('beforeunload', (e) => {
  sendCoreData(coreData)
})
// 移动端
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    sendNormalData(normalData)
  }
})
