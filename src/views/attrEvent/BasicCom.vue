<template>
  <div>basicCom -> {{ show }}</div>
</template>

<script setup>
const show = ref(false)

const changeShow = () => {
  show.value = !show.value
}
defineExpose({
  changeShow
})
</script>
