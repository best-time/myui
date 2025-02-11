// 快慢指针的一种

/*
	模板
 */
function windowRandom(str) {
  let left = 0
  let right = 0
  while (right < str.length) {
    const c = str[right]
    // 增大窗口
    right++
    // 更新窗口数据
    // ...

    // 判断左侧窗口是否收缩
    while (left < c.length) {
      const d = str[left]
      // 缩小窗口
      left++
      // 更新窗口数据
      // ...
    }
  }
}

/*
	最小覆盖子串

	给1个字符串s, 1个字符串t 返回 s中覆盖t所有字符的最小子串
	如果不存在返回空串''
 */

const s1 = 'ADOBECODEBANC'
const t1 = 'ABC'

const s2 = 'ADOBECODEBCANC'
const t2 = 'ACBC'

function getChildStr(s, t) {
  const tMap = t.split('').reduce((acc, cur) => {
    acc[cur] = (acc[cur] || 0) + 1
    return acc
  }, {})
  //目标字符种类数
  let typeCnt = Object.keys(tMap).length

  let left = 0
  let right = 0

  let minLen = s.length + 1 //表示最小字符串的长度
  let minSubStr = '' //表示符合的最小子串

  while (right < s.length) {
    const rightChar = s[right]
    right++
    if (rightChar in tMap) {
      //右指针找到了目标字符  即目标需求要减1
      tMap[rightChar]--
      if (tMap[rightChar] === 0) {
        //如果目标字符变成0，说明我们就不需要这个种类的字符了,于是目标字符就减掉1种
        typeCnt--
      }
    }
    const temp = s.slice(left, right)
    while (typeCnt === 0) {
      if (right - left < minLen) {
        // 更新最小覆盖子串信息
        minLen = right - left
        minSubStr = s.slice(left, right)
      }
      const leftChar = s[left]
      if (leftChar in tMap) {
        //左指针找到了目标字符，但由于这是缩小窗口的过程，此时即将丢失目标字符，目标字符需求要自增1
        tMap[leftChar]++
        if (tMap[leftChar] > 0) {
          //如果目标所需字符大于0，说明此时目标字符种类数需要自增1
          typeCnt++
        }
      }
      left++
    }
  }
  return minSubStr
}

// console.log(getChildStr(s1, t1))
console.log(getChildStr(s2, t2))
