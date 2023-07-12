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

	
	
	
	

