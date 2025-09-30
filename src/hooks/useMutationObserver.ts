import {onScopeDispose} from 'vue'
import type { MaybeRefOrGetter } from 'vue'

const defaultWindow = window

export function useMutationObserver(
  target: MaybeComputedElementRef | MaybeComputedElementRef[] | MaybeRefOrGetter<MaybeElement[]>,
  callback: MutationCallback,
  options: UseMutationObserverOptions = {},
) {
  const { window = defaultWindow, ...mutationOptions } = options
  let observer: MutationObserver | undefined

  const cleanup = () => {
    if (observer) {
      observer.disconnect()
      observer = undefined
    }
  }

  const targets = computed(() => {
    const value = toValue(target)
    const items = toArray(value)
      .map(unrefElement)
      .filter(notNullish)
    return new Set(items)
  })

  const stopWatch = watch(
    () => targets.value,
    (targets) => {
      cleanup()

      if (targets.size) {
        observer = new MutationObserver(callback)
        targets.forEach(el => observer!.observe(el, mutationOptions))
      }
    },
    { immediate: true, flush: 'post' },
  )

  const takeRecords = () => {
    return observer?.takeRecords()
  }

  const stop = () => {
    stopWatch()
    cleanup()
  }

  onScopeDispose(stop)

  return {
    stop,
    takeRecords,
  }
}
