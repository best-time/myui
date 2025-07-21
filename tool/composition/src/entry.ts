// @ts-ignore
import packageJson from "../package.json";
import { getCurrentInstance, Teleport } from "vue";
import { _computed } from "./effect/_computed";
import { _watch } from "./effect/_watch";
import { _watchEffect } from "./effect/_watchEffect";

export { designComponent } from "./packages/designComponent";
export { useReference } from "./use/useReference";
export type { ComponentPropsType } from "./packages/designComponent";
export { designPage } from "./packages/designPage";

export type { MultipleClass, SingleClass } from "./use/useClasses";
export { useClasses } from "./use/useClasses";
export type { StyleProperties } from "./use/useStyles";
export { useStyles } from "./use/useStyles";
export type { ModelType } from "./use/useModel";
export { useModel } from "./use/useModel";

export { useMounted } from "./use/useMounted";
export { useNumber } from "./use/useNumber";
export { useRefs } from "./use/useRefs";
export type { UseRefList } from "./use/useRefList";
export { useRefList } from "./use/useRefList";
export { nextIndex } from "./utils/nextIndex";
export { toArray } from "@peryl/utils/toArray";
export { useAsyncMethods } from "./use/useAsyncMethods";
export { useCollect } from "./use/useCollect";

export type { RenderNode, VueNode } from "./packages/designComponent.utils";
export type { ComponentEvent, EmitToProp, ObjectEmitOptions, SimpleFunction } from "./packages/emit";
export { createEventListener } from "./utils/createEventListener";
export type { iScopeSlotsOption } from "./packages/scopeSlots";
export type { InjectValue } from "./packages/inject";
export { error, log, warn } from "./utils/log";

export type { tSlotsType } from "./packages/slot";
export type { tScopeSlotsType } from "./packages/scopeSlots";
export type { tRefs } from "./use/useRefs";

export { createHooks } from "./utils/createHooks";
export { createSyncHooks } from "./utils/createSyncHooks";
export type { PlainObject } from "@peryl/utils/event";
export * from "./packages/inherit";
export * from "vue";

export * from "./utils/PlainEvent";
export { getComponentPrefix, setComponentPrefix, getComponentCls } from "./utils/componentPrefix";

export const getCurrentDesignInstance = () => getCurrentInstance()!;
export const Portal = Teleport;
export { getCurrentInstance };
export { createInject } from "./utils/createInject";
export { createProvider } from "./utils/createProvider";
export type { iInjection } from "./utils/createProvider";
export { createModule } from "./utils/createModule";
export { delay } from "@peryl/utils/delay";
export { mergeAttrs } from "./utils/mergeAttrs";
export { createRenderHook } from "./utils/createRenderHook";
export { cacheComputed, globalCacheComputed } from "./utils/cacheComputed";
export { createEffectsOfReaction } from "./utils/createReactiveEffects";
export { useStyleCache } from "./use/useStyleCache";
export { useClassCache } from "./use/useClassCache";
export { classnames } from "./utils/classnames";
export { createCache, createStore } from "./utils/createStore";
export type { iStore } from "./utils/createStore";
export { findReactElement } from "./utils/findReactElement";
export { createCounter } from "@peryl/utils/createCounter";
export { useGeneralityConfig } from "./use/useGeneralityConfig";
export { anonymousEffects } from "./utils/anonymousEffects";
export { reactive } from "./packages/reactivity";

export const watch = _watch;
export { _globalWatch as globalWatch } from "./effect/_watch";
export const watchEffect = _watchEffect;
export { _globalWatchEffect as globalWatchEffect } from "./effect/_watchEffect";
export const computed = _computed;
export { _globalComputed as globalComputed } from "./effect/_computed";
export type { iPlainComputedRef, iPlainWritableComputedRef } from "./effect/_computed";
export const version = packageJson.version;

export * from "./utils/UI";
export type { iExecFuncType, iHookDataType, iRenderMeta, iRenderUseParam } from "./utils/createRenderHook";
export const isVue = true;
export const isReact = false;

export type iMouseEvent = MouseEvent;
export type iKeyboardEvent = KeyboardEvent;
export type iFocusEvent = FocusEvent;
export type iChangeEvent = { target: any; currentTarget: any; preventDefault: () => void; stopPropagation: () => void };
export type iDragEvent = DragEvent;
export type iTransitionEvent = TransitionEvent;
export type iWheelEvent = WheelEvent;
export type iClipboardEvent = ClipboardEvent;
export type iCompositionEvent = CompositionEvent;
export type iTouchEvent = TouchEvent;
