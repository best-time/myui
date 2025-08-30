import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SimpleComponent',
  props: {
    message: {
      type: String,
      required: true
    }
  },
  template: `<div>{{ message }}</div>`
})
