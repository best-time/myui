import type { VueNode } from "./designComponent.utils";
import type { SetupContext } from "vue";
import { onBeforeUpdate, reactive } from "vue";

export type SlotProps<SlotKeys extends string, ScopeSlots extends { [k: string]: any }> = {
  [k in Exclude<SlotKeys, keyof ScopeSlots>]?: () => VueNode;
};

export type tSlotsType<SlotKeys extends string[] | Readonly<string[]>> = { [k in SlotKeys[number]]: ((defaultReactNode?: VueNode) => VueNode) & { isExist: () => boolean } };

export default {};

/**
 * 判断插槽是否存在
 * @author  韦胜健
 * @date    2021/9/18 10:47
 */
export function getSlotExist(prevExist: { [k: string]: boolean }, slotNames: string[], ctx: SetupContext) {
  slotNames.forEach((slotName) => {
    const flag = ctx.slots[slotName] != null;
    if (prevExist![slotName] !== flag) {
      prevExist![slotName] = flag;
    }
  });
  return prevExist;
}

export function useSetupSlots(ctx: SetupContext, slots?: string[] | Readonly<string[]>) {
  const slotNames = [...(slots || []), "default"];
  const existState = reactive(getSlotExist({}, slotNames, ctx));

  onBeforeUpdate(() => {
    getSlotExist(existState, slotNames, ctx);
  });

  return slotNames.reduce((prev, slotName: string) => {
    prev[slotName] = Object.assign(
      (defaultNode: VueNode) => {
        const slot: any = ctx.slots[slotName];
        return slot != null ? slot() : defaultNode;
      },
      {
        isExist() {
          return existState[slotName];
        },
      },
    );
    return prev;
  }, {} as any);
}
