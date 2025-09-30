import { inject, PropType, provide } from "vue";
import { designComponent } from "../packages/designComponent";

export interface iInjection<T> {
  (): T;

  <D>(data: D): T | D;
}

export function createProvider<T>(provideKey: string) {
  const Provider = designComponent({
    props: {
      value: { type: Object as PropType<T>, required: true },
    },
    slots: ["default"],
    setup({ props, slots }) {
      // @ts-ignore
      !!props.value && provide(provideKey, props.value);
      return () => slots.default();
    },
  });

  return {
    provideKey,
    Provider,
    provide: (context: T) => {
      provide(provideKey, context);
    },
    inject: ((defaultData?: any) => inject(provideKey, defaultData)) as iInjection<T>,
  };
}
