import { designComponent } from "../../src/packages/designComponent";
import { defineComponent, reactive } from "vue";
import { useRefList } from "../../src/use/useRefList";

const DemoItem = designComponent({
  props: {
    name: { type: String, required: true },
  },
  setup({ props }) {
    return {
      refer: {
        props,
        myName: props.name + props.name,
      },
      render: () => <div>{props.name}</div>,
    };
  },
});

export const DemoUseRefList = defineComponent(() => {
  const state = reactive({
    list: ["11", "22", "33", "44", "55"],
  });

  const { refList, onRefList } = useRefList(DemoItem);

  return () => (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => {
            console.log(
              refList.map((i) => (!i ? null : i.props.name)),
              refList.length,
            );
          }}
        >
          log items
        </button>
        {(() => {
          console.log(refList.length);
          return String(refList.length);
        })()}
      </div>
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => state.list.unshift(state.list[0] + state.list[0])}>add</button>
        <button onClick={() => state.list.shift()}>remove</button>
        <button onClick={() => (state.list = shuffle(state.list))}>shuffle</button>
      </div>
      <div>
        {state.list.map((item, index) => (
          <DemoItem
            ref={onRefList(index)}
            name={item}
            key={item}
            {...({
              onClick: () => state.list.splice(index, 1),
            } as any)}
          />
        ))}
      </div>
    </div>
  );
});

function shuffle<T>(array: T[]): T[] {
  if (!array) return array;
  array = [...array];
  let currentIndex = array.length;
  let temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
