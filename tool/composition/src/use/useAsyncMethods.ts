import { _globalComputed } from "../effect/_computed";
import { iEffects } from "@peryl/utils/createEffects";
import { logger } from "../utils/logger";
import { reactive } from "../packages/reactivity";
import { ref } from "vue";
import { useInstanceEffects } from "./useInstanceEffects";

export function useAsyncMethods<Methods extends { [k: string]: (...args: any) => any }>(methods: Methods, delayTimer = 200, effects?: iEffects): Methods & { isLoading: { [k in keyof Methods]: boolean } & { all: boolean } } {
  const insEffects = useInstanceEffects();
  if (!effects) {
    effects = insEffects;
  }
  if (!effects) {
    logger.setupError("useAsyncMethods");
  }

  const loadingKeys = ref([] as string[]);
  const isLoading = reactive({
    ...Object.keys(methods).reduce((prev, key) => {
      const cpt = _globalComputed(() => loadingKeys.value.indexOf(key) > -1);
      !!effects && effects.push(() => cpt.effect.stop());
      prev[key] = cpt;
      return prev;
    }, {} as any),
    all: (() => {
      const cpt = _globalComputed(() => loadingKeys.value.length > 0);
      !!effects && effects.push(() => cpt.effect.stop());
      return cpt;
    })(),
  });

  return {
    ...Object.entries(methods).reduce((prev, [methodsKey, methodFunc]) => {
      (prev as any)[methodsKey] = async (...args: any[]) => {
        // 方法目前正在加载状态，再次调用不做任何操作
        if (isLoading[methodsKey]) {
          return;
        }
        let timer: any = setTimeout(() => {
          loadingKeys.value.push(methodsKey);
          timer = null;
        }, delayTimer);
        try {
          return await methodFunc(...args);
        } catch (e) {
          console.warn("cancel loading!");
          throw e;
        } finally {
          if (timer != null) {
            /*当前加载时间没有超过 delayTimer，直接清空定时器*/
            clearTimeout(timer);
          } else {
            /*当前加载事件已经超过 delayTimer，表明定时器已经执行，此时关闭加载状态*/
            loadingKeys.value.splice(loadingKeys.value.indexOf(methodsKey), 1);
          }
        }
      };
      return prev;
    }, {} as Methods),
    isLoading,
  } as any;
}
