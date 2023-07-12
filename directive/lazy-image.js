app.directive('lazy-img', {
    beforeMount(el, binding) {
        el.$data_src = binding.value;
    },
    mounted(el) {
        IntersectionObserver ? ioEvent(el) : scrollEvent(el);
    },
    updated(el, binding) {
        el.$data_src = binding.value;
    },
    unmounted(el) {
        IntersectionObserver && el.$io.disconnect();
    }
})

function ioEvent(el) {
    const io = new IntersectionObserver(entries => {
        const realSrc = el.$data_src;
        entries[0].isIntersecting && realSrc && (el.src = realSrc);
    });
    el.$io = io;
    io.observe(el);
}

function scrollEvent(el) {
    const handler = throttler(loadImg, 250);
    loadImg(el);
    window.addEventListener('scroll', () => {
        handler(el);
    })
}

function loadImg(el) {
    const clientHeight = getClientHeight();
    const {top, bottom} = el.getBoundingClientRect();
    const realSrc = el.$data_src;
    (top < clientHeight && bottom > 0) && realSrc && (el.src = realSrc);
}

function getClientHeight(){
    const dClientHeight = document.documentElement.clientHeight;
    const bodyClientHeight = document.body.clientHeight;
    let clientHeight = 0;
    if (bodyClientHeight && dClientHeight) {
        clientHeight = bodyClientHeight < dClientHeight ? bodyClientHeight : dClientHeight;
    } else {
        clientHeight = bodyClientHeight > dClientHeight ? bodyClientHeight : dClientHeight;
    }
    return clientHeight;
}

function throttler(fun, delay) {
    let last, deferTimer
    return function (args) {
        let that = this
        let _args = arguments
        let now = +new Date()
        if (last && now < last + delay) {
            clearTimeout(deferTimer)
            deferTimer = setTimeout(function () {
                last = now
                fun.apply(that, _args)
            }, delay)
        }else {
            last = now
            fun.apply(that,_args)
        }
    }
}



// ---------------------------------------------------------------------------------

const LazyLoad = {
    // install方法
    install(Vue, options) {
        const defaultSrc = options.default
        Vue.directive('lazy', {
            bind(el, binding) {
                LazyLoad.init(el, binding.value, defaultSrc)
            },
            inserted(el) {
                if (IntersectionObserver) {
                    LazyLoad.observe(el)
                } else {
                    LazyLoad.listenerScroll(el)
                }
            },
        })
    },
    // 初始化
    init(el, val, def) {
        el.setAttribute('data-src', val)
        el.setAttribute('src', def)
    },
    // 利用IntersectionObserver监听el
    observe(el) {
        var io = new IntersectionObserver((entries) => {
            const realSrc = el.dataset.src
            if (entries[0].isIntersecting) {
                if (realSrc) {
                    el.src = realSrc
                    el.removeAttribute('data-src')
                }
            }
        })
        io.observe(el)
    },
    // 监听scroll事件
    listenerScroll(el) {
        const handler = LazyLoad.throttle(LazyLoad.load, 300)
        LazyLoad.load(el)
        window.addEventListener('scroll', () => {
            handler(el)
        })
    },
    // 加载真实图片
    load(el) {
        const windowHeight = document.documentElement.clientHeight
        const elTop = el.getBoundingClientRect().top
        const elBtm = el.getBoundingClientRect().bottom
        const realSrc = el.dataset.src
        if (elTop - windowHeight < 0 && elBtm > 0) {
            if (realSrc) {
                el.src = realSrc
                el.removeAttribute('data-src')
            }
        }
    },
    // 节流
    throttle(fn, delay) {
        let timer
        let prevTime
        return function (...args) {
            const currTime = Date.now()
            const context = this
            if (!prevTime) prevTime = currTime
            clearTimeout(timer)

            if (currTime - prevTime > delay) {
                prevTime = currTime
                fn.apply(context, args)
                clearTimeout(timer)
                return
            }

            timer = setTimeout(function () {
                prevTime = Date.now()
                timer = null
                fn.apply(context, args)
            }, delay)
        }
    },
}

// export default LazyLoad
