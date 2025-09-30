import { iEffects } from "@peryl/utils/createEffects";
import { logger } from "../utils/logger";
import { delay } from "@peryl/utils/delay";
import { useInstanceEffects } from "./useInstanceEffects";
import { shallowReactive } from "vue";

export function useReference<T = any>(defaultValue?: T, setting?: { reactive: false } | { effects: iEffects }) {
  const notReactive = setting && "reactive" in setting && !setting.reactive;
  const insEffects = useInstanceEffects();
  const effects = !!setting && "effects" in setting ? setting.effects : insEffects;
  if (!effects && !notReactive) {
    logger.setupError("useReference");
  }
  if (!!effects) {
    effects.push(() => {
      delay().then(() => {
        ret.current = null;
      });
    });
  }

  const _ret: { current: null | T } = { current: defaultValue || null };
  const ret = notReactive ? _ret : shallowReactive(_ret);

  return ret;
}
