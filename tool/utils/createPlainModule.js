import { createEffects } from './createEffects'
import { createLogger } from './createLogger'
import { deepcopy } from './deepcopy'
import { delay } from './delay'
export function createPlainModule({ name, onBeforeUnmount, reactive, markRaw }) {
  const error = createLogger(name, 'error')
  /**
   * 注册一个AutoOption组合模块所需要的参数类型
   *
   *        2/6 10:39
   */
  class OptionRegistration {
    seq
    key
    handler
    constructor(seq, key, handler) {
      this.seq = seq
      this.key = key
      this.handler = handler
    }
  }
  /**
   * 创建组合模块注册管理器
   *
   *        2/6 10:39
   */
  const createRegistrationManager = () => {
    /**
     * 已经注册的组合模块
     *
     *        2/6 11:10
     */
    const registrations = []
    /**
     * 新增/覆盖 一个组合模块
     *
     *        2/6 11:10
     */
    const use = (seq, key, handler) => registrations.push({ seq, key, handler })
    /**
     * 执行所有的组合模块
     *
     *        2/6 11:10
     */
    const exec = (option, externalRegistrations) => {
      let result = []
      ;(!externalRegistrations ? registrations : [...registrations, ...externalRegistrations]).forEach((item) => {
        const overrideIndex = result.findIndex((i) => i.key === item.key)
        if (overrideIndex === -1) {
          /*新增一个组合模块*/
          result.push(item)
        } else {
          /*覆盖一个组合模块*/
          result[overrideIndex] = item
        }
      })
      /*根据组合模块的key，保存所有组合模块创建产生的effects*/
      const effectsMap = {}
      /*执行所有的组合模块，初始化autoOption对象*/
      result
        .sort((a, b) => a.seq - b.seq)
        .forEach((i) => {
          if (!!effectsMap[i.key]) {
            console.log({ effectsMap, i, result })
            error(`can't registration's effect`)
          }
          const effects = (effectsMap[i.key] = createEffects().effects)
          const handlerRefer = i.handler(option, effects)
          if (!!handlerRefer) {
            option[i.key] = handlerRefer
            effects.push(() => {
              delay(78).then(() => {
                delete option[i.key]
              })
            })
          }
        })
      /**
       * 销毁前清理掉所有组合模块的副作用
       *
       *        2/6 11:12
       */
      onBeforeUnmount(() => {
        Object.values(effectsMap).forEach((i) => i.clear())
      })
    }
    return { use, exec, registrations }
  }
  /**
   * 全局组合模块管理器
   *
   *        .3.15 23:24
   */
  const globalRegistrationManager = createRegistrationManager()
  /**
   * 创建一个registration
   *
   *        2/7 10:50
   */
  function createRegistration(registration) {
    return registration
  }
  function createOptionUser(defaultConfig) {
    /**
     * 当前useAutoOption注册的组合模块
     *
     *        2/6 12:51
     */
    const localRegistrationManager = createRegistrationManager()
    const uto = (useConfig) => {
      const clone = (processUseConfig) => {
        let cloneConfig = deepcopy(useConfig)
        !!processUseConfig && (cloneConfig = processUseConfig(cloneConfig) || cloneConfig)
        return uto(cloneConfig)
      }
      /**
       * 配置信息
       *
       *        .9.7 12:09
       */
      const config = reactive({
        ...defaultConfig,
        ...useConfig
      })
      /**
       * 全局处理配置
       *
       *        2/6 12:52
       */
      configList.forEach((i) => i(config))
      /**
       * 用来挂载的组合对象
       *
       *        2/6 12:52
       */
      const option = markRaw({ config, clone, defaultConfig: deepcopy(defaultConfig), useConfig: deepcopy(useConfig) })
      /**
       * 当前useAutoOption临时注册/覆盖 的组合模块
       *
       *        2/6 12:53
       */
      localRegistrationManager.exec(option, globalRegistrationManager.registrations)
      /**
       * 全局匿名的组合模块
       *
       *        2/6 12:53
       */
      useList.forEach((i) => i(option))
      onBeforeUnmount(() => {
        delay().then(() => {
          Object.keys(option).forEach((k) => delete option[k])
        })
      })
      return option
    }
    /**
     * 全局配置处理
     *
     *        2/6 12:53
     */
    const configList = []
    const config = (fn) => configList.push(fn)
    /**
     * 全局匿名的组合模块处理
     *
     *        2/6 12:53
     */
    const useList = []
    const use = (useFunc) => useList.push(useFunc)
    /**
     * 具名组合模块注册
     *
     *        2/6 12:53
     */
    const registry = localRegistrationManager.use
    const _uto = Object.assign(uto, { use, config, registry })
    return _uto
  }
  return {
    error,
    createRegistrationManager,
    globalRegistrationManager,
    createRegistration,
    createOptionUser
  }
}
/*const AutoModule = createPlainModule({ name: 'AutoTable', reactive: {} as any, onBeforeUnmount: {} as any, markRaw: {} as any });
const useOption = AutoModule.createOptionUser({});
const option = useOption({});
option.clone(() => {});*/
//# sourceMappingURL=createPlainModule.js.map
