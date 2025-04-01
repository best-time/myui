const imgList = [...document.querySelectorAll('img')]

let lazyLoad = function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
        entry.target.src = entry.target.dataset.src
        unobserve(entry.target)
      }
    })
  })
  imgList.forEach((img) => {
    observe(img)
  })

  function unobserve(target) {
    if (!observer) {
      return
    }
    observer.unobserve(target)
  }
  function observe(target) {
    if (!observer) {
      return
    }
    observer.observe(target)
  }
}
