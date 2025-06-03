import { ref, readonly } from 'vue'
import type { Ref, ComponentPublicInstance } from 'vue'
import useEventListener from './useEventListener'

type TargetType =
    | HTMLElement
    | Element
    | Window
    | Document
    | ComponentPublicInstance
type Position = { left: number; top: number }
type TargetValue<T> = T | undefined | null

type BasicTarget<T extends TargetType = Element> =
    | (() => TargetValue<T>)
    | TargetValue<T>
    | Ref<TargetValue<T>>

type UseScrollListenController = (val: Position) => boolean
type UseScrollTarget = BasicTarget<Element | Document>

export default function useScroll(
    target?: UseScrollTarget | any,
    shouldUpdate: UseScrollListenController = () => true
): Readonly<Ref<Position | undefined>> {
    const position = ref<Position>({ left: 0, top: 0 })

    const shouldUpdateRef = ref(shouldUpdate)

    updatePosition()

    useEventListener(target, 'scroll', updatePosition)
    function updatePosition() {
        if (!target?.value) {
            return
        }
        let newPosition: Position
        if (target?.value === document) {
            if (document.scrollingElement) {
                newPosition = {
                    left: document.scrollingElement.scrollLeft,
                    top: document.scrollingElement.scrollTop
                }
            } else {
                newPosition = {
                    left: Math.max(
                        document.documentElement.scrollTop,
                        document.body.scrollTop
                    ),
                    top: Math.max(
                        document.documentElement.scrollLeft,
                        document.body.scrollLeft
                    )
                }
            }
        } else {
            newPosition = {
                left: target?.value?.scrollLeft,
                top: target?.value?.scrollTop
            }
        }
        if (shouldUpdateRef.value(newPosition)) {
            position.value = newPosition
        }
    }

    return readonly(position)
}
