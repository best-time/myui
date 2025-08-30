window.addEventListener('load', () => {
  frames['editor'].document.designMode = 'on'
})
const bold = (val) => {
  document.execCommand('StyleWithCSS', true, true)
  document.execCommand('Bold', false, val)
}
const italic = (val) => {
  document.execCommand('StyleWithCSS', true, true)
  document.execCommand('italic', false, val)
}
const changeColor = (val = '#ff0000') => {
  document.execCommand('StyleWithCSS', true, true)
  document.execCommand('foreColor', false, val)
}
const insertImage = (val = 'https://avatar-static.segmentfault.com/339/131/3391311562-5d5653daaad5f_huge256') => {
  document.execCommand('StyleWithCSS', true, true)
  document.execCommand('insertImage', false, val)
}

const boldIframe = (val) => {
  frames['editor'].document.execCommand('StyleWithCSS', true, true)
  frames['editor'].document.execCommand('Bold', false, val)
}

const insert = () => {
  window.getSelection().deleteFromDocument()
  const selection = window.getSelection()
  const { anchorNode, anchorOffset } = selection
  if (anchorNode.nodeType === 3) {
    const string = anchorNode.nodeValue
    anchorNode.nodeValue = string.substring(0, anchorOffset) + '😄' + string.substring(anchorOffset, Infinity)
  } else {
    const newNode = document.createElement('span')
    newNode.innerText = '😄'
    anchorNode.insertBefore(newNode, anchorNode.childNodes[anchorOffset])
  }
}
const insert2 = () => {
  lastRange = window.getSelection().getRangeAt(0)
  const newNode = document.createElement('span')
  newNode.textContent = '😄'
  lastRange.deleteContents()
  lastRange.insertNode(newNode)
}
