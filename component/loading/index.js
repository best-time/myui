import { createVNode, render } from 'vue'
import Main from './loading.vue'

let instance
const container = document.createElement('div')
const Loading = options => {
    if (instance) {
        document.body.removeChild(container.firstElementChild)
    }
    let props = options || {}
    if (typeof options === 'string') {
        props = {
            text: options,
        }
    }
    // 创建vnode
    instance = createVNode(Main, props)
    // 渲染成到容器
    render(instance, container)
    // container.firstElementChild：实际上我们只挂在了Loading组件
    document.body.appendChild(container.firstElementChild)
    // 展示loading
    const vm = instance.component
    // 调用展示方法
    vm.exposed.open()
}

Loading.close = () => {
    if (instance) {
        // 调用关闭方法
        instance.component.exposed.close()
    }
}

export default Loading
