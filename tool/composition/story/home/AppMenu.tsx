import { AppNavigator } from "./AppNavigator";
import { designComponent } from "../../src";

interface iMenu {
  name: string;
  path: string;
}

const menus: iMenu[] = [
  {
    name: "基本用法",
    path: "/",
  },
  {
    name: "props 属性",
    path: "/test-props",
  },
  {
    name: "emits 事件",
    path: "/test-emits",
  },
  {
    name: "attrs 继承属性",
    path: "/test-inherit-attrs",
  },
  {
    name: "slots 插槽类型",
    path: "/test-slots",
  },
  {
    name: "scopeSlots 作用域插槽类型",
    path: "/test-scope-slots",
  },
  {
    name: "测试ref",
    path: "/test-ref",
  },
  {
    name: "测试 use refs",
    path: "/test-use-refs",
  },
  {
    name: "测试 use refs list",
    path: "/test-use-refs-list",
  },
  {
    name: "测试 ui component",
    path: "/demo-ui-component",
  },
  {
    name: "测试clear effects",
    path: "/test-clear-effects",
  },
];

export const AppMenu = designComponent({
  name: "app-menu",
  setup: () => {
    return () => (
      <div class="app-menu">
        <div class="app-menu-title">@peryl/vue-compose</div>
        <ul>
          {menus.map((menu, index) => (
            <li key={index} data-active={menu.path == AppNavigator.state.route.path} onClick={() => AppNavigator.go(menu.path)}>
              {menu.name}
            </li>
          ))}
        </ul>
      </div>
    );
  },
});
