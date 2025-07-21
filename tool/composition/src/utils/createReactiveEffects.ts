import { createEffects } from "@peryl/utils/createEffects";
import { _globalComputed } from "../effect/_computed";
import { _globalWatch } from "../effect/_watch";
import { _globalWatchEffect } from "../effect/_watchEffect";

export function createEffectsOfReaction() {
  const { effects } = createEffects();

  /**
   * 同 globalComputed，但是自动调用effects.push来清理globalComputed的响应式监听
   * @author  韦胜健
   * @date    2024.9.3 22:59
   */
  const effectComputed: typeof _globalComputed = (...args: any[]) => {
    const cpt = (_globalComputed as any)(...args);
    effects.push(() => cpt.effect.stop());
    return cpt;
  };

  /**
   * 同 _globalWatch，但是自动调用effects.push来清理 _globalWatch 的响应式监听
   * @author  韦胜健
   * @date    2024.9.3 22:59
   */
  const effectWatch: typeof _globalWatch = (...args: any[]) => {
    const unwatch = (_globalWatch as any)(...args);
    effects.push(unwatch);
    return unwatch;
  };

  /**
   * 同 _globalWatchEffect，但是自动调用effects.push来清理 _globalWatchEffect 的响应式监听
   * @author  韦胜健
   * @date    2024.9.3 22:59
   */
  const effectWatchEffect: typeof _globalWatchEffect = (...args: any[]) => {
    const unwatch = (_globalWatchEffect as any)(...args);
    effects.push(unwatch);
    return unwatch;
  };

  return { effects, effectWatchEffect, effectWatch, effectComputed };
}
