import { styleMapping } from "./util";

export default {
  computed: {
    width() {
      return this.parentWidth - this.left - this.right;
    },
    height() {
      return this.parentHeight - this.top - this.bottom;
    },
    positionStyle() {
      return {
        top: this.top + "px",
        left: this.left + "px",
        zIndex: this.zIndex
      };
    },
    sizeStyle() {
      return {
        width: this.w == "auto" ? "auto" : this.width + "px",
        height: this.h == "auto" ? "auto" : this.height + "px"
      };
    },
    vdrStick() {
      return stick => {
        const stickStyle = {
          width: `${this.stickSize / this.parentScaleX}px`,
          height: `${this.stickSize / this.parentScaleY}px`
        };
        stickStyle[styleMapping.y[stick[0]]] = `${this.stickSize /
          this.parentScaleX /
          -2}px`;
        stickStyle[styleMapping.x[stick[1]]] = `${this.stickSize /
          this.parentScaleX /
          -2}px`;
        return stickStyle;
      };
    },
    rect() {
      return {
        left: Math.round(this.left),
        top: Math.round(this.top),
        width: Math.round(this.width),
        height: Math.round(this.height)
      };
    }
  }
};
