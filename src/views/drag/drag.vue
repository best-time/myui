<template>
  <transition-group name="group-list" tag="ul">
    <li
      v-for="(item, index) in list"
      :key="item.name + index"
      :draggable="item.draggable"
      :class="[
        'list-item',
        {
          'is-dragover':
            index === dropIndex && item.draggable && config.exchange
        }
      ]"
      @dragstart="onDragstart($event, index)"
      @dragenter="onDragenter(index)"
      @dragover.prevent="onDragover(index)"
      @dragleave="onDragleave"
      @dragend="onDragend"
      @drop="onDrop"
    >
      <slot :item="item" />
    </li>
  </transition-group>
</template>

<script>
export default {
  name: "Draggable",
  props: {
    list: {
      type: Array,
      default: () => []
    },
    config: {
      type: Object,
      default: () => ({
        name: "",
        uuidField: "id",
        push: true,
        pull: true,
        exchange: true
      })
    }
  },
  data() {
    return {
      dragIndex: null,
      dropIndex: null
    };
  },
  computed: {
    isPush() {
      const { dropIndex, dragIndex } = this;

      return dropIndex !== null && dragIndex === null;
    },

    isExchange() {
      const { dropIndex, dragIndex } = this;

      return dragIndex !== null && dropIndex !== null;
    },

    pushCbName() {
      const {
        config: { name }
      } = this;

      return `${name}-push-callback`;
    }
  },

  methods: {
    onDragstart(e, i) {
      const {
        list,
        config: { name },
        transferData
      } = this;

      this.dragIndex = i;

      if (name) {
        transferData({ e, key: name, type: "set", data: list[i] });
      } else {
        throw new Error("缺少配置关联名name");
      }

      this.$emit("drag-start", i);
    },

    onDragenter(i) {
      this.dropIndex = i;

      this.$emit("drag-enter", i);
    },

    onDragover(i) {
      const { dragIndex, dropIndex } = this;

      if (i === dragIndex || i === dropIndex) return;

      this.dropIndex = i;

      this.$emit("drag-over", i);
    },

    onDragleave() {
      this.dropIndex = null;
    },

    onDrop(e) {
      const {
        list,
        dropIndex,
        dragIndex,
        config: { name, push: enablePush, exchange },

        isPush,
        isExchange,
        pushCbName,

        storage,
        resetIndex,
        transferData
      } = this;

      if (dropIndex === dragIndex || !exchange) return;

      if (isPush) {
        if (!enablePush) {
          resetIndex();
          return;
        }

        if (name) {
          list.splice(
            dropIndex,
            0,
            transferData({ e, key: name, type: "get" })
          );

          storage("set", pushCbName, true);
        } else {
          resetIndex();
          throw new Error("缺少配置关联属性name");
        }

        resetIndex();

        return;
      }

      if (isExchange) {
        const drapItem = list[dragIndex];
        const dropItem = list[dropIndex];

        list.splice(dropIndex, 1, drapItem);
        list.splice(dragIndex, 1, dropItem);
      }

      resetIndex();
    },

    onDragend() {
      const {
        list,
        dragIndex,
        config: { pull: enablePull },

        pushCbName,

        storage,
        resetIndex
      } = this;

      if (enablePull) {
        const isPushSuccess = storage("get", pushCbName);

        if (isPushSuccess) {
          list.splice(dragIndex, 1);
        }
      }

      resetIndex();

      storage("remove", pushCbName);

      this.$emit("drag-end");
    },

    storage(type, key, value) {
      return {
        get() {
          return JSON.parse(localStorage.getItem(key));
        },

        set() {
          localStorage.setItem(key, JSON.stringify(value));
        },

        remove() {
          localStorage.removeItem(key);
        }
      }[type]();
    },

    resetIndex() {
      this.dropIndex = null;
      this.dragIndex = null;
    },

    transferData({ e, key, type, data } = {}) {
      if (type === "get") {
        return JSON.parse(e.dataTransfer.getData(`${key}-drag-key`));
      }

      if (type === "set") {
        e.dataTransfer.setData(`${key}-drag-key`, JSON.stringify(data));
      }
    }
  }
};
</script>

<style lang="less" scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.list-item {
  list-style: none;

  position: relative;

  background-color: #fff;

  cursor: move;
}

.list-item.is-dragover::before {
  content: "";

  position: absolute;
  bottom: -7px;
  left: 0;

  width: 100%;
  height: 4px;

  background-color: #0c6bc9;
}

.list-item.is-dragover::after {
  content: "";

  position: absolute;
  bottom: -11px;
  left: -6px;

  border: 3px solid red;
  border-radius: 50%;
  width: 6px;
  height: 6px;

  background-color: #fff;
}

.group-list-move {
  transition: transform 0.8s;
}
</style>
