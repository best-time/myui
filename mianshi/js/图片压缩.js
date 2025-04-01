// todo 调用上传接口 文件提交给后台
function handleChange(file) {
  let formData = new FormData()
  formData.append('file', file.raw || file)
  console.log(formData)
  brandServices.uploadFile(formData).then((res) => {
    if (res.data.errno === 0) {
      this.imgUrl = res.data.data
      this.dialogImageUrl = URL.createObjectURL(file)
      message('success', res.data.message)
    } else {
      message('error', res.data.message)
    }
  })
}

function compressImg(file) {
  let that = this
  // ?通过FormData构造函数创建一个空对象
  let formData = new FormData()
  let reader = new FileReader()
  // ?将读取到的文件编码成DataURL
  reader.readAsDataURL(file)
  // ?压缩图片
  reader.onload = function (ev) {
    try {
      // ?读取图片来获得上传图片的宽高
      let img = new Image()
      img.src = ev.target.result
      img.onload = function (ev) {
        // ?将图片绘制到canvas画布上进行压缩
        let canvas = document.createElement('canvas')
        let context = canvas.getContext('2d')
        let imgwidth = img.width
        let imgHeight = img.height
        // ?按比例缩放后图片宽高;
        let targetwidth = imgwidth
        let targetHeight = imgHeight
        // ?/如果原图宽大于最大宽度
        if (targetWidth > targetHeight) {
          // ?原图宽高比例
          let scale = targetHeight / 1280
          targetHeight = 1280
          targetWidth = targetwidth / scale
        } else {
          // ?原图宽高比例
          let scale = targetWidth / 1280
          targetWidth = 1280
          targetHeight = targetHeight / scale
        }
        // ?缩放后高度仍然大于最大高度继续按比例缩小
        canvas.width = targetwidth //canvas的宽=图片的宽
        canvas.height = targetHeight //canvas的高=图片的高
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.drawImage(this, 0, 0, canvas.width, canvas.height)
        let data = ''
        // ?如果图片小于0.6Mb，不进行压缩，并返回二进制流
        if (file.size <= 628288) {
          data = canvas.toDataURL('image/jpeg')
          formData.append('file', file)
          that.handleChange(file)
        }
        // ?如果图片大于e.6Mb，进行压缩，并返回二进制流
        else {
          // todo 压缩文件大小比例
          data = canvas.toDataURL('image/jpeg', 0.4)
          let paper = dataURLtoFile(data, file.name)
          formData.append('file', paper)
          that.handleChange(paper)
        }
      }
    } catch (error) {
      console.log('出现错误', error)
    }
  }
}

function dataURLtoFile() {}
//图片上传之前处理事件
function beforeAvatarUpload(file) {
  console.log(file)
  const isJpgPng = file.raw.type === 'image/jpeg' || file.raw.type === 'image/png'
  if (!isJpgPng) {
    message('error', '上传头像图片只能是 JPG/PNG 格式!')
  } else {
    this.compressImg(file.raw)
  }
  return isJpgPng
}

function message(type, message) {}
