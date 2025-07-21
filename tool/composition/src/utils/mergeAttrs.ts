import { deepcopy } from "@peryl/utils/deepcopy";

export function mergeAttrs(...propsList: (Record<string, any> | null | undefined)[]) {
  let target: Record<string, any> = {};
  if (propsList.length <= 1) {
    return propsList[0] || target;
  }
  propsList.forEach((props) => {
    if (!props) {
      return;
    }
    Object.entries(props).forEach(([key, value]) => {
      if (key === "class" || key === "className") {
        /*---------------------------------------合并class-------------------------------------------*/
        if (!target.class) {
          target.class = [];
        }
        if (!Array.isArray(target.class)) {
          target.class = [target.class];
        } else {
          target.class = deepcopy(target.class);
        }
        target.class.push(value);
      } else if (key === "style") {
        /*---------------------------------------合并style-------------------------------------------*/
        target.style = Object.assign({}, target.style, value);
      } else if (eventPatter.test(key) && typeof value === "function") {
        /*---------------------------------------合并监听事件函数-------------------------------------------*/
        const oldListener = target[key];
        target[key] = !oldListener
          ? value
          : (...args: any[]) => {
              oldListener(...args);
              value(...args);
            };
      } else {
        /*以上情况都不符合，直接覆盖*/
        target[key] = value;
      }
    });
  });
  return target;
}

const eventPatter = /^on[A-Z]/;
