<template>
  <div class="box1">
    <VirtualList :listData="data" :itemHeight="100"/>
  </div>
</template>

<script>
import VirtualList from "./component/index.vue";
let d = [];
for (let i = 0; i < 1000; i++) {
  d.push({ id: i, value: i });
}

export default {
  name: "App",
  data() {
    return {
      data: d
    };
  },
  components: {
    VirtualList
  }
};
</script>

<style>
html{
  height: 100%;
}
body{
  height: 100%;
  margin:0;
}
.box1{
  height:100%;
}
</style>
