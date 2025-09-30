import { _globalComputed } from "../effect/_computed";
import { iEffects } from "@peryl/utils/createEffects";
import { logger } from "../utils/logger";
import { useInstanceEffects } from "./useInstanceEffects";
import { CSSProperties } from "vue";

export type StyleProperties = { [k in keyof CSSProperties]: any };

export function useStyles(getter: (styles: StyleProperties) => StyleProperties | void, effects?: iEffects) {
  const insEffects = useInstanceEffects();
  if (!effects) {
    effects = insEffects;
  }
  if (!effects) {
    logger.setupError("useStyles");
  }

  const cpt = _globalComputed<StyleProperties>(() => {
    const style = {};
    return getter(style) || style;
  });

  !!effects && effects.push(() => cpt.effect.stop());

  return cpt;
}
