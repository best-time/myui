<template>
  <div class="lazyLoad" ref="lazy" @scroll="lazyLoad">
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timer: null,
      oldScrollTop: 0,
      len: 0 // 设置len以便已加载过的图片就不重复加载了
    }
  },
  mounted() {
    // 挂载之后才能操作
    this.lazyLoad()
  },
  methods: {
    getImages() {
      return this.$refs.lazy.getElementsByClassName('lazyImg')
    },
    debounce(fn) {
      // 函数防抖：用户停止操作之后触发
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        fn()
      }, 200)
    },
    loadImg() {
      let img = this.getImages()
      let top = this.$refs.lazy.scrollTop + window.screen.height

      for (let i = this.len; i < img.length; i++) {
        console.log(img[i].offsetTop, top)
        if (img[i].offsetTop <= top) {
          // img[i].onload=function(ev) {
          //   console.log(ev)
          // }
          img[i].src = img[i].getAttribute('datasrc')
          this.len = i
        }
      }
    },
    lazyLoad() {
      // 如果上拉距离大于500px则自动加载
      if (this.$refs.lazy.scrollTop - this.oldScrollTop > 500) {
        this.loadImg()
        this.oldScrollTop = this.$refs.lazy.scrollTop
      } else if (this.$refs.lazy.scrollTop - this.oldScrollTop < 0) {
        // 如果向下拉则不做操作
        return
      } else {
        // 如果向下拉但小于500px则防抖加载
        this.debounce(this.loadImg)
      }
    }
  }
}
</script>

<style>
.lazyLoad {
  height: 100vh;
  overflow: scroll;
}
</style>
