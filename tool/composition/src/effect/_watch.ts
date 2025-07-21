import { getCurrentInstance, onBeforeUnmount, watch } from "vue";
import { logger } from "../utils/logger";
import { useInstanceEffects } from "../use/useInstanceEffects";

export const _watch: typeof watch = (...args: any[]) => {
  const unwatch = (watch as any)(...args);
  const ctxEffects = useInstanceEffects();
  if (!!ctxEffects) {
    ctxEffects.push(unwatch);
  } else {
    logger.setupError("watch");
  }
  return unwatch;
};

export const _globalWatch: typeof watch = (...args: any[]) => {
  const unwatch = (watch as any)(...args);
  const ins = getCurrentInstance();
  if (!!ins && !!(ins as any).__is_in_setup_sync__) {
    onBeforeUnmount(unwatch);
  }
  return unwatch;
};

export const _sourceWatch = watch;
