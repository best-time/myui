import { createEffects } from '@peryl/utils/createEffects'
import { ComputedRef, markRaw, onBeforeUnmount, reactive, watch } from 'vue'

const defaultShouldUpdate = (newVal: any, oldVal: any) => newVal !== oldVal

/**
 * - computed函数的一个包装版本
 * - 第一次获取计算属性的值的时候才开始执行fn获取初始值，这个点与computed函数一致
 * - 当fn返回相同的值的时候，不触发重新渲染，原始的computed函数没有做这个处理，只要computed函数重新执行一定会导致内容重新渲染
 * @
 * @date    2023.4.14 20:20
 * @param   getter            获取值的函数
 * @param   shouldUpdate      判断值是否相等
 */
export const cacheComputed = <T>(
  getter: () => T,
  shouldUpdate?: (newValue: T, oldValue: T) => boolean
): ComputedRef<T> => {
  if (shouldUpdate === undefined) {
    shouldUpdate = defaultShouldUpdate
  }

  /*标记，第一次获取值的时候才初始化watch*/
  let init = false
  /*响应式变量，判断fn值变化之后才修改这个变量触发更新*/
  const state = reactive({ value: null }) as { value: T }
  /*响应式变量的非响应式对象，用来第一次获取值的时候代替对响应式变量进行赋值，避免直接对响应式值进行赋值导致第一次获取值的时候又触发一次render*/
  const rawState = markRaw(state)

  const { effects } = createEffects()
  onBeforeUnmount(effects.clear)

  return {
    __v_isRef: true,
    get value(): T {
      /*非第一次获取，直接返回响应式值*/
      if (init) {
        return state.value
      }
      effects.clear()
      /*第一次获取值，开启对fn的监听，fn的值变化的时候赋值给响应式变量，*/
      effects.push(
        watch(
          () => getter(),
          (newVal, oldVal) => {
            if (!init) {
              /*第一次赋值给非响应式变量，避免直接给响应式变量赋值，导致第一次的时候又触发一次render*/
              rawState.value = newVal as any
            } else {
              /*值变化的时候才给响应式变量赋值*/
              if (shouldUpdate!(newVal, oldVal!)) {
                state.value = newVal as any
              }
            }
          },
          { flush: 'sync', immediate: true }
        )
      )

      /*标记初始化完毕*/
      init = true

      /*返回响应式变量，不能是非响应式变量，不然以后修改响应式变量无法触发这里重新执行*/
      return state.value
    }
  } as any
}
