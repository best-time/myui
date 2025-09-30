import { markRaw, reactive, watch } from "vue";
import "./AppHome.scss";
import { AppNavigator } from "./AppNavigator";
import { designComponent } from "../../src";

export const AppHome = designComponent({
  setup: () => {
    const state = reactive({
      pages: [] as { key: string; component: any }[],
    });

    watch(
      () => AppNavigator.state.route.path,
      async (path) => {
        const module = await import("../pages" + path);
        state.pages = Object.entries(module).map(([key, component]) => ({ key, component: markRaw(component as any) }));
      },
      { immediate: true },
    );

    return () => (
      <>
        <pl-app-menu />
        <div class="app-content">
          {state.pages.map(({ key, component: Component }) => (
            <div key={key} class="app-example-item">
              <Component />
            </div>
          ))}
        </div>
      </>
    );
  },
});
