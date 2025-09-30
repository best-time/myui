/**
 * 插入排序
 *
 *     11/19
 */
export const insertSort = <T>(arr: T[], func: (prev: T, next: T) => boolean): T[] => {
  let len = arr.length
  for (let i = 1; i < len; i++) {
    let temp = arr[i]
    /*默认已排序的元素*/
    let j = i - 1
    /*在已排序好的队列中从后向前扫描*/
    while (j >= 0 && func(arr[j], temp)) {
      /*已排序的元素大于新元素，将该元素移到一下个位置*/
      arr[j + 1] = arr[j]
      j--
    }
    arr[j + 1] = temp
  }
  return arr
}
