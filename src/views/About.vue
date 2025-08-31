<template>
  <div class="min-h-screen bg-gray-50">
    <MyComponent v-model="value" v-model:count="count" v-model:firstName="first" v-model:lastName="last" />
  </div>
</template>
<script setup>
import { ref } from 'vue'
import MyComponent from './About-sub.vue'

const value = ref('Hello')
const count = ref(5)
const first = ref('John')
const last = ref('Doe')
</script>
