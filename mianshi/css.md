vertical-align属性值：

    线类：baseline、top、middle、bottom
    文本类：text-top、text-bottom
    上标下标类：sub、super
    数值百分比类：20px、2em、20%等（对于基线往上或往下偏移）

温馨提示：负值相对于基线往下偏移，正值往上偏移，事实上vertical-align:base-line等同于vertical-align:0。这个负值真的是 CSS 神器！

vertical-align生效前提：

什么情况生效
内联元素span、strong、em、img、button、input等
display值为inline、inline-block、inline-table或table-cell的元素
需要注意浮动和绝对定位会让元素块状化，因此此元素绝对不会生效

伪类和伪元素的区别

伪类和伪元素是用来修饰不在文档树中的部分，比如，一句话中的第一个字母，或者是列表中的第一个元素。
下面分别对伪类和伪元素进行解释：
伪类用于当已有元素处于的某个状态时，为其添加对应的样式，这个状态是根据用户行为而动态变化的。
比如说，当用户悬停在指定的元素时，我们可以通过:hover来描述这个元素的状态。虽然它和普通的css类相似，
可以为已有的元素添加样式，但是它只有处于dom树无法描述的状态下才能为元素添加样式，所以将其称为伪类。
伪元素用于创建一些不在文档树中的元素，并为其添加样式。
比如说，我们可以通过:before来在一个元素前增加一些文本，并为这些文本添加样式。虽然用户可以看到这些文本，但是这些文本实际上不在文档树中。
区别
伪类的操作对象是文档树中已有的元素，而伪元素则创建了一个文档树外的元素。因此，伪类与伪元素的区别在于：有没有创建一个文档树之外的元素。
CSS3规范中的要求使用双冒号(::)表示伪元素，以此来区分伪元素和伪类，比如::before和::after等伪元素使用双冒号(::)，
:hover和:active等伪类使用单冒号(:)。除了一些低于IE8版本的浏览器外，大部分浏览器都支持伪元素的双冒号(::)表示方法。

### BFC

BFC 全称为块级格式化上下文 (Block Formatting Context) 。
BFC是 W3C CSS 2.1 规范中的一个概念，它决定了元素如何对其内容进行定位以及与其他元素的关系和相互作用，
当涉及到可视化布局的时候，Block Formatting Context提供了一个环境，HTML元素在这个环境中按照一定规则进行布局。
一个环境中的元素不会影响到其它环境中的布局。比如浮动元素会形成BFC，浮动元素内部子元素的主要受该浮动元素影响，两个浮动元素之间是互不影响的。
这里有点类似一个BFC就是一个独立的行政单位的意思。可以说BFC就是一个作用范围，把它理解成是一个独立的容器，并且这个容器里box的布局与这个容器外的box毫不相干。

触发BFC的条件

    根元素或其它包含它的元素
    浮动元素 (元素的 float 不是 none)
    绝对定位元素 (元素具有 position 为 absolute 或 fixed)
    内联块 (元素具有 display: inline-block)
    表格单元格 (元素具有 display: table-cell，HTML表格单元格默认属性)
    表格标题 (元素具有 display: table-caption, HTML表格标题默认属性)
    具有overflow 且值不是 visible 的块元素
    弹性盒（flex或inline-flex）
    display: flow-root
    column-span: all

BFC的约束规则

    内部的盒会在垂直方向一个接一个排列（可以看作BFC中有一个的常规流）
    处于同一个BFC中的元素相互影响，可能会发生外边距重叠
    每个元素的margin box的左边，与容器块border box的左边相接触(对于从左往右的格式化，否则相反)，即使存在浮动也是如此
    BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然
    计算BFC的高度时，考虑BFC所包含的所有元素，连浮动元素也参与计算
    浮动盒区域不叠加到BFC上

BFC可以解决的问题

    垂直外边距重叠问题
    去除浮动
    自适用两列布局（float + overflow）

### 层级

    back~~ground/border
    z-index < 0
    block块级水平盒子
    float浮动盒子
    inline/inline-block水平盒子
    z-index:  auto 或者0;
    z-index > 0~~

### 语义化标签：

    header nav main article section aside footer

语义化的优点:

    在没CSS样式的情况下，页面整体也会呈现很好的结构效果
    代码结构清晰，易于阅读，
    利于开发和维护 方便其他设备解析（如屏幕阅读器）根据语义渲染网页。
    有利于搜索引擎优化（SEO），搜索引擎爬虫会根据不同的标签来赋予不同的权重

