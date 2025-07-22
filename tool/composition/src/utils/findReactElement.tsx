import type { RenderNode } from '../packages/designComponent.utils'
import { isVNode } from 'vue'

type FindRenderNode = Exclude<RenderNode, string | number | null | undefined | void | boolean>

/**
 * 从render node中找到目标节点（深度遍历）
 * @
 * @date    2022/10/28 9:58
 */
export function findReactElement(node: RenderNode, isMatch: (node: any) => boolean): FindRenderNode[] | null {
  /*内容为空，不匹配*/
  if (node == null) {
    return null
  }

  /*内容为基础数据类型，不匹配*/
  const type = typeof node
  switch (type) {
    case 'number':
    case 'string':
    case 'boolean':
      return null
  }

  /*内容为数组，解析数组*/
  if (Array.isArray(node) && node.length > 0) {
    return processArrayRenderNode({ array: node, isMatch, ret: [] })
  }

  /*是个节点*/
  if (isVNode(node)) {
    if (
      'type' in node &&
      typeof node.type === 'object' &&
      'use' in (node as any).type &&
      '__render__' in (node as any).type.use
    ) {
      node = (node as any).type.use.__render__()
      if (node == null) {
        return null
      }
      if (typeof node !== 'object') {
        return null
      }
    }
    if (isMatch(node)) {
      return [node]
    }
    const children = (node as any).children
    /*解析节点的子节点*/
    if (children) {
      let arrayChildren: any = children

      /*如果children的default是个函数，并且函数参数数量为0，则证明是个插槽函数而不是作用域插槽函数，执行这个插槽函数的返回结果继续解析*/
      if (!!arrayChildren.default && typeof arrayChildren.default === 'function' && arrayChildren.default.length == 0) {
        try {
          arrayChildren = arrayChildren.default()
        } catch (e) {
          arrayChildren = []
        }
        /*因为会修改arrayChildren中的值，所以这里修改default函数为新的函数指向已经修改过的内容*/
        ;(node as any).children.default = () => arrayChildren
      }
      if (Array.isArray(arrayChildren)) {
        return processArrayRenderNode({ array: arrayChildren, isMatch, ret: [] })
      }
    }
  }

  return null
}

/**
 * 处理数组类型的节点
 * @
 * @date    2022/10/28 9:53
 */
function processArrayRenderNode({
  array,
  ret,
  isMatch
}: {
  array: RenderNode[]
  ret: FindRenderNode[]
  isMatch: (node: any) => boolean
}) {
  array.forEach((n) => {
    const findList = findReactElement(n, isMatch)
    if (!!findList && findList.length > 0) {
      findList.forEach((node) => {
        node != null && ret.push(node)
      })
    }
  })
  return ret
}
