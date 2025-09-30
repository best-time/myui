/**
 * 创建一个缓存管理器，根据当前环境变量唯一标识隔离
 * @
 * @date    2022/8/2 10:16
 */
import { reactive } from 'vue'

export function createCache<D>(
  getCacheConfig?: () => {
    cacheName?: string | undefined
    envName?: string
  }
): { get: () => D | null; save: (data: D | null) => void } {
  const _getFullCacheName = (): string | undefined | null => {
    let { envName, cacheName } = getCacheConfig?.() || {}
    if (!cacheName) {
      /*没有缓存关键词，就不做缓存*/
      return null
    }
    envName = envName || ''
    const CACHE_NAME = `${envName}_${cacheName}`
    return CACHE_NAME
  }

  return {
    get: () => {
      const fullCacheName = _getFullCacheName()
      if (!fullCacheName) {
        return null
      }
      const cacheString = window.localStorage.getItem(fullCacheName)
      if (!!cacheString) {
        try {
          return JSON.parse(cacheString)
        } catch (e) {
          return null
        }
      } else {
        return null
      }
    },
    save: (data) => {
      const fullCacheName = _getFullCacheName()
      if (!fullCacheName) {
        return
      }
      if (data == null) {
        /*如果没有数据，则移除缓存*/
        localStorage.removeItem(fullCacheName)
      } else {
        /*否则更新缓存*/
        localStorage.setItem(fullCacheName, JSON.stringify(data))
      }
    }
  }
}

/**
 * 创建一个支持缓存的响应式全局状态
 * @
 * @date    2022/8/2 10:24
 */
export function createStore<D, E = unknown>({
  initialState,
  getCacheConfig,
  externals
}: {
  initialState: D // 没有缓存的时候的初始值
  externals?: E
  getCacheConfig?: () => {
    cacheName?: string | undefined
    envName?: string
  }
}): { value: D; clear: () => void } & E {
  const cache = createCache<D>(getCacheConfig)
  const state = reactive({ value: cache.get() || initialState }) as { value: D }
  return {
    get value() {
      return state.value
    },
    set value(data: D) {
      state.value = data
      cache.save(data)
    },
    clear: () => {
      state.value = initialState
      cache.save(null)
    },
    ...(externals as any)
  }
}

export type iStore<D> = ReturnType<typeof createStore<D>>
