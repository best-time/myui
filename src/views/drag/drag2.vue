<template>
  <div>
    <VueDragResize :isActive="true" :w="width" :h="height" v-on:resizing="resize" v-on:dragging="resize">
      <h3>Hello World!</h3>
      <p>上: {{ top }}, 左 {{ left }}</p>
      <p>长: {{ width }}, 宽: {{ height }}</p>
    </VueDragResize>
  </div>
</template>

<script>
import VueDragResize from './drag-resize-demo/vueDragResize.vue'

export default {
  name: 'app',
  components: {
    VueDragResize
  },
  data() {
    return {
      width: 200,
      height: 200,
      top: 0,
      left: 0
    }
  },
  methods: {
    resize(newRect) {
      this.width = newRect.width
      this.height = newRect.height
      this.top = newRect.top
      this.left = newRect.left
    }
  }
}
</script>
