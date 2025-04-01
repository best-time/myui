[文档](https://qiankun.umijs.org/zh/guide)
.env

```
PORT=3010
```

main.js 主应用注册

```javascript
import { start, registerMicroApps } from 'qiankun'
registerMicroApps([
  {
    name: 'micro-app1',
    entry: '//locahost:3011',
    container: '#micro-app1',
    activeRule: '/micro-app1',
    props: {
      userInfo: { name: 'aaa', token: 'bbbb' }
    }
  },
  {
    name: 'micro-app2',
    entry: '//locahost:3012',
    container: '#micro-app2',
    activeRule: '/micro-app2'
  }
])
start()
```

父组件异步传值

```javascript
import { initGlobalState, MicroAppStateActions } from 'qiankun'
const state = {}
const actions = initGlobalState(state)
actions.onGlobalStateChange((state, prev) => {})

actions.setGlobalState(state) // onGlobalStateChange回调中触发
actions.offGloabalStateChange()
```

子应用添加生命周期
子项目添加 在 src 目录新增 public-path.js：
子项目运行 yarn add react-app-rewired

```javascript

```

主应用和子应用传值
在子应用mount 函数中 props 读取
