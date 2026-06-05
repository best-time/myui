### 1. 中文乱码、不显示、变成方框
难点
jsPDF 默认只支持 Latin 字符，不支持中文、日文、韩文，直接导出会空白或 □□□。
解决方案
必须加载中文字体（.ttf）
```javascript
import jsPDF from 'jspdf';

const doc = new jsPDF();

// 加载字体
doc.addFont('msyh.ttf', 'MicrosoftYaHei', 'normal');
doc.setFont('MicrosoftYaHei'); // 切换为中文字体

doc.text('你好世界', 10, 10);
```
最简单方案：使用 jspdf-fonts 预制好的字体包。

### 2. HTML 导出样式丢失、排版错乱
难点
```
   html2canvas + jsPDF 导出 DOM 时：
   圆角、阴影、渐变不生效
   富文本样式丢失
   表格错位
   解决方案
   尽量不用 html 导出
   复杂排版 → 自己用 API 绘制（text / line / rect）
   必须用 HTML 导出时：
   加 scale:2 提升清晰度
   给容器固定宽高
```

```javascript
html2canvas(dom, { scale: 2 }).then(canvas => {
  const img = canvas.toDataURL('image/jpeg', 1.0);
  doc.addImage(img, 'JPEG', 0, 0, 210, 297);
});
```


### 3. 分页被切断（文字 / 图片 / 表格从中间劈开）
```
   难点
   jsPDF 不会自动分页，元素高度超出页面直接被切断。
   解决方案
   手动计算高度 + 自动分页
   ```

```javascript
let y = 20;
const pageHeight = 270;

function addText(txt) {
  if (y > pageHeight) {
    doc.addPage();
    y = 20;
  }
  doc.text(txt, 10, y);
  y += 10;
}
```
避免切断元素：

每次绘制前判断高度，不够就 addPage()。


### 4. 图片模糊、跨域、显示不出来
   ```
   难点
   图片清晰度低
   跨域图片无法截图
   base64 太长导致崩溃
   解决方案
   
   高清截图

html2canvas(dom, { scale: 2, useCORS: true })

图片跨域

img.setAttribute('crossOrigin', 'anonymous');

用 addImage 插入，不要用超大 base64
   ```


### 5. 富文本（粗体、颜色、斜体）无法导出
难点
jsPDF 不能直接识别 HTML 样式，必须自己逐个设置。

解决方案
```
   // 粗体
   doc.setFont(undefined, 'bold');
   // 颜色
   doc.setTextColor('#ff0000');
   // 斜体
   doc.setFont(undefined, 'italic');

   doc.text('带样式文本', 10, 20);
```

### 6. 无法自动计算文本高度
难点

不知道一段文字会占多高，无法做分页。

解决方案
```
const lines = doc.splitTextToSize(text, 180);
const height = lines.length * 10;
```
就能知道文本高度，判断是否需要分页。


### 7. 长文档导出卡顿、浏览器崩溃
难点
内容多、图片多、页面多 → 内存爆了。

解决方案

- 图片压缩质量 0.6~0.8
- 避免大量 base64
- 分页生成，不要一次性渲染
- 使用 doc.deletePage() 清理无用页

### 8. 页码、页眉、页脚很难实现
难点
没有原生 API，必须自己画。

解决方案

```javascript
const totalPages = doc.internal.getNumberOfPages();
   for (let i = 1; i <= totalPages; i++) {
   doc.setPage(i);
   doc.text(`第 ${i} / ${totalPages} 页`, 100, 290);
   }
```