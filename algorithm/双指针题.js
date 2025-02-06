

 ;(function() {
     // 删除排序数组中的重复项
     // 返回长度
    const arr1 = [1,1,2]
    const arr2 = [0,0,1,1,1,2,2,3,3,4]

    function removeDuplicate(list) {
        if(!list.length) return 0
        const len = list.length
        let slow = 0;
        let fast = 0
        while(fast < len) {
            if(list[fast] !== list[slow]) {
                slow++
                list[slow] = list[fast]
            }
            fast++
        }
        return slow + 1
    }
     removeDuplicate(arr1)
     // removeDuplicate(arr2)


     // 单列表删除
     function removeDuplicateListNode(head) {
         if(head === null) return null
         let slow = head;
         let fast = head
         while(fast !== null) {
             if (slow.val !== fast.val) {
                 slow.next = fast
                 slow = slow.next
             }
             fast = fast.next
         }
         slow.next = null
         return head
     }
})()

 ;(function() {
     /*
        两数之和
        非递减排列
        不能重复使用元素
        返回下标
      */
     const nums = [2, 7, 11, 15]
     const target = 18  // [2, 3]

      function get(nums, target) {
         const len = nums.length
         let left = 0;
         let right = len - 1
          while(right < len) {
             const sum = nums[left] + nums[right]
              if(sum === target) {
                  return [left + 1, right + 1]
              } else if (sum < target) {
                left++
              } else {
                  right--
              }
          }
          return [-1, -1]
      }

     console.log(get(nums, target))
 })()

 ;(function() {
     // '原地'反转数组
     const s = ["h","e","l","l","o"]
     // 输出：["o","l","l","e","h"]

     function reverse(arr) {
         const len = arr.length
         let left = 0;
         let right = len - 1
         while(left < right) {
             [ arr[left], arr[right] ] = [ arr[right], arr[left] ]
             right--
             left++
         }
         return arr
     }

     console.log(reverse(s))
 })()

 ;(function() {
     // 判断是否是回文串
     const s = 'abba'
     function isPalindrome(s) {
         const len = arr.length
         let left = 0;
         let right = len - 1
         while(left < right) {
             if(s[left] === s[right]) {
                 left ++
                 right --
             } else {
                 return false
             }
         }
         return true
     }

     // 找最长回文子串
     // 中心向两端扩散的双指针技巧

     /*
     大致思路:
     for 0 <= i < len(s):
        找到以 s[i] 为中心的回文串
        找到以 s[i] 和 s[i+1] 为中心的回文串
        更新答案
      */
      function palindrome(s, left, right) {
         while(left >= 0 && right < s.length && s[left] === s[right]) {
             left--
             right++
         }
         return s.substring(left + 1, right)
      }
     function longestPalindrome(s) {
         let res = ''
         for(let i = 0 ; i < s.length; i++) {
             let s1 = palindrome(s, i, i)
             let s2 = palindrome(s, i, i+1)
             res = res.length > s1.length ? res : s1
             res = res.length > s2.length ? res : s2
         }
         return res
     }
     const s1 = 'cbbd'
     const s2 = 'babad'
     console.log(longestPalindrome(s1))
     console.log(longestPalindrome(s2))
 })()

 ;(function() {})()

 ;(function() {})()
