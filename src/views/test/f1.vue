<template>
<!--  <el-data-table v-bind="$data" />-->
  <p><button id="btnTest">Test Button</button></p>
  <p>Way 1: <el-button id="btn1" type="primary">Way 1 Start</el-button></p>
  <p>Way 2: <el-button id="btn2" type="primary">Way 2 Start</el-button></p>

  <h2>优雅打开弹窗和关闭</h2>
  <modal-demo></modal-demo>

  <height-demo></height-demo>
</template>

<script setup>
import {onMounted, nextTick} from 'vue'

import ModalDemo from './modal/index.vue'
import HeightDemo from './height.vue'

const listeners = Array.from({length: 400000}, (e, i) => ({
  eventName: 'click',
  f: ev => console.log(`${i+1}th binding - ${ev.target.innerHTML} ms`)
}));


const getPrevious = (arr, i) => arr[i-1];
const getNext = (arr, i) => arr[i];

const vei = {};

const cacheBindEvent = (button = button2) => {
  for(let i = 1, len = listeners.length; i < len; i++) {
    const now = getNext(listeners, i);
    let invoker = vei[now.eventName];

    if(invoker) {
      invoker.value = now.f;
      continue;
    }

    if(!invoker) {
      invoker = ev => invoker.value(ev);
      invoker.value = now.f;
      button.addEventListener(now.eventName, invoker);
      vei[now.eventName] = invoker;
    }
  }
};


onMounted(() => {
  console.log(1)
  nextTick(() => {
    const button2 = document.querySelector('#btn2');

    cacheBindEvent(button2)
  })
})

</script>
