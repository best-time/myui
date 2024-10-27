import baseIndex from "../views/index.vue";
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
import Input from "../views/Input.vue";
import ScrollNav from "../views/ScrollNav.vue";
import dragDemo from "../views/drag/index.vue";
import dragDemo2 from "../views/drag/drag2.vue";
import tableDemo from "../views/table/index.vue";
import virtualDemo from "../views/virtualList/demo.vue";
// import lazyDemo from "../views/lazyImg/index.vue";
// import lazyDemo2 from "../views/lazyImg/lazy.vue";
// import lazyDemo3 from "../views/lazyImg/lazy-load.vue";
import test1 from "../views/test/f1.vue";
import AsyncComponent from "../views/asyncComponent/index.vue";



const routeList = [

    {name: 'component-test', component: () => import('../views/component/index.vue')},
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
    {name: "input", component: Input},
    {name: "scrollNav", component: ScrollNav},
    {name: "drag1", component: dragDemo},
    {name: "drag2", component: dragDemo2},
    {name: "table", component: tableDemo},
    {name: "virtual", component: virtualDemo},
    // {name: "lazy-img", component: lazyDemo},
    // {name: "lazy2", component: lazyDemo2},
    // {name: "lazy3", component: lazyDemo3},
    {name: "test1", component: test1},
    {name: "asyncComponent", component: AsyncComponent},
    {name: "suspense", component: () => import('../views/suspense/index.vue')},
    {name: "event", component: () => import('../views/attrEvent/page.vue')},
    {name: "mulCom", component: () => import('../views/com/index.vue')},

]
const routeArr = routeList.map(it => ({...it, path: `/${it.name}`}))

const routes = [
    {
        path: '/index',
        name: 'baseIndex',
        component: baseIndex
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

// const router = new VueRouter({
//     routes
// });

export default routes;
