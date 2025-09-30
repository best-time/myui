import { createApp } from "vue";
import { App } from "./App";
import { setComponentPrefix } from "../src";
import { AppMenu } from "./home/AppMenu";

setComponentPrefix("pl");
createApp(App).use(AppMenu).mount("#app");
