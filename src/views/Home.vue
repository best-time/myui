<template>
  <div class="home">
    <h2>页面</h2>
    <p v-for="(item, index) in routeList" :key="index" @click="toRoute(item)">
      {{ item.name }}
    </p>
  </div>
</template>
<script setup>
import { routes } from '@/router/index.js'
import EntryRoutes from '@/router/entry.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const routeList = routes.concat(EntryRoutes)

const toRoute = (item) => {
  router.push({
    path: item.path
  })
}
</script>

<style lang="scss" scoped>
p {
  cursor: pointer;
  font-weight: bold;
}
</style>
