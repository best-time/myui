## 方法一：

- A: document.documentElement.clientHeight 可视窗口的高度
- B: element.offsetTop dom相对于文档顶部的距离
- C: document.documentElement.scrollTop 滚动条滚动的距离
- B - C < A 即说明元素在可视区域内

## 方法二：getBoundingClientRect

```
const domObj = element.getBoundingClientRect();
domObj.top：元素上边到视窗上边的距离;
domObj.right：元素右边到视窗左边的距离;
domObj.bottom：元素下边到视窗上边的距离;
domObj.left：元素左边到视窗左边的距离;
const clientHeight = window.innerHeight;
当 domObj.top < clientHeight 表示dom在可视区域内了
```
