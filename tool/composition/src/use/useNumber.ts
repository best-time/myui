import { _globalWatch } from "../effect/_watch";
import { iEffects } from "@peryl/utils/createEffects";
import { logger } from "../utils/logger";
import { useInstanceEffects } from "./useInstanceEffects";
import { reactive } from "../packages/reactivity";

function toNumber(val: null | string | number) {
  if (val == null) {
    return;
  }
  if (typeof val === "string") {
    return Number(val.replace("px", ""));
  }
  return val;
}

export function useNumber<Props extends { [k: string]: any }, K extends string>(props: Props, keys: K[], effects?: iEffects): { numberState: { [k in K]: Exclude<Props[k], string> } } {
  const insEffects = useInstanceEffects();
  if (!effects) {
    effects = insEffects;
  }
  if (!effects) {
    logger.setupError("useNumber");
  }

  const state = reactive(
    (() => {
      const ret = {} as Record<string, number | undefined>;
      keys.forEach((key) => {
        ret[key] = toNumber(props[key]);
      });
      return ret;
    })(),
  );

  keys.forEach((key) => {
    const unwatch = _globalWatch(
      () => props[key],
      (val: any) => (state[key] = toNumber(val)),
    );
    !!effects && effects.push(unwatch);
  });

  return {
    numberState: state as any,
  };
}

/*const {numberState} = useNumber({
    noField: 11,
    level: 1,
    age: 2 as number | undefined,
    limit: '2' as string | number | undefined,
}, [
    'level',
    'age',
    'limit',
])

numberState.level.toFixed(0)
numberState.age.toFixed(0)
numberState.limit.toFixed(0)*/
