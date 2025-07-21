import type { VueNode } from "./designComponent.utils";
import type { SetupContext } from "vue";
import { onBeforeUpdate, reactive } from "vue";
import { getSlotExist } from "./slot";

export type ScopeSlotProps<SlotKeys extends string, ScopeSlots extends { [k: string]: (scope: any) => any }> = {
  [k in Exclude<keyof ScopeSlots, SlotKeys>]?: (scope: Parameters<ScopeSlots[k]>[0]) => VueNode;
};

export interface iScopeSlotsOption {
  [k: string]: (scope: any) => void;
}

export type tScopeSlotsType<ScopeSlots extends { [k: string]: (scope: any) => any }> = { [k in keyof ScopeSlots]: ((scope: Parameters<ScopeSlots[k]>[0], defaultNode?: VueNode) => VueNode) & { isExist: () => boolean } };

export default {};

export function useSetupScopeSlots(ctx: SetupContext, scopeSlotsOptions?: iScopeSlotsOption) {
  const slotNames = Object.keys(scopeSlotsOptions || {});
  const existState = reactive(getSlotExist({}, slotNames, ctx));
  onBeforeUpdate(() => {
    getSlotExist(existState, slotNames, ctx);
  });

  return slotNames.reduce((prev: any, slotName: string) => {
    prev[slotName] = Object.assign(
      (scope: any, vnode: VueNode) => {
        const slot = ctx.slots[slotName];
        return slot != null ? slot(scope) : vnode;
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
