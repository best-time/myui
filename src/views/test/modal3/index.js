import { createVNode, render } from 'vue'
import Main from './index.vue'

let instance = null
const content = document.createElement('div')
content.className = 'custom-com'
const insMap = new Map()
const Loading = (options, symbolName) => {
    const container = document.createElement('div')

    // if (instance) {
    //     document.body.removeChild(container)
    // }
    if(!document.querySelector('.custom-com')) {
        document.body.appendChild(content)
    }
    let props = options || {}
    if (typeof options === 'string') {
        props = {
            text: options,
        }
    }
    // 创建vnode

    if(!insMap.has(symbolName)) {
        instance = createVNode(Main, props)
        insMap.set(symbolName, instance)
        // 渲染成到容器
        render(instance, container)
    } else {
        instance = insMap.get(symbolName)

    }
    window.instance = instance
    // container.firstElementChild：实际上我们只挂在了Loading组件
    // document.body.appendChild(container)
    document.querySelector('.custom-com').appendChild(container)
    // 展示loading
    const vm = instance.component
    console.log(instance)
    console.log(vm)
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
