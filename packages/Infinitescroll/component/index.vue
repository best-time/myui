<template>
  <div>
    <slot name="list"></slot>

    <div class="list-donetip" v-show="!isLoading && isDone">
      <slot name="doneTip">没有更多数据了</slot>
    </div>

    <div class="list-loading" v-show="isLoading">
      <slot name="loadingTip">加载中</slot>
    </div>

    <div ref="tag" style="height: 1px;"></div>
  </div>
</template>

<script type="text/babel">
import { getScrollview } from "../../utils/assist";

export default {
  name: "infinitescroll",
  data() {
    return {
      isLoading: false,
      isDone: false,
      num: 1
    };
  },
  props: {
    onInfinite: {
      type: Function,
      required: true
    },
    distance: {
      default: 0,
      validator(val) {
        return /^\d*$/.test(val);
      }
    }
  },
  mounted() {
    this.$nextTick(this.init);
  },
  destroyed() {
    this.scrollview.removeEventListener("scroll", this.throttledCheck);
  },
  methods: {
    init() {
      this.scrollview = getScrollview(this.$el);

      this.scrollview.addEventListener("scroll", this.throttledCheck, false);

      this.$on("infinitescroll.loadedDone", () => {
        this.isLoading = false;
        this.isDone = true;
      });

      this.$on("infinitescroll.finishLoad", () => {
        this.isLoading = false;
      });

      this.$on("infinitescroll.reInit", () => {
        this.isLoading = false;
        this.isDone = false;
      });
    },
    scrollHandler() {
      if (this.isLoading || this.isDone) return;

      const scrollview = this.scrollview;
      const contentHeight = document.body.offsetHeight;
      // 滚动区离顶部距离
      const offsetTop =
        scrollview == window ? 0 : scrollview.getBoundingClientRect().top;

      if (!scrollview) {
        console.warn("Can't find the scrollview!");
        return;
      }

      if (!this.$refs.tag) {
        console.warn("Can't find the refs.tag!");
        return;
      }

      const tagOffsetTop =
        Math.floor(this.$refs.tag.getBoundingClientRect().top) - 1;
      const distance =
        !!this.distance && this.distance > 0
          ? ~~this.distance // 取整
          : Math.floor(contentHeight / 10);

      if (
        tagOffsetTop > offsetTop &&
        tagOffsetTop - (distance + offsetTop) * this.num <= contentHeight
      ) {
        this.isLoading = true;
        this.onInfinite();
        this.num++;
      }
    },
    throttle(method, context) {
      method.tId && clearTimeout(method.tId);
      method.tId = setTimeout(() => {
        method.call(context);
      }, 50);
    },
    throttledCheck() {
      this.throttle(this.scrollHandler);
    }
  }
};
</script>

<style lang="less">
@import "./index.less";
</style>
