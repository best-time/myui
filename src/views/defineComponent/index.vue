<template>
  <div>
    <div>
      <home ref="homeRef" name="yinweiyi"></home>
      <about name="xuqing"></about>
      <not-found></not-found>
      <my-component ref="cRef" message="13123123" count="111" @confirm="confirm" a="a">
        <!--        <template v-slot><p>default插槽</p></template>-->
        <template v-slot:head><p>head插槽</p></template>
      </my-component>
    </div>
  </div>
</template>

<script setup>
import {defineComponent, h, reactive, ref, computed, resolveComponent} from 'vue'
import {Home, NotFound, About} from './com.js'

function confirm() {
  console.log('confirm')
  console.log(cRef.value)
  console.log(homeRef.value)
}

const cRef = ref(null)
const homeRef = ref(null)


const MyComponent = defineComponent({
  name: 'MyComponent',
  props: {
    message: {
      type: String,
      default: 'Bob'
    },
    count: {
      type: Number,
      default: 1
    }
  },
  setup(props, context) {
    console.log(context)
    const ButtonCounter = resolveComponent('ElButton')
    const {attrs, emit, slots, expose} = context
    const r = ref('1111')

    function getParams() {

    }

    expose({
      r,
      getParams
    })
    return () => {
      return h('div', [props.message, h('span', {
        style: {color: 'red', marginLeft: '12px'},
        onClick: () => {
          console.log(attrs, slots)
          emit('confirm')
        }
      }, props.count),
        slots?.default?.() || null,
        slots.head(),
        h(ButtonCounter, {type: 'primary'}, '按钮')])
    }
  }
});

</script>

<style lang="less">
.text-red {
  color: red;
}

.text-green {
  color: green;
}

.text-blue {
  color: blue;
}

.text-orange {
  color: orange;
}

.text-purple {
  color: purple;
}
</style>
