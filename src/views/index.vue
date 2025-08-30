<template>
  <div class="base-index">
    <h2>demo-list</h2>
    <p v-for="(item, index) in list" :key="index" @click="jump(item)">{{ item.name }}</p>
  </div>
</template>

<script>
export default {
  name: 'base-index',
  data() {
    return {
      list: [
        { name: 'layout' },
        { name: 'list' },
        { name: 'navbar' },
        { name: 'clist' },
        { name: 'scrolltab' },
        { name: 'popup' },
        { name: 'sendcode' },
        { name: 'infinite' },
        { name: 'pullrefresh' },
        { name: 'lightbox' },
        { name: 'switch' },
        { name: 'skeleton' },
        { name: 'timeline' },
        { name: 'select' },
        { name: 'input' },
        { name: 'scrollNav' }
      ]
    }
  },
  methods: {
    jump(n) {
      const { name } = n
      this.$router.push({ name })
    }
  }
}
</script>

<style scoped lang="less">
.base-index {
  h2 {
    font-size: 30px;
    background: #eee;
  }
  & > p {
    padding-left: 14px;
    line-height: 32px;
    font-size: 16px;
    text-align: left;
    color: #666;
  }
}
</style>
