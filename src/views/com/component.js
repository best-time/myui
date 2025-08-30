import { defineComponent, h } from 'vue'
import { ElButton } from 'element-plus'
export const TitleCom = defineComponent({
  props: {
    title: '标题'
  },
  setup(props) {
    return () => {
      return h(
        'div',
        {
          class: 'title',
          style: {
            'line-height': '32px'
          }
        },
        [
          h(
            ElButton,
            {
              type: 'primary',
              onClick: () => console.log(props.title)
            },
            '按钮'
          )
        ]
      )
    }
  }
})

export const FComponent = (props, context) => {
  // return (
  //   <span onClick={() => context.emit('sendMessage', props.message)}>
  //     {props.message} {' '}
  //   </span>
  // )
}
