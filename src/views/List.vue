<template>
  <div class="list">
    <Cell>
      <span slot="left">infiniteScroll</span>
      <span slot="right"  @click="linkTo('infinite')">></span>
    </Cell>
    <Cell>
      <span slot="left">pullfresh</span>
      <span slot="right" @click="linkTo('pullrefresh')">></span>
    </Cell>
  </div>
</template>
<script>
export default {
  name: "List",
  methods: {
    linkTo(path, query = {}) {
      this.$router.push({
        path,
        query
      });
    }
  }
}
</script>
<style scoped>

</style>
