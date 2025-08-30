<template>
  <el-table
    :data="tableData"
    @selection-change="handleSelectionChange"
    @row-click="handleRowClick"
    ref="tableRef"
    border
    style="width: 100%"
  >
    <el-table-column type="selection" width="55"> </el-table-column>
    <el-table-column prop="date" label="日期" width="180"> </el-table-column>
    <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
    <el-table-column prop="address" label="地址"> </el-table-column>
  </el-table>
</template>

<script setup>
import useShiftSelect from './hook'

const tableData = [
  { date: '2023-01-01', name: 'John Smith', address: 'New York No. 1 Lake Park' },
  { date: '2023-01-02', name: 'Jane Doe', address: 'London No. 1 Lake Park' },
  { date: '2023-01-03', name: 'Sam Green', address: 'Sidney No. 1 Lake Park' },
  { date: '2023-01-04', name: 'Sam Green1', address: 'Sidney No. 1 Lake Park' },
  { date: '2023-01-05', name: 'Sam Green2', address: 'Sidney No. 1 Lake Park' },
  { date: '2023-01-06', name: 'Sam Green3', address: 'Sidney No. 1 Lake Park' },
  { date: '2023-01-07', name: 'Sam Green4', address: 'Sidney No. 1 Lake Park' },
  { date: '2023-01-08', name: 'Sam Green5', address: 'Sidney No. 1 Lake Park' },
  { date: '2023-01-09', name: 'Sam Green6', address: 'Sidney No. 1 Lake Park' },
  { date: '2023-01-10', name: 'Sam Green7', address: 'Sidney No. 1 Lake Park' }
  // ... 更多数据
]

const { tableRef, state, handleSelectionChange, handleRowClick } = useShiftSelect(tableData)
</script>
