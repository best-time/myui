<template>
  <div class="dom-style">
    <div class="dom-box" ref="divRef">
      <p>第一行数据 <i ref="iRef">i标签数据</i><span ref="spanRef">span标签数据</span></p>
    </div>
    <p>i标签宽高: {{ iStyle.width }}/{{ iStyle.height }}</p>
    <p>span标签数据: {{ spanStyle.width }}/{{ spanStyle.height }}</p>
    <pre>
      获取元素宽高: offsetHeight/offsetWidth
      h5 拖拽时间: draggable属性 方法:onDragstart/onDragEnd
      ctrl事件: 	  { ctrlKey, keyCode } = event  // { z: '90'; y: '89' }
    </pre>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from 'vue'

const divRef = ref(null)
const iRef = ref(null)
const spanRef = ref(null)
const iStyle = computed(() => ({
  width: iRef.value?.offsetWidth + 'px',
  height: iRef.value?.offsetHeight + 'px'
}))
const spanStyle = computed(() => ({
  width: spanRef.value?.offsetWidth + 'px',
  height: spanRef.value?.offsetHeight + 'px'
}))
onMounted(() => {})
</script>

<style lang="scss" scoped>
i {
  color: blue;
}

span {
  color: red;
  margin: 0 4px;
}
</style>
