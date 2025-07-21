import { defineComponent, PropType } from "vue";
import { designComponent } from "../../src/packages/designComponent";

export default (() => {
  const Button = designComponent({
    props: {
      name: { type: String }, // 可选字符串属性
      age: { type: Number }, // 可选数字属性
      flag: { type: Boolean }, // 布尔值属性
      requireProp: { type: String, required: true }, // 必需字符串属性
      defaultProp: { type: Number, default: 111 }, // 默认值字符串属性

      handler: { type: Function as PropType<(val: string) => number> }, // 函数属性
    },
    setup({ props }) {
      // console.log(props.name.charAt(0))    // 可选值，可能是undefined
      // console.log(props.name!.toFixed())   // 是字符串不是数字
      console.log(props.name!.charAt(0));

      // console.log(props.age.toFixed(0))      // 可选值，可能是undefined
      // console.log(props.age!.charAt(0))      // 是数字而不是字符串
      console.log(props.age!.toFixed(0));

      // console.log(props.flag.charAt(0))       // 布尔值，而不是字符串
      console.log(props.flag.valueOf()); // 布尔值

      console.log(props.requireProp.charAt(0));
      console.log(props.defaultProp.toPrecision(2));

      // props.handler('')   //  非必需属性，可能是undefined
      props.handler!("").toFixed(0); //

      const temProps = { ...props };
      temProps.handler!("");

      return () => <>render success:${props.requireProp}</>;
    },
  });

  return defineComponent(() => {
    return () => (
      <>
        <h1>测试 props 类型</h1>
        <Button requireProp="111" name="name" age={199} handler={() => (console.log(111), 1)} />
      </>
    );
  });
})();
