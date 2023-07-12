import Vue from 'vue'
export default function (el, binding) {
    if (el.hasIcon) return
    const iconElement = structureIcon(binding.arg, binding.value)
    el.appendChild(iconElement)
    el.hasIcon = true
}

function structureIcon (content, attrs) {
    // 拼接绑定属性
    let attrStr = ''
    for (let key in attrs) {
        attrStr += `${key}=${attrs[key]} `
    }
    const a = `<el-tooltip content=${content} ${attrStr}><i class="el-icon-question" style="margin:0 10px"></i></el-tooltip>`
    // 创建构造器
    const tooltip = Vue.extend({
        template: a
    })
    // 创建一个 tooltip 实例并返回 dom 节点
    const component = new tooltip().$mount()
    return component.$el
}

/*
<div v-tooltip:content='tootipParams'> 提示 </div>

<div v-tooltip:提示内容为XXX1> 提示1</div>
<div v-tooltip:提示内容为XXX='tootipParams'> 提示2 </div>

element-ui 参数
data() {
    return {
        tootipParams: {
            placement: 'top',
            effect: 'light',
        }
    }
}
 */
