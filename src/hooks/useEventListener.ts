import type { ComponentPublicInstance, MaybeRef, MaybeRefOrGetter } from 'vue'
import { getCurrentScope, onScopeDispose, toValue, watch } from 'vue'

type EventListenerTarget = MaybeRefOrGetter<EventTarget | HTMLElement | Window | Document | null | undefined>

type ArrayAble<T> = T[] | T

type Events = ArrayAble<string> | ArrayAble<keyof WindowEventMap> | ArrayAble<keyof DocumentEventMap>

type Listeners = ArrayAble<EventListenerOrEventListenerObject>

type ListenerAndOptions = [EventListenerOrEventListenerObject, (boolean | AddEventListenerOptions)?]

type TEvent = keyof WindowEventMap | keyof DocumentEventMap | string

type MaybeEl = MaybeRef<HTMLElement | SVGElement | ComponentPublicInstance | undefined | null>

export default function useEventListener(
  target: EventListenerTarget,
  events: Events,
  listeners: ListenerAndOptions[] | Listeners,
  options?: boolean | AddEventListenerOptions,
  mapping?: boolean
): () => void

export default function useEventListener(
  target: EventListenerTarget,
  events: Events,
  listeners: ListenerAndOptions[] | Listeners,
  options?: boolean | AddEventListenerOptions,
  mapping?: boolean
) {
  // if (!target) {
  //   return () => {};
  // }
  events = Array.isArray(events) ? events : [events]
  listeners = Array.isArray(listeners) ? listeners : [listeners]
  listeners = listeners.map((listener) => {
    if (Array.isArray(listener)) {
      mapping = mapping ?? true
      return [listener[0], listener[1] ?? options]
    } else {
      mapping = mapping ?? false
      return [listener, options]
    }
  }) as ListenerAndOptions[]

  let cleanups: (() => void)[] = []

  const cleanup = () => {
    cleanups.forEach((fn) => fn())
    cleanups = []
  }

  const register = (
    target: EventTarget | HTMLElement | Window | Document,
    event: keyof WindowEventMap | keyof DocumentEventMap | string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ) => {
    target.addEventListener(event, listener, options)
    return () => target.removeEventListener(event, listener, options)
  }

  const stopWatch = watch(
    () => (toValue(target as unknown as MaybeEl) as ComponentPublicInstance)?.$el ?? toValue(target),

    (el) => {
      console.log(el)
      cleanup()
      if (!el) {
        return
      }
      const eventList = (events as []).flatMap((event: TEvent, i: number) => {
        if (!mapping) {
          return (listeners as []).map((listener: ListenerAndOptions) =>
            register(el, event, ...(listener as ListenerAndOptions))
          )
        }
        return [register(el, event, ...((listeners as [])[i] as ListenerAndOptions))]
      })
      cleanups.push(
        ...eventList
      )
    },
    { immediate: true, flush: 'post' }
  )

  const stop = () => {
    stopWatch()
    cleanup()
  }

  if (getCurrentScope()) {
    onScopeDispose(stop)
  }

  return stop
}

/*
const handleClick = (evt: Event) => {
  console.log(evt, "click handler 1");
};
const handleClick1 = (evt: Event) => {
  console.log(evt, "click handler 2");
};


useEventListener(document, "click", handleClick);
// 添加 option
useEventListener(document, "click", handleClick, { capture: true });


useEventListener(document, "click", [handleClick, handleClick1]);
// 公用 option
useEventListener(document, "click", [handleClick, handleClick1], { passive: true });
// 设置不同 option
useEventListener(document, "click", [
[handleClick, { capture: true }], [handleClick1, { once: true }]
], undefined, false);

// 多个event 添加相同 listener
useEventListener(document, ["mouseup", "mouseleave"], handleEnd);
// 多个 event 添加多个相同 listener
useEventListener(document, ["mouseup", "mouseleave"], [handleEnd, handleEnd1]);

多个 event 一一对应 listener
useEventListener(document, ["mouseup", "mouseleave"], [[handleMouseup], [handleMouseleave]]);


const stop = useEventListener(document, "click", handleClick);
// 当不再需要监听事件时，调用清理函数
stop();
 */
