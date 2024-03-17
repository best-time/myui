<template>
    <el-dialog class="notice"
             v-model="visible"
             @close="cancel"
             width="890px"
             :title="props.title"
             :footer="null">
      <span>This is a message</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="() => handleOk()">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
</template>

<script setup>
import { closeModal } from "../../../hooks/modal.js";
 const props = defineProps({
   title: {
     type: String, default: '弹窗'
   }
 })
    // visible 是否弹窗flag
    // cancel 关闭弹窗
    // 带有回调函数关闭弹窗(预留需要关闭弹窗进行其他操作）
    const { visible, cancel, handleOk } = closeModal("notice");
</script>

