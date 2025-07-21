/**
 * 创建一个同步的hook，如果需要支持响应式，则穿肚参数isReactive为true，返回的 state.innerHandlers为响应式数组
 * @author  韦胜健
 * @date    2022/2/20 12:27
 */
import { logger } from "./logger";
import { iEffects } from "@peryl/utils/createEffects";
import { reactive } from "../packages/reactivity";
import { useInstanceEffects } from "../use/useInstanceEffects";

export function createSyncHooks<Handler extends (arg: any) => any, InnerHandler = (arg: Parameters<Handler>["0"]) => void | Parameters<Handler>["0"]>(isReactive?: boolean, effects?: iEffects) {
  const insEffects = useInstanceEffects();
  if (!effects) {
    effects = insEffects;
  }
  if (!effects) {
    logger.setupError("createSyncHooks");
  }
  !!effects && effects.push(() => state.innerHandlers.splice(0, state.innerHandlers.length));

  const state: { innerHandlers: InnerHandler[] } = isReactive
    ? reactive({
        innerHandlers: [] as InnerHandler[],
      })
    : ({
        innerHandlers: [] as InnerHandler[],
      } as any);
  const use = (handler: InnerHandler) => {
    state.innerHandlers = [...state.innerHandlers, handler] as any;
    return () => eject(handler);
  };
  const eject = (handler: InnerHandler) => {
    state.innerHandlers = state.innerHandlers.filter((i) => i !== handler);
  };
  const exec = (arg: Parameters<Handler>["0"]): Parameters<Handler>["0"] => {
    if (state.innerHandlers.length === 0) {
      return arg;
    }
    let index = 0;
    const innerHandlers = [...state.innerHandlers];
    let innerHandler: InnerHandler | undefined = innerHandlers[index];
    while (!!innerHandler) {
      let newArg = (innerHandler as any)(arg);
      if (newArg !== undefined) {
        arg = newArg;
      }
      index++;
      innerHandler = innerHandlers[index] as any;
    }
    return arg;
  };
  return { use, eject, exec, state, getListeners: () => [...state.innerHandlers] };
}
