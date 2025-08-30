<template>
  <div id="box">
    <p v-ellipsis:200>{{ text }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
function ellipsis(el, binding) {
  el.style.width = (binding.arg || 100) + 'px'
  el.style.whiteSpace = 'nowrap'
  el.style.overflow = 'hidden'
  el.style.textOverflow = 'ellipsis'
}
const vEllipsis = {
  created: function (el, binding) {
    console.log(getComputedStyle(el).width, 'created')
    ellipsis(el, binding)
  },
  mounted: function (el, binding) {
    console.log(getComputedStyle(el).width, 'mounted')
    ellipsis(el, binding)
  },
  updated: function (el, binding) {
    console.log(getComputedStyle(el).width, 'update')
    ellipsis(el, binding)
  }
}
onMounted(() => {
  let arrayLike = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3
  }
  console.log(Array.from(arrayLike))
})

const text = ref('')

setTimeout(() => {
  text.value = '今天是星期六, 今天是星期六今天是星期六今天是星期六'
}, 200)

//----------------------------------------------------------------------------------------------------------------------
</script>
