import { defineComponent, computed } from 'vue'

export default defineComponent({
  props: {
    block: {
      type: Object
    },
    setup(props) {
      const blockStyles = computed(() => {
        return {
          left: props.block.left + 'px',
          top: props.block.top + 'px',
          width: props.block.width + 'px',
          height: props.block.height + 'px',
          zIndex: props.block.Index,
          backgroundColor: props.block.backgroundColor
        }
      })
      return <div class="editor-block" style={blockStyles}></div>
    }
  }
})
