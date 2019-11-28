import "./styles/common/reset.less"
/**
 * 处理所有组件全局install
 * http://vue.ydui.org/docs/#/lightbox
 */
import Button from "./Button";
import Cell from "./Cell";
import { GridsItem, GridsGroup } from "./Grid";
import { Alert, Loading, Notify, Toast, Confirm } from "./Dialog";
import { Slider, SliderItem } from "./Slide";
import ActionSheet from "./Actionsheet";
import Keyboard from "./Keyboard";
import CitySelect from "./CitySelect";
import { Tab, TabPanel } from "./Tab";
import { ScrollTab, ScrollTabPanel } from "./ScrollTab";
import Popup from "./Popup";
import { RollNotice, RollNoticeItem } from "./Rollnotice";
import { Accordion, AccordionItem } from "./Accordion";
import InfiniteScroll from "./Infinitescroll"
import PullRefresh from "./Pullfresh"
import { ListItem, ListOther, ListTheme  } from "./List"
import { LightBox, LightBoxImg, LightBoxText } from "./Lightbox"
import Textarea from "./Textarea"

const components = [
  Button,
  Cell,
  GridsItem,
  GridsGroup,
  Slider,
  SliderItem,
  ActionSheet,
  Keyboard,
  CitySelect,
  Tab,
  TabPanel,
  ScrollTab,
  ScrollTabPanel,
  Popup,
  RollNotice, RollNoticeItem,
  Accordion, AccordionItem,
  InfiniteScroll,
  PullRefresh,
  ListItem, ListOther, ListTheme,
  LightBox, LightBoxImg, LightBoxText,
  Textarea
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
