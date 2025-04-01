[用TCP编写HTTP服务](https://juejin.cn/post/6969222179456024584)

#### 什么是错误优先的回调函数

错误优先的回调函数用于传递错误和数据。第一个参数始终应该是一个错误对象， 用于检查程序是否发生了错误。其余的参数用于传递数据

```node
fs.readFile(filePath, function (err, data) {
  if (err) {
    //handle the error
  }
  // use the data object
})
```

#### 避免回调地狱

- 模块化：将回调函数分割为独立的函数
- 使用Promises
- 使用yield来计算生成器或Promise

#### 怎么看 nodejs 可支持高并发

nodejs 的单线程架构模型

nodejs 其实并不是真正的单线程架构，因为 nodejs 还有I/O线程存在（网络I/O、磁盘I/O），
这些I/O线程是由更底层的 libuv 处理，这部分线程对于开发者来说是透明的。
JavaScript 代码永远运行在V8上，是单线程的。 所以从开发者的角度上来看 nodejs 是单线程的。

优势：

单线程，省去了线程间切换的开销 还有线程同步的问题，线程冲突的问题的也不需要担心

劣势：

劣势也很明显，现在起步都是 4 核，单线程没法充分利用 cpu 的资源
单线程，一旦崩溃，应用就挂掉了，大家调试脚本也知道一旦执行过程报错了，本次调试就直接结束了
因为只能利用一个 cpu ，一旦 cpu 被某个计算一直占用， cpu 得不到释放，后续的请求就会一直被挂起，直接无响应了

#### nodejs 怎么创建进程线程，可以用在哪些场景

单线程的一个缺点是不能充分利用多核，所以官方推出了 cluster 模块， cluster 模块可以创建共享服务器端口的子进程

```javascript
const cluster = require('cluster')
for (let i = 0; i < numCPUs; i++) {
  cluster.fork() // 生成新的工作进程，可以使用 IPC 和父进程通信
}
```

#### 如何在一个进程的前提下开启多个线程

```javascript
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads')
const worker = new Worker(__filename, {
  workerData: script
})
```

常见的一个场景，在服务中若需要执行 shell 命令，那么就需要开启一个进程

```javascript
var exec = require('child_process').exec
exec('ls', function (error, stdout, stderr) {
  if (error) {
    console.error('error: ' + error)
    return
  }
  console.log('stdout: ' + stdout)
})
```

洋葱模型

```javascript
// koa-compose/index.js
function compose(middleware) {
  // middleware 函数数组
  if (!Array.isArray(middleware)) {
    throw new TypeError('Middleware stack must be an array!')
  }
  for (const fn of middleware) {
    if (typeof fn !== 'function') {
      throw new TypeError('Middleware must be composed of functions!')
    }
  }
  /*
      content:上下文  
      next:新增一个中间件方法，位于所有中间件末尾，用于内部扩展
    */
  return function (context, next) {
    // last called middleware #
    let index = -1 // 计数器，用于判断中间是否执行到最后一个
    return dispatch(0) // 开始执行第一个中间件方法
    function dispatch(i) {
      if (i <= index) {
        return Promise.reject(new Error('next() called multiple times'))
      }
      index = i
      let fn = middleware[i] // 获取中间件函数
      if (i === middleware.length) {
        fn = next
      } // 如果中间件已经到了最后一个，执行内部扩展的中间件
      if (!fn) {
        return Promise.resolve()
      } // 执行完毕，返回 Promise
      try {
        // 执行 fn ，将下一个中间件函数赋值给 next 参数，在自定义的中间件方法中显示的调用 next 函数，中间件函数就可串联起来了
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
```

#### npm 实现原理

    执行工程自身 preinstall，当前 npm 工程如果定义了 preinstall 钩子此时会被执行。

    确定首层依赖模块，首先需要做的是确定工程中的首层依赖，也就是 dependencies 和 devDependencies 属性中直接指定的模块（假设此时没有添加 npm install 参数）。工程本身是整棵依赖树的根节点，每个首层依赖模块都是根节点下面的一棵子树，npm 会开启多进程从每个首层依赖模块开始逐步寻找更深层级的节点。

    获取模块，获取模块是一个递归的过程，分为以下几步：

      获取模块信息。在下载一个模块之前，首先要确定其版本，这是因为 package.json 中往往是 semantic version（semver，语义化版本）。
        此时如果版本描述文件（npm-shrinkwrap.json 或 package-lock.json）中有该模块信息直接拿即可，
        如果没有则从仓库获取。如 packaeg.json 中某个包的版本是 ^1.1.0，npm 就会去仓库中获取符合 1.x.x 形式的最新版本。
      获取模块实体。上一步会获取到模块的压缩包地址（resolved 字段），npm 会用此地址检查本地缓存，缓存中有就直接拿，
        如果没有则从仓库下载。
      查找该模块依赖，如果有依赖则回到第1步，没有则停止。



    安装模块，这一步将会更新工程中的 node_modules ，并执行模块中的生命周期函数（按照 preinstall、install、postinstall 的顺序）。

    执行工程自身生命周期，当前 npm 工程如果定义了钩子此时会被执行（按照 install、postinstall、prepublish、prepare 的顺序）。
