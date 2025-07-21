import { classnames } from "./classnames";
import type { InheritAttributes } from "../packages/inherit";
import { h } from "vue";

/**
 * 将部分vue中的属性写法转化为react中的属性写法
 * @author  韦胜健
 * @date    2023/12/29 15:16
 */
const ConvertProps = {
  className: "class",
  onTransitionEnd: "onTransitionend",
  onDoubleClick: "onDblclick",
  onMouseDown: "onMousedown",
  onMouseMove: "onMousemove",
  onMouseUp: "onMouseup",
  onMouseEnter: "onMouseenter",
  onMouseLeave: "onMouseleave",
  tabIndex: "tabindex",
  readOnly: "readonly",
  strokeWidth: "stroke-width",
  strokeLinecap: "stroke-linecap",
  strokeLinejoin: "stroke-linejoin",
} as const;

function createUIComponent<T>(Component: any) {
  return (props: GeneratePropsType<T>, context: { slots: Record<string, any>; emit: any; attrs: any }) => {
    const passProps = {} as any;
    Object.entries(props).forEach(([key, val]) => {
      if (key === "className" || key === "class") {
        val = classnames(val as any);
      }
      if (key in ConvertProps) {
        if ((ConvertProps as any)[key] in props) {
          console.error(`属性[${key}]与[${(ConvertProps as any)[key]}]不能同时存在！`);
        }
        passProps[(ConvertProps as any)[key]] = val;
      } else {
        passProps[key] = val;
      }
    });
    return h(Component, passProps, context.slots);
  };
}

export const UI = {
  button: createUIComponent<typeof HTMLButtonElement>("button"),
  div: createUIComponent<typeof HTMLDivElement>("div"),
  img: createUIComponent<typeof HTMLImageElement>("img"),
  i: createUIComponent<typeof HTMLElement>("i"),
  span: createUIComponent<typeof HTMLSpanElement>("span"),
  input: createUIComponent<typeof HTMLInputElement>("input"),
  textarea: createUIComponent<typeof HTMLInputElement>("textarea"),
  ul: createUIComponent<typeof HTMLInputElement>("ul"),
  li: createUIComponent<typeof HTMLInputElement>("li"),
  svg: createUIComponent<typeof SVGElement>("svg"),
};

/*@formatter:off*/
namespace Event {
  export type Mouse = MouseEvent;
  export type Focus = FocusEvent;
  export type Wheel = WheelEvent;
  export type Progress = ProgressEvent;
  export type Keyboard = KeyboardEvent;
  export type Transition = TransitionEvent;
}
export namespace UI {
  export type MouseEvent = Event.Mouse;
  export type FocusEvent = Event.Focus;
  export type WheelEvent = Event.Wheel;
  export type ProgressEvent = Event.Progress;
  export type KeyboardEvent = Event.Keyboard;
  export type TransitionEvent = Event.Transition;
}
/*@formatter:on*/

type iConvertProps = typeof ConvertProps;

type _ConvertTarget<T> = { [k in keyof iConvertProps]: iConvertProps[k] extends keyof T ? T[iConvertProps[k]] : null };

export type GeneratePropsType<Element, Override = { children: any }, Target = InheritAttributes<Element>> = Partial<Omit<Override & Target & _ConvertTarget<Target>, "className" | "class"> & { className: any; class: any }>;
