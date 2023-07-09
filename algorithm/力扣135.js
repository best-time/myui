/*
老师想给孩子们分发糖果，有 N 个孩子站成了一条直线，老师会根据每个孩子的表现，预先给他们评分。

你需要按照以下要求，帮助老师给这些孩子分发糖果：

每个孩子至少分配到 1 个糖果。
相邻的孩子中，评分高的孩子必须获得更多的糖果。
那么这样下来，老师至少需要准备多少颗糖果呢？

示例 1:

输入: [1,0,2]
输出: 5
解释: 你可以分别给这三个孩子分发 2、1、2 颗糖果。
示例 2:

输入: [1,2,2]
输出: 4
解释: 你可以分别给这三个孩子分发 1、2、1 颗糖果。第三个孩子只得到 1 颗糖果，这已满足上述两个条件。
#
 */
// 没人最少一颗糖
// 相邻的孩子中，评分高的孩子必须获得更多的糖果

// 最少准备多少颗糖果

/*
思路:

这道题目一定是要确定一边之后，再确定另一边，例如比较每一个孩子的左边，然后再比较右边，如果两边一起考虑一定会顾此失彼。

先确定右边评分大于左边的情况（也就是从前向后遍历）

此时局部最优：只要右边评分比左边大，右边的孩子就多一个糖果，全局最优：相邻的孩子中，评分高的右孩子获得比左边孩子更多的糖果

局部最优可以推出全局最优。

如果ratings[i] > ratings[i - 1] 那么[i]的糖 一定要比[i - 1]的糖多一个，所以贪心：candyVec[i] = candyVec[i - 1] + 1
 */
function get(list) {
  const arr = Array.from({ length: list.length }).fill(1);
  for (let i = 0; i < list.length - 1; i++) {
    // 右 大于 左
    if (list[i + 1] > list[i]) arr[i + 1] = arr[i] + 1;
  }
  for (let i = list.length - 1; i >= 0; i--) {
    // 左 大于 右
    if (list[i - 1] > list[i]) arr[i - 1] = Math.max(arr[i - 1], arr[i] + 1);
  }
  return arr.reduce((a, b) => {
    return a + b;
  });
}

console.log(get([1, 0, 2])); // 5
// console.log(get([1, 2, 2])); // 4

console.log("---------");
var candy = function (ratings) {
  let candys = new Array(ratings.length).fill(1);

  for (let i = 1; i < ratings.length; i++) {
    if (ratings[i] > ratings[i - 1]) {
      candys[i] = candys[i - 1] + 1;
    }
  }

  for (let i = ratings.length - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) {
      candys[i] = Math.max(candys[i], candys[i + 1] + 1);
    }
  }

  // console.log(candys)
  return candys.reduce((a, b) => {
    return a + b;
  });
};
console.log(candy([1, 0, 2])); // 5
