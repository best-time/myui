import { getCurrentInstance, onBeforeUnmount } from "vue";
import { createEffects, iEffects } from "@peryl/utils/createEffects";

export function useInstanceEffects(): iEffects | undefined {
  const ins = getCurrentInstance();
  if (!!ins && !!(ins as any).__is_in_setup_sync__) {
    const { effects } = createEffects();
    onBeforeUnmount(effects.clear);
    return effects;
  } else {
    return undefined;
  }
}
