import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import Router from './router/index.js';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import initComponents from './init/components.js'
import pinia from './store'
const app = createApp (App);
//全局注册Element Icon
for (let iconName in ElementPlusIconsVue) {
  app.component (iconName, ElementPlusIconsVue[iconName]);
}
app.use(initComponents)
app.use(ElementPlus).use(pinia).use(Router).mount('#app')



