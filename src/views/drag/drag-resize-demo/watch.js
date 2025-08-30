export default {
  watch: {
    active(isActive) {
      if (isActive) {
        this.$emit('activated')
      } else {
        this.$emit('deactivated')
      }
    },
    isActive: {
      immediate: true,
      handler(val) {
        this.active = val
      }
    },
    z: {
      immediate: true,
      handler(val) {
        if (val >= 0 || val === 'auto') {
          this.zIndex = val
        }
      }
    },
    x: {
      handler(newVal, oldVal) {
        if (this.stickDrag || this.bodyDrag || newVal === this.left) {
          return
        }

        const delta = oldVal - newVal

        this.bodyDown({ pageX: this.left, pageY: this.top })
        this.bodyMove({ x: delta, y: 0 })

        this.$nextTick(() => {
          this.bodyUp()
        })
      }
    },
    y: {
      handler(newVal, oldVal) {
        if (this.stickDrag || this.bodyDrag || newVal === this.top) {
          return
        }

        const delta = oldVal - newVal

        this.bodyDown({ pageX: this.left, pageY: this.top })
        this.bodyMove({ x: 0, y: delta })

        this.$nextTick(() => {
          this.bodyUp()
        })
      }
    },
    w: {
      handler(newVal, oldVal) {
        if (this.stickDrag || this.bodyDrag || newVal === this.width) {
          return
        }

        const stick = 'mr'
        const delta = oldVal - newVal

        this.stickDown(stick, { pageX: this.right, pageY: this.top + this.height / 2 }, true)
        this.stickMove({ x: delta, y: 0 })

        this.$nextTick(() => {
          this.stickUp()
        })
      }
    },
    h: {
      handler(newVal, oldVal) {
        if (this.stickDrag || this.bodyDrag || newVal === this.height) {
          return
        }

        const stick = 'bm'
        const delta = oldVal - newVal

        this.stickDown(stick, { pageX: this.left + this.width / 2, pageY: this.bottom }, true)
        this.stickMove({ x: 0, y: delta })

        this.$nextTick(() => {
          this.stickUp()
        })
      }
    },
    parentW(val) {
      this.right = val - this.width - this.left
      this.parentWidth = val
    },
    parentH(val) {
      this.bottom = val - this.height - this.top
      this.parentHeight = val
    }
  }
}
