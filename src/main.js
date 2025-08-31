import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Router from './router/index.js'
import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import './style.css'
import initComponents from './init/components.js'
import pinia from './store'
const app = createApp(App)
//全局注册Element Icon
for (let iconName in ElementPlusIconsVue) {
  app.component(iconName, ElementPlusIconsVue[iconName])
}
app.use(initComponents)
/*
err：具体错误信息
vm：当前错误所在的Vue实例
info：Vue特定的错误信息，错误所在的生命周期钩子
 */
app.config.errorHandler = (err, vm, info) => {
  console.log(err, vm, info, '入口')
  // do something
}
// app.config.warnHandler = (msg, vm, trace) => {
//   console.log(msg, vm, trace, 'warn')
// }
/*
message：错误消息（字符串）
source：引发错误的脚本的URL（字符串）
lineno：发生错误的行号（数值）
colno：发生错误的行的列号（数值）
error：错误对象（对象)
 */
window.onError = function (message, source, lineno, colno, error) {
  console.log(message, source, lineno, colno, error, '全局')
  // do something
}
app.use(ElementPlus).use(pinia).use(Router).mount('#app')
