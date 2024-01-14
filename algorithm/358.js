/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSum = function(nums) {
    nums.sort((a, b) => a - b)
    let count = -1
    for(let i = 0; i < nums.length-1; i++) {
        let j = i + 1
        while(j < nums.length) {
            if(getStrMaxNum(nums[i]) === getStrMaxNum(nums[j])) {
                count = Math.max(count, nums[i] + nums[j])
            }
            j++
        }
    }

    function getStrMaxNum(s) {
        if(s < 10) return s + ''
        s = s + ''
        return (`${s}`).split('').sort((a, b) => a - b)[s.length-1]
    }
    return count
};

// console.log(maxSum([51,71,17,24,42])) // 88
// console.log(maxSum([1,2,3,4])) // -1


const arr = [1, 8, 9]
let m = arr.reduce((prev, cur, index) =>  {
    const idx = arr.length - index - 1
    return prev + cur * Math.pow(10, idx)
}, 0 )

// console.log(m)



/**
 * @param {number[]} nums
 * @param {number} x
 * @return {number}
 */
var minAbsoluteDifference = function(nums, x) {
    let min = Infinity
    for(let i = 0; i < nums.length - x; i++) {
        let j = i + x
        while(j < nums.length) {
            let m = nums[i] - nums[j]
            min = Math.min(min, Math.abs(m))
            j++
        }
    }
    return min
};



function doubleIt2 (head) {
    let arr = [];
    let temp = head;
    while (temp !== null) {
        arr.push(temp.val);
        temp = temp.next;
    }
    let arr1 = [];
    let addon = 0;
    for (let i = arr.length - 1; i >= 0; i--) {
        let val = arr[i];
        let t = val * 2 + addon;
        addon = Math.floor(t / 10);
        let cur = t % 10;
        arr1.push(cur);
    }
    if (addon) arr1.push(addon);
    let res = new ListNode(-1);
    let w = res;
    for (let i = arr1.length - 1; i >= 0; i--) {
        let t = new ListNode(arr1[i]);
        w.next = t;
        w = w.next;
    }
    return res.next;
}





// nums = [4,3,2,4], x = 2 // 0
//
// nums = [5,3,2,10,15], x = 1 // 1
//
// nums = [1,2,3,4], x = 3 // 3

// console.log(minAbsoluteDifference([4,3,2,4], 2))
// console.log(minAbsoluteDifference([5,3,2,10,15], 1))
// console.log(minAbsoluteDifference([1,2,3,4], 3))

function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

var doubleIt = function(head) {
    let step = 1
    let arr = [head.val]
    while(head.next) {
        step += 1
        arr.push(head.next.val)
        head = head.next
    }
    let num = arr.reduce((prev, cur, index) =>  {
        const idx = arr.length - index - 1
        return prev + cur * Math.pow(10, idx)
    }, 0) * 2 // 2倍求和
    let numArr = `${num}`.split('').map(it => +it) // 字符串数组 转成 数字数组
    let newHead = new ListNode(-1)
    let w = newHead
    step = 0
    while(step < numArr.length) { // 1998
        let t = new ListNode(numArr[step])
        w.next = t
        w = w.next
        step++
    }
    return newHead.next
};
const head = {
    val: 1,
    next: {
        val: 8,
        next: {
            val: 9,
            next: null
        }
    }
}

console.log(doubleIt(head))
//输入 [9,1,9,5,0,5,1,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9]
//预期: [1,8,3,9,0,1,0,3,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,8]

// 我的输出 [1,NaN,8,3,9,0,1,0,4,NaN,NaN,2,9]
