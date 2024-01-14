/**
 * @param {number[][]} nums
 * @return {number}
 */
var numberOfPoints = function(nums) {
    function getRange([start, end]) {
        const res = []
        for(let i = start; i<=end; i++) {
            res.push(i)
        }
        return res
    }
    // nums.sort((a, b) => a[0] - b[0])
    let ans = []
    for(let i = 0; i < nums.length; i++) {
       ans = ans.concat(getRange(nums[i]))
    }
    return [...new Set(ans)].length
};

// [[3,6],[1,5],[4,7]]    1 - 7

// [[1,3],[5,8]]   1、2、3、5、6、7、8

// console.log(numberOfPoints([[3,6],[1,5],[4,7]]))
// console.log(numberOfPoints([[1,3],[5,8]]))




/**
 * @param {number} sx
 * @param {number} sy
 * @param {number} fx
 * @param {number} fy
 * @param {number} t
 * @return {boolean}
 * 一秒一步
 */
var isReachableAtTime = function(sx, sy, fx, fy, t) {
    const eq = sx - fx === 0 && sy - fy === 0 && t === 1
    if(eq || Math.abs(fx - sx) > t || Math.abs(fy - sy) > t) return false
    function inRange([start, end], n) {
        return n >= start && n <= end
    }
    return inRange([sx - t, sx + t], fx) && inRange([sy - t, sy + t], fy)
};

// console.log(isReachableAtTime(2,4,7,7,6)) // true
// console.log(isReachableAtTime(3,1,7,3,3)) // false
// console.log(isReachableAtTime(1,2,1,2,1)) // false

/*

1-1 2步   最大  3-3
 */



/**
 * @param {number[][]} grid
 * @return {number}
 *

 const left = grid[i-1][j]
 const right = grid[i+1][j]
 const bottom = grid[i][j+1]
 const top = grid[i][j-1]
 if(left > 1 && grid[i][j] === 0) {
                    grid[i-1][j] -= 1
                    grid[i][j] = 1
                    ans +=1
                }
 if(right > 1 && grid[i][j] === 0) {
                    grid[i+1][j] -=1
                    grid[i][j] = 1
                    ans +=1
                }
 if(bottom > 1 && grid[i][j] === 0) {
                    grid[i+1][j] -=1
                    grid[i][j] = 1
                    ans +=1
                }
 if(top > 1 && grid[i][j] === 0) {
                    grid[i+1][j] -=1
                    grid[i][j] = 1
                    ans +=1
                }
 */
var minimumMoves = function(grid) {
    let zeroList = []
    let moreList = []
    for(let i = 0 ; i< 3; i++) {
       for (let j = 0 ; j < 3; j++) {
            if(grid[i][j] === 0) {
                zeroList.push([i, j])
            } else if(grid[i][j] > 1) {
                moreList.push([i, j, grid[i][j]])
            }
        }
    }
    console.log(zeroList)
    console.log(moreList)
    let ans = 0
    for(let i = 0; i< zeroList.length;i++) {
        let j= 0;
        let min = 1000
        const [s1, e1] = zeroList[i]
        let preIndexArr = []
        while(j < moreList.length) {
            const [s2, e2, num] = moreList[j]
            if(num > 1) {
                const selectMin = Math.abs(s1 - s2) + Math.abs(e1-e2)
                if(selectMin < min) {
                    if(preIndexArr.length) {
                        const preIndex = preIndexArr.pop()
                        moreList[preIndex][2] += 1
                    }
                    min = selectMin
                    moreList[j][2] -= 1
                    preIndexArr.push(j)
                }
            }
            j++
        }
        ans += min
    }
    return ans
};


// console.log(minimumMoves([[1,1,0],[1,1,1],[1,2,1]])) // 3
// console.log(minimumMoves([[1,3,0],[1,0,0],[1,0,3]])) // 4
console.log(minimumMoves([[3,2,0],[0,1,0],[0,3,0]])) // 6   答案7

const a = [
    3, 2, 0,
    0, 1, 0,
    0, 3, 0
]
