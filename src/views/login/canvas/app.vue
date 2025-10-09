<template>
    <div class="app-container">
      <h1>Canvas Infinite Scroll (10,000 Rows)</h1>
      <div class="controls">
        <button @click="generateData">重新生成数据</button>
        <span>总行数: {{ data.length }}</span>
      </div>
      <InfiniteScrollCanvas :data="data" :row-height="40" :visible-rows="20" />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import InfiniteScrollCanvas from './InfiniteScrollCanvas.vue'
  
  // Generate sample data
  const generateSampleData = (count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      text: `数据行 ${i + 1} - ${Math.random().toString(36).substring(2, 8)}`,
    }))
  }
  
  const data = ref(generateSampleData(10000))
  
  const generateData = () => {
    data.value = generateSampleData(10000)
  }
  </script>
  
  <style>
  .app-container {
    width: 820px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  h1 {
    margin-bottom: 20px;
    color: #333;
  }
  
  .controls {
    margin-bottom: 20px;
    display: flex;
    gap: 20px;
    align-items: center;
  }
  
  button {
    padding: 8px 16px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>