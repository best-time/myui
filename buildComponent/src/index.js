//  src/index.js
import Hello from './components/Hello.vue';

function install (app) {
  //外部的Vue.use(MyLib)会执行该方法，完成组件的全局注册。
  app.component (Hello.name, Hello);
}

// if (window && window.Vue) {
//   //通过`script`标签引入的情况，在组件内部完成组件注册。
//   Vue.use (install);
// }

export default {
  install
};
