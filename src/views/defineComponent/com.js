import { ref, computed, defineComponent, h } from 'vue'

const useColor = () => {
  const colorIndex = ref(0)
  const colors = [
    // tailwindcss class
    'text-red',
    'text-green',
    'text-blue',
    'text-orange',
    'text-purple'
  ]
  function changeColor() {
    const oldIndex = colorIndex.value
    while (oldIndex === colorIndex.value) {
      colorIndex.value = Math.floor(Math.random() * colors.length)
    }
  }
  return {
    colorIndex,
    colors,
    changeColor
  }
}

// 使用 `组合式 API` 的方式调用 defineComponent
export const Home = defineComponent(
  (props, { expose }) => {
    const { colorIndex, colors, changeColor } = useColor()

    expose({
      changeColor
    })

    // 每次点击文字，会 call changeColor(), 从而导致 colorIndex 的 subscriber ---- render 的执行
    return () => {
      return h(
        'h2',
        { onClick: changeColor, class: colors[colorIndex.value] },
        `Hi ${props.name}, This is Home Page, click to change the text color`
      )
    }
  },
  {
    props: { name: { type: String, default: 'Alice' } }
  }
)

// 使用 `选项式 API` 的方式调用 defineComponent
export const About = defineComponent({
  template: `<h1 @click="changeColor" :class="colors[colorIndex]">{{value}}</h1>`,
  data() {
    return {
      value: `Hello ${this.name}, This is About Page, click to change the text color`,
      colors: [
        // tailwindcss class
        'text-red',
        'text-green',
        'text-blue',
        'text-orange',
        'text-purple'
      ],
      colorIndex: 0
    }
  },
  props: {
    name: {
      type: String,
      default: 'Bob'
    }
  },
  methods: {
    changeColor() {
      const oldIndex = this.colorIndex
      while (oldIndex === this.colorIndex) {
        this.colorIndex = Math.floor(Math.random() * this.colors.length)
      }
    }
  },
  mounted() {
    // 由于 <keep-alive></keep-alive>的作用，使得页面切换时不销毁，所以 mounted() 只调用一次
    this.colorIndex = Math.floor(Math.random() * this.colors.length)
  }
})

export const NotFound = defineComponent({
  template: `<h1>404</h1>`
})
