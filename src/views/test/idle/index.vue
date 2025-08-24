<template>
  <el-button @click="append" type="primary">点击</el-button>
  <div ref="dv"></div>
</template>

<script setup lang="ts">
import { useTemplateRef, onMounted } from 'vue'

const divRef = useTemplateRef('dv')

const tasks = Array.from({ length: 100000 }, (_, i) => () => {
  const div = document.createElement('div')
  div.innerText = `${i}`
  divRef.value.appendChild(div)
})

function scheduler(chunk) {
  console.log(1)
  let count = 0
  setTimeout(() => {
    chunk(() => {
      console.log(count)
      return count++ < 3
    })
  }, 1000)
}

const append = () => {
  performTasks(tasks, scheduler)
}

function performTasks(tasks, scheduler) {
  const len = tasks.length
  if (!len) {
    return
  }
  let index = 0

  _run()
  function _run() {
    scheduler((isGoOn) => {
      // console.log(isGoOn)
      if (index < len && isGoOn()) {
        tasks[index++]()
      }
      if (index < len) {
        _run()
      }
    })
  }
}
</script>
