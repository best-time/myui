/**
 * 处理所有组件全局install
 */
import Button from "./Button";
import Cell from "./Cell";
import { GridsItem, GridsGroup } from "./Grid";
import { Alert, Loading, Notify, Toast, Confirm } from "./Dialog";
import { Slider, SliderItem } from "./Slide";
import ActionSheet from "./Actionsheet";
import Keyboard from "./Keyboard";
import CitySelect from "./CitySelect"
// import CaiLink from './CaiLink'
// import CaiAlert from './CaiAlert'
// import message from './CaiMessage'
// import CaiRadio from './CaiRadio'
// import CaiCheckbox from './CaiCheckbox'
// import CaiDivider from './CaiDivider'
// import CaiDrawer from './CaiDrawer'
// import CaiLoading from './CaiLoading'

const components = [
  Button,
  Cell,
  GridsItem,
  GridsGroup,
  Slider,
  SliderItem,
  ActionSheet,
  Keyboard,
  CitySelect
  // CaiIcon,
  // CaiLink,
  // CaiAlert,
  // CaiRadio,
  // CaiCheckbox,
  // CaiDivider,
  // CaiDrawer,
  // CaiLoading
];

// 定义install方法，接收一个vue参数
const install = Vue => {
  // 判断这个组件是不是安装了，如果安装过了就return
  // if (install.installed) return
  // install.installed = true

  // 遍历所有组件
  components.map(component => {
    // Vue.use(component)
    Vue.component(component.name, component);
  });

  // Vue.prototype.$message = message;
  Vue.prototype.$dialog = {
    confirm: Confirm,
    alert: Alert,
    toast: Toast,
    notify: Notify,
    loading: Loading
  };
};

// 检测到Vue才会执行
if (typeof window != "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install
  // 所有的组件，都必须有install方法，才可以使用Vue.use()
  // ...components
};
