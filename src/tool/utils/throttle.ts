import { createEffects } from './createEffects'

/**
 * 节流
 *
 *        11/16 18:49
 * @param   func                //核心函数
 * @param   wait                //节流时长（该时间段内只执行一次func）
 * @param   options             //额外参数
 * @param   options.trailing    //最后一次应该被触发，默认为true
 * @param   options.leading     //第一次是否立即执行
 */
export const throttle = <T extends (...args: any[]) => void>(
  func: T,
  wait: number,
  options: { trailing?: boolean; leading?: boolean } = {}
): T & { dispose: () => void } => {
  let args: any,
    context: any,
    previous = 0,
    timeout: any

  const { effects: disposeEffects } = createEffects()
  disposeEffects.push(() => {
    args = context = null
  })

  const { effects: timerEffects } = createEffects()
  disposeEffects.push(() => timerEffects.clear())

  let later = () => {
    // console.log('later click：' + Date.now() % 10000)
    previous = options.leading === false ? 0 : Date.now()
    func.apply(context, args)
    args = context = null
  }

  return Object.assign(
    function () {
      // eslint-disable-next-line prefer-rest-params
      args = arguments
      // @ts-ignore
      context = this
      let now = Date.now()

      if (!previous && options.leading === false) {
        previous = now
      }

      let remaining = wait - (now - previous)

      if (remaining <= 0) {
        /*第一次*/
        timerEffects.clear()
        // console.log('throttle click：' + Date.now() % 10000)
        func.apply(context, args)
        previous = now
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining)
        timerEffects.push(() => {
          clearTimeout(timeout)
          timeout = null
        })
      }
    } as any,
    {
      dispose: () => {
        disposeEffects.clear()
      }
    }
  )
}
