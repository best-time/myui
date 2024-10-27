## 父组件监听子组件生命周期
@vue:mounted

## 父组件获取子组件ref
defineExposed({
ref: new Proxy({}, {
get(target, key) {
return () => {
return this.$refs[key]
}})
})

## h函数
component 组件的 is 属性则可以接收
1 被注册的组件名
2 导入的组件对象
3 一个返回上述值之一的函数
