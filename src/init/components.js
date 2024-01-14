import { defineAsyncComponent } from 'vue';

// 获取所有组件，该方法返回一个对象
const components = import.meta.glob('../components/common/**/*.vue');
// console.log(components);

export default function install(app) {
    // 遍历对象并注册异步组件
    for (const [key, value] of Object.entries(components)) {
        // console.log(key, value)
        // const name = key.slice(key.lastIndexOf('/') + 1, key.lastIndexOf('.'));
        const pathArr = key.split('/')
        const name = pathArr[pathArr.length - 2] // components/common  文件夹名作为组件名称
        app.component(`t-${name}`, defineAsyncComponent(value));
    }
}
