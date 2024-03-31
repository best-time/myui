<template>
<!--  <el-data-table v-bind="$data" />-->
  <p><button id="btnTest">Test Button</button></p>
  <p>Way 1: <el-button id="btn1" type="primary">Way 1 Start</el-button></p>
  <p>Way 2: <el-button id="btn2" type="primary">Way 2 Start</el-button></p>

  <h2>优雅打开弹窗和关闭</h2>
  <modal-demo></modal-demo>

<!--  <height-demo></height-demo>-->

  <h2>-------------------------</h2>
<!--  <dialog-demo></dialog-demo>-->
  <div>
    <p>modal3</p>
<!--    <el-button @click="clicc"> 点击 2</el-button>-->
    <el-button @click="openDialog3"> 点击 3</el-button>
    <el-button @click="openDialog4"> 点击 4</el-button>
  </div>
  <div>
    <modal4-demo></modal4-demo>
  </div>
  <div class="box2"></div>

  <div>
    <p>modal5</p>
    <modal5-demo></modal5-demo>
  </div>

  <div>
    <p>modal7</p>
    <modal7-demo></modal7-demo>
  </div>
  <component1></component1>
  <a-demo></a-demo>

</template>

<script setup lang="tsx">
import {onMounted, nextTick, ref, defineAsyncComponent, createVNode, render} from 'vue'

import ModalDemo from './modal/index.vue'
import HeightDemo from './height.vue'
// import DialogDemo from './modal2/index.vue'
import useMyDialog from '../../hooks/dialog2'

import Loading from './modal3/index.js'
import Modal4Demo from './modal4/demo.vue'
import CC from './c.vue'
import Modal5Demo from './modal5/index.vue'
import Modal7Demo from './modal7/index.vue'
import {ADemo} from './aa.tsx'

const Component1 = () => <div>Component1123213</div>

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

// const { show } =   useMyDialog(HeightDemo)
//
// const clicc = () => {
//   show()
// }
const title = ref('123')
const openDialog3 = () => {
  Loading({
    mask: true,
    title: title.value,
    text:'数据获取中',
    component: defineAsyncComponent(() => import('./a.vue'))
  })
  setTimeout(() => {
    title.value = '标题变化了'
  })
  setTimeout(() => {
    Loading.close()
  }, 3000)
}

const openDialog4 = () => {
  Loading({
    mask: true,
    text:'数据获取中',
    title: '另外一个弹窗',
    component: defineAsyncComponent(() => import('./a.vue'))
  }, 'a')
  setTimeout(() => {
    // Loading.close()
    // console.log(instance)
    // instance.component.props.title = '修改标题'
    // instance.component.props.component = defineAsyncComponent(() => import('./b.vue'))

  }, 1000)
}

console.log(createVNode(CC))
console.log(document.querySelector('.box'))
onMounted(() => {
  render(createVNode(CC, {title: '名称1'}), document.querySelector('.box2'))
})

let x: string | number = '123'
console.log('typescript 变量x: ', x)

</script>
