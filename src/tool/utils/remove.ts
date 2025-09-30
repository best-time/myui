export function remove<T>(list: T[], item: T): boolean {
  const processIndex = list.indexOf(item)
  if (processIndex > -1) {
    list.splice(processIndex, 1)
    return true
  } else {
    return false
  }
}
