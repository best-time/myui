import { classnames } from "../utils/classnames";
import { globalCacheComputed } from "../utils/cacheComputed";
import { iEffects } from "@peryl/utils/createEffects";
import { logger } from "../utils/logger";
import { MultipleClass } from "./useClasses";
import { useInstanceEffects } from "./useInstanceEffects";

export function useClassCache<T extends () => MultipleClass>(fn: T, effects?: iEffects) {
  const insEffects = useInstanceEffects();
  if (!effects) {
    effects = insEffects;
  }
  if (!effects) {
    logger.setupError("useClassCache");
  }

  const val = globalCacheComputed<string>(
    () => classnames(fn()),
    (newValue, oldValue) => newValue !== oldValue,
    effects,
  );

  return val;
}
