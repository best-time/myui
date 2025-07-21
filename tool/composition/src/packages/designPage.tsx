import type { VueNode } from "./designComponent.utils";
import { designComponent } from "./designComponent";

export function designPage(setup: (props: any) => () => VueNode) {
  return designComponent({
    setup({ attrs }) {
      return setup(attrs);
    },
  });
}
