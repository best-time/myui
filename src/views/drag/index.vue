<template>
  <div>
    <div id="app" class="app">
      <Drag style="width: 200px" :list="list1" :config="config1">
        <template v-slot="{ item }">
          <div class="item">
            {{ item.name }}
          </div>
        </template>
      </Drag>

      <Drag style="width: 200px" :list="list2" :config="config2">
        <template v-slot="{ item }">
          <div class="item">
            {{ item.name }}
          </div>
        </template>
      </Drag>
    </div>
    <h2>demo2</h2>
    <ul class="li-ll">
      <li
        :key="index"
        v-for="(item, index) in list1"
        draggable="true"
        @dragstart="start(item, index)"
        @dragover="over($event)"
        @drop="drop(index)"
      >
        <span class="lev">{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import Drag from './drag.vue'
export default {
  name: 'App',
  components: {
    Drag
  },
  data() {
    return {
      list1: new Array(10).fill(0).map((_, i) => ({
        name: `列表 - ${i + 1}`,
        draggable: true
      })),

      config1: {
        name: 'test',
        push: true,
        pull: true,
        exchange: true
      },

      list2: new Array(10).fill(0).map((_, i) => ({
        name: `列表2 - ${i + 1}`,
        draggable: true
      })),

      config2: {
        name: 'test',
        push: true,
        pull: true,
        exchange: true
      },
      currMoveItem: false,
      currMoveIndex: false
    }
  },
  methods: {
    start(item, index) {
      this.currMoveItem = item // 当前移动元素
      this.currMoveIndex = index // 当前移动数组下标
      // console.log('开始移动',item,index);
    },
    over(ev) {
      ev.preventDefault()
    },
    drop(index) {
      // console.log('放下',index);
      if (index - this.currMoveIndex === 0) return false // 原地移动

      // console.log('从'+this.currMoveIndex+'移动到'+index);
      this.list1.splice(this.currMoveIndex, 1) // 删除元素之前所在位置
      this.list1.splice(index, 0, this.currMoveItem) // 在需要放下元素的位置前插入移动元素
      this.currMoveIndex = false
      this.currMoveItem = false
    }
  }
}
</script>

<style lang="less" scoped>
.app {
  display: flex;

  justify-content: center;

  column-gap: 20px;
}
.item {
  border: 1px solid #ccc;
  width: 200px;
  height: 30px;
  margin-bottom: 20px;

  text-align: center;
}
.li-ll {
  li {
    height: 32px;
    line-height: 32px;
    display: inline-block;
    width: 100px;
  }
}

body {
  height: 100vh;
  width: 100vw;
  background-color: #ececec;
}

#app-2 {
  margin: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: relative;
  font-family: 'Lato', sans-serif;
}

.filler {
  width: 100%;
  height: 100%;
  display: inline-block;
  position: absolute;
}

.list {
  position: absolute;
  top: 30px;
  bottom: 30px;
  left: 30px;
  right: 300px;
  box-shadow: 0 0 2px #aaa;
  background-color: white;
}

.box-shaddow {
  box-shadow: 10px 10px 15px 0px rgba(125, 125, 125, 1);
}
</style>
