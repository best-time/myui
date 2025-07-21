import type { App, Component, ComponentInternalInstance, ComponentOptionsMixin, ComponentPropsOptions, ComputedOptions, DefineComponent, Directive, EmitsOptions, ExtractPropTypes, MethodOptions, Ref, SetupContext } from "vue";
import { defineComponent, getCurrentInstance, inject, provide, ref } from "vue";
import type { ComponentEvent, EmitToProp, ObjectEmitOptions } from "./emit";
import { getComponentEmitOptions, useSetupEvent } from "./emit";
import type { ExtractComponentPropTypes, VueNode } from "./designComponent.utils";
import { renderNothing } from "./designComponent.utils";
import type { SlotProps } from "./slot";
import { useSetupSlots } from "./slot";
import type { ScopeSlotProps } from "./scopeSlots";
import { useSetupScopeSlots } from "./scopeSlots";
import type { InjectValue } from "./inject";
import { useDesignExpose } from "./expose";
import { error, log } from "../utils/log";
import type { InheritAttributes } from "./inherit";
import { getComponentPrefix } from "../utils/componentPrefix";
import { kebabCase } from "@peryl/utils/kebabCase";

export interface UseType<Refer, Props> {
  ref: () => Ref<Refer | null>;
  inject: InjectValue<Refer>;
  class: Refer;
  props: Props;
  name: string;
  options: any;
  getComponent: () => any;
}

function useReference<T = any>(defaultValue?: T) {
  return ref<null | T>(defaultValue || null);
}

export function designComponent<
  _,
  RawBindings,
  D,
  Refer,
  Expose extends object,
  Props extends Readonly<ExtractPropTypes<PropsOptions>>,
  SetupProps extends Readonly<ExtractPropTypes<PropsOptions> & { children: any }>,
  PropsOptions extends Readonly<ComponentPropsOptions> = {},
  C extends ComputedOptions = {},
  M extends MethodOptions = {},
  Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
  Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
  E extends EmitsOptions = {},
  EE extends string = string,
  EmitOptions extends ObjectEmitOptions = {},
  InheritPropsType extends ((props: any) => any) | (new () => any) | Record<string, any> = {},
  SlotKeys extends string = "",
  ScopeSlots extends { [k: string]: (scope: any) => void } = {},
  FcPropsType = ExtractComponentPropTypes<PropsOptions> &
    (Props extends { modelValue?: any } ? { "v-model"?: Props["modelValue"] } : {}) & {
      ref?: any;
    } & EmitToProp<EmitOptions> & { "v-slots"?: SlotProps<SlotKeys, ScopeSlots> & ScopeSlotProps<SlotKeys, ScopeSlots> },
  TargetInheritPropsType = Partial<Omit<InheritPropsType extends { use: { props: infer R } } ? R : InheritAttributes<InheritPropsType>, keyof FcPropsType>>,
>(options: {
  name?: string; // 组件名称
  provideRefer?: boolean; // 是否向子组件provide当前组件实例

  inheritAttrs?: boolean; // 是否自动继承属性
  inheritPropsType?: InheritPropsType; // 继承的属性类型

  props?: PropsOptions; // 组件可以接收的props
  emits?: EmitOptions; // 组件可以派发的事件
  expose?: Expose; // 组件额外暴露的变量
  slots?: SlotKeys[] | Readonly<SlotKeys[]>; // 组件插槽
  scopeSlots?: ScopeSlots; // 组件作用域插槽

  setup?: (data: {
    attrs: Record<string, any>;
    props: Props;
    event: ComponentEvent<EmitOptions>;
    slots: { [k in SlotKeys]: ((defaultReactNode?: VueNode) => VueNode) & { isExist: () => boolean } };
    scopeSlots: { [k in keyof ScopeSlots]: ((scope: Parameters<ScopeSlots[k]>[0], defaultNode?: VueNode) => VueNode) & { isExist: () => boolean } };

    setupContext: SetupContext<E>;
    ctx: ComponentInternalInstance;
  }) => { refer?: Refer; render: () => any } | (() => any);

  mixins?: any[];
  components?: Record<string, Component>;
  directives?: Record<string, Directive>;
}): DefineComponent<FcPropsType & TargetInheritPropsType, RawBindings, D, C, M, Mixin, Extends, E, EE> & { use: UseType<Refer, FcPropsType & TargetInheritPropsType> } & Expose & { install: (app: App) => void } {
  const { name, provideRefer, emits, setup, slots, scopeSlots, expose, ...leftOptions } = options;

  const Component = Object.assign(
    defineComponent({
      name,
      ...((leftOptions as any) || {}),
      props: leftOptions.props as PropsOptions,
      emits: getComponentEmitOptions(emits),
      setup(props: any, setupContext: any) {
        if (!setup) {
          return renderNothing;
        } else {
          const ctx = getCurrentInstance()!;
          Object.assign(ctx, { __is_in_setup_sync__: true });
          const event = useSetupEvent(setupContext, emits);
          !!ctx && ((ctx as any).event = event);
          const setupData = setup({
            props,
            attrs: setupContext.attrs,
            event,
            slots: useSetupSlots(setupContext, slots),
            scopeSlots: useSetupScopeSlots(setupContext, scopeSlots),
            setupContext,
            ctx,
          });
          Object.assign(ctx, { __is_in_setup_sync__: false });
          let { render, refer } = typeof setupData === "function" ? { render: setupData, refer: {} } : setupData;
          if (!refer) {
            refer = {};
          }
          // (refer as any).__getComponent__ = () => Component;
          !!ctx && useDesignExpose(ctx, refer, name);
          if (provideRefer) {
            if (!options.name) {
              error("component name is necessary when provideRefer is true!");
            } else {
              provide(`@@${name}`, refer);
            }
          }
          return render || renderNothing;
        }
      },
    }),
    {
      use: {
        inject: (defaultValue?: any) => inject(`@@${name}`, defaultValue) as Refer,
        ref: () => useReference<Refer>(),
        name,
        options,
        getComponent: () => Component,
      } as any as UseType<Refer, FcPropsType & TargetInheritPropsType>,
      install: (app: App) => {
        if (!name) {
          log("组件未定义name，无法注册！");
          return console.log("component", Component);
        }
        const optionName = kebabCase(name);
        const prefix = getComponentPrefix();
        let registryName = (!!prefix ? `${prefix}-${optionName}` : optionName).replace("--", "-");
        if (registryName.charAt(0) === "-") {
          registryName = registryName.slice(1);
        }
        app.component(registryName, Component);
      },
      ...expose,
    },
  ) as any;

  return Component;
}

export type ComponentPropsType<T> = T extends { use: { props: infer R } } ? R : never;
