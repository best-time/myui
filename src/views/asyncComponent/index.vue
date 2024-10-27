<template>
  <div>
    <div>
        <el-radio-group v-model="radio">
          <el-radio label="A">A组件</el-radio>
          <el-radio label="B">B组件</el-radio>
          <el-radio label="c">C组件</el-radio>
        </el-radio-group>
    </div>
    <component :is="componentName"></component>
    <div>
      <h3>错误边界示例</h3>
                  <el-button type="primary"  @click="resetError">重置错误</el-button>
      {{hasError}}
                  <p   v-if="hasError">发生了错误：{{   error.message   }}</p>
                  <RiskyComponent  v-if="!hasError"   />
    </div>
    <div>
      <p>1111</p>
      <simple-com message="xxxx"></simple-com>
    </div>
  </div>
</template>

<script setup>
import {ref, h, createVNode, reactive, computed, nextTick, defineAsyncComponent, defineComponent, onErrorCaptured} from 'vue'
import useError from './hook/error'
// import SimpleCom from './components/com.js'
const radio = ref('')
const ACom = defineAsyncComponent(() => import('./components/a.vue'))
const BCom = defineAsyncComponent(() => import('./components/b.vue'))
const RiskyComponent = defineAsyncComponent(() => import('./components/risk.vue'))

const slots = {};
['content', 'contentTips', 'b1'].forEach(name =>
    slots[name] = () => h('i', {key: name}, name)
);
const SimpleCom = defineComponent({
  // name: 'SimpleComponent',
  props: {
    message: {
      type: String,
      required: true
    }
  },
  // template: `<div>{{ props.message }}</div>`,
  // render(props) {
  //   return    h(
  //       'h3',
  //       {  },
  //       `Hi ${props.message}, This is Home Page, click to change the text color`
  //   )
  // }

  render(props, emits) {
    return h(createVNode(BCom), {
      class: 'a-b',
      title: props.message,
      onUpdate: function(r) {
        console.log(r)
      }
    }, slots)
  }

});
const componentName = computed(() => {
  if(radio.value === 'A') {
    return ACom
  } else if(radio.value === 'B') {
    return BCom
  }
  return ''
})
const {hasError, error, errorCaptured, resetError } = useError()


onErrorCaptured(errorCaptured)
</script>

<style lang="scss">

</style>
