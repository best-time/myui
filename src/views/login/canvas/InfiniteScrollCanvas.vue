<template>
    <div class="canvas-container">
      <canvas
        ref="canvasRef"
        :width="canvasWidth"
        :height="canvasHeight"
        @scroll="handleScroll"
        @mousedown="handleMouseDown"
        @mousemove="handleMouseMove"
        @mouseup="handleMouseUp"
      ></canvas>
      <div class="scroll-container" ref="scrollContainerRef" @scroll="handleScroll">
        <div :style="{ height: totalHeight + 'px' }"></div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
  
  // Props
  const props = defineProps({
    data: {
      type: Array,
      default: () => Array.from({ length: 10000 }, (_, i) => ({ id: i, text: `Row ${i + 1}` }))
    },
    rowHeight: {
      type: Number,
      default: 40
    },
    visibleRows: {
      type: Number,
      default: 20
    }
  })
  
  // Refs
  const canvasRef = ref(null)
  const scrollContainerRef = ref(null)
  const canvasWidth = ref(800)
  const canvasHeight = ref(props.visibleRows * props.rowHeight)
  const scrollTop = ref(0)
  const isDragging = ref(false)
  const startY = ref(0)
  const startScrollTop = ref(0)
  
  // Computed
  const totalHeight = computed(() => props.data.length * props.rowHeight)
  const startIndex = computed(() => Math.floor(scrollTop.value / props.rowHeight))
  const endIndex = computed(() => Math.min(
    startIndex.value + props.visibleRows + 2, // +2 for buffer
    props.data.length
  ))
  const visibleData = computed(() => 
    props.data.slice(startIndex.value, endIndex.value)
  )
  
  // Methods
  const drawCanvas = () => {
    const canvas = canvasRef.value
    
    if (!canvas) {
      return
    }
    
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvasWidth.value, canvasHeight.value)
    
    // Set styles
    ctx.font = '14px Arial'
    ctx.textBaseline = 'middle'
    
    // Draw rows
    visibleData.value.forEach((item, index) => {
      const y = (index * props.rowHeight) - (scrollTop.value % props.rowHeight)
      
      // Draw row background (alternating colors)
      ctx.fillStyle = index % 2 === 0 ? '#f9f9f9' : '#ffffff'
    //   ctx.fillRect(0, y, canvasWidth.value, props.rowHeight)
      
      // Draw row border
      ctx.strokeStyle = '#e0e0e0'
      ctx.beginPath()
      ctx.moveTo(0, y + props.rowHeight)
      ctx.lineTo(canvasWidth.value, y + props.rowHeight)
      ctx.stroke()
      
      // Draw text
      ctx.fillStyle = '#999999'
      ctx.fillText(item.text, 10, y + props.rowHeight / 2)
      
      // Draw ID
      ctx.fillStyle = 'red'
      ctx.fillText(`ID: ${item.id}`, canvasWidth.value - 100, y + props.rowHeight / 2)
    })
  }
  
  const handleScroll = () => {
    console.log(123123);
    
    if (scrollContainerRef.value) {
      scrollTop.value = scrollContainerRef.value.scrollTop
      console.log(scrollContainerRef.value.scrollLeft);
      
      drawCanvas()
    }
  }
  
  const handleMouseDown = (e) => {
    console.log(3333);
    
    isDragging.value = true
    startY.value = e.clientY
    startScrollTop.value = scrollTop.value
  }
  
  const handleMouseMove = (e) => {
    if (!isDragging.value) return
    
    const deltaY = e.clientY - startY.value
    const newScrollTop = startScrollTop.value - deltaY
    
    if (scrollContainerRef.value) {
      scrollContainerRef.value.scrollTop = newScrollTop
    }
  }
  
  const handleMouseUp = () => {
    isDragging.value = false
  }
  
  const handleResize = () => {
    if (canvasRef.value) {
      const container = canvasRef.value.parentElement
      canvasWidth.value = container.clientWidth - 20
      drawCanvas()
    }
  }
  
  // Lifecycle hooks
  onMounted(() => {
    window.addEventListener('resize', handleResize)
    handleResize()
    drawCanvas()
  })
  
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
  
  // Watch for data changes
  watch(
    () => props.data,
    () => drawCanvas(),
    { deep: true }
  )
  
  // Watch for scroll changes
  watch(scrollTop, () => drawCanvas())
  </script>
  
  <style scoped>
  .canvas-container {
    position: relative;
    width: 100%;
    height: v-bind('canvasHeight + "px"');
    overflow: hidden;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  canvas {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
  
  .scroll-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto;
    z-index: 0;
  }
  </style>