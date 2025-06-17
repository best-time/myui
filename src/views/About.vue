<template>
  <div class="about">
    <h1>This is an about page {{a}}</h1>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const a = ref<string>('123')
</script>
