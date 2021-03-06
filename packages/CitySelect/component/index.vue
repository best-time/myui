<template>
  <div>
    <div class="mask-cityselect" v-show="show" @click.stop="close"></div>
    <div class="m-cityselect" :class="show ? 'cityselect-active' : ''">
      <div class="cityselect-header">
        <p class="cityselect-title">{{ title }}</p>
        <div v-show="ready" class="cityselect-nav">
          <a
            v-for="(index, idx) in columnNum"
            :key="idx"
            href="javascript:;"
            v-show="!!nav['txt' + index]"
            @click.stop="navEvent(index)"
            :class="index == navIndex ? 'cityselect-nav-active' : ''"
            >{{ nav["txt" + index] }}</a
          >
        </div>
      </div>
      <div v-show="!ready" class="cityselect-loading">加载中</div>
      <ul v-show="ready" class="cityselect-content" :class="activeClasses">
        <li
          v-for="(index, idx) in columnNum"
          :key="idx"
          class="cityselect-item"
          :ref="'itemBox' + index"
        >
          <div class="cityselect-item-box">
            <a
              :key="idx"
              v-for="(item, idx) in columns['columnItems' + index]"
              href="javascript:;"
              :data="item.v"
              :data2="active['itemValue' + index]"
              :class="currentClass(item.v, item.n, index)"
              @click.stop="itemEvent(index, item.n || item, item.v, item.c || item.a)"
              ><span>{{ item.n || item }}</span></a
            >
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {
  addClass,
  removeClass,
  getScrollview,
  isIOS
} from "../../utils/assist";

export default {
  name: "cityselect",
  data() {
    return {
      show: this.value,
      navIndex: 1,
      nav: {
        txt1: "请选择",
        txt2: "",
        txt3: ""
      },
      columns: {
        columnItems1: this.items,
        columnItems2: [],
        columnItems3: []
      },
      active: {},
      activeClasses: "",
      itemHeight: 40,
      columnNum: 1
    };
  },
  props: {
    ready: {
      type: Boolean,
      default: true
    },
    provance: String,
    city: String,
    arec: String,
    done: Function,
    title: {
      type: String,
      default: "所在地区"
    },
    value: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      required: true
    }
  },
  watch: {
    value(val) {
      if (isIOS) {
        if (val) {
          addClass(this.scrollView, "g-fix-ios-overflow-scrolling-bug");
        } else {
          removeClass(this.scrollView, "g-fix-ios-overflow-scrolling-bug");
        }
      }
      this.show = val;
    },
    ready(val) {
      val && setTimeout(this.init, 0);
    }
  },
  methods: {
    init() {
      this.scrollView = getScrollview(this.$el);

      if (!this.ready) return;

      this.isArray(this.items) &&
        this.provance &&
        this.setDefalutValue(this.items, "provance", 1);
    },
    navEvent(index) {
      if (this.columnNum > 2) {
        if (index >= this.columnNum) {
          this.forwardView(true);
        } else {
          this.backoffView();
        }
      }

      this.navIndex = index;
    },
    itemEvent(index, name, value, children) {
      console.log(index, name, value, children)
      this.active["itemValue" + index] = value;
      this.active["itemName" + index] = name;
      this.nav["txt" + index] = name;
      this.columns["columnItems" + (index + 1)] = children;

      if (index > 1 && children && this.columnNum > 2) {
        this.forwardView(true);
      }

      this.clearNavTxt(index);

      if (index === this.columnNum || children.length <= 0) {
        this.navIndex = index;
        this.returnValue();
      } else {
        this.navIndex = index + 1;
        this.nav["txt" + (index + 1)] = "请选择";
      }
    },
    currentClass(v, n, index) {
      return (v && v == this.active["itemValue" + index]) ||
        (n && n === this.active["itemName" + index])
        ? "cityselect-item-active"
        : "";
    },
    clearNavTxt(index) {
      for (let i = 0; i < this.columnNum; i++) {
        if (i > index) {
          this.nav["txt" + (i + 1)] = "";
        }
      }
    },
    // 获取总列数
    getColumsNum(arr) {
      if (this.isArray(arr.c) || this.isArray(arr.a)) {
        this.columnNum++;
        this.getColumsNum(arr.c ? arr.c[0] : (arr.a ? arr.a[0] : {}));
      }
    },
    isArray(arr) {
      return arr && arr.constructor === Array && arr.length > 0;
    },
    setDefalutValue(items, currentValue, index) {
      items.every((item, key) => {
        if (item.v == this[currentValue] || item.n === this[currentValue]) {
          const childrenItems = (this.columns["columnItems" + (index + 1)] =
            item.c);
          const itemBox = this.$refs["itemBox" + index][0];

          itemBox.scrollTop = key * this.itemHeight - itemBox.offsetHeight / 3;

          this.active["itemValue" + index] = item.v;
          this.active["itemName" + index] = item.n;

          this.nav["txt" + index] = item.n;
          this.navIndex = index;

          ++index;

          index >= this.columnNum &&
            this.columnNum > 2 &&
            this.forwardView(false);

          this.isArray(childrenItems) &&
            this.setDefalutValue(
              childrenItems,
              ["", "provance", "city", "area"][index],
              index
            );

          return false;
        }
        return true;
      });
    },
    returnValue() {
      this.done(this.active);
      this.close();
    },
    close() {
      isIOS && removeClass(this.scrollView, "g-fix-ios-overflow-scrolling-bug");

      this.$emit("input", false);
      this.show = false;
    },
    backoffView() {
      this.activeClasses = "cityselect-move-animate cityselect-prev";
    },
    forwardView(animate) {
      this.activeClasses =
        (animate ? "cityselect-move-animate" : "") + " cityselect-next";
    }
  },
  created() {
    this.items && this.items[0] && this.getColumsNum(this.items[0]);
  },
  mounted() {
    this.init();
  },
  destroyed() {
    this.close();
  }
};
</script>

<style lang="less">
@import "./index.less";
</style>
