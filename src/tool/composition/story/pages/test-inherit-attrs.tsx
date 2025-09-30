import { ButtonHTMLAttributes, defineComponent, PropType } from "vue";
import { designComponent } from "../../src/packages/designComponent";
import "./test-inherit-attrs.scss";

export default (() => {
  const Parent = designComponent({
    inheritPropsType: {} as ButtonHTMLAttributes,
    props: {
      name: { type: String }, // 可选字符串属性
      age: { type: Number }, // 可选数字属性
      flag: { type: Boolean }, // 布尔值属性
      requireProp: { type: String, required: true }, // 必需字符串属性
      defaultProp: { type: Number, default: 111 }, // 默认值字符串属性

      handler: { type: Function as PropType<(val: string) => number> }, // 函数属性
    },
    emits: {
      onAdd: (num: number) => true,
      onSub: (num: number) => true,
      onMousedown: (e: number) => true,
    },
    setup({ props, event: { emit } }) {
      return () => <div>this is parent</div>;
    },
  });

  const Child = designComponent({
    inheritPropsType: Parent,
    props: {
      name: { type: Boolean }, // 覆盖属性
      age: { type: Boolean }, // 覆盖属性
      otherProps: { type: String },
    },
    emits: {
      onAdd: (num: string) => true, // 覆盖事件
      onOther: (val: Date) => true,
    },
    setup({ props, event: { emit } }) {
      return () => (
        <div>
          this is child
          <Parent requireProp="111" defaultProp={222} accesskey="222" />
        </div>
      );
    },
  });

  return defineComponent(() => {
    return () => (
      <>
        <h1>测试继承属性类型：inheritPropsType</h1>

        {/*name 和 age 的类型已经覆盖为boolean*/}
        {/*<Child name="111" age={123}/>*/}

        {/*requireProp的类型为字符串*/}
        {/*<Child requireProp={true}/>*/}

        <Child name={true} age={false} requireProp="111" accesskey="111" autofocus onClick={(e) => e.stopPropagation()} onMousedown={(e) => e.toPrecision(1)} onAdd={(val) => console.log(val.charAt(0)) /*覆盖的事件*/} onSub={(val) => console.log(val.toExponential(2)) /*继承的事件*/} onOther={(val) => val.getTime() /*自定义的事件*/} />
      </>
    );
  });
})();
