let prefix: string | null = null;

/**
 * 设置组件注册前缀
 * @author  韦胜健
 * @date    2022.4.25 19:51
 */
export function setComponentPrefix(val: null | string) {
  prefix = val;
}

/**
 * 获取组件注册前缀
 * @author  韦胜健
 * @date    2022.4.25 19:51
 */
export function getComponentPrefix() {
  return prefix;
}

/**
 * 获取组件样式前缀
 * @author  韦胜健
 * @date    2022.6.30 11:49
 */
export function getComponentCls(componentName: string) {
  const prefix = getComponentPrefix();
  return !prefix ? componentName : `${prefix}-${componentName}`;
}
