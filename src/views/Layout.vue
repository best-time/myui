<template>
  <section class="g-flexview">
    <div style="height: 44px; background-color: #eee; width: 100%">
      header
    </div>
    <section class="g-scrollview" ref="scrollView" id="scrollView">
      <div :key="i" v-for="i in 20" class="c">
        {{ i }}--乱七八糟的内容在这里，超出容器，将出现滚动条。
      </div>
    </section>
    <div style="height: 44px; background-color: #ddd; width: 100%">
      footer
    </div>
  </section>
</template>

<script>
export default {
  name: "layout"
};
</script>

<style lang="less" scoped>
.c {
  height: 40px;
}
@max-width: 750px;
@min-width: 300px;
@navbar-height: 44px;
@body-padding-bottom: 14px;

.g-view {
  margin: 0 auto;
  max-width: @max-width;
  min-width: @min-width;
  &:before {
    content: "";
    display: block;
    width: 100%;
    height: @navbar-height;
  }
  &:after {
    content: "";
    display: block;
    width: 100%;
    height: @body-padding-bottom * 3;
  }
}

.g-flexview {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  height: 100%;
  max-width: @max-width;
  min-width: @min-width;
}

.g-scrollview {
  width: 100%;
  height: 100%;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  position: relative;
  margin-bottom: -1px;
  &:after {
    content: "";
    display: block;
    width: 100%;
    height: @body-padding-bottom;
  }
}
</style>
