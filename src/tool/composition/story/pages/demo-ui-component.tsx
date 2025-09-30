import "./DemoUIComponent.scss";
import { designPage, iHTMLInputElement, UI, useRefs } from "../../src";

export const demo1 = designPage(() => {
  return () => (
    <div class="demo-ui-component">
      <h1>测试 class 以及 className</h1>
      <UI.div class="hello">class string</UI.div>
      <UI.div class={["hello"]}>class array</UI.div>
      <UI.div class={{ hello: true }}>class object</UI.div>

      <UI.div className="hello">className string</UI.div>
      <UI.div className={["hello"]}>className array</UI.div>
      <UI.div className={{ hello: true }}>className object</UI.div>
    </div>
  );
});

export const demo2 = designPage(() => {
  return () => (
    <div class="demo-ui-component">
      <h1>测试 input readonly 以及 readOnly</h1>

      <UI.input readonly value={"input readonly"} />
      <UI.input readOnly value={"input readOnly"} />
    </div>
  );
});

export const demo3 = designPage(() => {
  return () => (
    <div class="demo-ui-component">
      <h1>测试 onMousedown 以及 onMouseDown</h1>

      <UI.div onMousedown={() => console.log("onMousedown", Date.now())}>onMousedown</UI.div>
      <UI.div onMouseDown={() => console.log("onMouseDown", Date.now())}>onMouseDown</UI.div>

      <UI.div onDblclick={() => console.log("onDblclick", Date.now())}>onDblclick</UI.div>
      <UI.div onDoubleClick={() => console.log("onDoubleClick", Date.now())}>onDoubleClick</UI.div>
    </div>
  );
});

export const demo4 = designPage(() => {
  const { refs, onRef } = useRefs({ input: iHTMLInputElement });

  return () => (
    <div class="demo-ui-component">
      <h1>测试 组件引用</h1>

      <UI.input ref={onRef.input} onChange={() => console.log(refs.input!.value)} />
      <UI.button onClick={() => refs.input!.focus()}>focus</UI.button>
    </div>
  );
});
