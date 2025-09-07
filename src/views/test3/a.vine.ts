export function AnotherComponent() {
  return vine`<div>Hello a d bWorldaaabca123123</div>`
}
const BC = function () {
  return vine`<div>BC Component</div>`
}

export default function MyComponent() {
  const userName = ref('Vine')
  const num = ref(0)
  const randomPick = () => {
    num.value = Math.floor(Math.random() * 1000)
  }
  const testId = Math.random()

  const type = 'primary'

  return vine`<div>{{userName}}
  <AnotherComponent />
  <AnotherComponent2 />
  <p><BC /></p>
  <div>
  <div :data-test-id="testId">
      <el-button @click="randomPick" :type=type>Pick</el-button>
      <div>{{ num }}</div>
    </div>
  </div>
  </div>`
}
