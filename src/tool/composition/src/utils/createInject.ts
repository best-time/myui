import { inject } from 'vue'

/**
 * 创建一个自带有provide name的inject函数
 * @
 * @date    2022.6.29 11:23
 */
export function createInject<T>(provideName: string) {
  /*没有传默认值，则返回类型为泛型。如果注入不到值则抛出异常*/
  function $inject(): T
  /*有默认值，则返回类型为默认值类型或者泛型*/
  function $inject<D>(defaultValue: D): D | T
  function $inject(defaultValue?: any): any {
    return inject(provideName, defaultValue)
  }

  return $inject
}
