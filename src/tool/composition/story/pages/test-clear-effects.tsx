import { computed, reactive, designPage } from "../../src";
import {} from "vue";

export const demo1 = designPage(() => {
  const state = reactive({
    count: 100,
  });

  const total = computed(() => state.count * 2);

  return () => (
    <>
      <div>
        <button onClick={() => state.count--}>sub</button>
        <button>{state.count}</button>
        <button
          onClick={() => {
            state.count++;
          }}
        >
          add
        </button>
      </div>
      <div>
        total:{total.value}
        <button onClick={() => total.effect.stop()}>clear</button>
      </div>
    </>
  );
});
