import { getCurrentInstance, onBeforeUnmount, watchEffect } from "vue";
import { logger } from "../utils/logger";
import { useInstanceEffects } from "../use/useInstanceEffects";

export const _watchEffect: typeof watchEffect = (...args: any[]) => {
  const unwatch = (watchEffect as any)(...args);
  const ctxEffects = useInstanceEffects();
  if (!!ctxEffects) {
    ctxEffects.push(unwatch);
  } else {
    logger.setupError("watchEffect");
  }
  return unwatch;
};

export const _globalWatchEffect: typeof watchEffect = (...args: any[]) => {
  const unwatch = (watchEffect as any)(...args);
  const ins = getCurrentInstance();
  if (!!ins && !!(ins as any).__is_in_setup_sync__) {
    onBeforeUnmount(unwatch);
  }
  return unwatch;
};
