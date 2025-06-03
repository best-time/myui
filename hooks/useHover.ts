import type { Ref } from 'vue'
import useBoolean from './useBoolean'
import useEventListener from './useEventListener'

export interface UseHoverOptions {
    onEnter?: () => void
    onLeave?: () => void
    onChange?: (isHovering: boolean) => void
}
export default function useHover(
    target: any,
    options?: UseHoverOptions
): Ref<boolean> {
    const { onEnter, onLeave, onChange } = options || {}

    const [state, { setTrue, setFalse }] = useBoolean(false)

    useEventListener(
        target,
        ['mouseenter', 'mouseleave'],
        [
            [
                () => {
                    onEnter?.()
                    setTrue()
                    onChange?.(true)
                }
            ],
            [
                () => {
                    onLeave?.()
                    setFalse()
                    onChange?.(false)
                }
            ]
        ]
    )

    return state
}
