## vue 2.0 和vue3 区别
[面试官系列](https://vue3js.cn/interview/vue/vnode.html)
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


## vue2 升级vue3
[文档](https://v3-migration.vuejs.org/zh/breaking-changes/v-on-native-modifier-removed.html)
mixins 浅覆盖

```
// 创建实例 
const app = createApp({})
app.mount('#app')

// 全局方法
app.config.globalProperties = () => {}

 移除Vue.extend

// 可以使用多个v-model
  // v-bind.sync 废弃
  // 用于自定义组件时，v-model prop 和事件默认名称已更改：
  // prop：value -> modelValue；
  // 事件：input -> update:modelValue；

 key
   新增：对于 v-if/v-else/v-else-if 的各分支项 key 将不再是必须的，
   因为现在 Vue 会自动生成唯一的 key。
   非兼容：如果你手动提供 key，那么每个分支必须使用唯一的 key。
   你将不再能通过故意使用相同的 key 来强制重用分支。
   非兼容：<template v-for> 的 key 应该设置在 <template> 标签上 (而不是设置在它的子节点上)。


 v-if优先级高于v-for


 v-bind合并行为, 绑定顺序会影响渲染结果。
  vue2中
  <!-- 模板 -->
  <div id="red" v-bind="{ id: 'blue' }"></div>
  <!-- 结果 -->
  <div id="red"></div>
  
  vue3
  <!-- 模板 -->
  <div id="red" v-bind="{ id: 'blue' }"></div>
  <!-- 结果 -->
  <div id="blue"></div>


移除 v-on.native 修饰符, 都在emits记录

新增异步组件 defineAsyncComponent

插槽统一
this.$slots 现在将插槽作为函数公开

$listeners 合并到 $attrs

$attrs 包含 class & style

移除过滤器filters

移除this.$children

移除propsData 

attribute 强制行为 
  如果值为布尔值 false，则不再移除 attribute。取而代之的是，它将被设置为 attr="false"。
  若要移除 attribute，应该使用 null 或者 undefined

自定义指令生命周期变化
  vue2
  bind - 指令绑定到元素后调用。只调用一次。
  inserted - 元素插入父 DOM 后调用。
  update - 当元素更新，但子元素尚未更新时，将调用此钩子。
  componentUpdated - 一旦组件和子级被更新，就会调用这个钩子。
  unbind - 一旦指令被移除，就会调用这个钩子。也只调用一次。
  
  vue3
  created - 新增！在元素的 attribute 或事件监听器被应用之前调用。
  bind → beforeMount
  inserted → mounted
  beforeUpdate：新增！在元素本身被更新之前调用，与组件的生命周期钩子十分相似。
  update → 移除！该钩子与 updated 有太多相似之处，因此它是多余的。请改用 updated。
  componentUpdated → updated
  beforeUnmount：新增！与组件的生命周期钩子类似，它将在元素被卸载之前调用。
  unbind -> unmounted


被挂载的应用不会替换元素
  vue2会替换, vue3作为子元素插入

过渡的 class 名更改 
  vue2
  .v-enter, .v-leave-to     .v-leave, .v-enter-to
  vue3
  .v-enter-from,.v-leave-to   .v-leave-from,.v-enter-to
  
 VNode 生命周期事件
  vue2 
   <child-component @hook:updated="onUpdated">
   vue3
    <child-component @vue:updated="onUpdated">
```


## 不推荐 computed 中返回函数
我在项目中见到，有些人在定义 computed 的时候返回的不是一个具体的值，而是函数。随后，我也做过相同的事情。

但阅读了Vue2的源码后，我建议大家不要这么做。原因有2
1- computed 应该适用于对复杂计算结果的缓存。但返回函数就失去了这个优势。
2- computed 应该自动根据依赖数据项的更改而自动刷新。但返回函数也失去了这个特性。

可能，有的人会说，computed返回函数，还是可以看到它的值再刷新啊，为什么呢？
其实，那是因为恰巧 computed 用到的字段，也被别的 computed 或者 render 使用了， 因此当依赖项发生修改时，触发了render的重新执行，进而调用了返回的函数，实现了刷新。

我们始终要注意， computed 返回函数的话， 将没有办法建立起与依赖数据的关系，依赖数据修改后，也就无法刷新 computed 的值。


## 提取组件规则
- 重复使用的代码块
- 业务逻辑相似
- 功能模块拆分
- 代码复杂度过高
- 页面或组件需要展示相同风格的UI元素
