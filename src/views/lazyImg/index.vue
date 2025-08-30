<template>
  <div>
    <div>
      <h2>预加载</h2>
      <div>
        <img :src="imgData[imgInd]" alt="" style="width: 400px; height: 400px" />
      </div>
      <button @click="onLeft" class="but">上一张</button>
      <button @click="onRight" class="but">下一张</button>
    </div>
  </div>
</template>

<script>
import { preloadImg } from './util'
// 预加载
export default {
  name: 'lazy-img',
  data() {
    return {
      imgInd: 0,
      imgData: [
        'https://cdn.jsdelivr.net/gh/lztnb/img@master/3.jpg',
        'https://cdn.jsdelivr.net/gh/lztnb/img@master/4.jpg',
        'https://cdn.jsdelivr.net/gh/lztnb/img@master/5.jpg',
        'https://cdn.jsdelivr.net/gh/lztnb/img@master/7.jpg'
      ],
      imgSrcArray: []
    }
  },
  mounted() {
    preloadImg(this.imgData)
  },
  methods: {
    onLeft() {
      this.imgInd = this.imgInd - 1 < 0 ? 0 : this.imgInd - 1
    },
    onRight() {
      if (this.imgInd + 1 === this.imgData.length) {
      } else {
        this.imgInd = this.imgInd + 1
      }
      // imgInd.value + 1 == imgData.value.length
      //     ? imgData.value.length - 1
      //     : ++imgInd.value;
    }
  }
}
</script>

<style>
.but {
  width: 100px;
  height: 32px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

/*.imgFrame {*/
/*  margin-top: 20px;*/
/*  width: 800px;*/
/*  height: 600px;*/
/*  overflow: auto;*/
/*}*/
/*img {*/
/*  height: 100%;*/
/*  width: 100%;*/
/*  object-fit: contain;*/
/*}*/
</style>
