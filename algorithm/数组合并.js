// 合并两个有序数组, 生成一个有序的数组

const arr1 = [1, 3, 5, 7, 9]
const arr2 = [2, 4, 6, 8, 10]

function get(arr1, arr2) {}

// -----------------------------------------------------------------------------------------------------------

;(function () {
  // 1. 双指针最优解法（时间 O (m+n)，空间 O (m+n)）
  function mergeSortedArr(arr1, arr2) {
    let i = 0
    let j = 0
    const res = []

    while (i < arr1.length && j < arr2.length) {
      if (arr1[i] < arr2[j]) {
        res.push(arr1[i++])
      } else {
        res.push(arr2[j++])
      }
    }

    // 把剩余元素全部推入结果
    while (i < arr1.length) {
      res.push(arr1[i++])
    }
    while (j < arr2.length) {
      res.push(arr2[j++])
    }

    return res
  }

  // 测试
  const a = [1, 3, 5, 7]
  const b = [2, 4, 6, 8]
  console.log(mergeSortedArr(a, b)) // [1,2,3,4,5,6,7,8]
})()
// -----------------------------------------------------------------------------------------------------------
;(function () {
  // 2. 简洁写法 时间 O ((m+n) log (m+n))
  function mergeSortedArr(arr1, arr2) {
    return [...arr1, ...arr2].sort((x, y) => x - y)
  }

  // 测试
  const a = [1, 3, 5]
  const b = [2, 4, 9]
  console.log(mergeSortedArr(a, b)) // [1,2,3,4,5,9]
})()

// -----------------------------------------------------------------------------------------------------------
;(function () {
  // 3. 原地合并 LeetCode 88 原题
  function merge(nums1, m, nums2, n) {
    let i = m - 1 // nums1有效末尾
    let j = n - 1 // nums2末尾
    let k = m + n - 1 // 总末尾

    while (i >= 0 && j >= 0) {
      if (nums1[i] > nums2[j]) {
        nums1[k--] = nums1[i--]
      } else {
        nums1[k--] = nums2[j--]
      }
    }
    // 剩余nums2元素填充
    while (j >= 0) {
      nums1[k--] = nums2[j--]
    }
    return nums1
  }

  // 测试
  let nums1 = [1, 2, 3, 0, 0, 0]
  let nums2 = [2, 5, 6]
  merge(nums1, 3, nums2, 3)
  console.log(nums1) // [1,2,2,3,5,6]
})()
