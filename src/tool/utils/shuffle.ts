/**
 * 打乱数组
 *
 *        1/10 10:56
 */
export const shuffle = <T>(array: T[]): T[] => {
  if (!array) return array
  array = [...array]
  let currentIndex = array.length
  let temporaryValue, randomIndex
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }
  return array
}
