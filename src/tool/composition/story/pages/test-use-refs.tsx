import { defineComponent, onMounted, PropType, reactive } from "vue";
import { designComponent, useModel, useRefs } from "../../src";

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
    const { refs, onRef } = useRefs({
      button: Button,
    });

    onMounted(() => {
      // console.log(refBtn.value.props.name) // refBtn.value 不一定存在
      // refBtn.value!.props.name.charAt(0)   // props.name 是可选属性
      console.log(refs.button);
      refs.button!.props.requireProp.charAt(0);
      // refBtn.value!.event.emit.onClose(111)
      setTimeout(() => {
        refs.button!.event.emit.onClose("123");
      }, 1000);
    });

    return () => (
      <>
        <div>
          <h1>基本示例</h1>
          page test ref
          <Button requireProp="111" ref={onRef.button} onClose={(val) => console.log("get close", val)} />
        </div>
      </>
    );
  });
})();

export const demo2 = (() => {
  const Input = designComponent({
    props: {
      modelValue: {},
    },
    emits: {
      onUpdateModelValue: (val?: any) => true,
    },
    setup({ props, event: { emit } }) {
      const { refs, onRef } = useRefs({
        input: HTMLInputElement,
      });
      const model = useModel(() => props.modelValue, emit.onUpdateModelValue);

      const setFocus = () => {
        refs.input!.focus();
      };

      return {
        refer: { setFocus },
        render: () => (
          <div>
            <input type="text" v-model={model.value} ref={onRef.input} />
          </div>
        ),
      };
    },
  });

  return defineComponent(() => {
    const { refs, onRef } = useRefs({
      input: Input,
    });

    const state = reactive({
      formData: {} as any,
      showRefInput: true,
    });

    const makeFocus = () => {
      console.log(refs.input);
      !!refs.input && refs.input.setFocus();
    };

    return () => (
      <div>
        <h1>综合测试</h1>
        <Input v-model={state.formData.username} />
        {!!state.showRefInput && <Input v-model={state.formData.username} ref={onRef.input} />}
        {JSON.stringify(state.formData)}
        <button onClick={() => (state.showRefInput = !state.showRefInput)}>{state.showRefInput ? "hide" : "show"} ref input</button>
        <button onClick={makeFocus}>focus</button>
      </div>
    );
  });
})();
