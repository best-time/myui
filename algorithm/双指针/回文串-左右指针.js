const s = 'abba'
function isPalindrome(s) {
	const len = s.length
	let right = len - 1
	let left = 0;
	while(left < right) {
		if(s[left] !== s[right]) {
			return false
		}
		left ++
		right --
	}
	return true
}

console.log(isPalindrome(s))
console.log(isPalindrome('ab'))
console.log(isPalindrome('aba'))


// 2 找出最长回文串

function palindrome(s, left, right) {
	while(left >= 0 && right < s.length && s[left] === s[right]) {
		left--
		right++
	}
	return s.substring(left + 1, right)
}
 function longestPalindromeString(s) {
	 let res = ''
	 const len = s.length
	 for(let i = 0 ; i < len; i++) {
		 let s1 = palindrome(s, i, i) // s[i] 为中心的回文串, 奇数串
		 let s2 = palindrome(s, i, i+1) // s[i] s[i+1] 为中心的回文串, 偶数串
		 let str = s1.length >= s2.length ? s1 : s2
		 res = res.length > str.length ? res : str
	 }
	 return res
 }

 const s1 = 'babad'
 const s2 = 'cbbd'

console.log(longestPalindromeString(s1))
console.log(longestPalindromeString(s2))
