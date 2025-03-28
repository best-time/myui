const vdo = document.querySelector('video')
const modal = document.querySelector('.modal')
const btn = document.querySelector('.btn')

// 1. 互动之后带声音播放
function play() {
  vdo.muted = true
  vdo.play()

  if (canAutoPlay()) {
    vdo.muted = false
    modal.style.display = 'none'
    btn.removeEventListener('click', play)
  } else {
    modal.style.display = 'flex'
    btn.addEventListener('click', play)
  }
}

function canAutoPlay() {
  // 创建音频上下文,判断是否可以自动播放
  const ctx = new AudioContext()
  const autoplay = ctx.state === 'running'
  ctx.close()
  return autoplay
}

// 2. 显示蒙层,点击按钮 带声音播放

async function playVideo() {
  try {
    await vdo.play()
    modal.style.display = 'none'
    btn.removeEventListener('click', play)
  } catch (err) {
    modal.style.display = 'flex'
    btn.addEventListener('click', play)
  }
}
