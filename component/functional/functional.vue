<script>
import {defineComponent} from 'vue'
export default defineComponent({
  setup(props, context) {
    const message = ref('')
    const mType = ref<MessageType>('default')


    const classObject = computed(() => {
      return {
        'alert-success': mType.value === 'success',
        'alert-danger': mType.value === 'error',
        'alert-primary': mType.value === 'default'
      }
    })



    const isVisible = ref(false)

    const hide = () => {
      isVisible.value = false
    }

    const show = (sMessage: string, type: MessageType) => {
      message.value = sMessage
      mType.value = type
      isVisible.value = true
    }

    return {
      isVisible,
      message,
      classObject,
      hide,
      show
    }

  }
})

</script>
