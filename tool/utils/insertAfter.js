/**
 * 在元素节点后面添加新的节点
 *
 *     11/19
 */
export const insertAfter = (newEl, targetEl) => {
  let parentEl = targetEl.parentNode
  if (!!parentEl) {
    if (parentEl.lastChild === targetEl) {
      // 如果最后的节点是目标元素，则直接添加。因为默认是最后
      parentEl.appendChild(newEl)
    } else {
      //如果不是，则插入在目标元素的下一个兄弟节点 的前面。也就是目标元素的后面
      parentEl.insertBefore(newEl, targetEl.nextSibling)
    }
  }
}
//# sourceMappingURL=insertAfter.js.map
