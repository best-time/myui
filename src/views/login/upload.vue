<template>
    <div class="upload-container">
      <h2 class="form-title">上传效果数据</h2>
      
      <el-form :model="formData" label-width="120px" class="upload-form">
        <el-form-item label="项目名称">
          <el-select v-model="formData.projectName" placeholder="选择活动，比如双Ultra战役" class="w-full">
            <el-option label="选择活动，比如双Ultra战役" value=""></el-option>
            <el-option label="双11活动" value="双11活动"></el-option>
            <el-option label="年终促销" value="年终促销"></el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item label="供应商名称">
          <el-input v-model="formData.supplierName" placeholder="供应商111"></el-input>
        </el-form-item>
        
        <el-form-item label="传播类型">
          <el-select v-model="formData.broadcastType" placeholder="选择类型" class="w-full">
            <el-option label="选择类型" value=""></el-option>
            <el-option label="线上推广" value="线上推广"></el-option>
            <el-option label="线下活动" value="线下活动"></el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item label="合作产品">
          <el-select v-model="formData.cooperativeProduct" placeholder="选择合作产品" class="w-full">
            <el-option label="选择合作产品" value=""></el-option>
            <el-option label="产品A" value="产品A"></el-option>
            <el-option label="产品B" value="产品B"></el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item label="状态">
          <el-select v-model="formData.status" placeholder="选择状态" class="w-full">
            <el-option label="选择状态" value=""></el-option>
            <el-option label="进行中" value="进行中"></el-option>
            <el-option label="已完成" value="已完成"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      
      <div class="upload-section">
        <h3 class="upload-title">上传效果数据</h3>
        
        <el-upload
          class="upload-demo"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
        >
          <el-button type="primary">
            <el-icon class="el-icon--upload"><Upload /></el-icon>
            <span>点击上传</span>
          </el-button>
          <div class="download-template">
            <el-button link type="primary">下载数据模版</el-button>
          </div>
        </el-upload>
        
        <div class="file-list">
          <div class="file-item">
            <el-icon><Document /></el-icon>
            <span>初始版本.csv</span>
            <div class="file-actions">
              <el-button link><el-icon><Download /></el-icon></el-button>
              <el-button link><el-icon><Delete /></el-icon></el-button>
            </div>
          </div>
          
          <div class="file-item">
            <el-icon><Document /></el-icon>
            <span>初始版本.xls</span>
            <div class="file-actions">
              <el-icon class="loading"><Loading /></el-icon>
              <el-button link><el-icon><Delete /></el-icon></el-button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="form-actions">
        <el-button>取消</el-button>
        <el-button type="primary">提交</el-button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { Document, Delete, Download, Upload, Loading } from '@element-plus/icons-vue'
  
  const formData = ref({
    projectName: '',
    supplierName: '供应商111',
    broadcastType: '',
    cooperativeProduct: '',
    status: ''
  })
  
  const handleRemove = (file, uploadFiles) => {
    console.log(file, uploadFiles)
  }
  
  const handlePreview = (file) => {
    console.log(file)
  }
  
  const handleExceed = (files, uploadFiles) => {
    ElMessage.warning(
      `The limit is 3, you selected ${files.length} files this time, add up to ${
        files.length + uploadFiles.length
      } totally`
    )
  }
  
  const beforeRemove = (uploadFile, uploadFiles) => {
    return ElMessageBox.confirm(
      `Cancel the transfer of ${uploadFile.name} ?`
    ).then(
      () => true,
      () => false
    )
  }
  </script>
  
  <style scoped>
  .upload-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .form-title {
    font-size: 18px;
    margin-bottom: 20px;
    font-weight: bold;
  }
  
  .upload-form {
    margin-bottom: 30px;
  }
  
  .w-full {
    width: 100%;
  }
  
  .upload-section {
    margin-bottom: 30px;
  }
  
  .upload-title {
    font-size: 16px;
    margin-bottom: 15px;
    font-weight: bold;
  }
  
  .upload-demo {
    margin-bottom: 15px;
  }
  
  .download-template {
    margin-top: 10px;
  }
  
  .file-list {
    margin-top: 20px;
  }
  
  .file-item {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #eee;
  }
  
  .file-item .el-icon {
    margin-right: 10px;
    color: #909399;
  }
  
  .file-actions {
    margin-left: auto;
    display: flex;
    align-items: center;
  }
  
  .loading {
    color: #409EFF;
    animation: rotating 2s linear infinite;
  }
  
  @keyframes rotating {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  
  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
  </style>