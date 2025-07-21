import { defineComponent } from "vue";
import { designComponent } from "../../src/packages/designComponent";

export const demo1 = (() => {
  const Button = designComponent({
    expose: {
      utils: { sayHello: (val?: number) => val },
    },
  });

  // Button.utils.sayHello(112233).toFixed(1)
  Button.utils.sayHello(112233)?.toFixed(1);

  return defineComponent(() => {
    return () => <>page test ref</>;
  });
})();
