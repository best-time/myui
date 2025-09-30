import type { ComponentInternalInstance } from 'vue'
import { error } from '../utils/log'

/**
 * 将refer暴露给ctx.proxy
 * 检查refer中的key是否与ctx.proxy中的key是否冲突
 * @
 * @date    2021/9/18 10:24
 */
export function useDesignExpose(ctx: ComponentInternalInstance, refer: any, componentName?: string) {
  if (!refer) {
    return
  }
  const duplicateKey = Object.keys(refer || {}).find((i) => i in ctx.proxy!)
  if (!!duplicateKey) {
    error(`designComponent:${componentName} key '${duplicateKey}' in refer is not allow here!`)
  } else {
    Object.assign(ctx.proxy!, refer)
  }
}
