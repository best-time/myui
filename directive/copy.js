export default {
    bind (el, binding) {
        // 双击触发复制
        if (binding.modifiers.dblclick) {
            el.addEventListener('dblclick', () => handleClick(el.innerText))
            el.style.cursor = 'copy'
        }
        // 点击icon触发复制
        else if (binding.modifiers.icon) {
            if (el.hasIcon) return
            const iconElement = document.createElement('i')
            iconElement.setAttribute('class', 'el-icon-document-copy')
            iconElement.setAttribute('style', 'margin-left:5px')
            el.appendChild(iconElement)
            el.hasIcon = true
            iconElement.addEventListener('click', () => handleClick(el.innerText))
            iconElement.style.cursor = 'copy'
        }
        // 单击触发复制
        else {
            el.addEventListener('click', () => handleClick(el.innerText))
            el.style.cursor = 'copy'
        }
    }
}

function handleClick (text) {
    // 创建元素
    if (!document.getElementById('copyTarget')) {
        const copyTarget = document.createElement('input')
        copyTarget.setAttribute('style', 'position:fixed;top:0;left:0;opacity:0;z-index:-1000;')
        copyTarget.setAttribute('id', 'copyTarget')
        document.body.appendChild(copyTarget)
    }

    // 复制内容
    const input = document.getElementById('copyTarget')
    input.value = text
    input.select()
    document.execCommand('copy')
    // alert('复制成功')
}
/*
<div v-copy> 单击复制 </div>
<div v-copy.dblclick> 双击复制 </div>
<div v-copy.icon> icon复制 </div>
 */





// ------------------------------------------------------------------------------------------

const copy = {
    bind(el, { value }) {
        el.$value = value
        el.handler = () => {
            if (!el.$value) {
                // 值为空的时候，给出提示。可根据项目UI仔细设计
                console.log('无复制内容')
                return
            }
            // 动态创建 textarea 标签
            const textarea = document.createElement('textarea')
            // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
            textarea.readOnly = 'readonly'
            textarea.style.position = 'absolute'
            textarea.style.left = '-9999px'
            // 将要 copy 的值赋给 textarea 标签的 value 属性
            textarea.value = el.$value
            // 将 textarea 插入到 body 中
            document.body.appendChild(textarea)
            // 选中值并复制
            textarea.select()
            const result = document.execCommand('Copy')
            if (result) {
                console.log('复制成功') // 可根据项目UI仔细设计
            }
            document.body.removeChild(textarea)
        }
        // 绑定点击事件，就是所谓的一键 copy 啦
        el.addEventListener('click', el.handler)
    },
    // 当传进来的值更新的时候触发
    componentUpdated(el, { value }) {
        el.$value = value
    },
    // 指令与元素解绑的时候，移除事件绑定
    unbind(el) {
        el.removeEventListener('click', el.handler)
    },
}

