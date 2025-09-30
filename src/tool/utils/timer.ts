const Win = window as any

/**
 * 发送同步/异步请求获取时间
 *
 *        .12.8 20:00
 */
function requestTime() {
  const request = new XMLHttpRequest()
  const { ctxPath } = Win.appCtx
  request.open(
    'get',
    ctxPath + (ctxPath.charAt(ctxPath.length - 1) === '/' ? '' : '/') + 'gateway/time/currentTime',
    false
  ) // 同步请求
  request.send()
  let result = null
  if (request.status === 200) {
    result = JSON.parse(request.responseText)
  } else {
    console.log('error', request.status)
  }
  if (!result) {
    throw new Error('请求服务器时间失败！')
  } else {
    return {
      serverTimestamp: result.result,
      deviceTimestamp: Date.now()
    }
  }
}

export const timer = (() => {
  let staticState = null as null | { serverTimestamp: number; deviceTimestamp: number }

  // 定时器
  let interferometer: any
  // 本地时间差
  let localDifferTimeStamp = 0
  // 时间宽容差，设置五分钟
  const toleranceTimeStamp = 1000 * 60 * 5

  /**
   * 获取当前服务器时间Date日期对象
   *
   *        /12/7 14:24
   */
  const dateObject = (): Date => {
    if (!staticState) {
      staticState = requestTime()
      // 获取服务器时间之后，第一时间激活定时器记录时长
      interferometer = setInterval(() => {
        localDifferTimeStamp += 1000
      }, 1000)
    }
    const { serverTimestamp, deviceTimestamp } = staticState
    const currentDeviceTimeStamp = Date.now()
    // 当前时间比获取服务器时间节点早或者超过界限，则重新初始化服务器时间
    if (
      currentDeviceTimeStamp - deviceTimestamp < 0 ||
      currentDeviceTimeStamp - deviceTimestamp > localDifferTimeStamp + toleranceTimeStamp
    ) {
      // 本地时间校验不通过，清空定时器、服务器时间，重新获取
      clearInterval(interferometer)
      localDifferTimeStamp = 0
      staticState = null
      return dateObject()
    }
    // 时间返回公式不变
    const currentServerTimestamp = currentDeviceTimeStamp - deviceTimestamp + serverTimestamp
    return new Date(currentServerTimestamp)
  }

  /**
   * 获取当前服务器日期时间 YYYY-MM-DD HH:mm:ss
   *
   *        /12/7 14:24
   */
  const datetime = () => {
    const dateObj = dateObject()
    return [
      [
        dateObj.getFullYear(),
        String(dateObj.getMonth() + 1).padStart(2, '0'),
        String(dateObj.getDate()).padStart(2, '0')
      ].join('-'),
      [
        String(dateObj.getHours()).padStart(2, '0'),
        String(dateObj.getMinutes()).padStart(2, '0'),
        String(dateObj.getSeconds()).padStart(2, '0')
      ].join(':')
    ].join(' ')
  }

  /**
   * 获取当前服务器日期 YYYY-MM-DD
   *
   *        /12/7 14:24
   */
  const date = () => {
    const dateObj = dateObject()
    return [
      dateObj.getFullYear(),
      String(dateObj.getMonth() + 1).padStart(2, '0'),
      String(dateObj.getDate()).padStart(2, '0')
    ].join('-')
  }

  /**
   * 获取当前服务器时间 HH:mm:ss
   *
   *        /12/7 14:24
   */
  const time = () => {
    const dateObj = dateObject()
    return [
      String(dateObj.getHours()).padStart(2, '0'),
      String(dateObj.getMinutes()).padStart(2, '0'),
      String(dateObj.getSeconds()).padStart(2, '0')
    ].join(':')
  }

  /**
   * 获取当前服务器时间戳
   *
   *        6/5 12:29
   */
  const timestamp = () => {
    const dateObj = dateObject()
    return dateObj.getTime()
  }

  return {
    dateObject,
    date,
    time,
    datetime,
    timestamp
  }
})()
