## MouseEvent

- mousedown 鼠标按下
- mouseup 鼠标释放
- click 左键单击
- dblclick 左键双击
- mousemove 鼠标移动
- mouseover 鼠标经过
- mouseout 鼠标滑出
- mouseenter 鼠标进入
- mouseleave 鼠标离开
- contextmenu 右键菜单

### 注意：
执行顺序：mousedown —> mouseup —> click

区别：mouseover和mouseout子元素也会触发，可以冒泡触发

区别：mouseenter和mouseleave是针对侦听的对象触发，阻止了冒泡

altKey ctrlKey shiftKey metaKey 是否按键点击

button buttons which用来判断是鼠标的哪个键操作的

左键对应的值为 0、1、1

中键对应的值为 1、4、2

右键对应的值为 2、2、3

timeStamp 从页面打开开始到触发事件的时间


### 总结：
clientX和clientY与x，y一样的，以浏览器显示区域的左上角开始，指鼠标的坐标。x,y是新浏览器支持

offsetX，offsetY，针对目标元素的左上角坐标，从padding开始。

layerX,layerY，往上找有定位属性的父元素的左上角（自身有定位属性的话就是相对于自身），都没有的话，就是相对于body的左上角

pageX，pageY相对页面左上角的距离

screenX screenY 相对显示器屏幕左上角的位置
