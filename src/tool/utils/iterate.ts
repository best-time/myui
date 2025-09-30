/**
 * 递归遍历节点数据
 *
 *        /9/21 10:01
 */
export const iterate = <T>({
  treeNodeList,
  handler,
  getChildren,
  isIterateChildren,
  isIterateChildrenFirst
}: {
  /*要遍历的数据*/
  treeNodeList: T[] | null | undefined
  /*遍历函数*/
  handler: (node: T) => void
  /*获取子节点数据*/
  getChildren: (node: T) => T[] | null | undefined
  /*是否遍历子节点*/
  isIterateChildren?: (node: T) => boolean
  /*是否先遍历子节点在遍历目标节点*/
  isIterateChildrenFirst?: (node: T) => boolean
}) => {
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
