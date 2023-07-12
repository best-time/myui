var ownPermission = ['user', 'order'];
function toolPermission(el, permission) {
    if (permission && !ownPermission.includes(permission)) {
        el.parentNode && el.parentNode.removeChild(el); // 关键代码, 没有权限则删除元素
    }
}

app.directive('permission', {
    mounted(el, binding) {
        toolPermission(el, binding.value)
    },
    updated(el, binding) {
        toolPermission(el, binding.value)
    }
})

/*
<div>
  <button v-permission="'user'">用户模块</button>
  <button v-permission="'order'">订单模块</button>
  <button v-permission="'goods'">商品模块</button>
</div>

 */
