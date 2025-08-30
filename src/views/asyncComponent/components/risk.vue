<template>
  <div>
    <h2>子组件</h2>
    <p>{{ riskyOperation() }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// import { b} from '../hook/error.js'
const riskyOperation = () => {
  // 这里故意抛出一个错误
  // throw new Error('这是一个测试错误');
  //   console.log(bbb)
  const list = [1, 2, 3, 4, 5]
  console.log(list.findLast((it) => it === 3))
}
</script>
