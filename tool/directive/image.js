app.directive('real-img', {
    async beforeMount(el, binding) {
        const imgURL = binding.value;
        if (imgURL) {
            const exist = await imageIsExist(imgURL);
            exist && el.setAttribute('src', imgURL);
        }
        // 判断一个图片是否存在, 注意是异步行为
        function imageIsExist(url) {
            return new Promise(resolve => {
                let img = new Image();
                img.src = url;
                img.onload = () => {
                    if(img.complete) {
                        resolve(true);
                        img = null;
                    }
                }
                img.onerror = () => {
                    resolve(false);
                    img = null;
                }
            })
        }
    }
})

// <img v-real-img="'images/logo.png'" src="images/errorLogo.png"/>

/*

这个指令思路大致会有两种方向：

一种是直接加载目标图片，等到加载失败的时候使用默认图片。
一种是直接加载默认图片，等图片加载完成之后再使用加载完成的目标图片。
这里我选择第二种，原因是，很多时候我们都能人为保证这个默认图片基本是存在的，而且图片大小可能也不会很大，
成功加载它的概率明显会高于目标图片，并且直接加载默认图片也可以达到一个占位图效果，这是非常友好好的，当然如果你想反之，也只需要对换下两种路径即可。





<template>
  <img src="images/logo.png" onerror="errorImgCb"/>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    function errorImgCb(e) {
      let img = e.srcElement;
      img.src = "images/errorLogo.png";
      img.onerror = null; // 防止进入死循环
    }

    return {
      errorImgCb
    }
  }
});
</script>


 */

