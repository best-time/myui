import { iEffects } from "@peryl/utils/createEffects";
import { logger } from "../utils/logger";
import { delay } from "@peryl/utils/delay";
import { useInstanceEffects } from "./useInstanceEffects";
import { Ref, shallowReactive } from "vue";

type RefValueType<V> = V extends { use: { ref: () => Ref<infer Refer | null> } } ? Refer : V extends new (...args: any[]) => infer Refer ? Refer : V;

export function useRefs<T extends { [k: string]: any }>(config: T, setting?: { reactive: false } | { effects: iEffects }): tRefs<T> {
  const insEffects = useInstanceEffects();

  const notReactive = setting && "reactive" in setting && !setting.reactive;
  const effects = !!setting && "effects" in setting ? setting.effects : insEffects;
  if (!effects && !notReactive) {
    logger.setupError("useRefs");
  }
  if (!!effects) {
    effects.push(() => {
      delay().then(() => {
        Object.keys(refs).forEach((key) => {
          refs[key] = undefined;
        });
      });
    });
  }

  const refs = (() => {
    const sourceTarget = (() => {
      const obj = {} as any;
      for (let key in config) {
        obj[key] = undefined;
      }
      return obj;
    })();
    return notReactive ? sourceTarget : shallowReactive(sourceTarget);
  })();

  const onRef = (() => {
    const obj = {} as any;
    for (let key in config) {
      obj[key] = (refer: any) => {
        refs[key] = refer;
      };
    }
    return obj;
  })();

  return {
    refs,
    onRef,
  } as any;
}

export type tRefs<T extends { [k: string]: any }> = {
  refs: {
    [k in keyof T]: RefValueType<T[k]> | null | undefined;
  };
  onRef: {
    [k in keyof T]: (val: any) => void;
  };
};
