<template>
  <el-dialog
      v-model="dialogVisible"
      title="Tips"
      width="500"
  >
    <span>弹窗内容</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">Cancel</el-button>
        <el-button type="primary" @click="handleClose">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import {ref, watch} from 'vue'
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  open: {
    type: Function
  },
  close: {
    type: Function
  },
  destroy: {
    type: Function
  }
})
const dialogVisible = ref(false)
watch(props.visible, (v) => {
  dialogVisible.value = v
})
function handleClose () {
 props.close()
}
</script>
