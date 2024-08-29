import UploadLoading from '@/components/UploadLoading/index.vue'
import { render, h, ref, RendererNode, RendererElement, VNode } from 'vue';

/**
* 任何页面中调用该组件进行展示
* @returns
*/
export const useUploadLoading = () => {
const loadingRef = ref(null);
const progress = ref(0);
const showLoading = () => {
if (!loadingRef.value) {
const div = document.createElement('div');
document.body.appendChild(div);
// 这里第二个参数传组件的props参数
const vnode = h(UploadLoading, { progress: progress.value });
render(vnode, div);
loadingRef.value = { vnode, div };
}
};

const hideLoading = () => {
if (loadingRef.value) {
render(null, loadingRef.value.div);
document.body.removeChild(loadingRef.value.div);
loadingRef.value = null;
// 重置进度条
progress.value = 0
}
};
const updateProgress = (newProgress) => {
progress.value = newProgress;
if (loadingRef.value && loadingRef.value.vnode.component) {
// 修改组件中的进度条值
loadingRef.value.vnode.component.props.progress = newProgress;
}
};
return { showLoading, hideLoading, updateProgress };
};

