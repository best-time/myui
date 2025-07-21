import { globalCacheComputed } from "../utils/cacheComputed";
import { iEffects } from "@peryl/utils/createEffects";
import { logger } from "../utils/logger";
import { StyleProperties } from "./useStyles";
import { useInstanceEffects } from "./useInstanceEffects";

export function useStyleCache(fn: (styles: StyleProperties) => StyleProperties | void, effects?: iEffects) {
  const insEffects = useInstanceEffects();
  if (!effects) {
    effects = insEffects;
  }
  if (!effects) {
    logger.setupError("useStyleCache");
  }
  const _fn = () => {
    const style = {};
    return fn(style) || style;
  };
  return globalCacheComputed<StyleProperties>(_fn, (newValue, oldValue) => JSON.stringify(newValue) !== JSON.stringify(oldValue), effects);
}
