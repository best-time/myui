## vue 2.0 和vue3 区别

[参考](https://juejin.cn/post/7008412269432274957)
```

优点1：diff算法的优化
    vue3新增了静态标记（patchflag）与上次虚拟节点对比时，只对比带有patch flag的节点（动态数据所在的节点）；
    当视图更新时，只对动态节点部分进行diff运算，减少了资源的损耗。
    Patchflag是个枚举，取值为1代表这个元素的文本是动态绑定的，取值为2代表元素的class是动态绑定的
    
优点2：hoistStatic 静态提升
    从以上代码中我们可以看出，_hoisted_1 和_hoisted_2两个方法被提升到了渲染函数 render 之外，也就是我们说的静态提升。
    通过静态提升可以避免每次渲染的时候都要重新创建这些对象，从而大大提高了渲染效率。

优点3：cacheHandlers 事件侦听器缓存
    vue2.x中，绑定事件每次触发都要重新生成全新的function去更新，cacheHandlers 是Vue3中提供的事件缓存对象，
    当 cacheHandlers 开启，会自动生成一个内联函数，同时生成一个静态节点。当事件再次触发时，只需从缓存中调用即可，无需再次更新。
    默认情况下onClick会被视为动态绑定，所以每次都会追踪它的变化，但是同一个函数没必要追踪变化，直接缓存起来复用即可。

优点4：ssr渲染
    Vue2 中也是有 SSR 渲染的，但是 Vue3 中的 SSR 渲染相对于 Vue2 来说，性能方面也有对应的提升。
    当存在大量静态内容时，这些内容会被当作纯字符串推进一个 buffer 里面，即使存在动态的绑定，会通过模版插值潜入进去。
    这样会比通过虚拟 dmo 来渲染的快上很多。
    当静态内容大到一个量级的时候，会用_createStaticVNode 方法在客户端去生成一个 static node，这些静态 node，
    会被直接 innerHtml，就不需要再创建对象，然后根据对象渲染
    
优点5：更好的Ts支持

优点6：Compostion API: 组合API/注入API
    着力于JS（逻辑）部分，将逻辑相关的代码放在一起，这样更有利于代码的维护。
    
   在vue2的组件内使用的是Option API风格(data/methods/mounted)来组织的代码，这样会让逻辑分散，
   举个例子就是我们完成一个计数器功能，要在data里声明变量，在methods定义响应函数，在mounted里初始化变量，
   如果在一个功能比较多、代码量比较大的组件里，你要维护这样一个功能，就需要在data/methods/mounted反复的切换到对应位置，然后进行代码的更改。
   
优点7：更先进的组件
    Suspense
    teleport

优点9：按需编译，体积比vue2.x更小

优点10：支持多根节点组件

```

```javascript

// 静态提升
const _hoisted_1 = /*#__PURE__*/ _createVNode(
    'div',
    null,
    '共创1',
    -1 /* HOISTED */
)
const _hoisted_2 = /*#__PURE__*/ _createVNode(
    'div',
    null,
    '共创2',
    -1 /* HOISTED */
)

export function render() {
    return (
        _openBlock(),
        _createBlock('div', null, [
            _hoisted_1,
            _hoisted_2,
            _createVNode(
                'div',
                null,
                _toDisplayString(_ctx.name),
                1 /* TEXT */
            ),
        ])
    )
}



export function render() {
    return (
        _openBlock(),
            _createBlock('div', null, [
                _createVNode('div', null, '共创1'),
                _createVNode('div', null, '共创2'),
                _createVNode(
                    'div',
                    null,
                    _toDisplayString(_ctx.name),
                    1 /* TEXT */
                ),
            ])
    )
}
```

```
Suspense
    <Suspense>
      <template #default>
        <async-show />
      </template>
      <template #fallback>
        <h1>Loading !...</h1>
      </template>
    </Suspense>

    Suspense是有两个template插槽的，第一个default代表异步请求完成后，显示的模板内容。fallback代表在加载中时，显示的模板内容。



teleport
    <teleport to="#modal">
    <div id="center">
      <h2>柏特better</h2>
    </div>
  </teleport>

在index.html中设置 <div id="modal"></div>

```
