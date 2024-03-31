<template>
  <el-dialog
      :model-value="visible"
      :title="title"
      :close-on-click-modal="false"
      class="dm-dialog"
      ref="dialog"
      :show-close="true"
      @close="cancel">
    <div class="dm-dialog-body">
      <slot/>
    </div>
    <div slot="footer" class="dm-dialog-footer" v-if="showFooter">
      <el-button @click="cancel">{{cancelText}}</el-button>
      <el-button type="primary" @click="confirm">{{confirmText}}</el-button>
    </div>
  </el-dialog>
</template>

<script setup>
const props = defineProps({
  visible:{
    type:Boolean,
    default:false,
  },
  title:{
    type:String,
    default:'标题'
  },
  cancelText:{
    type:String,
    default:'取消'
  },
  confirmText:{
    type:String,
    default:'确定'
  },
  showFooter:{
    type:Boolean,
    default:true
  },
  width:{
    type:String,
    default:'30%'
  }
})
const emits = defineEmits(['dialogConfirm','dialogCancel'])
function confirm (){
  emits('dialogConfirm')
}
function cancel(){
  emits('dialogCancel')
}
</script>

<style scoped lang="scss">
.dm-dialog{
  .dm-dialog-footer{
    display: flex;
    justify-content: flex-end;
  }
}
</style>
