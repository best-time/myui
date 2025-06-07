```javascript
app.directive('directiveName', {
// 在绑定元素的 attribute 或事件监听器被应用之前调用, 在指令需要附加须要在普通的 v-on 事件监听器前调用的事件监听器时，这很有用
    created() {},
// 当指令第一次绑定到元素并且在挂载父组件之前调用
    beforeMount() {},
// 在绑定元素的父组件被挂载后调用
    mounted() {},
// 在更新包含组件的 VNode 之前调用
    beforeUpdate() {},
// 在包含组件的 VNode 及其子组件的 VNode 更新后调用
    updated() {},
// 在卸载绑定元素的父组件之前调用
    beforeUnmount() {},
// 当指令与元素解除绑定且父组件已卸载时, 只调用一次
    unmounted() {},
});
```


|vue3|vue2|
|----|----|
|created| |
|beforeMount|bind |
|mounted| inserted|
|beforeUpdate| update|
|updated| componentUpdated|
|beforeUnmount| |
|unmounted| unbind|

```
指令的钩子会传递以下几种参数：

el：指令绑定到的元素。这可以用于直接操作 DOM。

binding：一个对象，包含以下属性。
    value：传递给指令的值。例如在 v-my-directive="1 + 1" 中，值是 2。
    oldValue：之前的值，仅在 beforeUpdate 和 updated 中可用。无论值是否更改，它都可用。
    arg：传递给指令的参数 (如果有的话)。例如在 v-my-directive:foo 中，参数是 "foo"。
    modifiers：一个包含修饰符的对象 (如果有的话)。例如在 v-my-directive.foo.bar 中，修饰符对象是 { foo: true, bar: true }。
    instance：使用该指令的组件实例。
    dir：指令的定义对象。
    
vnode：代表绑定元素的底层 VNode。

prevNode：代表之前的渲染中指令所绑定元素的 VNode。仅在 beforeUpdate 和 updated 钩子中可用。
```


<div v-example:foo.bar="baz">

binding参数
```
{
  arg: 'foo',
  modifiers: { bar: true },
  value: /* `baz` 的值 */,
  oldValue: /* 上一次更新时 `baz` 的值 */
}
```
	
## setup中   vFocus 可以直接作为 指令使用  v-focus


简化形式

```
<div v-color="color"></div>

app.directive('color', (el, binding) => {
  // 这会在 `mounted` 和 `updated` 时都调用
  el.style.color = binding.value
})
```

## 在组件上使用指令

```
<MyComponent v-demo="test" />

<!-- MyComponent 的模板 -->

<div> <!-- v-demo 指令会被应用在此处 -->
  <span>My component content</span>
</div>
```
