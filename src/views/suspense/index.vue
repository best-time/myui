<template>
  <Suspense>
    <AsyncChildDemo />
    <template #fallback>loading1...</template>
  </Suspense>
</template>

<script setup>
import AsyncChildDemo from './Child.vue'
</script>
