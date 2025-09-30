import { computed, defineComponent, getCurrentInstance, reactive, version } from "vue";
import { designComponent, useClasses } from "../../src";

// export default defineComponent(() => {
//   return () => <>
//     page index
//   </>;
// });
//
// export const demo1 = defineComponent(() => {
//
//   const state = reactive({
//     flag: false,
//     count: 5,
//   });
//
//   const classes = useClasses(() => {
//     console.log('get classes');
//     return [{
//       'active': state.flag,
//       'demo-active': state.count >= 5,
//     }];
//   });
//
//   const classes2 = computed(() => 1);
//
//   const innerState = reactive({
//     classes,
//     classes2,
//   });
//
//   console.log({ classes, classes2 });
//
//   return () => {
//     console.log('render');
//     console.log('innerState.classes', innerState.classes);
//     return <>
//       <span onClick={() => state.flag = !state.flag}>
//         demo1:{JSON.stringify(innerState.classes)}
//       </span>
//       <div>
//         <button onClick={() => state.count++}>add</button>
//         <button onClick={() => state.count--}>sub</button>
//       </div>
//     </>;
//   };
// });

export default () => (
  <>
    hello,
    <Parent>
      <Aaa />
    </Parent>
  </>
);

const Parent = designComponent({
  slots: ["default"],
  setup({ props, slots }) {
    return () => (
      <>
        <p>this is parent,</p>
        <p>{slots.default()}</p>
      </>
    );
  },
});

const Aaa = designComponent({
  ...({
    slots: ["default"],
  } as any),
  setup() {
    const ctx = getCurrentInstance()!;
    return () => {
      console.log(version, ctx.slots);
      return <>this is A</>;
    };
  },
});
