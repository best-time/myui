import { ref, readonly } from 'vue';
import type { Ref , ComponentPublicInstance } from 'vue';
import useEventListener from './useEventListener';

type TargetValue<T> = T | undefined | null;

type TargetType = HTMLElement | Element | Window | Document | ComponentPublicInstance;

export type BasicTarget<T extends TargetType = Element> = Ref<TargetValue<T>>;

interface UseMouseCursorState {
    screenX: number
    screenY: number
    clientX: number
    clientY: number
    pageX: number
    pageY: number
    elementX: number
    elementY: number
    elementH: number
    elementW: number
    elementPosX: number
    elementPosY: number
}

const initState: UseMouseCursorState = {
    screenX: NaN,
    screenY: NaN,
    clientX: NaN,
    clientY: NaN,
    pageX: NaN,
    pageY: NaN,
    elementX: NaN,
    elementY: NaN,
    elementH: NaN,
    elementW: NaN,
    elementPosX: NaN,
    elementPosY: NaN,
}

export default function useMouse(target?: BasicTarget) {
    const state = ref<UseMouseCursorState>(initState)

    useEventListener(
        document,
        'mousemove',
        (event: any) => {
            const { screenX, screenY, clientX, clientY, pageX, pageY } = event
            const newState = {
                screenX,
                screenY,
                clientX,
                clientY,
                pageX,
                pageY,
                elementX: NaN,
                elementY: NaN,
                elementH: NaN,
                elementW: NaN,
                elementPosX: NaN,
                elementPosY: NaN,
            }
            const targetElement = target?.value

            if (targetElement) {
                const { left, top, width, height } = targetElement.getBoundingClientRect()
                newState.elementPosX = left + window.pageXOffset
                newState.elementPosY = top + window.pageYOffset
                newState.elementX = pageX - newState.elementPosX
                newState.elementY = pageY - newState.elementPosY
                newState.elementW = width
                newState.elementH = height
            }
            state.value = newState
        }
    )

    return readonly(state)
}
