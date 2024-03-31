<template>
  <Dialog :title="'标题'"
          :visible="dialogVisible"
          @dialogConfirm="dialogConfirm"
          @dialogCancel="dialogCancel">
    <div> {{myProps.a}} - {{myProps.c}} -{{b}} </div>
  </Dialog>
</template>
<script>
export default {
  name: 'A-A'
}
</script>
<script setup>
import { onMounted, onBeforeUnmount, ref} from 'vue'
import Dialog from "./dialog.vue";
const dialogVisible = ref(false)
const props = defineProps({
  myProps:{
    type:Object,
    // default:()=>{
    //   return{
    //     a: 'aaa',
    //     c: 'ccc'
    //   }
    // }
  },
  b: {
    type:String,
    default: 'asdf'
  },
  resolve:{
    type:Function,
    default:()=>{}
  },
  reject:{
    type:Function,
    default:()=>{}
  },
  visible:{
    type:Boolean,
    default:false
  }
})
onMounted(()=>{
  dialogVisible.value = props.visible;
  console.log(props,dialogVisible)
})
onBeforeUnmount(()=>{
  dialogVisible.value = false
})
function dialogConfirm(){
  dialogVisible.value = false
  props.resolve('confirm')
}
function dialogCancel(){
  dialogVisible.value = false
  props.reject('cancel')
}
</script>

<style scoped lang="scss">

</style>
