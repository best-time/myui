<template>
  <div>
    <div class="list-item" :key="index" v-for="(item, index) in arr">
      <div class="list-img">
        <img :src="item.img" />
      </div>
      <div class="list-mes">
        <h3 class="list-title">{{ item.title }}</h3>
        <div class="list-mes-item">
          <div>
            <span class="list-price"><em>¥</em>{{ item.price }}</span>
            <span class="list-del-price">¥{{ item.w_price }}</span>
          </div>
          <div>content</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'card-list',
  data() {
    return {
      arr: [
        {
          img: 'http://img1.shikee.com/try/2016/06/23/14381920926024616259.jpg',
          title: '标题标题标题标题标题',
          price: 56.23,
          w_price: 89.36
        },
        {
          img: 'http://img1.shikee.com/try/2016/06/21/10172020923917672923.jpg',
          title: '骆驼男装2016夏装男士短袖T恤 圆领衣服 印花男装体恤 半袖打底衫',
          price: 56.23,
          w_price: 89.36
        },
        {
          img: 'http://img1.shikee.com/try/2016/06/23/15395220917905380014.jpg',
          title: '条纹短袖T恤男士韩版衣服大码潮流男装夏季圆领体恤2016新款半袖',
          price: 56.23,
          w_price: 89.36
        },
        {
          img: 'http://img1.shikee.com/try/2016/06/25/14244120933639105658.jpg',
          title: '夏季青少年衣服男生潮牌t恤 男士 夏秋学生 日系棉短袖半袖男小衫',
          price: 56.23,
          w_price: 89.36
        },
        {
          img: 'http://img1.shikee.com/try/2016/06/26/12365720933909085511.jpg',
          title: '2016夏装新款时尚潮流短袖T恤男纯棉V领日系青少年韩版夏季上衣服',
          price: 56.23,
          w_price: 89.36
        },
        {
          img: 'http://img1.shikee.com/try/2016/06/19/09430120929215230041.jpg',
          title: '男装衣服男夏t恤 男士短袖t恤圆领夏季潮牌宽松原宿风半截袖男',
          price: 56.23,
          w_price: 89.36
        }
      ]
    }
  }
}
</script>

<style scoped lang="less">
.text-overflow(@align: justify) {
  word-wrap: normal;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-align: @align;
}
.list-item {
  width: 50%;
  float: left;
  padding: 0 2px;
  margin-top: 4px;
  .list-mes {
    padding: 10px;
    .list-title {
      .text-overflow();
      height: 32px;
    }
  }
}

.list-img {
  height: 0;
  width: 100%;
  padding: 50% 0;
  overflow: hidden;
  img {
    width: 100%;
    margin-top: -50%;
    background-color: #fff;
    border: none;
  }
}

.list-mes-item {
  overflow: hidden;
  display: flex;
  -webkit-box-align: end;
  -webkit-align-items: flex-end;
  -ms-flex-align: end;
  align-items: flex-end;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  color: #999;
}

.list-mes {
  background-color: #fff;
  .list-title {
    color: #505050;
    font-size: 16px;
    text-align: justify;
    font-weight: 800;
  }
  .list-other {
    overflow: hidden;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    color: #999;
  }
}
</style>
