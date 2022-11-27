<template>
  <div
    class="vdr"
    :style="positionStyle"
    :class="
      `${active || isActive ? 'active' : 'inactive'} ${
        contentClass ? contentClass : ''
      }`
    "
    @mousedown="bodyDown($event)"
    @touchstart="bodyDown($event)"
    @touchend="up($event)"
  >
<!--    内容区 -->
    <div :style="sizeStyle" class="content-container" ref="container">
      <slot></slot>
    </div>
<!--    边框 拉伸  -->
    <div
      :key="index"
      v-for="(stick, index) in sticks"
      class="vdr-stick"
      :class="['vdr-stick-' + stick, isResizable ? '' : 'not-resizable']"
      @mousedown.stop.prevent="stickDown(stick, $event)"
      @touchstart.stop.prevent="stickDown(stick, $event)"
      :style="vdrStick(stick)"
    ></div>
  </div>
</template>

<script>
import {styleMapping, removeEvents, addEvents} from './util'
import propsMixin from './props.js';
import watchMixin from './watch.js';
import computedMixin from './computed.js';

export default {
  name: "vue-drag-resize",
  mixins: [propsMixin, computedMixin, watchMixin],
  emits: [
    "clicked",
    "dragging",
    "dragstop",
    "resizing",
    "resizestop",
    "activated",
    "deactivated"
  ],
  data() {
    return {
      // fixAspectRatio: null,
      active: null,
      zIndex: null,
      parentWidth: null,
      parentHeight: null,
      left: null,
      top: null,
      right: null,
      bottom: null,
      minHeight: null
    };
  },
  beforeCreate() {
    this.stickDrag = false;
    this.bodyDrag = false;
    this.dimensionsBeforeMove = {
      pointerX: 0,
      pointerY: 0,
      x: 0,
      y: 0,
      w: 0,
      h: 0
    };
    this.limits = {
      left: { min: null, max: null },
      right: { min: null, max: null },
      top: { min: null, max: null },
      bottom: { min: null, max: null }
    };

    this.currentStick = null;
  },
  mounted() {
    this.parentElement = this.$el.parentNode;
    this.parentWidth = this.parentW || this.parentElement.clientWidth;
    this.parentHeight = this.parentH || this.parentElement.clientHeight;

    // 默认在左上角
    this.left = this.x;
    this.top = this.y;

    const boxW = this.w === "auto" ? this.$refs.container.scrollWidth : this.w
    const boxH = this.h === "auto" ? this.$refs.container.scrollHeight : this.h
    this.right = this.parentWidth - boxW - this.left;
    this.bottom = this.parentHeight - boxH - this.top;

    this.domEvents = new Map([
      ["mousedown", this.documentDeselect],
      ["mousemove", this.documentMove],
      ["mouseup", this.documentUp],
      ["mouseleave", this.documentUp],

      ["touchstart", this.documentUp],
      ["touchmove", this.documentMove],
      ["touchend", this.documentUp],
      ["touchcancel", this.documentUp]
    ]);

    addEvents(this.domEvents);

    if (this.dragHandle) { // 定义应该用于拖动组件的选择器
      [...this.$el.querySelectorAll(this.dragHandle)].forEach(dragHandle => {
        dragHandle.setAttribute("data-drag-handle", this._uid);
      });
    }

    if (this.dragCancel) { // 定义应该用于防止拖动初始化的选择器
      [...this.$el.querySelectorAll(this.dragCancel)].forEach(cancelHandle => {
        cancelHandle.setAttribute("data-drag-cancel", this._uid);
      });
    }
  },

  beforeDestroy() {
    removeEvents(this.domEvents);
  },

  methods: {
    documentDeselect() {
      if (this.preventActiveBehavior) {
        return;
      }
      this.active = false;
    },

    documentMove(ev) {
      if (!this.stickDrag && !this.bodyDrag) {
        return;
      }
      ev.stopPropagation();

      const pageX =
        typeof ev.pageX !== "undefined" ? ev.pageX : ev.touches[0].pageX;
      const pageY =
        typeof ev.pageY !== "undefined" ? ev.pageY : ev.touches[0].pageY;

      const { dimensionsBeforeMove } = this;

      const delta = {
        x: (dimensionsBeforeMove.pointerX - pageX) / this.parentScaleX,
        y: (dimensionsBeforeMove.pointerY - pageY) / this.parentScaleY
      };
console.log(delta, this.stickDrag, this.bodyDrag, this.axis)
      if (this.stickDrag) {
        this.stickMove(delta);
      }

      if (this.bodyDrag) { // 拖动方向限制
        if (this.axis === "x") {
          delta.y = 0;
        } else if (this.axis === "y") {
          delta.x = 0;
        } else if (this.axis === "none") {
          return;
        }
        this.bodyMove(delta);
      }
    },

    up(ev) {
      if (this.stickDrag) {
        this.stickUp(ev);
      } else if (this.bodyDrag) {
        this.bodyUp(ev);
      }
    },
    documentUp(ev) {
      if (this.stickDrag) {
        this.stickUp(ev);
      } else if (this.bodyDrag) {
        this.bodyUp(ev);
      }
    },

    bodyDown(ev) {
      console.log(ev, 'ev')
      const { target, button } = ev;
      if (!this.preventActiveBehavior) {
        this.active = true;
      }
      if (button && button !== 0) { // 0是主按键,通常为左键或为初始化
        return;
      }
      this.$emit("clicked", ev);
      if (!this.active) {
        return;
      }
      if (
        this.dragHandle &&
        target.getAttribute("data-drag-handle") !== this._uid.toString()
      ) {
        return;
      }
      if (
        this.dragCancel &&
        target.getAttribute("data-drag-cancel") === this._uid.toString()
      ) {
        return;
      }
      if (typeof ev.stopPropagation !== "undefined") {
        ev.stopPropagation();
      }
      if (typeof ev.preventDefault !== "undefined") {
        ev.preventDefault();
      }
      if (this.isDraggable) {
        this.bodyDrag = true;
      }
      const pointerX =
        typeof ev.pageX !== "undefined" ? ev.pageX : ev.touches[0].pageX;
      const pointerY =
        typeof ev.pageY !== "undefined" ? ev.pageY : ev.touches[0].pageY;

      this.saveDimensionsBeforeMove({ pointerX, pointerY });

      if (this.parentLimitation) {
        this.limits = this.calcDragLimitation();
      }
    },

    bodyMove(delta) {
      const {
        dimensionsBeforeMove,
        parentWidth,
        parentHeight,
        gridX,
        gridY,
        width,
        height
      } = this;

      let newTop = dimensionsBeforeMove.top - delta.y;
      let newBottom = dimensionsBeforeMove.bottom + delta.y;
      let newLeft = dimensionsBeforeMove.left - delta.x;
      let newRight = dimensionsBeforeMove.right + delta.x;

      if (this.snapToGrid) {
        let alignTop = true;
        let alignLeft = true;

        let diffT = newTop - Math.floor(newTop / gridY) * gridY;
        let diffB =
          parentHeight -
          newBottom -
          Math.floor((parentHeight - newBottom) / gridY) * gridY;
        let diffL = newLeft - Math.floor(newLeft / gridX) * gridX;
        let diffR =
          parentWidth -
          newRight -
          Math.floor((parentWidth - newRight) / gridX) * gridX;

        if (diffT > gridY / 2) {
          diffT -= gridY;
        }
        if (diffB > gridY / 2) {
          diffB -= gridY;
        }
        if (diffL > gridX / 2) {
          diffL -= gridX;
        }
        if (diffR > gridX / 2) {
          diffR -= gridX;
        }

        if (Math.abs(diffB) < Math.abs(diffT)) {
          alignTop = false;
        }
        if (Math.abs(diffR) < Math.abs(diffL)) {
          alignLeft = false;
        }

        newTop -= alignTop ? diffT : diffB;
        newBottom = parentHeight - height - newTop;
        newLeft -= alignLeft ? diffL : diffR;
        newRight = parentWidth - width - newLeft;
      }

      ({
        newLeft: this.left,
        newRight: this.right,
        newTop: this.top,
        newBottom: this.bottom
      } = this.rectCorrectionByLimit({ newLeft, newRight, newTop, newBottom }));

      this.$emit("dragging", this.rect);
    },

    bodyUp() {
      this.bodyDrag = false;
      this.$emit("dragging", this.rect);
      this.$emit("dragstop", this.rect);

      this.dimensionsBeforeMove = {
        pointerX: 0,
        pointerY: 0,
        x: 0,
        y: 0,
        w: 0,
        h: 0
      };

      this.limits = {
        left: { min: null, max: null },
        right: { min: null, max: null },
        top: { min: null, max: null },
        bottom: { min: null, max: null }
      };
    },

    stickDown(stick, ev, force = false) {
      if ((!this.isResizable || !this.active) && !force) {
        return;
      }

      this.stickDrag = true;

      const pointerX =
        typeof ev.pageX !== "undefined" ? ev.pageX : ev.touches[0].pageX;
      const pointerY =
        typeof ev.pageY !== "undefined" ? ev.pageY : ev.touches[0].pageY;

      this.saveDimensionsBeforeMove({ pointerX, pointerY });

      this.currentStick = stick;

      this.limits = this.calcResizeLimits();
    },

    saveDimensionsBeforeMove({ pointerX, pointerY }) {
      this.dimensionsBeforeMove.pointerX = pointerX;
      this.dimensionsBeforeMove.pointerY = pointerY;

      this.dimensionsBeforeMove.left = this.left;
      this.dimensionsBeforeMove.right = this.right;
      this.dimensionsBeforeMove.top = this.top;
      this.dimensionsBeforeMove.bottom = this.bottom;

      this.dimensionsBeforeMove.width = this.width;
      this.dimensionsBeforeMove.height = this.height;

      this.aspectFactor = this.width / this.height;
      console.log(JSON.stringify(this.dimensionsBeforeMove), this.aspectFactor)
    },

    stickMove(delta) {
      const {
        currentStick,
        dimensionsBeforeMove,
        gridY,
        gridX,
        snapToGrid,
        parentHeight,
        parentWidth
      } = this;

      let newTop = dimensionsBeforeMove.top;
      let newBottom = dimensionsBeforeMove.bottom;
      let newLeft = dimensionsBeforeMove.left;
      let newRight = dimensionsBeforeMove.right;
      switch (currentStick[0]) {
        case "b":
          newBottom = dimensionsBeforeMove.bottom + delta.y;

          if (snapToGrid) {
            newBottom =
              parentHeight -
              Math.round((parentHeight - newBottom) / gridY) * gridY;
          }

          break;

        case "t":
          newTop = dimensionsBeforeMove.top - delta.y;

          if (snapToGrid) {
            newTop = Math.round(newTop / gridY) * gridY;
          }

          break;
        default:
          break;
      }

      switch (currentStick[1]) {
        case "r":
          newRight = dimensionsBeforeMove.right + delta.x;

          if (snapToGrid) {
            newRight =
              parentWidth -
              Math.round((parentWidth - newRight) / gridX) * gridX;
          }

          break;

        case "l":
          newLeft = dimensionsBeforeMove.left - delta.x;

          if (snapToGrid) {
            newLeft = Math.round(newLeft / gridX) * gridX;
          }

          break;
        default:
          break;
      }

      ({ newLeft, newRight, newTop, newBottom } = this.rectCorrectionByLimit({
        newLeft,
        newRight,
        newTop,
        newBottom
      }));

      if (this.aspectRatio) {
        ({
          newLeft,
          newRight,
          newTop,
          newBottom
        } = this.rectCorrectionByAspectRatio({
          newLeft,
          newRight,
          newTop,
          newBottom
        }));
      }

      this.left = newLeft;
      this.right = newRight;
      this.top = newTop;
      this.bottom = newBottom;

      this.$emit("resizing", this.rect);
    },

    stickUp() {
      this.stickDrag = false;
      this.dimensionsBeforeMove = {
        pointerX: 0,
        pointerY: 0,
        x: 0,
        y: 0,
        w: 0,
        h: 0
      };
      this.limits = {
        left: { min: null, max: null },
        right: { min: null, max: null },
        top: { min: null, max: null },
        bottom: { min: null, max: null }
      };

      this.$emit("resizing", this.rect);
      this.$emit("resizestop", this.rect);
    },

    calcDragLimitation() {
      const { parentWidth, parentHeight } = this;

      return {
        left: { min: 0, max: parentWidth - this.width },
        right: { min: 0, max: parentWidth - this.width },
        top: { min: 0, max: parentHeight - this.height },
        bottom: { min: 0, max: parentHeight - this.height }
      };
    },

    calcResizeLimits() {
      const { aspectFactor, width, height, bottom, top, left, right } = this;
      let { minh: minHeight, minw: minWidth } = this;

      const parentLim = this.parentLimitation ? 0 : null;

      if (this.aspectRatio) {
        if (minWidth / minHeight > aspectFactor) {
          minHeight = minWidth / aspectFactor;
        } else {
          minWidth = aspectFactor * minHeight;
        }
      }

      const limits = {
        left: { min: parentLim, max: left + (width - minWidth) },
        right: { min: parentLim, max: right + (width - minWidth) },
        top: { min: parentLim, max: top + (height - minHeight) },
        bottom: { min: parentLim, max: bottom + (height - minHeight) }
      };

      if (this.aspectRatio) {
        const aspectLimits = {
          left: {
            min: left - Math.min(top, bottom) * aspectFactor * 2,
            max: left + ((height - minHeight) / 2) * aspectFactor * 2
          },
          right: {
            min: right - Math.min(top, bottom) * aspectFactor * 2,
            max: right + ((height - minHeight) / 2) * aspectFactor * 2
          },
          top: {
            min: top - (Math.min(left, right) / aspectFactor) * 2,
            max: top + ((width - minWidth) / 2 / aspectFactor) * 2
          },
          bottom: {
            min: bottom - (Math.min(left, right) / aspectFactor) * 2,
            max: bottom + ((width - minWidth) / 2 / aspectFactor) * 2
          }
        };

        if (this.currentStick[0] === "m") {
          limits.left = {
            min: Math.max(limits.left.min, aspectLimits.left.min),
            max: Math.min(limits.left.max, aspectLimits.left.max)
          };
          limits.right = {
            min: Math.max(limits.right.min, aspectLimits.right.min),
            max: Math.min(limits.right.max, aspectLimits.right.max)
          };
        } else if (this.currentStick[1] === "m") {
          limits.top = {
            min: Math.max(limits.top.min, aspectLimits.top.min),
            max: Math.min(limits.top.max, aspectLimits.top.max)
          };
          limits.bottom = {
            min: Math.max(limits.bottom.min, aspectLimits.bottom.min),
            max: Math.min(limits.bottom.max, aspectLimits.bottom.max)
          };
        }
      }

      return limits;
    },
    sideCorrectionByLimit(limit, current) {
      let value = current;
      if (limit.min !== null && current < limit.min) {
        value = limit.min;
      } else if (limit.max !== null && limit.max < current) {
        value = limit.max;
      }
      return value;
    },
    rectCorrectionByLimit(rect) {
      const { limits } = this;
      let { newRight, newLeft, newBottom, newTop } = rect;

      newLeft = this.sideCorrectionByLimit(limits.left, newLeft);
      newRight = this.sideCorrectionByLimit(limits.right, newRight);
      newTop = this.sideCorrectionByLimit(limits.top, newTop);
      newBottom = this.sideCorrectionByLimit(limits.bottom, newBottom);

      return {
        newLeft,
        newRight,
        newTop,
        newBottom
      };
    },

    rectCorrectionByAspectRatio(rect) {
      let { newLeft, newRight, newTop, newBottom } = rect;
      const {
        parentWidth,
        parentHeight,
        currentStick,
        aspectFactor,
        dimensionsBeforeMove
      } = this;

      let newWidth = parentWidth - newLeft - newRight;
      let newHeight = parentHeight - newTop - newBottom;

      if (currentStick[1] === "m") {
        const deltaHeight = newHeight - dimensionsBeforeMove.height;

        newLeft -= (deltaHeight * aspectFactor) / 2;
        newRight -= (deltaHeight * aspectFactor) / 2;
      } else if (currentStick[0] === "m") {
        const deltaWidth = newWidth - dimensionsBeforeMove.width;

        newTop -= deltaWidth / aspectFactor / 2;
        newBottom -= deltaWidth / aspectFactor / 2;
      } else if (newWidth / newHeight > aspectFactor) {
        newWidth = aspectFactor * newHeight;

        if (currentStick[1] === "l") {
          newLeft = parentWidth - newRight - newWidth;
        } else {
          newRight = parentWidth - newLeft - newWidth;
        }
      } else {
        newHeight = newWidth / aspectFactor;

        if (currentStick[0] === "t") {
          newTop = parentHeight - newBottom - newHeight;
        } else {
          newBottom = parentHeight - newTop - newHeight;
        }
      }

      return { newLeft, newRight, newTop, newBottom };
    }
  },

};
</script>

<style lang="less">
@import "../drag-resize/vue-drag-resize.css";
</style>
