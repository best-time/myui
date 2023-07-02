// 路由文件
import {createRouter, createWebHistory} from 'vue-router';
import EntryRoutes from './entry.js'
import Home from '../views/Home.vue';
import Vue2 from '../views/vue2.vue';

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
