import { UnwrapNestedRefs } from "@vue/runtime-dom";

export * from "@vue/runtime-core";
import { reactive as __reactive__ } from "@vue/runtime-core";

export const reactive = __reactive__ as <T>(t: T) => UnwrapNestedRefs<T>;
