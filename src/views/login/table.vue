<template>
    <div class="task-management-container">
      <h2>查询表格</h2>
      
      <!-- Search Form -->
      <el-form :model="searchForm" inline class="search-form">
        <el-form-item label="任务编号">
          <el-input v-model="searchForm.taskId" placeholder="请输入任务编号" />
        </el-form-item>
        
        <el-form-item label="项目名称">
          <el-input v-model="searchForm.projectName" placeholder="请输入项目名称" />
        </el-form-item>
        
        <el-form-item label="传播类型">
          <el-select v-model="searchForm.mediaType" placeholder="全部" clearable style="width: 240px">
            <el-option label="全部" value="" />
            <el-option label="产品测评/公众号" value="产品测评/公众号" />
            <el-option label="产品种草" value="产品种草" />
            <el-option label="抖音二创" value="抖音二创" />
            <el-option label="微博冲榜" value="微博冲榜" />
          </el-select>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="handleSearch">
            <el-icon><Search /></el-icon> 查询
          </el-button>
        </el-form-item>
      </el-form>
      
      <el-form :model="searchForm" inline class="search-form-row2">
        <el-form-item label="合作产品">
          <el-select v-model="searchForm.productType" placeholder="全部" clearable style="width: 240px">
            <el-option label="全部" value="" />
            <el-option label="手机/平板/OS" value="手机/平板/OS" />
            <el-option label="可穿戴/生态链" value="可穿戴/生态链" />
            <el-option label="大家电/笔记本" value="大家电/笔记本" />
            <el-option label="汽车" value="汽车" />
          </el-select>
        </el-form-item>
        
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="searchForm.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="YYYY-MM-DD"
          />
        </el-form-item>
        
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="全部" clearable style="width: 240px">
            <el-option label="全部" value="" />
            <el-option label="进行中" value="进行中" />
            <el-option label="已结案" value="已结案" />
          </el-select>
        </el-form-item>
        
        <el-form-item>
          <el-button @click="resetForm">
            <el-icon><Refresh /></el-icon> 重置
          </el-button>
        </el-form-item>
      </el-form>
      
      <!-- Action Buttons -->
      <div class="action-bar">
        <el-button type="primary" @click="handleCreate">
          <el-icon><Plus /></el-icon> 新建
        </el-button>
        
        <el-button @click="handleDownload" class="download-btn">
          <el-icon><Download /></el-icon> 下载
        </el-button>
      </div>
      
      <!-- Data Table -->
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column prop="taskId" label="任务编号" width="120" />
        <el-table-column prop="companyName" label="代理公司名称" width="180" />
        <el-table-column prop="projectName" label="项目名称" width="150" />
        <el-table-column prop="mediaType" label="传播类型" width="150" />
        <el-table-column prop="productType" label="合作产品" width="150" />
        <el-table-column prop="createTime" label="活动创建时间" width="180" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <el-tag :type="scope.row.status === '进行中' ? 'success' : 'danger'">
              <span class="status-dot" :class="scope.row.status === '进行中' ? 'status-active' : 'status-closed'"></span>
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="220">
          <template #default="scope">
            <el-button type="primary" link @click="handleView(scope.row)">查看</el-button>
            <el-button type="primary" link @click="handleUpdate(scope.row)">更新</el-button>
            <el-button type="primary" link @click="handleHistory(scope.row)">历史记录</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <!-- Pagination -->
      <div class="pagination-container">
        <span class="total-count">共{{ total }}条</span>
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
        <el-dropdown @command="handlePageSizeCommand" class="page-size-dropdown">
          <span class="el-dropdown-link">
            {{ pageSize }}条/页 <el-icon class="el-icon--right"><arrow-down /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="10">10条/页</el-dropdown-item>
              <el-dropdown-item command="20">20条/页</el-dropdown-item>
              <el-dropdown-item command="50">50条/页</el-dropdown-item>
              <el-dropdown-item command="100">100条/页</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue'
  import { Search, Plus, Download, Refresh, ArrowDown } from '@element-plus/icons-vue'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import type { TableRowData, SearchFormData } from './types'

  
  // Search form data
  const searchForm = reactive<SearchFormData>({
    taskId: '',
    projectName: '',
    mediaType: '',
    productType: '',
    dateRange: [],
    status: ''
  })
  
  // Table data state
  const tableData = ref<TableRowData[]>([])
  const loading = ref(false)
  const total = ref(100)
  const currentPage = ref(1)
  const pageSize = ref(10)
  
  // Fetch data from API
  const fetchData = async () => {
    loading.value = true
    try {
      // In a real app, you would call your API here
      // const response = await api.getTasks(searchForm, currentPage.value, pageSize.value)
      // tableData.value = response.data
      // total.value = response.total
      
      // Mock data for demonstration
      setTimeout(() => {
        tableData.value = [
          {
            id: 1,
            taskId: '8888-88-999',
            companyName: '代理公司1111111111',
            projectName: '广州车展',
            mediaType: '产品测评/公众号',
            productType: '手机/平板/OS',
            createTime: '2022-02-20 13:50:15',
            status: '进行中'
          },
          {
            id: 2,
            taskId: '8888-88-999',
            companyName: '代理公司1111111111',
            projectName: '上海车展',
            mediaType: '产品种草',
            productType: '可穿戴/生态链',
            createTime: '2022-01-29 13:20:10',
            status: '已结案'
          },
          {
            id: 3,
            taskId: '8888-88-999',
            companyName: '代理公司1111111111',
            projectName: '11月战役',
            mediaType: '抖音二创',
            productType: '大家电/笔记本',
            createTime: '2022-01-27 19:21:23',
            status: '已结案'
          },
          {
            id: 4,
            taskId: '8888-88-999',
            companyName: '代理公司1111111111',
            projectName: '12月战役',
            mediaType: '微博冲榜',
            productType: '汽车',
            createTime: '2022-01-20 22:51:34',
            status: '已结案'
          },
          {
            id: 5,
            taskId: '8888-88-999',
            companyName: '代理公司1111111111',
            projectName: '1月战役',
            mediaType: '微博冲榜',
            productType: '汽车',
            createTime: '2022-01-11 17:21:10',
            status: '进行中'
          },
          {
            id: 6,
            taskId: '8888-88-999',
            companyName: '代理公司1111111111',
            projectName: '双Ultra战役',
            mediaType: '微博冲榜',
            productType: '汽车',
            createTime: '2022-01-09 02:35:54',
            status: '进行中'
          },
          {
            id: 7,
            taskId: '8888-88-999',
            companyName: '代理公司1111111111',
            projectName: '其他战役',
            mediaType: '微博冲榜',
            productType: '汽车',
            createTime: '2021-12-23 19:35:29',
            status: '已结案'
          },
          {
            id: 8,
            taskId: '8888-88-999',
            companyName: '代理公司1111111111',
            projectName: '其他战役',
            mediaType: '微博冲榜',
            productType: '汽车',
            createTime: '2021-12-05 03:50:37',
            status: '已结案'
          },
          {
            id: 9,
            taskId: '8888-88-999',
            companyName: '代理公司1111111111',
            projectName: '其他战役',
            mediaType: '微博冲榜',
            productType: '汽车',
            createTime: '2021-11-25 17:34:47',
            status: '已结案'
          },
          {
            id: 10,
            taskId: '8888-88-999',
            companyName: '代理公司1111111111',
            projectName: '更多战役',
            mediaType: '微博冲榜',
            productType: '汽车',
            createTime: '2021-10-27 03:51:49',
            status: '进行中'
          }
        ]
        loading.value = false
      }, 500)
    } catch (error) {
      console.error('Failed to fetch data:', error)
      ElMessage.error('获取数据失败')
      loading.value = false
    }
  }
  
  // Event handlers
  const handleSearch = () => {
    currentPage.value = 1
    fetchData()
  }
  
  const resetForm = () => {
    Object.keys(searchForm).forEach(key => {
      // @ts-ignore
      searchForm[key] = key === 'dateRange' ? [] : ''
    })
    currentPage.value = 1
    fetchData()
  }
  
  const handleCreate = () => {
    ElMessage.info('点击了新建按钮')
    // Navigate to create page or open create dialog
  }
  
  const handleDownload = () => {
    ElMessage.info('开始下载数据')
    // Implement download logic
  }
  
  const handleView = (row: TableRowData) => {
    ElMessage.info(`查看任务: ${row.projectName}`)
    // Navigate to detail page or open detail dialog
  }
  
  const handleUpdate = (row: TableRowData) => {
    ElMessage.info(`更新任务: ${row.projectName}`)
    // Navigate to edit page or open edit dialog
  }
  
  const handleHistory = (row: TableRowData) => {
    ElMessage.info(`查看历史记录: ${row.projectName}`)
    // Navigate to history page or open history dialog
  }
  
  const handleSizeChange = (val: number) => {
    pageSize.value = val
    fetchData()
  }
  
  const handleCurrentChange = (val: number) => {
    currentPage.value = val
    fetchData()
  }
  
  const handlePageSizeCommand = (command: string | number | object) => {
    pageSize.value = Number(command)
    fetchData()
  }
  
  // Initialize
  onMounted(() => {
    fetchData()
  })
  </script>
  
  <script lang="ts">
  // Types definition
  export interface TableRowData {
    id: number
    taskId: string
    companyName: string
    projectName: string
    mediaType: string
    productType: string
    createTime: string
    status: string
  }
  
  export interface SearchFormData {
    taskId: string
    projectName: string
    mediaType: string
    productType: string
    dateRange: Date[]
    status: string
  }
  </script>
  
  <style scoped>
  .task-management-container {
    padding: 20px;
  }
  
  .search-form, .search-form-row2 {
    margin-bottom: 20px;
    padding: 20px;
    background-color: #f5f7fa;
    border-radius: 4px;
  }
  
  .action-bar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  
  .download-btn {
    margin-left: auto;
  }
  
  .pagination-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
  }
  
  .total-count {
    color: #606266;
  }
  
  .page-size-dropdown {
    margin-left: 10px;
  }
  
  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
    display: flex;
    align-items: center;
  }
  
  .status-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 5px;
  }
  
  .status-active {
    background-color: #67c23a;
  }
  
  .status-closed {
    background-color: #f56c6c;
  }
  </style>