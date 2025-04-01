const fs = require('fs')
const path = require('path')

module.exports = function () {
  // 这里收mock数据的根目录，我们只认这目录下文件
  let mockDataPath = path.resolve(__dirname, '../mock/')
  //   判断根目录是否存在mock目录
  let existsMockDir = fs.existsSync(mockDataPath)
  // 获取mock目录下的所有文件的mock数据
  let getMockData = () => {
    // 如果mock目录存在就走if逻辑
    if (existsMockDir) {
      /**
       * 通过readdirSync获取mock目录下的所有文件名称
       * 再通过require取出数据
       */
      let modules = fs.readdirSync(mockDataPath)
      return modules.reduce((pre, module) => {
        return {
          ...pre,
          ...require(path.join(mockDataPath, './' + module))
        }
      }, {})
    } else {
      console.log('根目录不存在mock文件夹，请创建一个根目录创建一个mock文件夹')
      return {}
    }
  }

  // 该函数负责重新处理请求的路径
  let splitApiPath = (mockData) => {
    let data = {}
    for (let path in mockData) {
      let [method, apiPath, sleep] = path.split(' ')
      let newApiPath = method.toLocaleUpperCase() + apiPath
      data[newApiPath] = {
        path: newApiPath,
        method,
        sleep,
        callback: mockData[path]
      }
    }
    return data
  }

  // 该函数是一个延时函数
  let delayFn = (sleep) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, sleep)
    })
  }

  // 最后返回一个函数
  return async (req, res, next) => {
    let { baseUrl, method } = req
    // 只处理请求路径包含api的请求
    if (baseUrl.indexOf('api') === -1 || !existsMockDir) {
      return next()
    }
    let mockData = splitApiPath(getMockData())
    let path = method.toLocaleUpperCase() + baseUrl
    let { sleep, callback } = mockData[path]
    let isFuntion = callback.__proto__ === Function.prototype
    // 如果mock api 有延时存在
    if (sleep && sleep > 0) {
      await delayFn(sleep)
    }
    // 如果mock api 的值是一个函数
    if (isFuntion) {
      callback(req, res)
    } else {
      // 如果mock api 的值是一个json
      res.json({
        ...callback
      })
    }
    next()
  }
}
