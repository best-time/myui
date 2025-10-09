<template>
  <div class="mb-4 flex items-center">
    <el-form-item label="Scroll pixels" class="mr-4">
      <el-input v-model="scrollDelta" />
    </el-form-item>
    <el-form-item label="Scroll rows">
      <el-input v-model="scrollRows" />
    </el-form-item>
  </div>
  <div class="mb-4 flex items-center">
    <el-button @click="scrollByPixels"> Scroll by pixels </el-button>
    <el-button @click="scrollByRows"> Scroll by rows </el-button>
  </div>
  <div style="height: 400px">
    <el-auto-resizer>
      <template #default="{ height, width }">
        <el-table-v2
          v-header-scroll
          ref="tableRef"
          :columns="columns"
          :data="data"
          :width="width"
          :height="height"
          fixed
        ></el-table-v2>
      </template>
    </el-auto-resizer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const generateColumns = (length = 10, prefix = 'column-', props) =>
  Array.from({ length }).map((_, columnIndex) => ({
    ...props,
    key: `${prefix}${columnIndex}`,
    dataKey: `${prefix}${columnIndex}`,
    title: `Column - ${columnIndex}`,
    width: 150,
  }))

const generateData = (
  columns,
  length = 200,
  prefix = 'row-'
) =>
  Array.from({ length }).map((_, rowIndex) => {
    return columns.reduce(
      (rowData, column, columnIndex) => {
        rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`
        return rowData
      },
      {
        id: `${prefix}${rowIndex}`,
        parentId: null,
      }
    )
  })

const columns = generateColumns(150)
const data = generateData(columns, 200)
const tableRef = ref()
const scrollDelta = ref(200)
const scrollRows = ref(10)

function scrollByPixels() {
  tableRef.value?.scrollToTop(scrollDelta.value)
}

function scrollByRows() {
  tableRef.value?.scrollToRow(scrollRows.value)
}

const vHeaderScroll = {
  mounted: function(el, binding) {
    // const { actualRenderData } = useVirtualList({
    //   data: columns, // 列表项数据
    //   scrollContainer: ".el-scrollbar__wrap", // 滚动容器
    //   actualHeightContainer: ".el-scrollbar__view", // 渲染实际高度的容器
    //   tranlateContainer: ".el-table__body", // 需要偏移的目标元素,
    //   itmeContainer: '.el-table__row',// 列表项
    //   itemHeight: 50,// 列表项的大致高度
    //   size: 10,// 单次渲染数量
    // });

  }
}

</script>
