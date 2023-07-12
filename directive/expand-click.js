export default function (el, binding) {
    const s = document.styleSheets[document.styleSheets.length - 1]
    const DEFAULT = -10 // 默认向外扩展10px
    const ruleStr = `content:"";position:absolute;top:-${top || DEFAULT}px;bottom:-${bottom || DEFAULT}px;right:-${right || DEFAULT}px;left:-${left || DEFAULT}px;`
    const [top, right, bottom, left] = binding.expression && binding.expression.split(',') || []
    const classNameList = el.className.split(' ')
    el.className = classNameList.includes('expand_click_range') ? classNameList.join(' ') : [...classNameList, 'expand_click_range'].join(' ')
    el.style.position = el.style.position || "relative"
    if (s.insertRule) {
        s.insertRule('.expand_click_range::before' + '{' + ruleStr + '}', s.cssRules.length)
    } else { /* IE */
        s.addRule('.expand_click_range::before', ruleStr, -1)
    }
}
// 上右下左 逗号分割
// <div v-expandClick="20,30,40,50" @click="glabClickoutside"> 点击范围扩大</div>
