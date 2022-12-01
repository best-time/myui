<template>
  <div>
    <lazy-load>
      <img :key="index" v-for="(item, index) in imgList" class="lazyImg" src="#" :datasrc="item" alt="" />
    </lazy-load>
  </div>
</template>

<script>
import LazyLoad from './component/lazy-load';

const list = [
  "https://cdn.jsdelivr.net/gh/lztnb/img@master/3.jpg",
  "https://cdn.jsdelivr.net/gh/lztnb/img@master/4.jpg",
  "https://cdn.jsdelivr.net/gh/lztnb/img@master/5.jpg",
  "https://cdn.jsdelivr.net/gh/lztnb/img@master/6.jpg",
  "https://cdn.jsdelivr.net/gh/lztnb/img@master/7.jpg",
  "https://cdn.jsdelivr.net/gh/lztnb/img@master/14.jpg",
  "https://cdn.jsdelivr.net/gh/lztnb/img@master/15.jpg",
  "https://cdn.jsdelivr.net/gh/lztnb/img@master/16.jpg",
  "https://cdn.jsdelivr.net/gh/lztnb/img@master/17.jpg",
  "https://cdn.jsdelivr.net/gh/lztnb/img@master/18.jpg",
  "https://cdn.jsdelivr.net/gh/lztnb/img@master/19.jpg",
  "https://cdn.jsdelivr.net/gh/lztnb/img@master/20.jpg",
  "https://cdn.jsdelivr.net/gh/lztnb/img@master/22.jpg",
  "https://cdn.jsdelivr.net/gh/lztnb/img@master/23.jpg",
  "https://cdn.jsdelivr.net/gh/lztnb/img@master/24.jpg",
  "https://cdn.jsdelivr.net/gh/lztnb/img@master/25.jpg",
  "https://cdn.jsdelivr.net/gh/lztnb/img@master/26.jpg",
  "https://cdn.jsdelivr.net/gh/lztnb/img@master/27.jpg",
  "https://cdn.jsdelivr.net/gh/lztnb/img@master/28.jpg",
  "https://cdn.jsdelivr.net/gh/lztnb/img@master/29.jpg",
  "https://cdn.jsdelivr.net/gh/lztnb/img@master/30.jpg",
  "https://cdn.jsdelivr.net/gh/lztnb/img@master/31.jpg",
  "https://cdn.jsdelivr.net/gh/lztnb/img@master/32.jpg",
  "https://cdn.jsdelivr.net/gh/lztnb/img@master/33.jpg"
];
export default {
  name:'lazy-demo',
  components: {
    LazyLoad
  },
  data() {
    return {
      imgList: list
    }
  }
}
</script>