BFC（块级格式上下文）
BFC的概念
BFC 是 Block Formatting Context 的缩写，即块级格式化上下文。BFC是CSS布局的一个概念，是一个独立的渲染区域，规定了内部box如何布局，
并且这个区域的子元素不会影响到外面的元素，其中比较重要的布局规则有内部 box 垂直放置，计算 BFC 的高度的时候，浮动元素也参与计算。

BFC的原理布局规则

    内部的Box会在垂直方向，一个接一个地放置
    Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠
    每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反
    BFC的区域不会与float box重叠
    BFC是一个独立容器，容器里面的子元素不会影响到外面的元素
    计算BFC的高度时，浮动元素也参与计算高度
    元素的类型和display属性，决定了这个Box的类型。不同类型的Box会参与不同的Formatting Context。

如何创建BFC？

    根元素，即HTML元素
    float的值不为none
    position为absolute或fixed
    display的值为inline-block、table-cell、table-caption
    overflow的值不为visible

BFC的使用场景

    去除边距重叠现象
    清除浮动（让父元素的高度包含子浮动元素）
    避免某元素被浮动元素覆盖
    避免多列布局由于宽度计算四舍五入而自动换行

水平居中
https://juejin.cn/post/7008348524530106381

对于 行内元素 : text-align: center;

对于确定宽度的块级元素：

    （1）width和margin实现。margin: 0 auto;
    （2）绝对定位和margin-left: (父width - 子width）/2, 前提是父元素position: relative

对于宽度未知的块级元素

（1）table标签配合margin左右auto实现水平居中。使用table标签（或直接将块级元素设值为 display:table），再通过给该标签添加左右margin为auto。
（2）inline-block实现水平居中方法。display：inline-block和text-align:center实现水平居中。
（3）绝对定位+transform，translateX可以移动本身元素的50%。
（4）flex布局使用justify-content:center

垂直居中

    利用 line-height 实现居中，这种方法适合纯文字类
    通过设置父容器 相对定位 ，子级设置 绝对定位，标签通过margin实现自适应居中
    弹性布局 flex :父级设置display: flex; 子级设置margin为auto实现自适应居中
    父级设置相对定位，子级设置绝对定位，并且通过位移 transform 实现
    table 布局，父级通过转换成表格形式，然后子级设置 vertical-align 实现。（需要注意的是：vertical-align: middle使用的前提条件是内联元素以及display值为table-cell的元素）。

Flex 是 Flexible Box 的缩写，意为"弹性布局",用来为盒状模型提供最大的灵活性。指定容器 display: flex 即可。 简单的分为容器属性和元素属性。
容器的属性：

    flex-direction：决定主轴的方向（即子 item 的排列方法）flex-direction: row | row-reverse | column | column-reverse;
    flex-wrap：决定换行规则 flex-wrap: nowrap | wrap | wrap-reverse;
    flex-flow： .box { flex-flow: || ; }
    justify-content：对其方式，水平主轴对齐方式
    align-items：对齐方式，竖直轴线方向
    align-content

项目的属性（元素的属性）：

    order 属性：定义项目的排列顺序，顺序越小，排列越靠前，默认为 0
    flex-grow 属性：定义项目的放大比例，即使存在空间，也不会放大
    flex-shrink 属性：定义了项目的缩小比例，当空间不足的情况下会等比例的缩小，如果 定义个 item 的 flow-shrink 为 0，则为不缩小
    flex-basis 属性：定义了在分配多余的空间，项目占据的空间。
    flex：是 flex-grow 和 flex-shrink、flex-basis 的简写，默认值为 0 1 auto。
    align-self：允许单个项目与其他项目不一样的对齐方式，可以覆盖
    align-items，默认属 性为 auto，表示继承父元素的 align-items 比如说，用 flex 实现圣杯布局

### 清除浮动

1. <div class="parent">
       //添加额外标签并且添加clear属性
       <div style="clear:both"></div>
       //也可以加一个br标签
   </div>

2. 父级添加overflow属性，或者设置高度

3. 在css中添加:after伪元素

```css
.parent:after {
  /* 设置添加子元素的内容是空 */
  content: '';
  /* 设置添加子元素为块级元素 */
  display: block;
  /* 设置添加的子元素的高度0 */
  height: 0;
  /* 设置添加子元素看不见 */
  visibility: hidden;
  /* 设置clear：both */
  clear: both;
}
```
