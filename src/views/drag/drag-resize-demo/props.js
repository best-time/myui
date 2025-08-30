export default {
  props: {
    stickSize: {
      type: Number,
      default: 8
    },
    parentScaleX: {
      type: Number,
      default: 1
    },
    parentScaleY: {
      type: Number,
      default: 1
    },
    isActive: {
      type: Boolean,
      default: false
    },
    preventActiveBehavior: {
      type: Boolean,
      default: false
    },
    isDraggable: {
      type: Boolean,
      default: true
    },
    isResizable: {
      type: Boolean,
      default: true
    },
    aspectRatio: {
      type: Boolean,
      default: false
    },
    parentLimitation: {
      type: Boolean,
      default: false
    },
    snapToGrid: {
      type: Boolean,
      default: false
    },
    gridX: {
      type: Number,
      default: 50,
      validator(val) {
        return val >= 0
      }
    },
    gridY: {
      type: Number,
      default: 50,
      validator(val) {
        return val >= 0
      }
    },
    parentW: {
      type: Number,
      default: 0,
      validator(val) {
        return val >= 0
      }
    },
    parentH: {
      type: Number,
      default: 0,
      validator(val) {
        return val >= 0
      }
    },
    w: {
      type: [String, Number],
      default: 200,
      validator(val) {
        return typeof val === 'string' ? val === 'auto' : val >= 0
      }
    },
    h: {
      type: [String, Number],
      default: 200,
      validator(val) {
        return typeof val === 'string' ? val === 'auto' : val >= 0
      }
    },
    minw: {
      type: Number,
      default: 50,
      validator(val) {
        return val >= 0
      }
    },
    minh: {
      type: Number,
      default: 50,
      validator(val) {
        return val >= 0
      }
    },
    x: {
      type: Number,
      default: 0,
      validator(val) {
        return typeof val === 'number'
      }
    },
    y: {
      type: Number,
      default: 0,
      validator(val) {
        return typeof val === 'number'
      }
    },
    z: {
      type: [String, Number],
      default: 'auto',
      validator(val) {
        return typeof val === 'string' ? val === 'auto' : val >= 0
      }
    },
    dragHandle: {
      type: String,
      default: null
    },
    dragCancel: {
      type: String,
      default: null
    },
    sticks: {
      type: Array,
      default() {
        return ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml']
      }
    },
    axis: {
      type: String,
      default: 'both',
      validator(val) {
        return ['x', 'y', 'both', 'none'].indexOf(val) !== -1
      }
    },
    contentClass: {
      type: String,
      required: false,
      default: ''
    }
  }
}
