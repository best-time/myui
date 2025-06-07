const scrollPop = {
    bind(el) {
        //定义此时到元素的内容垂直滚动的距离
        el.st = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        let cssStr = `overflow: hidden;width: 100%; height: 100%; position: fixed; top: ${- el.st}px;`
        document.querySelector('html').cssText = cssStr
        document.body.style.cssText = cssStr
    },
    unbind(el,{value}) {
        let cssStr = 'overflow: auto; height: 100%; position: relative; top: 0px;scroll-behavior: auto'
        document.querySelector('html').cssText = cssStr
        document.body.style.cssText = cssStr
        document.querySelector('html').style.scrollBehavior = 'auto'
        //手动设置滚动距离
        document.documentElement.scrollTop = el.st
        document.body.scrollTop = el.st
        if (value !== 'smooth')return;
        //如果传了滚动方式为smooth平稳滚动即有感滚动，当滚动完毕后，把auto改回smooth
        let timer = setTimeout(() => {
            cssStr = `overflow: auto; height: 100%; position: relative; top: 0px; scroll-behavior: ${value||'smooth'}`
            document.querySelector('html').cssText = cssStr
            document.querySelector('html').style.scrollBehavior = value || 'smooth'
            document.body.style.cssText = cssStr
        }, 1);
    }
}



/*
<div class="scroll-pop" v-if="isScrollPopShow" v-scroll-pop="'smooth'">
	<div class="content">
    <p>这是很长一段文字，请耐心读完，然后你会发现这段文字并没有什么意义。</p>
    ...
  </div>
</div>

作者：前端LearningMan
链接：https://juejin.cn/post/6953879183600648229
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
 */
