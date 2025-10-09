<template>
    <div class="timeline-container">
      <h2 class="timeline-title">历史记录</h2>
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :timestamp="activity.timestamp"
          :type="activity.type"
          :hollow="activity.hollow"
          placement="top"
        >
          <h4 class="timeline-item-title">{{ activity.title }}</h4>
          <p class="timeline-item-content">{{ activity.content }}</p>
          <p class="timeline-item-user">{{ activity.user }}</p>
        </el-timeline-item>
      </el-timeline>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const activities = ref([
    {
      title: '更新效果数据',
      content: '这里展示的是后续更新的版本 .csv',
      user: '用户xxx',
      timestamp: '2025-1-1 23:30:33',
      type: 'primary',
      hollow: false
    },
    {
      title: '上传效果数据',
      content: '这里是当时版本的附件',
      user: '用户：xxxx',
      timestamp: '2025-1-1 23:00:01',
      type: 'primary',
      hollow: true
    },
    {
      title: '新建合同',
      content: '操作',
      user: '管理员-李川',
      timestamp: '2020-12-01 15:00:00',
      type: 'info',
      hollow: true
    }
  ])
  </script>
  
  <style scoped>
  .timeline-container {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .timeline-title {
    font-size: 24px;
    margin-bottom: 20px;
    font-weight: 500;
  }
  
  .timeline-item-title {
    font-size: 16px;
    font-weight: 500;
    margin: 0;
    color: #303133;
  }
  
  .timeline-item-content {
    color: #606266;
    font-size: 14px;
    margin: 4px 0;
  }
  
  .timeline-item-user {
    color: #909399;
    font-size: 14px;
    margin: 4px 0;
  }
  </style>