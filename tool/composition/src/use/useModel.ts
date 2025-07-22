import { iEffects } from '@peryl/utils/createEffects'
import { logger } from '../utils/logger'
import { _globalWatch } from '../effect/_watch'
import { useInstanceEffects } from './useInstanceEffects'
import { ref } from 'vue'

/**
 * 双向绑定组合函数
 * @
 * @date    2020/10/19 9:21
 */
export function useModel<T>(
  getter: () => T,
  emitter: (val: T) => void,
  config?: UseModelConfig<T>,
  effects?: iEffects
) {
  const insEffects = useInstanceEffects()
  if (!effects) {
    effects = insEffects
  }
  if (!effects) {
    logger.setupError('useModel')
  }

  const state = ref(getter()) as { value: T }
  config = config || {}

  if (config.autoWatch !== false) {
    const unwatch = _globalWatch(getter, (val: T) => {
      if (val != state.value) {
        if (config!.onChange) {
          config!.onChange(val, state.value)
        }
        state.value = val
      }
    })
    !!effects && effects.push(unwatch)
  }

  return {
    get value() {
      return state.value
    },
    set value(val: T) {
      state.value = val
      if (config!.autoEmit !== false) {
        emitter(val)
      }
    }
  }
}

export default useModel

export type UseModelConfig<T = any> = {
  autoEmit?: boolean | undefined
  autoWatch?: boolean | undefined
  onChange?: (newVal: T, oldVal: T) => void
}

export type ModelType<T = any> = { value: T | null | undefined }
