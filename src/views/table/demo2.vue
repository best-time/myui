<template>
  <div
    ref="listWrap"
    style="height: 400px; overflow-y: scroll; margin-top: 20px; padding: 10px"
    @scroll="scrollListener"
  >
    <div ref="list">
      <el-table
        @select="select"
        @select-all="selectAll"
        style="margin-top: 10px"
        :data="showList"
        ref="scrollTable"
      >
        <slot></slot>
      </el-table>
    </div>
  </div>
</template>

<script>
// import { ref, onMounted, computed, watch, defineComponent, nextTick } from 'vue'
// interface IProps {
//   start: number
//   end: number
//   height: number
//   itemHeight: number
//   rowKey: string
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   initList: any[]
// }
export default {
  name: "vue-virtual-table",
  props: ["start", "end", "height", "itemHeight", "initList", "rowKey"],
  emits: ["handleSelect"],
  data() {
    return {
      selections: [],
      isAllSelected: false
    };
  },
  watch: {
    length: val => {
      if (val > 10) {
        this.$refs.listWrap.style.height = props.itemHeight * 10 + "px";
      } else {
        this.$refs.listWrap.style.height = props.itemHeight * val + 57 + "px";
      }
    }
  },
  computed: {
    // 可视区列表
    showList() {
      return this.initList.slice(this.start, this.end);
    },
    // 数据长度
    length() {
      return this.initList.length;
    }
  },
  methods: {
    scrollListener() {
      // 获取滚动高度
      const scrollTop = this.$refs.listWrap.value.scrollTop;
      // 开始的数组索引
      start.value = Math.floor(scrollTop / props.itemHeight);
      // 结束索引
      end.value = start.value + 10;
      this.$refs.list.style.transform = `translateY(${start.value * 65}px)`; // 对列表项y轴偏移
      this.$nextTick(() => {
        this.selections.forEach(ele => {
          this.$refs.scrollTable.value.toggleRowSelection(ele, true);
        });
      });
    },
    handleSelect(val) {
      if (!this.isAllSelected) {
        this.isAllSelected = this.$refs.scrollTable.value.store.states.isAllSelected.value;
      }

      // console.log('store.states.isAllSelected', scrollTable.value.store.states.isAllSelected.value)
      this.$emit("handleSelect", val);
    },
    select(val) {
      if (val.length < this.initList.length) {
        this.isAllSelected = false;
      } else {
        this.isAllSelected = true;
      }
      this.selections = val;
      this.$emit("handleSelect", this.selections);
      console.log("select", val);
    },

    selectAll(val) {
      if (val.length) {
        this.selections = this.initList;
        this.isAllSelected = true;
      } else {
        this.selections = [];
        this.isAllSelected = false;
      }
      this.$emit("handleSelect", this.selections);
      console.log("selectAll", val);
    }
  }
};
</script>
