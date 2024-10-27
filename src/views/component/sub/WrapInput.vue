<template>
  <component :is="h(ElInput, $attrs, $slots)" v-model="model" ref="inputRef"></component>
</template>

<script setup>
import { h, ref, onMounted } from "vue";
import { ElInput } from "element-plus";
const model = ref()

const inputRef = ref()
function log() {
  console.log(11111)
}
onMounted(() => {
  console.log('子组件加载')
})
// defineExpose(new Proxy({
//   log
// }, {
//   get(_target, prop)  {
//     // console.log(inputRef.value, prop)
//     return inputRef.value?.[prop]
//   },
//   has (_target, prop) {
//     return prop in inputRef.value
//   }
// }))
defineExpose({
  log,
  inputRef: new Proxy({
}, {
  get(_target, prop)  {
    // console.log(inputRef.value, prop)
    return inputRef.value?.[prop]
  },
  has (_target, prop) {
    return prop in inputRef.value
  }
})
})
</script>

<style lang="scss">

</style>
