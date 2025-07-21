import { createEnum } from './createEnum'
import { SimpleFunction } from './event'
import { addElementListener } from './addElementListener'
import { remove } from './remove'
import { lastItem } from './lastItem'
import { doNothing } from './doNothing'

/**
 * 支持监听的快捷键名称
 *
 *        .8.24 22:13
 */
export const eKeyboardKeys = createEnum([
  'shift',
  'ctrl',
  'alt',
  'backspace',
  'tab',
  'enter',
  'esc',
  'space',
  'del',
  'left',
  'up',
  'right',
  'down',
  'minus',
  'equal',
  'num_0',
  'num_1',
  'num_2',
  'num_3',
  'num_4',
  'num_5',
  'num_6',
  'num_7',
  'num_8',
  'num_9',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  'F1',
  'F2',
  'F3',
  'F4',
  'F5',
  'F6',
  'F7',
  'F8',
  'F9',
  'F10',
  'F11',
  'F12'
] as const)

export const KeyboardService = (() => {
  const options = [] as KeyboardServiceOption[]

  const globalListener = (() => {
    let effect: SimpleFunction | null = null

    function init() {
      /*effect存在证明已经初始化过了*/
      if (effect) {
        return
      }
      // console.error('init keyboard global service');
      effect = addElementListener(document.body, 'keydown', _handleGlobalKeydown)
    }

    function eject() {
      /*effect不存在证明已经注销了全局监听事件*/
      if (!effect) {
        return
      }
      // console.error('eject keyboard global service');
      effect()
      effect = null
    }

    return { init, eject }
  })()

  /**
   * 添加全局快捷键监听器，注意的是监听栈options数组中只有最后一个option会处理键盘按键事件
   * 可以理解为多个弹框组件监听全局快捷键时，只有最后一个弹框才能处理最新触发的快捷键动作
   *
   *        .8.24 22:24
   */
  function listen(option: KeyboardServiceOption | undefined | null): () => void {
    if (!option) {
      return doNothing
    }
    options.push(option)
    /*只有第一次添加监听器的时候才会注册全局监听*/
    globalListener.init()
    return () => unbind(option)
  }

  /**
   * 注销全局快捷键监听
   *
   *        .8.24 22:36
   */
  function unbind(option: KeyboardServiceOption) {
    remove(options, option)
    !options.length && globalListener.eject()
  }

  /**
   * 令当前激活的元素失去焦点
   *
   *        .8.24 22:37
   */
  function cancelActiveElement() {
    const activeElement = document.activeElement as HTMLElement
    if (!!activeElement) activeElement.blur()
    return activeElement
  }

  /**
   * 处理全局快捷键事件
   *
   *        .8.24 22:39
   */
  function _handleGlobalKeydown(e: KeyboardEvent) {
    if (e.currentTarget !== e.target) return

    const names = [] as string[]
    ;(e.metaKey || e.ctrlKey) && names.push('ctrl')
    e.shiftKey && names.push('shift')
    e.altKey && names.push('alt')

    const keyName = keyCode2keyName[e.keyCode]
    if (!keyName) {
      return
    }

    names.push(keyName)
    const compositionKeyName = names.join('+')

    /*只处理最后一个option*/
    const lastOption = lastItem(options)
    if (!!lastOption && !!lastOption[compositionKeyName]) {
      const flag = lastOption[compositionKeyName](e)
      /*默认阻止事件冒泡*/
      if (flag !== false) {
        e.stopPropagation()
        e.preventDefault()
      }
    }
  }

  return {
    cancelActiveElement,
    listen,
    unbind
  }
})()

/**
 * 监听配置类型
 * 示例：
 * {
 *   space:(e:KeyboardEvent)=>{console.log('esc',e)},
 *   'ctrl+space':(e:KeyboardEvent)=>{console.log('ctrl+space',e)},
 *   'ctrl+shift+space':(e:KeyboardEvent)=>{console.log('ctrl+shift+space',e)},
 * }
 * 注意：ctrl存在的话必须是第一个位置，shift存在的话，如果有ctrl则排在ctrl后边为第二个位置，没有ctrl就是第一个位置，按键名称永远排最后
 *
 *        .8.24 22:14
 */
export type KeyboardServiceOption = Record<string, (e: KeyboardEvent) => void | undefined | boolean>

/**
 * 通过键盘事件对象呢到按键名称
 *
 *        .8.24 22:12
 */
export function getKeyNameByKeyboardEvent<EVENT extends { keyCode: number } = KeyboardEvent>(
  e: EVENT
): typeof eKeyboardKeys.TYPE | null {
  let keyName = keyCode2keyName[e.keyCode]
  if (!!keyName && !!eKeyboardKeys[keyName]) {
    return eKeyboardKeys[keyName]
  } else {
    return null
  }
}

/**
 * 创建处理按键事件的按键处理函数
 *
 *        .8.24 22:17
 */
export function handleKeyboard<EVENT extends { keyCode: number } = KeyboardEvent>(option: {
  [key in typeof eKeyboardKeys.TYPE]?: (e: EVENT) => any
}) {
  return (e: EVENT) => {
    const key = getKeyNameByKeyboardEvent(e)
    if (!!key && !!option[key]) {
      return option[key]!(e)
    }
  }
}

/**
 * 按键编码映射按键名称
 *
 *        .8.24 22:55
 */
export const keyCode2keyName: Record<number, typeof eKeyboardKeys.TYPE | undefined> = {
  16: 'shift',
  17: 'ctrl',
  18: 'alt',

  8: 'backspace',
  9: 'tab',
  13: 'enter',
  27: 'esc',
  32: 'space',
  46: 'del',

  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',

  189: 'minus',
  187: 'equal',

  48: 'num_0',
  49: 'num_1',
  50: 'num_2',
  51: 'num_3',
  52: 'num_4',
  53: 'num_5',
  54: 'num_6',
  55: 'num_7',
  56: 'num_8',
  57: 'num_9',

  65: 'a',
  66: 'b',
  67: 'c',
  68: 'd',
  69: 'e',
  70: 'f',
  71: 'g',
  72: 'h',
  73: 'i',
  74: 'j',
  75: 'k',

  76: 'l',
  77: 'm',
  78: 'n',
  79: 'o',
  80: 'p',
  81: 'q',
  82: 'r',
  83: 's',
  84: 't',
  85: 'u',
  86: 'v',
  87: 'w',
  88: 'x',
  89: 'y',
  90: 'z',

  112: 'F1',
  113: 'F2',
  114: 'F3',
  115: 'F4',
  116: 'F5',
  117: 'F6',
  118: 'F7',
  119: 'F8',
  120: 'F9',
  121: 'F10',
  122: 'F11',
  123: 'F12'
}

export default KeyboardService
