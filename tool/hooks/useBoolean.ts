import { ref, shallowReadonly } from 'vue'
import type { Ref } from 'vue'

interface IBooleanActions {
    setTrue: () => void
    setFalse: () => void
    toggle: () => void
}

type booleanResult = [Readonly<Ref<boolean>>, IBooleanActions]
export default function useBoolean(defaultValue = false): booleanResult {
    const state = ref<false | true>(defaultValue)
    const actions = {
        setTrue: () => (state.value = true),
        setFalse: () => (state.value = false),
        toggle: () => (state.value = !state.value)
    }
    return [shallowReadonly(state), actions]
}
