export function remove(list, item) {
  const processIndex = list.indexOf(item)
  if (processIndex > -1) {
    list.splice(processIndex, 1)
    return true
  } else {
    return false
  }
}
//# sourceMappingURL=remove.js.map
