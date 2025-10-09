<template>
  <div ref="dEl" style="width: 400px; height: 300px; background-color: #eee">test</div>

  <div>
    <button @click="test">test</button>removedCount: {{ removedCount }}
    <div v-if="spanShow" style="background-color: #909399">
      <div ref="spanRef">span</div>
    </div>
  </div>
</template>

<script setup>
import { ref, shallowRef } from 'vue'
import { useBase } from './hook.js'
import { onElementRemoval, get } from '@vueuse/core'

const dEl = ref()
const {} = useBase({
  el: dEl
})

const spanRef = ref()
const spanShow = ref(false)
const removedCount = shallowRef(0)

function test() {
  spanShow.value = !spanShow.value
}

onElementRemoval(spanRef, () => {
  ++removedCount.value
})
</script>
