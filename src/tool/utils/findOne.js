export const findOne = (arr, judgement, index) => {
  if (!arr || arr.length === 0) {
    return { item: null }
  }
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    const flag = judgement(item, i)
    if (flag) {
      return !!index ? { item, index: i } : { item }
    }
  }
  return { item: null }
}
//# sourceMappingURL=findOne.js.map
