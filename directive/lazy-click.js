const lazyClick = {
    inserted: (el, binding, vNode) => {
        el.addEventListener('click', function (e) {
            if (binding.modifiers.stop) e.stopPropagation();
            if (binding.modifiers.prevent) e.preventDefault();
            if (!el.t3_lazy_click) {
                if (typeof binding.value === 'function') binding.value();
                if (typeof binding.value === 'object') {
                    if (typeof binding.value.fn === 'function') {
                        binding.value.fn.call(this, binding.value.params)
                    } else if (typeof binding.value.fn === 'undefined') throw Error(`you should makesure fn is a function`);
                    else throw Error(`${binding.value.fn} is not a function`);
                }
                if (typeof binding.value !== 'object' && typeof binding.value !== 'function') {
                    throw Error(`${binding.value} is not a function or object`);
                }
                let delayTime = binding.arg || 1000;
                el.t3_lazy_click = setTimeout(() => {
                    if (binding.value.callBackFn && typeof binding.value.callBackFn === 'function') binding.value.callBackFn(el);
                    clearTimeout(el.t3_lazy_click)
                    el.t3_lazy_click = null;
                }, delayTime)
            }
        }, false);
    },
}
export default lazyClick
