import { insertSort } from "@peryl/utils/insertSort";
import { createSyncHooks } from "./createSyncHooks";
import { iEffects } from "@peryl/utils/createEffects";
import { logger } from "./logger";
import { useInstanceEffects } from "../use/useInstanceEffects";
import { RenderNode } from "../packages/designComponent.utils";
import { Fragment, h } from "vue";
import { designComponent } from "../packages/designComponent";

/**
 * 渲染钩子
 * @author  韦胜健
 * @date    2023/4/4 9:53
 * @param   config.fragment 是否用fragment包住每一个 renderMeta
 * @param   config.single   是否只渲染第一个renderMeta，当只渲染第一个renderMeta的时候，往往需要设置fragment为false
 */
export function createRenderHook<T = void>(config?: { fragment?: boolean; single?: boolean; effects?: iEffects }) {
  let effects = config?.effects;
  const insEffects = useInstanceEffects();
  if (!effects) {
    effects = insEffects;
  }
  if (!effects) {
    logger.setupError("createRenderHook");
  }
  !!effects && effects.push(() => hook.state.innerHandlers.splice(0, hook.state.innerHandlers.length));

  /*hook执行参数类型*/
  type iHookData = iHookDataType<T>;
  /*exec函数类型*/
  type iExecFunc = iExecFuncType<T, iHookData>;

  const hook = createSyncHooks<(data: iHookData) => void>(true, effects);

  const exec: iExecFunc = (execData?: Partial<iHookData>) => {
    if (!execData) {
      execData = {};
    }
    if (!execData.renderMetas) {
      execData.renderMetas = [];
    }

    execData = hook.exec(execData as any) || execData;
    execData!.renderMetas = insertSort(execData!.renderMetas!, (a, b) => a.seq > b.seq);

    if (config?.single) {
      /*只渲染一个renderMeta*/
      return execData!.renderMetas[0].render(execData!.renderData!);
    } else {
      /*渲染多个renderMeta*/
      return execData!.renderMetas.map((renderMeta) => (config?.fragment !== false ? h(Fragment as any, { key: renderMeta.key }, renderMeta.render(execData!.renderData!) as any) : renderMeta.render(execData!.renderData!)));
    }
  };
  const use = ({ render, processor, separate }: iRenderUseParam<T>) => {
    const _render: typeof render =
      separate === false
        ? render
        : (() => {
            const Component: any = designComponent({
              name: "render-hook",
              props: { data: {} },
              setup({ props }) {
                return () => render(props.data as any);
              },
            });
            Component.use.__render__ = render;
            effects!.push(() => {
              delete Component.use;
            });
            return (data: T) => h(Component, { data });
          })();

    return hook.use(({ renderData, renderMetas }) => {
      processor({ data: renderData as any, list: renderMetas, render: _render });
    });
  };
  return {
    ...hook,
    use,
    exec,
  };
}

export interface iRenderMeta<T = unknown> {
  render: (data: T) => RenderNode;
  seq: number;
  key: string;
}

export type iHookDataType<T> = [T] extends [void] ? { renderMetas: iRenderMeta<T>[]; renderData?: T } : { renderMetas: iRenderMeta<T>[]; renderData: T };

export type iExecFuncType<T, iHookData> = [T] extends [void] ? (execData?: Partial<iHookData>) => RenderNode : (execData: Partial<iHookData>) => RenderNode;

export type iRenderUseParam<T> = {
  /*具体的渲染函数*/
  render: (data: T) => RenderNode;
  /*用来处理是否将渲染函数添加到渲染列表中*/
  processor: (data: { render: (data: T) => RenderNode; list: iRenderMeta<T>[]; data: T }) => iRenderMeta<T>[] | undefined | void;
  /*是否隔断，是则会创建一个组件隔断渲染函数的执行流程，避免因为这个渲染函数重新执行导致其他渲染函数重新执行，默认为true*/
  separate?: boolean;
};
/*
const noParamHook = createRenderHook();
noParamHook.use({
  processor: ({ list, render }) => {list.push({ render, key: '', seq: 1 });},
  render: () => {
    return (
      111
    );
  },
});
noParamHook.exec();

const withParamHook = createRenderHook<HTMLDivElement>();
withParamHook.use({
  processor: ({ list, render, data }) => {data.tagName === '' && list.push({ render, key: '', seq: 1 });},
  render: (data) => {
    return data.innerHTML;
  },
});*/
