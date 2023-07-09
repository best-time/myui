/*
从document开始往下找，对所有子结点递归查找他们的子结点，一层一层地往下查找：

如果当前结点的 id 符合查找条件，则返回当前结点
如果已经到了叶子结点了还没有找到，则返回 null
*/
function getElementById(node, id) {
    if(!node) return null
    if(node.id === id) return node
    for(let i = 0 ; i < node.childNodes.length; i++) {
        let found = getElementById(node.childNodes[i], id)
        if(found) return found
    }
    return null
}

// 非递归实现

function getElementById2(node, id) {
    while(node) {
        if(node.id === id) return node
        node = nextElement(node)
    }
    return null
}

function nextElement(node) {
    if(node.children.length) {// 子节点
        return node.children[0]
    }
    if(node.nextElementSibling) { // 相邻节点
        return node.nextElementSibling
    }
    // 否则，往上返回它的父结点的下一个相邻元素，相当于上面递归实现里面的for循环的i加1
    while(node.parentNode) {
        if(node.parentNode.nextElementSibling) {
            return node.parentNode.nextElementSibling
        }
    }
    return null
}
