<template>
  <div>basicCom -> {{show}}</div>
</template>

<script setup>
import { ref } from 'vue'
const show = ref(false)

const changeShow = () => {
  show.value = !show.value
}
defineExpose({
  changeShow
})
</script>
