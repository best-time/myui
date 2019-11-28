<template>
  <div>
    <p
      style="color: #00c3f5;padding-bottom: 5px;padding-left: 5px;font-size: 15px;"
      class="demo-small-pitch"
    >
      <!-- 参照 京东APP 和
      <a href="http://photoswipe.com/" style="text-decoration: underline;"
        >Photoswipe</a
      >
      功能实现。 -->
    </p>
    <lightbox>
      <div class="demo-lightbox">
        <div>
          <lightbox-img
            :src="img1"
            :original="img1"
          ></lightbox-img>
        </div>
        <div>
          <div>
            <div>
              <lightbox-img
                :src="img2"
                :original="img2"
              ></lightbox-img>
            </div>
            <div>
              <lightbox-img
                :src="img3"
                :original="img3"
              ></lightbox-img>
            </div>
          </div>
          <div>
            <div>
              <lightbox-img
                :src="img4"
                :original="img4"
              ></lightbox-img>
            </div>
            <div>
              <lightbox-img
                :src="img5"
                :original="img5"
              ></lightbox-img>
            </div>
          </div>
        </div>
      </div>

      <lightbox-txt>
        <h1
          style="font-size: 15px;margin-bottom: 8px;color: #00c3f5;text-align: right;"
          slot="top"
        >
          美丽风景
        </h1>
        <div slot="content" style="text-align: right;">
          <p>风景指的是供观赏的自然风光、景物，包括自然景观和人文景观</p>
          <p>风景是由光对物的反映所显露出来的一种景象</p>
          <p>犹言风光或景物、景色等，含义广泛</p>
          <p>而且还有一大部分作品是借景抒情，寓情于景</p>
        </div>
      </lightbox-txt>
    </lightbox>
  </div>
</template>

<script>

import img1 from "@/assets/scenery_s01.jpg"
import img2 from "@/assets/scenery_s02.jpg"
import img3 from "@/assets/scenery_s03.jpg"
import img4 from "@/assets/scenery_s04.jpg"
import img5 from "@/assets/scenery_s05.jpg"
console.log(img1)
export default {
  data() {
    return {
      baseurl: "../../assets/"
      ,img1
      ,img2
      ,img3
      ,img4
      ,img5
    };
  }
};
</script>

<style scoped lang="less">

.demo-lightbox {
  display: flex;
  width: 100%;
  padding: 0 2px;
  > div {
    flex: 1;
    &:first-child {
      flex: .6558;
      margin-right: 2px;
    }
    > img {
      width: 100%;
    }
    > div {
      display: flex;
      > div {
        flex: 1;
        &:first-child {
          margin-right: 2px;
        }
        > img {
          width: 100%;
          display: block;
        }
      }
      &:first-child {
        margin-bottom: 2px;
      }
    }
  }
}
</style>