<template>
  <div class="vehicle-set">
    <h2 class="page-title">modal7</h2>
    <div class="vehicle-list-wrap">
      <header>
        <h3>页面modal7</h3>
        <el-button type="primary" @click="addVehicleSet">新增</el-button>
      </header>
      <main>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive} from 'vue'
import M_Dialog from "./dialogManager";
import dialogTest from "./dialogTest.vue"

const addVehicleSet = ()=>{
  M_Dialog.openDialog(dialogTest,reactive({a:1})).then(data => {
    const { dialogInstance , props } = data;
    console.log(props, 1)
    M_Dialog.closeDialog(dialogInstance)
  }).catch(data=>{
    const {dialogInstance,props} = data;
    console.log(props, 2)
    M_Dialog.closeDialog(dialogInstance)
  })
}

</script>

<style scoped lang="scss">
.vehicle-set{
  width: 100%;
  height: 100%;
  color: var(--el-text-color-regular);
  padding: 24px;
  display: flex;
  flex-direction: column;
  .page-title{
    font-size: 20px;
    padding-bottom: 24px;
  }
  .vehicle-list-wrap{
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    border: var(--el-border);
    padding: 10px;
    header{
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
    }
    main{
      flex-grow: 1;
    }
  }
}
</style>
