import { ComputedGetter, ComputedRefImpl, DebuggerOptions, effectScope, WritableComputedOptions, WritableComputedRef } from "@vue/reactivity";
import { computed, ComputedRef, getCurrentInstance, onBeforeUnmount } from "vue";
import { logger } from "../utils/logger";
import { useInstanceEffects } from "../use/useInstanceEffects";

export const _computed: typeof __computed = ((...args: any[]) => {
  const computedRef = (__computed as any)(...args);
  const ctxEffects = useInstanceEffects();
  if (!!ctxEffects) {
    ctxEffects.push(() => computedRef.effect.stop());
  } else {
    logger.setupError("computed");
  }
  return computedRef;
}) as any;

export const _globalComputed: typeof __computed = (...args: any[]) => {
  const computedRef = (__computed as any)(...args);
  const ins = getCurrentInstance();
  if (!!ins && !!(ins as any).__is_in_setup_sync__) {
    onBeforeUnmount(() => computedRef.effect.stop());
  }
  return computedRef;
};

/**
 * 对 computed 做包装，兼容性处理遗弃掉的effect.stop属性
 * @author  韦胜健
 * @date    2024.9.21 23:13
 */
function __computed<T>(getter: ComputedGetter<T>, debugOptions?: DebuggerOptions): iPlainComputedRef<T>;
function __computed<T>(options: WritableComputedOptions<T>, debugOptions?: DebuggerOptions): iPlainWritableComputedRef<T>;
function __computed(option: any, debugOptions: any) {
  const scope = effectScope();
  /*判断当前是否已经停止响应式的标识*/
  let isStopped = false;
  /*每次计算都保存为最新的值，当stopped之后，每次都返回这个最后计算的值*/
  let lastValue: any;
  const stop = () => {
    if (isStopped) {
      return;
    }
    isStopped = true;
    scope.stop();
  };
  let cptRef: any;
  scope.run(() => {
    cptRef = computed(
      ((): any => {
        if (typeof option === "function") {
          const oldFn = option;
          const newFn = () => {
            /*已经停止响应式的情况下，固定返回最后一次计算的值*/
            if (isStopped) {
              return lastValue;
            }
            lastValue = oldFn();
            return lastValue;
          };
          return newFn;
        } else {
          const oldFn = option.get;
          const newGetter = () => {
            if (isStopped) {
              return lastValue;
            }
            lastValue = oldFn();
            return lastValue;
          };
          const newOption = { get: newGetter, set: option.set };
          return newOption;
        }
      })(),
      debugOptions,
    );
    if (!cptRef.effect) {
      cptRef.effect = { stop };
    }
    if (!cptRef.effect.stop) {
      cptRef.effect.stop = stop;
    }
  });
  return cptRef;
}

export type iPlainComputedRef<T> = Omit<ComputedRef<T>, "effect"> & { effect: { stop: () => void } & ComputedRefImpl<T> };
export type iPlainWritableComputedRef<T> = Omit<WritableComputedRef<T>, "effect"> & { effect: { stop: () => void } & ComputedRefImpl<T> };
