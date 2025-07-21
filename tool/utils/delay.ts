export const delay = (dur: number = 0) => {
  return new Promise((resolve) => {
    setTimeout(resolve, dur)
  })
}
