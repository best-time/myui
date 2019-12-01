import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import List from "../views/List.vue";
import CardList from "../views/CardList.vue";
import NavBar from "../views/NavBar.vue";
import Layout from "../views/Layout.vue";
import Scrolltab from "../views/Scrolltab.vue";
import Popup from "../views/Popup.vue";
import SendCode from "../views/SendCode.vue";
import Infinitescroll from "../views/Infinitescroll.vue";
import Pullrefresh from "../views/Pullrefresh.vue";
import Lightbox from "../views/Lightbox.vue";
import Switch from "../views/Switch.vue";
import Skeleton from "../views/Skeleton.vue";
import Timeline from "../views/Timeline.vue";
import Select from "../views/Select.vue";

Vue.use(VueRouter);


const routeList = [
  {name: "layout", component: Layout},
  {name: "list", component: List},
  {name: "navbar", component: NavBar},
  {name: "clist", component: CardList},
  {name: "scrolltab", component: Scrolltab},
  {name: "popup", component: Popup},
  {name: "sendcode", component: SendCode},
  {name: "infinite", component: Infinitescroll},
  {name: "pullrefresh", component: Pullrefresh},
  {name: "lightbox", component: Lightbox},
  {name: "switch", component: Switch},
  {name: "skeleton", component: Skeleton},
  {name: "timeline", component: Timeline},
  {name: "select", component: Select},

  
]
const routeArr = routeList.map(it => ({...it, path: `/${it.name}`}))

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  ...routeArr,
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
