import { defineComponent } from "vue";
import { designComponent } from "../../src/packages/designComponent";

export default (() => {
  const Button = designComponent({
    props: {
      value: {},
    },
    emits: {
      onAdd: (num: number) => true,
      onSub: (num: number) => true,
    },
    setup({ props, event: { emit } }) {
      return () => (
        <>
          {/*onAdd有个必填参数num*/}
          {/*<button onClick={() => emit.onAdd()}>add</button>*/}
          <button onClick={() => emit.onAdd(Number(props.value ?? 0) + 1)}>add</button>[<span>{props.value}</span>]<button onClick={() => emit.onSub(Number(props.value ?? 0) - 1)}>add</button>
        </>
      );
    },
  });

  return defineComponent(() => {
    return () => (
      <>
        <h1>测试 emits 类型</h1>

        {/*val的类型是number*/}
        {/*<Button onAdd={(val: string) => console.log(val)}/>*/}

        <Button onAdd={(val) => console.log("add", val.toPrecision(10))} onSub={(val) => console.log("sub", val.toExponential(10))} />
      </>
    );
  });
})();
