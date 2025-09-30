import { insertSort } from '@peryl/utils/insertSort'
import { getFunctionValue } from '@peryl/utils/getFunctionValue'
import { _globalComputed } from '../effect/_computed'
import { logger } from '../utils/logger'
import { iEffects } from '@peryl/utils/createEffects'
import { useInstanceEffects } from './useInstanceEffects'
import { reactive } from '../packages/reactivity'

/**
 * 创建一个泛型的渲染配置管理对象
 * @
 * @date    2024.7.6 14:08
 */
export function useGeneralityConfig<Config extends { seq: number; code: string }>({
  effects,
  getErrorMessage: _getErrorMessage,
  generalityConfigName
}: {
  effects?: iEffects
  getErrorMessage?: (code: string) => string
  generalityConfigName?: string
}) {
  const insEffects = useInstanceEffects()
  if (!effects) {
    effects = insEffects
  }
  if (!effects) {
    logger.setupError('useGeneralityConfig')
  }
  effects?.push(() => {
    state.configMap = undefined as unknown as any
  })

  const state = reactive({
    /**
     * 注册的配置信息
     * @
     * @date    2024.7.6 14:00
     */
    configMap: {} as Record<
      string,
      | undefined
      | {
          seq: number
          code: Config['code']
          sourceConfig: Omit<Config, 'code' | 'seq'> | (() => Omit<Config, 'code' | 'seq'>)
        }
    >
  })

  /**
   * 注册配置
   * @
   * @date    2024.7.6 14:01
   */
  const registry = (
    seq: number,
    code: Config['code'],
    sourceConfig: Omit<Config, 'code' | 'seq'> | (() => Omit<Config, 'code' | 'seq'>)
  ) => {
    state.configMap = {
      ...state.configMap,
      [code]: { seq, code, sourceConfig }
    }
  }

  /**
   * 格式化之后的配置数据信息
   * @
   * @date    2024.7.6 14:01
   */
  const configData = _globalComputed(() => {
    const list: Config[] = []
    const map: Record<string, Config> = {}
    Object.entries(state.configMap).forEach(([code, val]) => {
      if (!code || !val) {
        return
      }
      const { sourceConfig, ...leftConfig } = val
      const _config = getFunctionValue(sourceConfig)!
      const config: Config = { ...leftConfig, ..._config } as any
      list.push(config)
      map[code] = config
    })
    insertSort(list, (a, b) => a.seq > b.seq)
    return { list, map }
  })

  !!effects &&
    effects.push(() => {
      configData.effect.stop()
    })

  /**
   * 获取配置信息数组数据
   * @
   * @date    2024.7.6 14:01
   */
  const getList: () => Config[] = () => configData.value.list

  /**
   * 根据code获取配置信息对象
   * @
   * @date    2024.7.6 14:01
   */
  const getByCode = (code: Config['code']): Config | undefined => configData.value.map[code]

  /**
   * 根据code获取配置信息对象，为空则抛出异常
   * @
   * @date    2024.7.15 13:50
   */
  const getByCodeForce = (code: Config['code'], getErrorMessage?: () => string): Config => {
    const ret = configData.value.map[code]
    if (!ret) {
      const errorMessage =
        (getErrorMessage ? getErrorMessage() : _getErrorMessage?.(code)) ||
        `${generalityConfigName}: Can't find config by code: ${code}!`
      throw new Error(errorMessage)
    }
    return ret
  }

  return {
    state,
    registry,
    getList,
    getByCode,
    getByCodeForce
  }
}
