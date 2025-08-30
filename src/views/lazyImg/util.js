function init() {
  const preImages = $('img[data-src]').not('.pred-img')
  Array.from(preImages).forEach((item) => {
    if (isPreLoad(item)) {
      loadImg(item)
    }
  })
}

const loadImg = (img) => {
  if (!img.src) {
    img.src = img.attr('data-src').addClass('pred-img')
  }
}

const isPreLoad = (node) => {
  const preObj = node.getBoundingClientRect()
  const cH = $(window).height()
  return preObj <= cH + 100
}

export const preloadImg = (srcArr) => {
  if (srcArr instanceof Array) {
    for (let i = 0; i < srcArr.length; i++) {
      let oImg = new Image()
      oImg.src = srcArr[i]
    }
  }
}
