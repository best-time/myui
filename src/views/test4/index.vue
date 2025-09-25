<template>
  <div>
    <p id="box" style="background-color: #999">p元素</p>
    <div ref="divRef" style="background-color: #ddd; width: 300px; height: 100px"></div>
  </div>
</template>
<script setup lang="ts">
import useEventListener from '@/hooks/useEventListener.ts'
// import { useEventListener } from '@vueuse/core'
const divRef = useTemplateRef('divRef')

function handleClick() {
  console.log('发生了点击111')
}
function handleClick2() {
  console.log('发生了点击2222')
}

console.log(123)
// console.log(document.getElementById('box'), divRef.value)
// const eventStop1 = useEventListener(divRef, ['click', 'mousemove'], handleClick)
const eventStop1 = useEventListener(divRef, ['click'], [handleClick, handleClick2])
// const eventStop2 = useEventListener(document.getElementById('box'), 'click', handleClick)


onMounted(() => {
  // const eventStop2 = useEventListener(document.getElementById('box'), "click", handleClick);
})
</script>
