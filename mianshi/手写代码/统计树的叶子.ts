
/*
  1.叶子节点判定标准：节点存在且 children 数组为空；
  2.递归思路：
    空树返回 0；
    当前无子节点则是叶子，贡献 1；
    存在子节点则递归遍历所有子树，累加叶子总数；
  3. 大数据 / 深层树改用 BFS / 迭代 DFS，防止递归调用栈溢出；
  4. BFS 使用队列逐层遍历，DFS 使用栈深度遍历，遇到叶子直接计数。
 */

interface  TreeNode  {
  val: any;
  children: TreeNode[];
}


// 递归

function countLeafNodes(root) {
  // 空树
  if (!root) return 0;
  // 叶子节点
  if (root.children.length === 0) return 1;
  // 累加所有子树叶子
  let count = 0;
  for (const child of root.children) {
    count += countLeafNodes(child);
  }
  return count;
}


(function () {
  const tree = {
    val: 1,
    children: [
      { val: 2, children: [] }, // 叶子
      {
        val: 3,
        children: [
          { val: 4, children: [] }, // 叶子
          { val: 5, children: [] }  // 叶子
        ]
      }
    ]
  };

  console.log(countLeafNodes(tree)); // 3
})()


// 迭代 BFS 广度优先（队列，避免递归栈溢出）

function countLeafNodesBFS(root: TreeNode) {
  if (!root) {
    return 0
  }
  let count = 0;
  const queue = [root];
  while (queue.length) {
    const node = queue.shift();
    if (node.children.length === 0) {
      count++;
    } else {
      queue.push(...node.children);
    }
  }
  return count;
}

// 迭代 DFS 深度优先（栈）

function countLeafNodesDFS(root: TreeNode) {
  if (!root) {
    return 0
  }
  let count = 0;
  const stack = [root];
  while (stack.length) {
    const node = stack.pop();
    if (node.children.length === 0) {
      count++;
    } else {
      stack.push(...node.children);
    }
  }
  return count;
}

/*
四、优缺点
DFS
  优点：
  递归代码极简，书写方便；
  空间消耗小，只保存当前路径；
  缺点：
  树深度极大时，递归会触发调用栈溢出；
  无权图无法找到最短路径。

BFS
  优点：
  天然求最短路径、最少层级；
  无栈溢出风险，适合超大深度树；
  缺点：
  每层节点很多时队列占用大量内存；
  无法用递归简洁实现。
 */

/*
  遍历方式：DFS 纵向深挖到底，BFS 逐层横向遍历；
  数据结构：DFS 基于栈，BFS 基于队列；
  适用场景：求最短路径、层级打印用 BFS；全量遍历、回溯、深度统计用 DFS；
  内存风险：深层树 DFS 递归栈溢出；宽层树 BFS 内存占用高；
  实现：DFS 支持递归，BFS 只能迭代队列。
 */