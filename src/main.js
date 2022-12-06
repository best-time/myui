import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios'
import "./registerServiceWorker";
import "./main.less";
import Element from 'element-ui'
// import './styles/element-variables.scss'
import ElDataTable from './components/eTable'
import FormRender from './components/formRender'

import 'element-ui/lib/theme-chalk/index.css';
import UI from "./../packages";

Vue.use(UI)
Vue.use(Element)
Vue.use(ElDataTable)
Vue.use(FormRender)
Vue.prototype.$axios = axios
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
