// 路由文件
import {createRouter, createWebHistory} from 'vue-router';
import EntryRoutes from './entry.js'
import Home from '../views/Home.vue';
import Vue2 from '../views/vue2.vue';
import DirectiveDemo from '../views/directive-test.vue';
import DetailDemo from '../views/detail-demo.vue';
import TestDemo from '../views/test/f1.vue';
import ObserverDemo from '../views/observer/index.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/a2',
    name: 'vue2',
    component: Vue2,
  },
    // 指令样例
  {
    path: '/directive-demo',
    name: 'directive-demo',
    component: DirectiveDemo,
  },
    // 详情展示组件
  {
    path: '/detail-demo',
    name: 'detail-demo',
    component: DetailDemo,
  },
  {
    path: '/test',
    name: 'test',
    component: TestDemo,
  },
  {
    path: '/observer',
    name: 'observer',
    component: ObserverDemo,
  },
];

const router = createRouter ({
  history: createWebHistory (),
  routes: routes.concat(EntryRoutes),
});

router.beforeEach ((to, from) => {
  // if(to.meta.requireAuth) {
  //     let token = localStorage.getItem('auth-system-token');
  //     let isLogin = localStorage.getItem('auth-system-login');
  //     if(!token||!isLogin){
  //         return {
  //             path: '/login'
  //         }
  //     }
  // }
});

export default router;
