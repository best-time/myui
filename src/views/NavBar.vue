<template>
  <div>
    <header class="m-navbar navbar-bottom-line-color" :class="classes" :style="{backgroundColor: bgcolor, height: height}">
        <div class="navbar-item">
            <span>返回</span>
        </div>
        <div class="navbar-center-box" :style="{height: height}">
            <div class="navbar-center">
                <slot name="center"><span class="center-title" :style="{color: color, fontSize: fontsize}">{{title}}</span></slot>
            </div>
        </div>
        <div class="navbar-item">
            <span>右侧内容</span>
        </div>
    </header>
  </div>
</template>

<script>
export default {
  name: "nav-bar",
  data() {
    return {
      height: "44px",
      fixed: true,
      color: '#5C5C5C',
      fontsize: "14px",
      title: "什么鬼，这个标题怎么那么长啊",
      bgcolor: "#fff"
    }
  },
  computed: {
        classes() {
            return this.fixed ? 'navbar-fixed' : '';
        }
    }
}
</script>
<style scoped lang="less">
@navbar-height: 44px;
@navbar-border-color: #B2B2B2;
@base-zindex: 1;
@navbar-center-width: 50%;
@body-padding-vertical: 12px;
@navbar-item-fontsize: 14px;

.bottom-line(@color, @zindex: 0) {
  content: '';
  position: absolute;
  z-index: @zindex;
  bottom: 0;
  left: 0;
  width: 100%;
  border-bottom: 1px solid @color;
  -webkit-transform: scaleY(.5);
  transform: scaleY(.5);
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
}

.m-navbar {
  height: @navbar-height;
  position: relative;
  display: flex;
  &:after {
    .bottom-line(@navbar-border-color, 2);
  }
  &.navbar-fixed {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: @base-zindex * 100;
  }
}

.navbar-item {
  flex: 0 0 (100% - @navbar-center-width) / 2;
  padding: 0 @body-padding-vertical / 1.2;
  font-size: @navbar-item-fontsize;
  white-space: nowrap;
  overflow: hidden;
  display: flex;
  align-items: center;
  color: inherit;
  &:first-child {
    order: 1;
    margin-right: -(100% - @navbar-center-width) / 2;
  }
  &:last-child {
    order: 3;
    justify-content: flex-end;
    > a {
      justify-content: flex-end;
    }
  }
  > a {
    display: flex;
    align-items: center;
    height: @navbar-height;
    min-width: (100% - @navbar-center-width) / 2; /* for low version android */
    flex: 1;
  }
}

.navbar-center-box {
  order: 2;
  height: @navbar-height;
  width: @navbar-center-width;
  margin-left: (100% - @navbar-center-width) / 2;
  .navbar-center {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: inherit;
    .center-title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    img {
      height: 60%;
    }
  }
}

.back-icon:before, .next-icon:before {
  display: inline-block;
  /* font-family: @iconfont-inlay; */
  /* font-size: @navbar-icon-fontsize; */
  color: inherit;
}

.back-icon:before {
  content: '\e607';
}

.next-icon:before {
  content: '\e608';
}

</style>