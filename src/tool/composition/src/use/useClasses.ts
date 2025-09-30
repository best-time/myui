import { classnames } from "../utils/classnames";
import { useInstanceEffects } from "./useInstanceEffects";
import { logger } from "../utils/logger";
import { _globalComputed } from "../effect/_computed";
import { iEffects } from "@peryl/utils/createEffects";

export type SingleClass = null | undefined | string | { [k: string]: boolean | null | undefined };
export type MultipleClass = SingleClass | SingleClass[];

export function useClasses<T extends () => MultipleClass>(fn: T, effects?: iEffects) {
  const insEffects = useInstanceEffects();
  if (!effects) {
    effects = insEffects;
  }
  if (!effects) {
    logger.setupError("useClasses");
  }

  const cpt = _globalComputed<string>(() => classnames(fn()));

  !!effects && effects.push(() => cpt.effect.stop());

  return cpt;
}

export default useClasses;
