/**
 * 创建一个支持异步的hook
 * @author  韦胜健
 * @date    2022/2/20 12:25
 */
import { iEffects } from "@peryl/utils/createEffects";
import { logger } from "./logger";
import { useInstanceEffects } from "../use/useInstanceEffects";

export function createHooks<Handler extends (arg: any) => any, InnerHandler = (arg: Parameters<Handler>["0"]) => void | Parameters<Handler>["0"] | Promise<void | Parameters<Handler>["0"]>>(effects?: iEffects) {
  const insEffects = useInstanceEffects();
  if (!effects) {
    effects = insEffects;
  }
  if (!effects) {
    logger.setupError("createHooks");
  }
  !!effects && effects.push(() => innerHandlers.splice(0, innerHandlers.length));

  const innerHandlers: InnerHandler[] = [];
  const use = (handler: InnerHandler) => {
    innerHandlers.push(handler);
    return () => eject(handler);
  };
  const eject = (handler: InnerHandler) => {
    const index = innerHandlers.indexOf(handler);
    if (index > -1) {
      innerHandlers.splice(index, 1);
    }
  };
  const exec = async (arg: Parameters<Handler>["0"]): Promise<Parameters<Handler>["0"]> => {
    if (innerHandlers.length === 0) {
      return arg;
    }
    let index = 0;
    let innerHandler: InnerHandler | undefined = innerHandlers[index];
    while (!!innerHandler) {
      let newArg = await (innerHandler as any)(arg);
      if (newArg !== undefined) {
        arg = newArg;
      }
      index++;
      innerHandler = innerHandlers[index];
    }
    return arg;
  };
  return { use, eject, exec, getListeners: () => [...innerHandlers] };
}
