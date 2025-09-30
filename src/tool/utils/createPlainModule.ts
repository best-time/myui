import { createEffects, iEffects } from './createEffects'
import { createLogger } from './createLogger'
import { deepcopy } from './deepcopy'
import { delay } from './delay'

export function createPlainModule<
  /*@formatter:off*/
  DefaultConfig extends Record<string, any>,
  CustomConfig extends Record<string, any>,
  UseConfig extends CustomConfig & Partial<DefaultConfig>,
  OptionConfig extends CustomConfig & DefaultConfig,
  Option extends { config: OptionConfig; useConfig: UseConfig; defaultConfig: DefaultConfig }
  /*@formatter:on*/
>({
  name,

  onBeforeUnmount,
  reactive,
  markRaw
}: {
  /*模块命名*/
  name: string

  onBeforeUnmount: (handler: () => void) => void
  reactive: <T extends object>(val: T) => T
  markRaw: <T extends object>(val: T) => T
}) {
  const error = createLogger(name, 'error')

  /**
   * 注册一个AutoOption组合模块所需要的参数类型
   *
   *        2/6 10:39
   */
  class OptionRegistration {
    constructor(
      public seq: number,
      public key: string,
      public handler: (option: Option, effects: iEffects) => any
    ) {}
  }

  /**
   * 复制一个option函数类型
   *
   *        3/16 10:11
   */
  interface CloneOption {
    (processUseConfig: (useConfig: UseConfig) => void | UseConfig): Option & { clone: CloneOption }
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
    const registrations: OptionRegistration[] = []
    /**
     * 新增/覆盖 一个组合模块
     *
     *        2/6 11:10
     */
    const use = (seq: number, key: string, handler: OptionRegistration['handler']) =>
      registrations.push({ seq, key, handler })
    /**
     * 执行所有的组合模块
     *
     *        2/6 11:10
     */
    const exec = (option: Option, externalRegistrations?: OptionRegistration[]) => {
      let result: OptionRegistration[] = []
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
      const effectsMap: Record<string, iEffects> = {}
      /*执行所有的组合模块，初始化autoOption对象*/
      result
        .sort((a, b) => a.seq - b.seq)
        .forEach((i) => {
          if (!!effectsMap[i.key]) {
            console.log({ effectsMap, i, result })
            error(`can't registration's effect`)
          }
          const effects: iEffects = (effectsMap[i.key] = createEffects().effects)
          const handlerRefer = i.handler(option, effects)
          if (!!handlerRefer) {
            ;(option as any)[i.key] = handlerRefer
            effects.push(() => {
              delay(78).then(() => {
                delete (option as any)[i.key]
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
  function createRegistration<T extends (option: Option, effects: iEffects) => any>(registration: T): T {
    return registration
  }

  function createOptionUser(defaultConfig: DefaultConfig) {
    /**
     * 当前useAutoOption注册的组合模块
     *
     *        2/6 12:51
     */
    const localRegistrationManager = createRegistrationManager()

    const uto = (useConfig: UseConfig): Option & { clone: CloneOption } => {
      const clone = (processUseConfig: (copyConfig: UseConfig) => void | UseConfig): Option => {
        let cloneConfig = deepcopy(useConfig)
        !!processUseConfig && (cloneConfig = processUseConfig(cloneConfig) || cloneConfig)
        return uto(cloneConfig)
      }

      /**
       * 配置信息
       *
       *        .9.7 12:09
       */
      const config: OptionConfig = reactive({
        ...defaultConfig,
        ...useConfig
      }) as any

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
      const option: Option & { clone: CloneOption } = markRaw({
        config,
        clone,
        defaultConfig: deepcopy(defaultConfig),
        useConfig: deepcopy(useConfig)
      }) as any

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
          Object.keys(option).forEach((k) => delete (option as any)[k])
        })
      })

      return option
    }

    /**
     * 全局配置处理
     *
     *        2/6 12:53
     */
    const configList: ((config: OptionConfig) => void)[] = []
    const config: (fn: (config: OptionConfig) => void) => void = (fn) => configList.push(fn)

    /**
     * 全局匿名的组合模块处理
     *
     *        2/6 12:53
     */
    const useList: ((option: Option) => void)[] = []
    const use = (useFunc: (option: Option) => void) => useList.push(useFunc)

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
