

/*
 给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度。

示例 1: 给定 nums = [3,2,2,3], val = 3, 函数应该返回新的长度 2, 并且 nums 中的前两个元素均为 2。
你不需要考虑数组中超出新长度后面的元素。

示例 2: 给定 nums = [0,1,2,2,3,0,4,2], val = 2, 函数应该返回新的长度 5,
并且 nums 中的前五个元素为 0, 1, 3, 0, 4。
 */
function get(arr, val) {
    let k = 0
    for(let i = 0 ; i< arr.length; i++) {
        if(arr[i] !== val) {
            arr[k++] = arr[i]
        }
    }
    console.log(arr)
    return k
}

// console.log(get([3,2,2,3], 3)) // 2
// console.log(get([0,1,2,2,3,0,4,2], 2)) // 5


/*
给你一个 非严格递增排列 的数组 nums ，请你 原地 删除重复出现的元素，使每个元素 只出现一次 ，
返回删除后数组的新长度。元素的 相对顺序 应该保持 一致 。然后返回 nums 中唯一元素的个数
 */
var removeDuplicates = function(nums) {
    let k = 1;
    for(let i = 1; i < nums.length;i++) {
        if(nums[i] !== nums[i - 1]) {
            nums[k++] = nums[i]
        }
    }
    return k
};

// console.log(removeDuplicates([1,1,2]))
// console.log(removeDuplicates([0,0,1,1,1,2,2,3,3,4]))



/*
给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
请注意 ，必须在不复制数组的情况下原地对数组进行操作。

示例 1:

输入: nums = [0,1,0,3,12]
输出: [1,3,12,0,0]

示例 2:

输入: nums = [0]
输出: [0]
 */
// 快排思想
var moveZeroes = function(nums) {
    let k = 0
    for(let i = 0; i < nums.length; i++) {
        if(nums[i] !== 0) {
            [nums[k++], nums[i]] = [nums[i], nums[k]]
        }
    }
    return nums
};

// console.log(moveZeroes([0,1,0,3,12])) // [1,3,12,0,0]
// console.log(moveZeroes([0])) // [0]



/*
给定 s 和 t 两个字符串，当它们分别被输入到空白的文本编辑器后，如果两者相等，返回 true 。# 代表退格字符。

注意：如果对空文本输入退格字符，文本继续为空。

示例 1：

输入：s = "ab#c", t = "ad#c"
输出：true
解释：s 和 t 都会变成 "ac"。
示例 2：

输入：s = "ab##", t = "c#d#"
输出：true
解释：s 和 t 都会变成 ""。
示例 3：

输入：s = "a#c", t = "b"
输出：false
解释：s 会变成 "c"，但 t 仍然是 "b"。
 */
var backspaceCompare = function(s, t) {
    function buildAbbr(s) {
        let left = 0
        let right = 0
        let arr = s.split('')
        while(right < s.length) {
            if(arr[right] !== '#') {
                arr[left++] = arr[right]
            } else if (left !== 0) {
                left--
            }
            right++
        }
        arr.length = left
        return arr.join('')
    }
    return buildAbbr(s) === buildAbbr(t)
};



// console.log(backspaceCompare('ab#c', 'ad#c'))


/*
有序数组平方根
给你一个按 非递减顺序 排序的整数数组 nums，返回 每个数字的平方 组成的新数组，要求也按 非递减顺序 排序。

示例 1：

输入：nums = [-4,-1,0,3,10]
输出：[0,1,9,16,100]
解释：平方后，数组变为 [16,1,0,9,100]
排序后，数组变为 [0,1,9,16,100]
示例 2：

输入：nums = [-7,-3,2,3,11]
输出：[4,9,9,49,121]
 */

var sortedSquares = function(nums) {
    const res= []
    for(let left = 0, right = nums.length - 1; left <= right;) {
        const leftV = Math.abs(nums[left])
        const rightV = Math.abs(nums[right])
        if(leftV < rightV) {
            res.unshift(rightV * rightV)
            right--
        } else {
            res.unshift(leftV * leftV)
            left++
        }
    }
    return res
};

console.log(sortedSquares([-4,-1,0,3,10]))
