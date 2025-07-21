import { computed, defineComponent, reactive } from "vue";
import { designComponent } from "../../src/packages/designComponent";

export const demo1 = (() => {
  const Button = designComponent({
    props: {
      data: { type: Array },
    },
    scopeSlots: {
      item: (scope: { item?: any; index: number }) => {},
    },
    setup({ props, scopeSlots }) {
      const styles = computed(() => {
        return {
          backgroundColor: scopeSlots.item.isExist() ? "#f2f2f2" : "",
        };
      });

      return () => (
        <>
          <ul style={styles.value}>
            {(props.data || []).map((item, index) => (
              <li key={index}>{scopeSlots.item({ item, index }, JSON.stringify(item))}</li>
            ))}
          </ul>
        </>
      );
    },
  });

  return defineComponent(() => {
    const state = reactive({
      showSlot: true,
    });

    const data = [{ name: "张三" }, { name: "李四" }, { name: "王五" }];

    return () => (
      <>
        <div>
          <h1>测试插槽类型</h1>
        </div>
        <button onClick={() => (state.showSlot = !state.showSlot)}>{state.showSlot ? "hide" : "show"} slot</button>
        <Button
          data={data}
          v-slots={{
            ...(state.showSlot
              ? {
                  item: (scope) => (
                    <>
                      {scope.index}、{scope.item.name}
                    </>
                  ),
                }
              : {}),
          }}
        />
      </>
    );
  });
})();
