<template>
<div class="text-over-tooltip-components">
      <el-tooltip
        :effect="effect"
        :disabled="isDisabledTooltip"
        :content="content"
        :placement="placement"
        :open-delay="500"
      >
        <div class="ellipsis" :ref="className">
          <div
            style="display: block; visibility: hidden; position: absolute"
            :ref="refName + 'div'"
            class="none-label"
          >
            {{ content }}
          </div>
          <span :ref="refName">{{ content }}</span>
        </div>
      </el-tooltip>
    </div>

</template>
  <script>
  export default {
    name: 'CommonTooltip',
    props: {
      // 显示的文字内容
      content: String,
      // 设置父元素的样式：比如宽度字体等，需可以自己在组件内部配置样式比如字体大小20：fs20
      className: String,
      // 子元素标识（如在同一页面中调用多次组件，此参数不可重复）
      refName: String,
      // Tooltip 的出现位置top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end
      placement: {
        type: String,
        default: () => {
          return 'top'
        }
      },
      effect: {
        type: String,
        default: () => {
          return 'light'
        }
      },
      disabled: {
        type: Boolean,
        default: false
      },
      oneLine: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isDisabledTooltip: true
      }
    },
    watch: {
      content: {
        handler(val) {
          if (val) {
            if (this.disabled) return
            this.$nextTick(() => {
              this.handleJudeIsNeedToolip()
            })
          }
          //  this.isDisabledTooltip = val
        },
        immediate: true
      }
    },
    methods: {
      handleJudeIsNeedToolip() {
        let parentWidth = this.$refs[this.className].offsetWidth
        let contentWidth = this.$refs[this.refName + 'div'].offsetWidth
        // 判断是否禁用tooltip功能
        this.isDisabledTooltip = this.oneLine
          ? parentWidth >= contentWidth
          : parentWidth * 2 >= contentWidth
      }
    }
  }
  </script>