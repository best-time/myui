import Vue from 'vue'
/**
 * 判断元素可见
 */
function isVisible(el) {
  let windowHeight = window.innerHeight
  let position = el.getBoundingClientRect()
  console.log(position)
  // 当元素的top偏移量小于页面大小并且大于高度的负数
  if (position.top < windowHeight && position.top > -position.height) {
    return true
  }
  return false
}

/**
 * 对图片进行懒加载
 */
function lazyLoad(imgEl, src) {
  if (imgEl && isVisible(imgEl)) {
    // 元素存在，元素未被加载，元素可见
    if (src) {
      setTimeout(function () {
        imgEl.setAttribute('src', src)
      }, 400) // 模拟网络请求慢的情况
    } else {
      imgEl.setAttribute('src', src)
    }
  }
}

const plu = {
  install(Vue, options) {
    Vue.directive('lazy', {
      bind: function (el, binding, vnode) {
        el.setAttribute('src', options.loading)
        window.addEventListener('scroll', function () {
          lazyLoad(el, binding.value)
        })
      },
      inserted: function (el, binding, vnode) {
        lazyLoad(el)
      }
    })
  }
}

Vue.use(plu, { loading: '' })
