<template>
  <div>
  <div>图片懒加载</div>
<!--  <div class="imgFrame" id="imgFrame">-->
    <img
      v-for="(data, ind) in imgData"
      :key="ind"
      v-lazy="data"
      alt=""
      style="width: 400px; height: 400px"
    />
<!--  </div>-->
  </div>
</template>

<script lang="ts">
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
import './directive'
// 获取最近可以滚动的父元素
function getParent(e) {
  console.log(e)
  let parentDom = e.parentNode;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (parentDom == document.body) {
      break;
    }
    if (parentDom.clientHeight == parentDom.scrollHeight) {
      parentDom = getParent(parentDom);
    } else {
      break;
    }
  }
  return parentDom;
}
// 得到距离页面最上方的距离
function getoffsetTop(e) {
  let offset = e.offsetTop;
  // 一直递归到最外层
  if (e.offsetParent != null) {
    offset += getoffsetTop(e.offsetParent);
  }
  return offset;
}
let time;

export default {
  name: "lay",
  data() {
    return {
      imgSrcArray: [],
      imgData: list,
      imgDomArray: []
    };
  },
  created() {
    // this.imgData.forEach((val, ind) => {
    //   this.imgSrcArray[ind] =
    //     "https://acmphoto.oss-cn-beijing.aliyuncs.com/%E5%8A%A0%E8%BD%BD%E4%B8%AD4_3.png";
    // });
  },
  mounted() {
    // this.onScroll();
  },

  methods: {
    aaa(el) {
      console.log(el)
    },
    onScroll() {
      if (time == null) {
        time = setTimeout(() => {
          this.onShow();
          time = null;
        }, 500);
      }
    },
    imgDom(el) {
      console.log(el)
      this.imgDomArray.push(el);
    },
    onShow() {
      for (let i = 0; i < this.imgSrcArray.length; i++) {
        let cHeight = 0;
        let sTop = 0;
        let imgRef = this.$refs['imgDom_'+i][0]
        let parentDom = getParent(imgRef);
        parentDom.addEventListener("scroll", this.onScroll);
        if (parentDom == document.body) {
          cHeight = document.documentElement.clientHeight;
          sTop = document.documentElement.scrollTop;
          window.addEventListener("scroll", this.onScroll);
        } else {
          cHeight = parentDom.clientHeight;
          sTop = parentDom.scrollTop;
          parentDom.addEventListener("scroll", this.onScroll);
        }
        //判断是否加载的关键
        if (
          getoffsetTop(imgRef) - getoffsetTop(parentDom) - sTop <=
          cHeight
        ) {
          this.imgSrcArray[i] = this.imgData[i];
        }
      }
    }
  },
  // setup() {
    // 判断是否加载
    // function
    // return {
    //   imgData,
    //   imgSrcArray,
    //   imgDom
    // };
  // }
};
</script>

<style scoped>
.imgFrame {
  margin-top: 20px;
  width: 800px;
  height: 600px;
  overflow: auto;
}
img {
  height: 100%;
  width: 100%;
  /*object-fit: contain;*/
}
</style>
