
const nums1 = [3,2,2,3]
const val1 = 3
// 2  [2 2 ]

const nums2 = [0,1,2,2,3,0,4,2]
const val2 = 2
// 5  [0 1 3 0 4 ]


function removeDuplicate(nums, val) {
	let left = 0
	let right = 0
	while(right < nums.length) {
		if(nums[right] !== val) {
			nums[left++] = nums[right]
		}
		right++
	}
	return left
}

console.log(removeDuplicate(nums1, val1))
console.log(removeDuplicate(nums2, val2))
