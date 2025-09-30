app.directive('loading', {
    beforeMount(el, binding) {
        el.$instance = document.createElement('div');
        el.$instance.innerText = 'loading...';
        binding.value && toggleLoading(el, binding);
    },
    updated(el, binding) {
        binding.oldValue !== binding.value && toggleLoading(el, binding);
    },
    unmounted(el, binding) {
        el.$domInserted && toggleLoading(el, {value: false, modifiers: binding.modifiers});
        el.$instance && (el.$instance = null);
    }
})

// 获取元素的相关CSS
function getStyle(el, attr) {
    return el.currentStyle ? el.currentStyle[attr] : window.getComputedStyle(el, false)[attr];
}

// 控制loading的显示与隐藏
function toggleLoading(el, binding) {
    if(binding.value) {
        insertDom(el, el.$instance, binding);
    }else {
        el.$instance.parentNode && el.$instance.parentNode.removeChild(el.$instance);
    }
}

// 插入loading Dom
function insertDom(el, instance, binding) {
    // 给添加loading样式
    const styles = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        'z-index': 1000,
        'background-color': 'rgba(0, 0, 0, 0.3)',
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center',
        'flex-direction': 'column'
    }
    Object.keys(styles).forEach(property => {
        instance.style[property] = styles[property];
    });
    // 给父级添加relative
    if(!['fixed', 'absolute', 'relative'].includes(getStyle(el, 'position'))) {
        el.style.position = 'relative';
    }
    // 插入dom
    el.appendChild(instance);
    // 表明dom已插入
    el.domInserted = true;
}

/*
<template>
  <div style="padding: 50px">
    <div v-loading="flag" style="width:100px;height:100px;border:1px solid red"></div>
    <button @click="flag = !flag">显示/隐藏</button>
  </div>
</template>

 */
