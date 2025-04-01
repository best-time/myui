const FP_NAME = 'first-paint'
const FCP_NAME = 'first-contentful-paint'

function perf() {
  const data = {
    FP: 0, // 首次绘制
    FCP: 0, // 首次内容绘制
    LCP: 0, // 最大内容绘制
    FID: 0, // 用户首次交互的延迟
    CLS: 0 // 总计布局偏移
  }

  new PerformanceObserver((entryList) => {
    let entries = entryList.getEntries()
    entries.forEach((entry) => {
      if (entry.name === FP_NAME) {
        data.FP = entry.startTime
      } else if (entry.name === FCP_NAME) {
        data.FCP = entry.startTime
      }
    })
  }).observe({
    type: 'paint',
    buffered: true
  })

  new PerformanceObserver((entryList) => {
    let entries = entryList.getEntries()
    entries.forEach((entry) => {
      if (entry.startTime > data.LCP) {
        data.LCP = entry.startTime
      }
    })
  }).observe({
    type: 'largest-contentful-paint',
    buffered: true
  })

  new PerformanceObserver((entryList) => {
    let entries = entryList.getEntries()
    entries.forEach((entry) => {
      // 用户首次交互开始处理时间 - 开始交互时间  = 首次延迟交互时间
      const FID = entry.processingStart - entry.startTime
      data.FID = FID
    })
  }).observe({
    type: 'first-input',
    buffered: true
  })

  new PerformanceObserver((entryList) => {
    let entries = entryList.getEntries()
    entries.forEach((entry) => {
      data.CLS += entry.value
    })
  }).observe({
    type: 'layout-shift',
    buffered: true
  })
}

;(function (performance) {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    performance()
  } else {
    document.addEventListener('readystatechange', () => {
      if (document.readyState === 'complete') {
        performance()
      }
    })
  }
})(perf)

const delayConfig = {
  '/index.html': 1000
}

const express = require('express')
const logger = require('morgan')
const compression = require('compression')
// const delayConfig = require('./delay')
const app = express()
app.use(logger('dev'))
app.use((req, res, next) => {
  let url = req.url
  const delay = delayConfig[url]
  if (delay) {
    setTimeout(next, delay)
  } else {
    next()
  }
})
// 开启gzip
app.use(compression)
app.use(express.static('public'))
app.listen(80, () => {
  logger.info('Listening on port 80 !')
})
