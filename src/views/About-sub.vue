<template>
  <div class="min-h-screen bg-gray-100 py-8 px-4">
    <div class="max-w-lg mx-auto">
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl  font-semibold text-gray-800 mb-6 text-center">用户信息表单</h2>

        <div class="space-y-4">
          <!-- Main Value Input -->
          <div>
            <label class="block text-sm font-medium  text-orange-400 mb-2"> 主要信息 </label>
            <div class="flex items-center space-x-3">
              <input
                v-model="modelValue"
                placeholder="请输入主要信息"
                class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
              />
              <span class="text-sm text-gray-600 min-w-0 flex-shrink-0">
                {{ modelValue || '未填写' }}
              </span>
            </div>
          </div>

          <!-- Count Input -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"> 数量 </label>
            <div class="flex items-center space-x-3">
              <input
                v-model="count"
                type="number"
                placeholder="请输入数量"
                class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
              />
              <span class="text-sm text-gray-600 min-w-0 flex-shrink-0">
                {{ count }}
              </span>
            </div>
          </div>

          <!-- Name Inputs -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"> 姓名 </label>
            <div class="grid grid-cols-2 gap-3 mb-2">
              <input
                v-model="firstName"
                placeholder="名字"
                class="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
              />
              <input
                v-model="lastName"
                placeholder="姓氏"
                class="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
              />
            </div>
            <div class="text-right">
              <span class="text-sm text-gray-600">
                {{ firstName && lastName ? `${firstName} ${lastName}` : '未完整填写' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
// 定义 v-model
const modelValue = defineModel()

// 带默认值
const count = defineModel('count', { default: 0 })

// 多个 v-model
const firstName = defineModel('firstName')
const lastName = defineModel('lastName')
</script>
