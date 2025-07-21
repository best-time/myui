/**
 * 递归遍历节点数据
 *
 *        /9/21 10:01
 */
export const iterate = ({ treeNodeList, handler, getChildren, isIterateChildren, isIterateChildrenFirst }) => {
  if (!treeNodeList || treeNodeList.length === 0) {
    return
  }
  treeNodeList.forEach((treeNode) => {
    if (isIterateChildrenFirst?.(treeNode)) {
      const children = getChildren(treeNode)
      if (!!children && children.length > 0 && (!isIterateChildren || isIterateChildren(treeNode))) {
        iterate({
          treeNodeList: children,
          handler,
          getChildren,
          isIterateChildren,
          isIterateChildrenFirst
        })
      }
      handler(treeNode)
    } else {
      handler(treeNode)
      const children = getChildren(treeNode)
      if (!!children && children.length > 0 && (!isIterateChildren || isIterateChildren(treeNode))) {
        iterate({
          treeNodeList: children,
          handler,
          getChildren,
          isIterateChildren,
          isIterateChildrenFirst
        })
      }
    }
  })
}
//# sourceMappingURL=iterate.js.map
