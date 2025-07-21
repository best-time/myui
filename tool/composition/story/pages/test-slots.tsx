import { computed, defineComponent, reactive } from "vue";
import { designComponent } from "../../src/packages/designComponent";

export const demo1 = (() => {
  const Button = designComponent({
    slots: ["default", "prepend", "append"],
    setup({ slots, setupContext, ctx }) {
      const reactiveStyles = computed(() => {
        return slots.append.isExist() ? {} : { backgroundColor: "black", color: "white" };
      });

      return () => {
        return (
          <>
            <div>
              <li>prepend:{slots.prepend("default prepend")}</li>
              <li>default:{slots.default("default slot")}</li>
              <li>append:{slots.append("default append")}</li>
              <button style={reactiveStyles.value}>reactive append</button>
            </div>
          </>
        );
      };
    },
  });

  return defineComponent(() => {
    const state = reactive({
      showAppend: false,
    });

    return () => (
      <>
        <div>
          <h1>测试插槽类型</h1>
        </div>
        <button onClick={() => (state.showAppend = !state.showAppend)}>append:{state.showAppend ? "hide" : "show"}</button>
        <Button
          v-slots={{
            default: () => 111,
            prepend: () => 222,

            // append: state.showAppend ? (() => state.showAppend ? 333 : 111) : undefined, // 这样写不行，不会响应式，第一次给的渲染函数会一直使用
            ...(state.showAppend ? { append: () => 333 } : {}),
          }}
        />
      </>
    );
  });
})();
