<template>
  <div>
    <div
      :class="[['xm__skeleton--'] + type, ['xm__skeleton--'] + animate]"
      :style="{ width: width, height: height }"
    ></div>

    <div class="loading-item-one">
      <div class="xm__skeleton--circle xm__skeleton--opacity" style="width: 50px; height: 50px"></div>

      <div class="xm__skeleton--bar xm__skeleton--loading" style="width: 40%; height: 50px"></div>
    </div>
    <div class="loading-item-two">
      <div class="xm__skeleton--bar xm__skeleton--opacity" style="width: 80%; height: 50px"></div>
    </div>
    <div class="loading-item-three">
      <div class="xm__skeleton--bar xm__skeleton--opacity" style="width: 60%; height: 50px"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'skeleton',
  data() {
    return {
      type: 'circle',
      animate: 'circle', // loading
      height: '50px',
      width: '50px'
    }
  },
  // props: {
  //   type: {
  //     type: String,
  //     default: 'bar'
  //   },
  //   animate: {
  //     type: String,
  //     default: 'opacity'
  //   },
  //   width: [ String ],
  //   height: [ String ]
  // },
  computed: {
    animateClass() {
      if (this.animate !== '') return 'xm__skeleton--' + this.animate
      return ''
    }
  }
}
</script>

<style scoped lang="less">
.border-radius (@radius: 4px) {
  border-radius: @radius;
}
.size(@width, @height) {
  width: @width;
  height: @height;
}

@skeleton-bg: #d8d8d8;

.xm__skeleton--circle {
  .size(50px, 50px);
  .border-radius(100px);
  background: @skeleton-bg;
  opacity: 0.5;
}

.xm__skeleton--bar {
  opacity: 0.5;
  .size(100%, 24px);
  background: @skeleton-bg;
}

.xm__skeleton--opacity {
  animation: opacity 1s ease-in-out infinite;
}

.xm__skeleton--loading {
  animation: bar-loading 1s ease-in-out infinite;
}

@keyframes bar-loading {
  0% {
    width: 60%;
  }
  50% {
    width: 80%;
  }
  100% {
    width: 60%;
  }
}

.loading-item-one {
  display: flex;
  align-items: center;
}

.loading-item-two {
  margin-top: 10px;
}
.loading-item-three {
  margin-top: 10px;
}
</style>
