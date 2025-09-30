import { defineComponent, onMounted, PropType, ref } from "vue";
import { designComponent } from "../../src/packages/designComponent";

export const demo1 = (() => {
  const Button = designComponent({
    props: {
      name: { type: String },
      age: { type: Number },
      flag: { type: Boolean },
      requireProp: { type: String, required: true },
      defaultProp: { type: Number, default: 111 },
      handler: { type: Function as PropType<(val: string) => number> },
      conflictProp: { type: String },
    },
    emits: {
      onOpen: (val: number) => true,
      onClose: (val: string) => true,
    },
    setup({ props, event }) {
      const methods = {
        test: (flag: boolean) => {},
      };

      return {
        render: () => (
          <div>
            <button>112233</button>
          </div>
        ),
        refer: {
          props,
          event,
          methods,
          // conflictProp: 11,
        },
      };
    },
  });

  return defineComponent(() => {
    // const refBtn = ref<any>(null)
    const refBtn = Button.use.ref();

    onMounted(() => {
      // console.log(refBtn.value.props.name) // refBtn.value 不一定存在
      // refBtn.value!.props.name.charAt(0)   // props.name 是可选属性
      console.log(refBtn.value);
      refBtn.value!.props.requireProp.charAt(0);
      // refBtn.value!.event.emit.onClose(111)
      setTimeout(() => {
        refBtn.value!.event.emit.onClose("123");
      }, 1000);
    });

    return () => (
      <>
        <div>
          page test ref
          <Button requireProp="111" ref={refBtn} onClose={(val) => console.log("get close", val)} />
        </div>
      </>
    );
  });
})();
