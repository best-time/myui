var p = Promise.all([p1, p2, p3]).then(() => {}).catch(err => {})
（1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，
此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。

（2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，
此时第一个被reject的实例的返回值，会传递给p的回调函数

var p = Promise.race([p1, p2, p3]);
只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。
那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。


demo:

	var p = Promise.race([
	  fetch('/resource-that-may-take-a-while'),
	  new Promise(function (resolve, reject) {
	    setTimeout(() => reject(new Error('request timeout')), 5000)
	  })
	])
	p.then(response => console.log(response))
	p.catch(error => console.log(error))

	上面代码中，如果5秒之内fetch方法无法返回结果，
	变量p的状态就会变为rejected，从而触发catch方法指定的回调函数。


Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))


// https://juejin.cn/post/7073869980411887652
// https://juejin.cn/post/7061588533214969892
// https://juejin.cn/post/7080889197719994375  css
// https://juejin.cn/post/7075348765162340383  无感刷新token
/*
 --------------------------------------性能优化------------------------------------
'军规'
https://learnku.com/docs/f2e-performance-rules/reduce-the-number-of-http-requests/6369


性能优化分为两个大的分类：
加载时优化
运行时优化


 将代码脚本放在 </head> 前面就能获取白屏时间：
<script>
    new Date().getTime() - performance.timing.navigationStart
</script>

在window.onload事件中执行以下代码，可以获取首屏时间：
new Date().getTime() - performance.timing.navigationStart

这个过程中可以提升性能的优化的点：
    DNS解析优化，浏览器访问DNS的时间就可以缩短
    使用HTTP2
    减少HTTP请求数量
    减少http请求大小
    服务器端渲染
    静态资源使用CDN
    资源缓存，不重复加载相同的资源


*/

/*
 --------------------------------------加载时优化------------------------------------

浏览器如果输入的是一个网址:
首先要交给DNS域名解析 -> 找到对应的IP地址 -> 然后进行TCP连接 -> 浏览器发送HTTP请求 -> 服务器接收请求 
-> 服务器处理请求并返回HTTP报文 -> 以及浏览器接收并解析渲染页面


1. DNS 预解析:
    浏览器对网站第一次的域名DNS解析查找流程依次为：
    浏览器缓存 ->系统缓存 ->路由器缓存 ->ISP DNS缓存 ->递归搜索

    <meta http-equiv="x-dns-prefetch-control" content="on" />

    <link rel="dns-prefetch" href="http://bdimg.share.baidu.com" />
    注意：dns-prefetch需慎用，多页面重复DNS预解析会增加重复DNS查询次数。

2.使用HTTP2

    HTTP2带来了非常大的加载优化，所以在做优化上首先就想到了用HTTP2代替HTTP1。
    HTTP2相对于HTTP1有这些优点：
    解析速度快
        服务器解析 HTTP1.1 的请求时，必须不断地读入字节，直到遇到分隔符 CRLF 为止。而解析 HTTP2 的请求就不用这么麻烦，因为 HTTP2 是基于帧的协议，每个帧都有表示帧长度的字段。
    多路复用
        在 HTTP2 上，多个请求可以共用一个 TCP 连接，这称为多路复用。
        当然HTTP1.1有一个可选的Pipelining技术，说的意思是当一个HTTP连接在等待接收响应时可以通过这个连接发送其他请求。听起来很棒，其实这里有一个坑，处理响应是按照顺序的，
        也就是后发的请求有可能被先发的阻塞住，也正因此很多浏览器默认是不开启Pipelining的。
        HTTP1 的Pipelining技术会有阻塞的问题，HTTP/2的多路复用可以粗略的理解为非阻塞版的Pipelining。即可以同时通过一个HTTP连接发送多个请求，
        谁先响应就先处理谁，这样就充分的压榨了TCP这个全双工管道的性能。加载性能会是HTTP1的几倍，需要加载的资源越多越明显。当然多路复用是建立在加载的资源在同一域名下，不同域名神仙也复用不了。
    首部压缩
        HTTP2 提供了首部压缩功能。（这部分了解一下就行）
        HTTP 1.1请求的大小变得越来越大，有时甚至会大于TCP窗口的初始大小，因为它们需要等待带着ACK的响应回来以后才能继续被发送。
        HTTP/2对消息头采用HPACK（专为http/2头部设计的压缩格式）进行压缩传输，能够节省消息头占用的网络的流量。而HTTP/1.x每次请求，都会携带大量冗余头信息，浪费了很多带宽资源。
        服务器推送
        服务端可以在发送页面HTML时主动推送其它资源，而不用等到浏览器解析到相应位置，发起请求再响应。

3.减少HTTP请求数量

    HTTP请求建立和释放需要时间。
    HTTP请求从建立到关闭一共经过以下步骤：
        客户端连接到Web服务器
        发送HTTP请求
        服务器接受请求并返回HTTP响应
        释放连接TCP链接
    这些步骤都是需要花费时间的，在网络情况差的情况下，花费的时间更长。如果页面的资源非常碎片化，
    每个HTTP请求只带回来几K甚至不到1K的数据（比如各种小图标）那性能是非常浪费的。


4.压缩、合并文件

    压缩文件 -> 减少HTTP请求大小,可以减少请求时间
    文件合并 -> 减少HTTP请求数量。
    我们可以对html、css、js以及图片资源进行压缩处理，现在可以很方便的使用 webpack 实现文件的压缩：

    js压缩：UglifyPlugin
    CSS压缩：MiniCssExtractPlugin
    HTML压缩：HtmlWebpackPlugin
    图片压缩：image-webpack-loader

    提取公共代码
    合并文件虽然能减少HTTP请求数量， 但是并不是文件合并越多越好，还可以考虑按需加载方式（后面第6点有讲到）。什么样的文件可以合并呢？可以提取项目中多次使用到的公共代码进行提取，打包成公共模块。
    可以使用 webpack4 的 splitChunk 插件 cacheGroups 选项。
    optimization: {
          runtimeChunk: {
            name: 'manifest' // 将 webpack 的 runtime 代码拆分为一个单独的 chunk。
        },
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'chunk-vendors',
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    chunks: 'initial'
                },
                common: {
                    name: 'chunk-common',
                    minChunks: 2,
                    priority: -20,
                    chunks: 'initial',
                    reuseExistingChunk: true
                }
            },
        }
    },


5.采用svg图片或者字体图标

    因为字体图标或者SVG是矢量图，代码编写出来的，放大不会失真，而且渲染速度快。字体图标使用时就跟字体一样，可以设置属性，
    例如 font-size、color 等等，非常方便，还有一个优点是生成的文件特别小。

6.按需加载代码，减少冗余代码



7.服务器端渲染

    客户端渲染: 获取 HTML 文件，根据需要下载 JavaScript 文件，运行文件，生成 DOM，再渲染。
    服务端渲染：服务端返回 HTML 文件，客户端只需解析 HTML。
    优点：首屏渲染快，SEO 好。缺点：配置麻烦，增加了服务器的计算压力。

8. 使用 Defer 加载JS

    尽量将 CSS 放在文件头部，JavaScript 文件放在底部
    所有放在 head 标签里的 CSS 和 JS 文件都会堵塞渲染。如果这些 CSS 和 JS 需要加载和解析很久的话，那么页面就空白了。
    所以 JS 文件要放在底部，等 HTML 解析完了再加载 JS 文件。

    那为什么 CSS 文件还要放在头部呢？
    因为先加载 HTML 再加载 CSS，会让用户第一时间看到的页面是没有样式的、“丑陋”的，为了避免这种情况发生，就要将 CSS 文件放在头部了。
    另外，JS 文件也不是不可以放在头部，只要给 script 标签加上 defer 属性就可以了，异步下载，延迟执行。

   异步加载js
    1、<script async src="script.js"></script>：给script标签加async属性，则加载和渲染后续文档元素的过程将和 script.js 的加载与执行并行进行（异步）
	2、<script defer src="script.js"></script>：给script标签加defer属性，加载后续文档元素的过程将和 script.js 的加载并行进行（异步），但是 script.js 的执行要在所有元素解析完成之后，DOMContentLoaded 事件触发之前完成
	3、动态创建script标签：等到DOMContentLoaded 事件触发时，生成一个script标签，渲染到页面上上
	4、setTimeout定时器延迟代码执行



9. 静态资源使用 CDN

    用户与服务器的物理距离对响应时间也有影响。把内容部署在多个地理位置分散的服务器上能让用户更快地载入页面, 
    CDN就是为了解决这一问题，在多个位置部署服务器，让用户离服务器更近，从而缩短请求时间。

10. 图片优化
    雪碧图
    图片懒加载   <img original-src="" loading="lazy" />






*/



/*
 --------------------------------------运行时优化------------------------------------
1. 减少重绘与重排

    有前端经验的开发者对这个概念一定不会陌生，浏览器下载完页面需要的所有资源后， 就开始渲染页面，主要经历这5个过程：
    解析HTML生成DOM树
    解析CSS生成CSSOM规则树
    将DOM树与CSSOM规则树合并生成Render(渲染)树
    遍历Render(渲染)树开始布局， 计算每一个节点的位置大小信息
    将渲染树每个节点绘制到屏幕上


    重排
    当改变DOM元素位置或者大小时， 会导致浏览器重新生成Render树， 这个过程叫重排
    重绘
    当重新生成渲染树后， 将要将渲染树每个节点绘制到屏幕， 这个过程叫重绘。
    重排触发时机
    重排发生后的根本原理就是元素的几何属性发生改变， 所以从能够改变几何属性的角度入手：
        添加|删除可见的DOM元素
        元素位置发生改变
        元素本省的尺寸发生改变
        内容变化
        页面渲染器初始化
        浏览器窗口大小发生改变
    二者关系：重排会导致重绘， 但是重绘不会导致重排

    避免 table 布局 (可能很小的一个改动会造成整个table重新布局)
    分离读写操作
    集中样式改变
    position属性为absolute或fixed

    实现虚拟列表 (vue-virtual-scroll-list)
    web-workers
    事件委托

    flex布局
    
*/




/*
 --------------------------------------事件------------------------------------

微任务
1. Promise.then
2. Object.observe
3. MutaionObserver
4. process.nextTick

宏任务
1. script(整体代码)
2. setTimeout
3. setInterval
4. I/O
5. postMessage
6. MessageChannel

微任务和宏任务的执行顺序是先执行同步任务，先执行同步后异步，异步分为宏任务和微任务两种，
异步遇到微任务先执行微任务，执行完后如果没有微任务，就执行下一个宏任务。
*/




react Diff 讲解

https://segmentfault.com/a/1190000016741764?utm_source=tag-newest

promise
https://juejin.im/post/5aa742196fb9a028da7c3200

Tcp / http
https://juejin.im/post/5ad4094e6fb9a028d7011069




微信小程序

    
     WXML 模板和 WXSS 样式工作在渲染层， 渲染层的界面使用了 WebView 进行渲染；
     JS 脚本工作在逻辑层     逻辑层采用 JsCore 线程运行 JS 脚本

     
     两个线程:  渲染层 逻辑层  
    通过Native转发

    优缺点:

    相对于浏览器双线程模型
    1. 更加安全，因为微信小程序阻止开发者使用一些浏览器提供的一些功能，如操作DOM、动态执行脚本等
    2. 不用等待浏览器主线程去下载并解析 html，遇到 JS 脚本还会阻塞，影响视图渲染，造成白屏
    3. 缺点是双线程如果频繁的通信，操作 setDate 更新视图，对性能消耗特别严重，例如拖拽、滚动等


    View 层进行事件操作后，会通过 WeixinJSBridge 将数据传递到 Native 系统层。Native 
    系统层决定是否要用 native 处理，然后丢给逻辑层进行用户的逻辑代码处理。
    逻辑层处理后将数据通过 WeixinJSBridge 返给 View 层

    <webview partition="persist:simulator_1"></webview>
    <webview partition="persist:apservice_1"></webview>

    wcc 编译器负责将 wxml 编译成 js 文件
    wcsc 编译器负责将 wxss 文件编译成 js 文件
    xxx.wxvpkg 是不同版本的小程序基础库，主要包含小程序基础库 WAService 和 WAWebview，这块后续分析

    wcc的作用就是：

        执行 wcc 编译 wxml 生成相关页面注册代码，并记录标签的属性及其值（生成 JS 文件）
        这个文件主体是一个 $gwx() 函数，接收两个参数 path （页面 wxml 路径）和 global（顶层对象)


        wcsc 编译 wxss 得到一个 js 文件
        添加尺寸单位rpx转换，可根据屏幕宽度自适应
        提供 setCssToHead 方法将转换后的 css 内容添加到 header

        WAWebview：小程序视图层基础库，提供视图层基础能力
        WAService：小程序逻辑层基础库，提供逻辑层基础能力

        其中，WAWebview 最主要的几个部分：

            Foundation：基础模块(发布订阅、通信桥梁 ready 事件)
            WeixinJSBridge：消息通信模块（js 和 native 通讯） Webview 和 Service都有相同的一套
            exparser：组件系统模块，实现了一套自定义的组件模型，比如实现了 wx-view
            __virtualDOM__：虚拟 Dom 模块
            __webViewSDK__：WebView SDK 模块
            Reporter：日志上报模块(异常和性能统计数据)

        其中，WAService 最主要的几个部分：

            Foundation：基础模块
            WeixinJSBridge：消息通信模块(js 和 native 通讯) Webview 和 Service都有相同的一套
            WeixinNativeBuffer：原生缓冲区
            WeixinWorker：Worker 线程
            JSContext：JS Engine Context
            Protect：JS 保护的对象
            __subContextEngine__：提供 App、Page、Component、Behavior、getApp、getCurrentPages 等方法



微信扫码登录原理:

    用户打开网站的登录首页的时候，浏览器就会向对应网页服务器发送获取登录二维码的请求，服务器收到请求后，
    会随机生成一个 uuid，将这个 uuid 作为key值存入redis服务器，同时设置一个过期时间，
    一旦过期后，用户登录二维码需要进行刷新重新获取。

    将这个key值和公司的验证字符串合在一起，通过二维码生成接口，生成一个二维码的图片。然后，将二维码图片和 uuid 一起返回给用户浏览器

    由于手机端已经进行过了登录，在访问手机端的服务器的时候，参数中都会携带一个用户的token，
    手机端服务器可以从中解析到用户的 userId（这里从token中取值而不是手机端直接传userid是为了安全
    
    当用户打开网站后，网站后台根据微信 OAuth2.0 协议向微信开发平台请求授权登录，并传递事先在微信开发平台中审核通过的 AppID 和 AppSecrect 等参数
    微信开发平台对AppID等参数进行验证，并向网站后台返回二维码
    网站后台将二维码传送至网站前端进行显示


    服务器拿到 uuId 和 userId 后，将用户的userid作为value值存入redis中以uuid作为key的键值对中。

    网站后台接收到code，表明微信开发平台同意数据请求
    网站后台根据code参数，再加上AppID和AppSecret请求微信开发平台换取 access_token
    微信开发平台验证参数，并返回 access_token
    网站后台收到 access_token 后即可进行参数分析获得用户账号数据

    
    AppID：应用唯一标识，在微信开放平台提交应用审核通过后获得
    AppSecret：应用密钥，在微信开放平台提交应用审核通过后获得
    code：授权临时票据，第三方通过code进行获取access_token的时候需要用到，code的超时时间为10分钟，一个code只能成功换取一次access_token 即失效。code的临时性和一次性保障了微信授权登录的安全性。
    access_token：用户授权第三方应用发起接口调用的凭证

    整个过程从网站后台向微信开发平台请求授权登录开始，最终目的是为了获得 access_token。


chrome 调试妙用
    https://segmentfault.com/a/1190000041683548

低代码实现原理
    https://mp.weixin.qq.com/s/RhIgUNU7eyGlwhpFJOnHDQ

css 常用布局
    https://mp.weixin.qq.com/s/6pNcDBDqZzOJP46V6eZJeg

js 解析引擎
    https://mp.weixin.qq.com/s?__biz=MzAxODE4MTEzMA==&mid=2650098849&idx=2&sn=31d2e5f90d1c0d3a8cdc4b3734f718e0&chksm=83dbd1c4b4ac58d2ef1ace4832f3c2e043b08389a271935b3738fc9b45d26aee4ddef696df8b&token=1254686452&lang=zh_CN#rd



vue-后台管理-demo
	https://github.com/PanJiaChen/vue-element-admin/blob/master/README.zh-CN.md


附件上传
	https://github.com/Vanthink-UED/vue-core-image-upload

虚拟列表

	https://juejin.cn/post/6966179727329460232
	https://github.com/Akryum/vue-virtual-scroller


vue 骨架屏 简易版
	https://juejin.cn/post/6943020826627145735?utm_source=gold_browser_extension
	https://github.com/Gloomysunday28/vue-skeleton
源码架构
	https://juejin.cn/column/6960551178908205093


前端路由
	https://juejin.cn/post/7041716087334895623?utm_source=gold_browser_extension
	简易实现
	https://juejin.cn/post/6854573222231605256#heading-7


--progress --watch --colors --profile
	先解释一下这几个参数的含义

	–progress 构建进度
	–watch 实时监测
	–profile 编译过程中的步骤耗时时间


简历模板
	https://mp.weixin.qq.com/s?__biz=MzAxODE4MTEzMA==&mid=2650090035&idx=1&sn=99ee9cd5a52468b48d9a17d31752748c&chksm=83dbb756b4ac3e409bad1b8ae78502fb119d09dd29bee05d97118c0df55156bb43b55ac1ad15&scene=21#wechat_redirect



文档搜集  ☆☆
	https://github.com/qq449245884/xiaozhi


token 自动刷新方案
	https://segmentfault.com/a/1190000040850857


登录
	https://juejin.cn/post/6979941671324778526?utm_source=gold_browser_extension


模块化加载
	AMD
		// 定义没有依赖的模块
		define(function(){ return 模块 });
		​
		// 定义有依赖的模块
		define(['module1', 'module2'], function(m1, m2){ return 模块 });
		​
		// 引入使用模块
		require(['module1', 'module2'], function(m1, m2){ 使用m1/m2 });

	CommonJs 
		//module1.js
		moudle.exports = { value: 1 };
		​
		//module2.js
		var module1 = require('./module1');
		var value2 = module1.value + 2;
		module.exports ={ value: value2 };

	CMD 
		define((require, exports, module) => {
		  module.exports = {
			 fun1: () => {
		 	 	var $ = require('jquery'); // 执行 fun1 时，再加载
		  		return $('#test');
			  } 
		  };
		});


	UMD  兼容 AMD CommonJs
		((root, factory) => {
	 	if (typeof define === 'function' && define.amd) {
			 =//AMD
		 	define(['jquery'], factory);
		  } else if (typeof exports === 'object') {
		 	//CommonJS
		 	var $ = requie('jquery');
		 	module.exports = factory($);
		  } else {
		 //都不是，浏览器全局定义
		 	root.testModule = factory(root.jQuery);
		  }
		})(this, ($) => {
		 //do something...  这里是真正的函数体
		});


AST 概念
	https://juejin.cn/post/7006919355686453279
	https://juejin.cn/post/6844903668492435470

拖拽配置页面
	https://github.com/wangyuan389/mall-cook

配置form
	https://gitee.com/vdpadmin/variant-form

高清知识点图
	https://juejin.cn/post/6976157870014332935?utm_source=gold_browser_extension

table 拖拽排序
	https://gridmanager.lovejavascript.com/demo/index.html


linux 命令
	cd -1[2]  返回上个目录
	cd 或 cd ~  返回主目录
	command_1;command_2 命令并行
	command_1 && command_2  上一条名称执行成功才继续执行




replaceAll
正则表达式搜索值时，它必须是全局的; 不加g 就报错
'aabbcc'.replaceAll(/b/, '.');
TypeError: replaceAll must be called with a global RegExp


es7-12
	https://juejin.cn/post/7046217976176967711#heading-14

这些年前端框架的理解
	https://mp.weixin.qq.com/s/QnjXyfdN_DwWRGC7NBMtPw

input accept 属性
	<input type="file" accept=".jpg, .png">
	仅与 <input> 标记的文件类型一起使用。接受一种或多种文件类型的逗号分隔列表。要允许特定媒体类型的所有文件，请使用 accept="image/*"

	<input type="text" inputmode="url" />
	<input type="text" inputmode="email" />
	<input type="text" inputmode="numeric" />

	<input name="username" id="username" pattern="[A-Za-z0-9]+">
	required

	<a href="document.pdf" download>Download PDF</a>

	<p hidden>This text is hidden</p>

	<img src="https://cdn.mysite.com/media/image.jpg" loading="lazy">
	eager 是默认行为，lazy 用于延迟（也称为延迟加载）

	<img src="imageafound.png" onerror="this.onerror=null;this.src='imagenotfound.png';"/>

	// 允许在下载视频时添加要显示的图像
	<video src="https://cdn.mysite.com/media/video.mp4"poster="image.png"></video>

	播放器上显示音频/视频控件。
	<audio controls source src="track11.mp3"  type="audio/mpeg"></audio>


vue3.0 对比 vue2.x
	https://juejin.cn/post/7011372376969445413

前端常用工具
	https://mp.weixin.qq.com/s/kzMhW_sPzvH1AVlvVQf_iA


webpack 5
	https://juejin.cn/post/7031546400034947108

调试h5
	https://mp.weixin.qq.com/s/ccUQzUHfPSRQ9ct5lAqPiQ
	
promise 在v8
	https://juejin.cn/post/7055202073511460895

控制台获取 元素所有事件
	getEventListeners(document)


console 彩色
	// 1. 将css样式内容放入数组
	const styles = [
	  'color: green', 
	  'background: yellow', 
	  'font-size: 30px',
	  'border: 1px solid red',
	  'text-shadow: 2px 2px black',
	  'padding: 10px',
	].join(';'); 
	// 2. 利用join方法讲各项以分号连接成一串字符串
	// 3. 传入styles变量
	console.log('%cHello There', styles);

最小重绘
	批量修改dom的优化方案——使元素脱离文档流-对其应用多重改变-把元素带回文档

熟悉又陌生的函数
	https://mp.weixin.qq.com/s/EhBt8uJ29snUwqXT7KIm2Q

对象包含
Object EventTarget Node Element HTMLElement HTMLDivElement


loaders.css

微前端demo
https://github.com/wl-ui/wl-mfe

低代码平台 
vue 实现

https://github.com/wangyuan389/mall-cook


虚拟滚动列表
https://github.com/wensiyuanseven/lite-virtual-list.git

表单配置 生成
https://4ark.me/vue-fa-form/#/zh-cn/introduction/install




// ---------------------------------------- Git----------------------------------
恢复最近一次提交
git reset --soft HEAD^
	对于已经 push 的 commit，也可以使用该命令，
	不过再次 push 时，由于远程分支和本地分支有差异，
	需要强制推送 git push -f 来覆盖被 reset 的 commit

cherry-pick
	git cherry-pick commit1 commit2   一次转义多个提交
	commit1^..commit2   区间复制
	冲突解决: cherry-pick --continue
	放弃: git cherry-pick --abort   回到操作前的样式
	退出: git cherry-pick --quit    保留已经成功的commit

revert
	还原某次提交
	git revert commitId
	处理合并提交: git revert -m 1 <commitHash>       1指保留主分支代码
// --------------------------------------------------------------------------


JSON.stringify():
	函数应当返回JSON字符串中的value, 如下所示:

	如果返回一个 Number, 转换成相应的字符串作为属性值被添加入 JSON 字符串。
	如果返回一个 String, 该字符串作为属性值被添加入 JSON 字符串。
	如果返回一个 Boolean, "true" 或者 "false" 作为属性值被添加入 JSON 字符串。
	如果返回任何其他对象，该对象递归地序列化成 JSON 字符串，对每个属性调用 replacer 方法。除非该对象是一个函数，这种情况将不会被序列化成 JSON 字符串。
	如果返回 undefined，该属性值不会在 JSON 字符串中输出。
	
	function: 

	function replacer(key, value) {
	  if (typeof value === "string") {
	    return undefined;
	  }
	  return value;
	}

	var foo = {foundation: "Mozilla", model: "box", week: 45, transport: "car", month: 7};
	var jsonString = JSON.stringify(foo, replacer);
	// {"week":45,"month":7}
	
	Array:
	JSON.stringify(foo, ['week', 'month']);
	// '{"week":45,"month":7}', 只保留 “week” 和 “month” 属性值。









 /** adapter demo
     let response = { nickname: { a: { b: { c: ["c"] } } }, counts: 2 };
      let res = adapter(response, {
        name: "nickname.a.b.c",
        score: "counts"
      });
    */
    adapter(response, info) {
      return Object.keys(info).reduce((res, key) => {
        let keyArr = isString(info[key]) ? info[key].split(".") : [],
          len = keyArr.length;
        if (len > 1) {
          let i = -1,
            tmp = null;
          while (++i < len) {
            tmp = tmp ? tmp[keyArr[i]] : response[keyArr[i]];
            if (!tmp) break;
          }
          res[key] = tmp;
        } else {
          res[key] = isString(info[key]) ? response[info[key]] : unDef;
        }
        return res;
      }, {});



webpack
	speed-measure-webpack-plugin  速度分析
	webpack-bundle-analyzer			体积分析
	预编译资源  Dllplugin			
	缓存提升二次构建速度    
		babel-loader 开启缓存    
		terser-webpack-plugin 开启缓存
		cache-loader 或 hard-source-webpack-plugin 

    https://zhuanlan.zhihu.com/p/26710831  webpack 代码分割



npm run 命令  发生了什么
	为啥不直接执行对应的命令vue-cli-service serve  因为系统中没有存在 vue-cli-service serve 这条命令
	npm i 命令就会在 node_modules/.bin/ 目录中创建 对应的可执行文件  相当于执行(./node_modules/.bin/vue-cli-service serve)

	从 package-lock.json 中可知，当我们npm i 整个新建的vue项目的时候，npm 将 bin/vue-cli-service.js 作为 bin 声明了(npm install 时，npm 读到该配置后，就将该文件软链接到 ./node_modules/.bin 目录下，
    而 npm 还会自动把node_modules/.bin加入$PATH，
    这样就可以直接作为命令运行依赖程序和开发依赖程序，不用全局安装了)

	一般 bin文件夹下对应有3个文件
	# unix 系默认的可执行文件，必须输入完整文件名
	vue-cli-service

	# windows cmd 中默认的可执行文件，当我们不添加后缀名时，自动根据 pathext 查找文件
	vue-cli-service.cmd

	# Windows PowerShell 中可执行文件，可以跨平台
	vue-cli-service.ps1

	




 ---------------------------------------------- babel ------------------------------------------

 解析 源码解析为AST  词法分析 + 语法分析 babel/parser
 转换 旧AST转换到新AST 运用插件/预设中对AST节点增删改查操作 babel/traverse
 生成 根据AST生成源码 深度优先遍历AST生成转义后的源码  (babel/generator)

demo: 
	// 源码
const a = 1;

// AST（已简化）
{
    "type": "Program", // 程序根节点
    "comments": [],
    "sourceType": "module",
    "body": [
          {
 			"type": "VariableDeclaration", // 变量声明节点
 			"declarations": [
   				{
 					"type": "VariableDeclarator", // 变量符号
 					"id": {
     					"type": "Identifier",
     					"name": "a"
     				  },
 				"init": {
 					"type": "Literal", // 文本
 					"value": 1,
 				  }
 				}
            ],
 		"kind": "const"
 	  }
    ]
}



// demo
const a = 1;

// 词法分析的结果
[
    {
        "type": "Keyword",
        "value": "const"
    },
    {
        "type": "Identifier",
        "value": "a"
    },
    {
        "type": "Punctuator",
        "value": "="
    },
    {
        "type": "Numeric",
        "value": "1"
    },
    {
 			"type": "Punctuator",
 			"value": ";"
 	  }
]


 ---------------------------------------------- 低代码 ------------------------------------------

 难点:
 	问题1:拖拽过后怎么才能让当前被拖拽的这个组件贴着上一个组件呢？
	这个问题，只有我们拿到每个组件的高度就很容易解决了，假设，第一个组件，肯定要贴着最顶部的，那它的top就是0了，没什么好争辩的，第二组件的位置就是，第一个组件的高度，如果组件一高度时60,那组件二的top就是60，组件三的top就是前面的组件的高度相加就好，以此类推。

	问题2:拖拽放开后，怎么知道它在哪个位置呢？是第二还是三或者是第一呢？
	拿到当前被拖拽的组件放下后的clientY值，用这个值去代替之前位置y值，
	然后做一次排序，我们就可以知道它现在的位置了，最后渲染出来就好了。

	问题3:渲染可配置的属性是怎么解决key的唯一性呢？
	因为Form表单，封装后，我这边时要传人这样一段JSON去渲染视图的。
	例:[{          
		"type":"input",         
		"label": "名字",         
		"prop": "name",         
		"span": 12       
		},       
		{         
		"label": "年龄",         
		"prop": "age",         
		"span": 12,         
		"type":"select",         
		"options":[{"label":"test","value":"1"}]       
		}],
		因为属性区本来就是一个Form表单，如果之间这样渲染就会出现多个一个key值，比如会有多个type，多个label等这些一样的key,如果我们用者key拼接上prop键的值就可以解决唯一性。比如name_type,name_lable,age_type,age_label等。




//  ------------------------------------ 页面高度 ----------------------------------


当 clientHeight + scrollTop >= scrollHeight 时，表示已经抵达内容的底部了，可以加载更多内容。

scrollHeight：可以通过 document.documentElement.scrollHeight 、document.body.scrollHeight 获取;
clientHeight：可以通过window.innerHeight 、 document.documentElement.clientHeight 获取;
scrollTop：可以通过window.pageYOffset 、 document.documentElement.scrollTop 获取;




//  ------------------------------------vuex 源码解析----------------------------------


// ['cart']


// Module key值 runtime _children _rawModule state
{
	dispatch,
	commit,
	_modules: {
		root: Module {
			context,
			runtime,
			state,
			_children,
			_rawModule: 
		}
	},
	_action: [
		cart/actionName1: fn,
		cart/actionName2: fn,
	],
	_mutation: [
		cart/mutationName1: fn,
		cart/mutationName2: fn,
	],
	_subscribers: [
		cart/subscribersName1: fn,
		cart/subscribersName2: fn,
	],
	_wrappedGetters: [
		cart/getterName1: fn,
		cart/getterName2: fn,
	],
}





浏览器进程
https://segmentfault.com/a/1190000012925872
回流重绘
https://juejin.cn/post/6844903569087266823
浏览器缓存
https://juejin.cn/post/6844903593275817998
性能监测
https://juejin.cn/post/6919295789630455815



function to (promise, errorExt) {
	return promise
		.then(data => [null, data])
		.catch(err => {
			if(errorExt) {
				return [Object.assign({}, err, errorExt), undefined]
			}
			return [err, undefined]
		})
}



//  ------------------------------------ 防抖 节流 ----------------------------------
防抖- 只触发最后一次
节流- 每隔一段时间触发一次


const compose = (...fn) => value => {
  return fn.reduce((value, fn) => {
    return fn(value)
  }, value)
}


箭头函数与普通函数的区别？
	1、箭头函数不可作为构造函数，不能使用new
	2、箭头函数没有自己的this
	3、箭头函数没有arguments对象
	4、箭头函数没有原型对象



//  ------------------- 微前端 ---------------------------------

https://juejin.cn/post/7105958711445127176
https://juejin.cn/post/7067088168553545742?utm_source=gold_browser_extension#heading-17

具备以下几个核心价值：

技术栈无关： 主框架不限制接入应用的技术栈，微应用具备完全自主权
独立 开发 、独立部署： 微应用仓库独立，前后端可独立开发，部署完成后主框架自动完成同步更新
增量升级： 在面对各种复杂场景时，我们通常很难对一个已经存在的系统做全量的技术栈升级或重构，而微前端是一种非常好的实施渐进式重构的手段和策略
独立运行时： 每个微应用之间状态隔离，运行时状态不共享

技术亮点: 
	js Entry、html Entry、沙箱隔离、样式隔离、web Component、ESM、ModuleFederation

qiankun两个注册方法: 
	registerMicroApps(apps, lifeCycles?)
		适用于 route-based 场景，路由改变会帮我们自动注册微应用和销毁上一个微应用，对于不需要做缓存的应用来说，推荐使用这个方法
		import { registerMicroApps } from 'qiankun';

		registerMicroApps(
		  [
		    {
		      name: 'app1',
		      entry: '//localhost:8080',
		      container: '#container',
		      activeRule: '/react',
		      props: {
		        name: 'kuitos',
		      },
		    },
		    {
		      name: 'app2',
		      entry: '//localhost:8081',
		      container: '#container',
		      activeRule: '/vue',
		      props: {
		        name: 'Tom',
		      },
		    },
		  ],
		  {
		    beforeLoad: (app) => console.log('before load', app.name),
		    beforeMount: [(app) => console.log('before mount', app.name)],
		  },
		);

	loadMicroApp(app, configuration?)
		适用于需要手动 加载/卸载 一个微应用的场景
			// 手动加载微应用方法封装
		const loadMicroAppFn = (microApp) => {
		  const app = loadMicroApp(
		    {
		      ...microApp,
		      props: {
		        ...microApp.props,
		        // 下发给微应用的数据
		        microFn: (status) => setMicroStatus(status)
		      },
		    },
		    {
		      sandbox: true, // 只能保证单实例下的样式隔离，无法保证多个微应用共存
		      strictStyleIsolation: true ；// 表示开启严格的样式隔离模式。这种模式下 qiankun 会为每个微应用的容器包裹上一个 shadow dom 节点，从而确保微应用的样式不会对全局造成影响
		      singular: false,
		      // 指定部分特殊的动态加载的微应用资源（css/js) 不被 qiankun 劫持处理
		      excludeAssetFilter: (url) => {
		        return !!(url.indexOf("https://xxx.com/xxx") !== -1);
		      },

		    }
		  );
		  
		  return app;
		}

沙箱隔离和引入第三方资源资源
	qiankun 内部的沙箱主要是通过是否支持 window.Proxy 分为 LegacySandbox 和 SnapshotSandbox 两种

通讯
	props initGlobalState
	基座
		import { initGlobalState, MicroAppStateActions } from 'qiankun';

		// 初始化 state
		const actions: MicroAppStateActions = initGlobalState(state);

		actions.onGlobalStateChange((state, prev) => {
		  // state: 变更后的状态; prev 变更前的状态
		  console.log(state, prev);
		});
		actions.setGlobalState(state);
		actions.offGlobalStateChange();

	微应用
		// 从生命周期 mount 中获取通信方法，使用方式和 master 一致
		export function mount(props) {
		  props.onGlobalStateChange((state, prev) => {
		    // state: 变更后的状态; prev 变更前的状态
		    console.log(state, prev);
		  });

		  props.setGlobalState(state);
		}


//  -------------------------- vue打包优化 ----------------------------------

https://juejin.cn/post/7109762338953265160

npm run build --report 查看报告和分析打包bundle文件
speed-measure-webpack-plugin 分析 loader 和 plugin 的加载速度

webpack-bundle-analyzer 包 可以查看资源树


1. 关闭sourcemap
2. 关闭prefetch preload (vue-cli3 默认开启 prefetch(预加载模块)和 preload, 针对首屏可以关闭)
3. 路由懒加载
4. 组件按需加载
5. 提取公用代码 使用cdn加载
6. 不拆分css (vue-cli3 中默认会开启一个 css 分离插件，ExtractTextPlugin)


//  ---------------------------- 面试经 -------------------------------

https://juejin.cn/post/6844904093425598471

https://juejin.cn/post/7061588533214969892

https://juejin.cn/post/7064740689178787871?utm_source=gold_browser_extension

vue面试题:
https://juejin.cn/post/6961222829979697165?utm_source=gold_browser_extension


https://segmentfault.com/a/1190000041560515

https://juejin.cn/post/6844903928442667015  (阿里面)
https://juejin.cn/post/7035905352746926116?utm_source=gold_browser_extension



大全 
https://segmentfault.com/a/1190000040797816


//  ------------------------- 浏览器渲染 --------------------------------------------

浏览器使用流式布局模型 (Flow Based Layout)
浏览器会把HTML解析成DOM，把CSS解析成CSSOM，DOM和CSSOM合并就产生了Render Tree
有了RenderTree就能知道所有节点的样式，计算节点在页面上的大小和位置，把节点绘制到页面上
由于浏览器使用流式布局，对Render Tree的计算通常只需要遍历一次就可以完成，但table及其内部元素除外，通常需要多次计算且要花费3倍于同等元素的时间，这也是为什么要避免使用table布局的原因之一

浏览器渲染过程如下：

解析HTML，生成DOM树
解析CSS，生成CSSOM树
将DOM树和CSSOM树结合，生成渲染树(Render Tree)
Layout(回流)：根据生成的渲染树，进行回流(Layout)，得到节点的几何信息（位置，大小）
Painting(重绘)：根据渲染树以及回流得到的几何信息，得到节点的绝对像素
Display：将像素发送给GPU，展示在页面上。（这一步其实还有很多内容，比如会在GPU将多个合成层合并为同一个层，并展示在页面中。而css3硬件加速的原理则是新建合成层，这里我们不展开，之后有机会会写一篇博客）




//  ---------------------------- 回流重绘 --------------------------------------------
何时触发回流和重绘
何时发生回流：

添加或删除可见的DOM元素
元素的位置发生变化
元素的尺寸发生变化（包括外边距、内边框、边框大小、高度和宽度等）
内容发生变化，比如文本变化或图片被另一个不同尺寸的图片所替代。
页面一开始渲染的时候（这肯定避免不了）
浏览器的窗口尺寸变化（因为回流是根据视口的大小来计算元素的位置和大小的）

何时发生重绘（回流一定会触发重绘）：
当页面中元素样式的改变并不影响它在文档流中的位置时（例如：color、background-color、visibility等），
浏览器会将新样式赋予给元素并重新绘制它，这个过程称为重绘。
有时即使仅仅回流一个单一的元素，它的父元素以及任何跟随它的元素也会产生回流。现代浏览器会对频繁的回流或重绘操作进行优化，
浏览器会维护一个队列，把所有引起回流和重绘的操作放入队列中，如果队列中的任务数量或者时间间隔达到一个阈值的，浏览器就会将队列清空，
进行一次批处理，这样可以把多次回流和重绘变成一次。你访问以下属性或方法时，浏览器会立刻清空队列：

clientWidth、clientHeight、clientTop、clientLeft
offsetWidth、offsetHeight、offsetTop、offsetLeft
scrollWidth、scrollHeight、scrollTop、scrollLeft
width、height
getComputedStyle()
getBoundingClientRect()

以上属性和方法都需要返回最新的布局信息，因此浏览器不得不清空队列，触发回流重绘来返回正确的值。因此，我们在修改样式的时候，
**最好避免使用上面列出的属性，他们都会刷新渲染队列。**如果要使用它们，最好将值缓存起来。


CSS：

    避免使用table布局。
    尽可能在DOM树的最末端改变class。
    避免设置多层内联样式。
    将动画效果应用到position属性为absolute或fixed的元素上
    避免使用CSS表达式（例如：calc()）
    CSS3硬件加速（GPU加速） transform

JavaScript：

    避免频繁操作样式，最好一次性重写style属性，或者将样式列表定义为class并一次性更改class属性
    避免频繁操作DOM，创建一个documentFragment，在它上面应用所有DOM操作，最后再把它添加到文档中
    也可以先为元素设置display: none，操作结束后再把它显示出来。因为在display属性为none的元素上进行的DOM操作不会引发回流和重绘
    避免频繁读取会引发回流/重绘的属性，如果确实需要多次使用，就用一个变量缓存起来
    对具有复杂动画的元素使用绝对定位，使它脱离文档流，否则会引起父元素及后续元素频繁回流





//  ------------------------- ES5 和 ES6 继承的区别 --------------------------------------------
ES5 
    继承使用借助构造函数实现，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面。
ES6 
    继承机制完全不同，实质是先创造父类的实例对象this（所以必须先调用super方法），
    然后再用子类的构造函数修改this。

ES6 在继承的语法上不仅继承了类的原型对象，还继承了类的静态属性和静态方法

//  ----------------------- vue 实例化 --------------------------------------------

初始化流程：

创建 Vue 实例对象
    init过程会初始化生命周期，初始化事件中心，初始化渲染、执行beforeCreate周期函数、初始化 data、props、computed、watcher、执行created周期函数等。
    初始化后，调用$mount方法对Vue实例进行挂载（挂载的核心过程包括模板编译、渲染以及更新三个过程）。
    如果没有在 Vue 实例上定义render方法而是定义了template，那么需要经历编译阶段。需要先将template 字符串编译成 render function，template 字符串编译步骤如下 ：

    parse正则解析template字符串形成 AST（抽象语法树，是源代码的抽象语法结构的树状表现形式）
    optimize标记静态节点跳过 DIFF 算法（DIFF 算法是逐层进行比对，只有同层级的节点进行比对，因此时间的复杂度只有 O(n)。如果对于时间复杂度不是很清晰的，可以查看我写的文章ziyi2/algorithms-javascript/渐进记号）
    generate将 AST 转化成render function字符串


    编译成render function 后，调用$mount的mountComponent方法，先执行beforeMount钩子函数，然后核心是实例化一个渲染Watcher，在它的回调函数（初始化的时候执行，以及组件实例中监测到数据发生变化时执行）中调用updateComponent方法（此方法调用render方法生成虚拟 Node，最终调用update方法更新 DOM）。
    调用render方法将render function渲染成虚拟的Node（真正的 DOM 元素是非常庞大的，因为浏览器的标准就把 DOM 设计的非常复杂。如果频繁的去做 DOM 更新，会产生一定的性能问题，而 Virtual DOM 就是用一个原生的 JavaScript 对象去描述一个 DOM 节点，所以它比创建一个 DOM 的代价要小很多，而且修改属性也很轻松，还可以做到跨平台兼容），render方法的第一个参数是createElement(或者说是h函数)，这个在官方文档也有说明。
    生成虚拟 DOM 树后，需要将虚拟 DOM 树转化成真实的 DOM 节点，此时需要调用update方法，update方法又会调用pacth方法把虚拟 DOM 转换成真正的 DOM 节点。需要注意在图中忽略了新建真实 DOM 的情况（如果没有旧的虚拟 Node，那么可以直接通过createElm创建真实 DOM 节点），这里重点分析在已有虚拟 Node 的情况下，会通过sameVnode判断当前需要更新的 Node节点是否和旧的 Node 节点相同（例如我们设置的key属性发生了变化，那么节点显然不同），如果节点不同那么将旧节点采用新节点替换即可，如果相同且存在子节点，需要调用patchVNode 方法执行 DIFF 算法更新 DOM，从而提升   DOM 操作的性能。

    需要注意在初始化阶段，没有详细描述数据的响应式过程，这个在响应式流程里做说明。

响应式流程：

    在init的时候会利用Object.defineProperty方法（不兼容 IE8）监听Vue实例的响应式数据的变化从而实现数据劫持能力（利用了 JavaScript 对象的访问器属性get和set，在未来的 Vue3 中会使用 ES6 的Proxy来优化响应式原理）。在初始化流程中的编译阶段，当render function被渲染的时候，会读取Vue实例中和视图相关的响应式数据，此时会触发getter函数进行依赖收集（将观察者Watcher对象存放到当前闭包的订阅者Dep的subs中），此时的数据劫持功能和观察者模式就实现了一个 MVVM 模式中的  Binder，之后就是正常的渲染和更新流程。
    当数据发生变化或者视图导致的数据发生了变化时，会触发数据劫持的setter函数，setter会通知初始化依赖收集中的Dep中的和视图相应的Watcher，告知需要重新渲染视图，Wather就会再次通过update方法来更新视图。

    可以发现只要视图中添加监听事件，自动变更对应的数据变化时，就可以实现数据和视图的双向绑定了。

//  ---------------------- vue --------------------------------------------
v-html 防xxs
    https://juejin.cn/post/6844903918518927367


//  ----------------------- HTTP/HTTPS协议 --------------------------------------------


http: 是一个客户端和服务端请求和应答的标准 用于从www服务器传输超文本到本地浏览器传输协议
https: 是一安全为目标的HTTP通道,即HTTP下加入SSL(Secure Sockets Layer: 安全加密协议层)层进行加密, 作用是:建立一个信息安全通道,确保数据的传输和网站的真实性


http 和 https 的区别及优缺点？

    http 是超文本传输协议，信息是明文传输，HTTPS 协议要比 http 协议安全，https 是具有安全性的 ssl 加密传输协议，可防止数据在传输过程中被窃取、改变，确保数据的完整性(当然这种安全性并非绝对的，
        对于更深入的 Web 安全问题，此处暂且不表)。
    http 协议的默认端口为 80，https 的默认端口为 443。
    http 的连接很简单，是无状态的。https 握手阶段比较费时，会使页面加载时间延长 50%，增加 10%~20%的耗电。
    https 缓存不如 http 高效，会增加数据开销。
    Https 协议需要 ca(Certificate Authority, 包含公钥和私钥) 证书，费用较高，功能越强大的证书费用越高。
    SSL 证书需要绑定 IP，不能再同一个 IP 上绑定多个域名，IPV4 资源支持不了这种消耗。

客户端在使用 HTTPS 方式与 Web 服务器通信时有以下几个步骤：

    客户端使用 https url 访问服务器，则要求 web 服务器建立 ssl 链接。
    web 服务器接收到客户端的请求之后，会将网站的证书（证书中包含了公钥），传输给客户端。
    客户端和 web 服务器端开始协商 SSL 链接的安全等级，也就是加密等级。
    客户端浏览器通过双方协商一致的安全等级，建立会话密钥，然后通过网站的公钥来加密会话密钥，并传送给网站。
    web 服务器通过自己的私钥解密出会话密钥。
    web 服务器通过会话密钥加密与客户端之间的通信。


HTTP1.1 的缺陷
    高延迟 — 队头阻塞(Head-Of-Line Blocking)
    无状态特性 — 阻碍交互  (header携带内容过大, 增加传输成本)
    明文传输 — 不安全性
    不支持服务端推送

HTTP/2
    二进制传输
        TCP协议的部分特性挪到了应用层, 把原来的"Header+Body"的消息"打散"为数个小片的二进制"帧"(Frame)
        HTTP/2 中，同域名下所有通信都在单个连接上完成，该连接可以承载任意数量的双向数据流。每个数据流都以消息的形式发送，而消息又由一个或多个帧组成
    header压缩
        在客户端和服务器端使用“首部表”来跟踪和存储之前发送的键-值对，对于相同的数据，不再通过每次请求和响应发送；
        首部表在HTTP/2的连接存续期内始终存在，由客户端和服务器共同渐进地更新;
        每个新的首部键-值对要么被追加到当前表的末尾，要么替换表中之前的值

        请求一发送了所有的头部字段，第二个请求则只需要发送差异数据，这样可以减少冗余数据，降低开销

    多路复用
        同个域名只需要占用一个 TCP 连接, 使用一个连接并行发送多个请求和响应,
        -这样整个页面资源的下载过程只需要一次慢启动，同时也避免了多个TCP连接竞争带宽所带来的问题
        并行交错地发送多个请求/响应，请求/响应之间互不影响
        在HTTP/2中，每个请求都可以带一个31bit的优先值，0表示最高优先级， 数值越大优先级越低

    serve push 也叫  cache push
        如果服务端推送的资源已经被浏览器缓存过，浏览器可以通过发送RST_STREAM帧来拒收(可以在不断开连接的前提下取消某个 request 的 stream，表现更好)

    提高安全性
        “h2"表示加密的HTTP/2，“h2c”表示明文的HTTP/2。

RTT（Round-Trip Time）:
    往返时延。表示从发送端发送数据开始，到发送端收到来自接收端的确认（接收端收到数据后便立即发送确认），总共经历的时延


HTTP/2 缺点:
    TCP 以及 TCP(Transmission Control Protocol, 传输控制协议)+TLS 建立连接的延时
        HTTP/2都是使用TCP协议来传输的，而如果使用HTTPS的话，还需要使用TLS协议进行安全传输，而使用TLS也需要一个握手过程，
        这样就需要有两个握手延迟过程:
            ①在建立TCP连接的时候，需要和服务器进行三次握手来确认连接成功，即需要消耗完 1.5 个 RTT 之后才能进行数据传输。
            ②进行TLS连接，TLS有两个版本——TLS1.2和TLS1.3，每个版本建立连接所花的时间不同，大致是需要1~2个RTT。
            总之，在传输数据之前，我们需要花掉 3～4 个 RTT。

    TCP 的队头阻塞并没有彻底解决
        当出现了丢包时，HTTP/2 的表现反倒不如 HTTP/1 了。
        因为TCP为了保证可靠传输，有个特别的“丢包重传”机制，丢失的包必须要等待重新传输确认，
        HTTP/2出现丢包时，整个 TCP 都要开始等待重传，那么就会阻塞该TCP连接中的所有请求（如下图）。
        而对于 HTTP/1.1 来说，可以开启多个 TCP 连接，出现这种情况反到只会影响其中一个连接，剩余的 TCP 连接还可以正常传输数据

    多路复用导致服务器压力上升
        多路复用没有限制同时请求数。请求的平均数量与往常相同，但实际会有许多请求的短暂爆发，导致瞬时 QPS 暴增

    多路复用容易 Timeout
        大批量的请求同时发送，由于 HTTP2 连接内存在多个并行的流，而网络带宽和服务器资源有限，每个流的资源会被稀释，
        虽然它们开始时间相差更短，但却都可能超时。


TCP三次握手
        syn 同步包  服务器 SYN+ack 表示接收到信息  最后客户端 ack 确认
    第一次握手：
        建立连接时，客户端发送syn包（syn=j）到服务器，并进入SYN_SENT状态，等待服务器确认；
        SYN：同步序列编号（Synchronize Sequence Numbers）。
    第二次握手：
        服务器收到syn包并确认客户的SYN（ack=j+1），同时也发送一个自己的SYN包（syn=k），
        即SYN+ACK包，此时服务器进入SYN_RECV状态；
    第三次握手：
        客户端收到服务器的SYN+ACK包，向服务器发送确认包ACK(ack=k+1），
        此包发送完毕，客户端和服务器进入ESTABLISHED（TCP连接成功）状态，完成三次握手。


TCP 四次挥手

    1)客户端进程发出连接释放报文，并且停止发送数据。释放数据报文首部，FIN=1，其序列号为seq=u（等于前面已经传送过来的数据的最后一个字节的序号加1），此时，客户端进入FIN-WAIT-1（终止等待1）状态。 TCP规定，FIN报文段即使不携带数据，也要消耗一个序号。

    2）服务器收到连接释放报文，发出确认报文，ACK=1，ack=u+1，并且带上自己的序列号seq=v，此时，服务端就进入了CLOSE-WAIT（关闭等待）状态。TCP服务器通知高层的应用进程，客户端向服务器的方向就释放了，这时候处于半关闭状态，即客户端已经没有数据要发送了，但是服务器若发送数据，客户端依然要接受。这个状态还要持续一段时间，也就是整个CLOSE-WAIT状态持续的时间。
    3）客户端收到服务器的确认请求后，此时，客户端就进入FIN-WAIT-2（终止等待2）状态，等待服务器发送连接释放报文（在这之前还需要接受服务器发送的最 后的数据）。
    4）服务器将最后的数据发送完毕后，就向客户端发送连接释放报文，FIN=1，ack=u+1，由于在半关闭状态，服务器很可能又发送了一些数据，假定此时的序列号为seq=w，此时，服务器就进入了LAST-ACK（最后确认）状态，等待客户端的确认。
    5）客户端收到服务器的连接释放报文后，必须发出确认，ACK=1，ack=w+1，而自己的序列号是seq=u+1，此时，客户端就进入了TIME-WAIT（时间等待）状态。注意此时TCP连接还没有释放，必须经过2∗∗MSL（最长报文段寿命）的时间后，当客户端撤销相应的TCB后，才进入CLOSED状态。
    6）服务器只要收到了客户端发出的确认，立即进入CLOSED状态。同样，撤销TCB后，就结束了这次的TCP连接。可以看到，服务器结束TCP连接的时间要比客户端早一些。

TCP/IP / 如何保证数据包传输的有序可靠？
    对字节流分段并进行编号然后通过 ACK 回复和超时重发这两个机制来保证。
    （1）为了保证数据包的可靠传递，发送方必须把已发送的数据包保留在缓冲区；
    （2）并为每个已发送的数据包启动一个超时定时器；
    （3）如在定时器超时之前收到了对方发来的应答信息（可能是对本包的应答，也可以是对本包后续包的应答），则释放该数据包占用的缓冲区;
    （4）否则，重传该数据包，直到收到应答或重传次数超过规定的最大次数为止。
    （5）接收方收到数据包后，先进行CRC校验，如果正确则把数据交给上层协议，然后给发送方发送一个累计应答包，表明该数据已收到，如果接收方正好也有数据要发给发送方，应答包也可方在数据包中捎带过去。


TCP(Transmission Control Protocol)和UDP(User Datagram Protocol)的区别

    TCP是面向链接的，而UDP是面向无连接的。
    TCP仅支持单播传输，UDP 提供了单播，多播，广播的功能。
    TCP的三次握手保证了连接的可靠性; UDP是无连接的、不可靠的一种数据传输协议，首先不可靠性体现在无连接上，通信都不需要建立连接，对接收到的数据也不发送确认信号，发送端不知道数据是否会正确接收。
    UDP的头部开销比TCP的更小，数据传输速率更高，实时性更好。


```javascript
HTTP 跨域问题
    跨域，是指浏览器不能执行其他网站的脚本。它是由浏览器的同源策略造成的。
    同源策略,是浏览器对 JavaScript 实施的安全限制，只要协议、域名、端口有任何一个不同，都被当作是不同的域。
    跨域原理，即是通过各种方式，避开浏览器的安全限制。

    jsonp script src=""
        只可以使用 GET 方式提交, 不好调试,在调用失败的时候不会返回任何状态码, jsonp的服务存在页面注入漏洞
    document.domain   基础域名相同 子域名不同
    window.name 利用在一个浏览器窗口内，载入所有的域名都是共享一个window.name
    window.postMessage() 
    proxy代理  跨域问题归根结底源于同源策略, 而同源策略只存在于浏览器
    websocket
    CORS
        CORS(Cross-origin resource sharing)跨域资源共享 服务器设置对CORS的支持原理：
            服务器设置Access-Control-Allow-Origin HTTP响应头之后，浏览器将会允许跨域请求

        CORS请求分成两类：简单请求和非简单请求

        凡是同时满足以下两种情况的就是简单请求，反之则非简单请求，浏览器对这两种请求的处理不一样

        请求方法是以下方三种方法之一
            HEAD
            GET
            POST

        HTTP的头信息不超出以下几种字段
            Accept
            Accept-Language
            Content-Language
            Last-Event-ID
            Content-Type：只限于三个值 application/x-www-form-urlencoded、multipart/form-data、text/plain

        浏览器之间发送CORS请求，具体来说就是在头信息中，增加一个origin字段


        非简单请求, 服务器 预检 HTTP头信息, "预检"使用的请求方法是 OPTIONS , 表示这个请求使用来询问的,
        如果浏览器否定了"预检"请求,会返回一个正常的HTTP回应,但是没有任何CORS的头相关信息,这是浏览器就认定,服务器不允许此次访问,从而抛出错误
        预检之后的请求
        当预检请求通过之后发出正经的HTTP请求,还有一个就是一旦通过了预检请求就会,请求的时候就会跟简单请求,会有一个Origin头信息字段。

        通过预检之后的,浏览器发出发请求
        PUT /cors HTTP/1.1
        Origin: http://api.bob.com // 通过预检之后的请求,会自动带上Origin字段
        Host: api.alice.com
        X-Custom-Header: value
        Accept-Language: en-US
        Connection: keep-alive
        User-Agent: Mozilla/5.0...


```

//  ----------------------  URL到页面加载的全过程  --------------------------------------------
1. 首先在浏览器中输入URL

2. 查找缓存：浏览器先查看浏览器缓存-系统缓存-路由缓存中是否有该地址页面，如果有则显示页面内容。如果没有则进行下一步。

    浏览器缓存：浏览器会记录DNS一段时间，因此，只是第一个地方解析DNS请求；
    操作系统缓存:如果在浏览器缓存中不包含这个记录，则会使系统调用操作系统， 获取操作系统的记录(保存最近的DNS查询缓存)；
    路由器缓存：如果上述两个步骤均不能成功获取DNS记录，继续搜索路由器缓存；
    ISP缓存：若上述均失败，继续向ISP搜索。

3. DNS域名解析：浏览器向DNS服务器发起请求，解析该URL中的域名对应的IP地址。DNS服务器是基于UDP的，因此会用到UDP协议。

4. 建立TCP连接：解析出IP地址后，根据IP地址和默认80端口，和服务器建立TCP连接

5. 发起HTTP请求：浏览器发起读取文件的HTTP请求，，该请求报文作为TCP三次握手的第三次数据发送给服务器

6. 服务器响应请求并返回结果：服务器对浏览器请求做出响应，并把对应的html文件发送给浏览器

7, 关闭TCP连接：通过四次挥手释放TCP连接

8. 浏览器渲染：客户端（浏览器）解析HTML内容并渲染出来，浏览器接收到数据包后的解析流程为：

    构建DOM树：词法分析然后解析成DOM树（dom tree），是由dom元素及属性节点组成，树的根是document对象
    构建CSS规则树：生成CSS规则树（CSS Rule Tree）
    构建render树：Web浏览器将DOM和CSSOM结合，并构建出渲染树（render tree）
    布局（Layout）：计算出每个节点在屏幕中的位置
    绘制（Painting）：即遍历render树，并使用UI后端层绘制每个节点。

9.JS引擎解析过程：调用JS引擎执行JS代码（JS的解释阶段，预处理阶段，执行阶段生成执行上下文，VO，作用域链、回收机制等等）

    创建window对象：window对象也叫全局执行环境，当页面产生时就被创建，所有的全局变量和函数都属于window的属性和方法，而DOM Tree也会映射在window的doucment对象上。当关闭网页或者关闭浏览器时，全局执行环境会被销毁。

    加载文件：完成js引擎分析它的语法与词法是否合法，如果合法进入预编译

    预编译：在预编译的过程中，浏览器会寻找全局变量声明，把它作为window的属性加入到window对象中，并给变量赋值为'undefined'；寻找全局函数声明，把它作为window的方法加入到window对象中，并将函数体赋值给他（匿名函数是不参与预编译的，因为它是变量）。而变量提升作为不合理的地方在ES6中已经解决了，函数提升还存在。

    解释执行：执行到变量就赋值，如果变量没有被定义，也就没有被预编译直接赋值，在ES5非严格模式下这个变量会成为window的一个属性，也就是成为全局变量。string、int这样的值就是直接把值放在变量的存储空间里，object对象就是把指针指向变量的存储空间。函数执行，就将函数的环境推入一个环境的栈中，执行完成后再弹出，控制权交还给之前的环境。JS作用域其实就是这样的执行流机制实现的。



//  ----------------------------------------------- 如何避免重绘或者重排  --------------------------------------------


集中改变样式，不要一条一条地修改 DOM 的样式。

不要把 DOM 结点的属性值放在循环里当成循环里的变量。

为动画的 HTML 元件使用 fixed 或 absoult 的 position，那么修改他们的 CSS 是不会 reflow 的。

不使用 table 布局。因为可能很小的一个小改动会造成整个 table 的重新布局。

尽量只修改position：absolute或fixed元素，对其他元素影响不大

动画开始GPU加速，translate使用3D变化

提升为合成层
    将元素提升为合成层有以下优点：

        合成层的位图，会交由 GPU 合成，比 CPU 处理要快
        当需要 repaint 时，只需要 repaint 本身，不会影响到其他的层
        对于 transform 和 opacity 效果，不会触发 layout 和 paint

    提升合成层的最好方式是使用 CSS 的 will-change 属性：
    #target {
      will-change: transform;
    }

//  ----------------------------------------------- 304过程 --------------------------------------------
a. 浏览器请求资源时首先命中资源的Expires 和 Cache-Control，Expires 受限于本地时间，如果修改了本地时间，可能会造成缓存失效，可以通过Cache-control: max-age指定最大生命周期，状态仍然返回200，但不会请求数据，在浏览器中能明显看到from cache字样。

b. 强缓存失效，进入协商缓存阶段，首先验证ETagETag可以保证每一个资源是唯一的，资源变化都会导致ETag变化。服务器根据客户端上送的If-None-Match值来判断是否命中缓存。

c. 协商缓存Last-Modify/If-Modify-Since阶段，客户端第一次请求资源时，服务服返回的header中会加上Last-Modify，Last-modify是一个时间标识该资源的最后修改时间。再次请求该资源时，request的请求头中会包含If-Modify-Since，该值为缓存之前返回的Last-Modify。服务器收到If-Modify-Since后，根据资源的最后修改时间判断是否命中缓存。


//  ---------------------------------------  浏览器的缓存机制 强制缓存 && 协商缓存 --------------------------------------------
https://juejin.cn/post/6992843117963509791

根据是否需要向服务器重新发起HTTP请求将缓存过程分为两个部分，分别是强制缓存和协商缓存。

强制缓存
    强制缓存就是向浏览器缓存查找该请求结果，并根据该结果的缓存规则来决定是否使用该缓存结果的过程。当浏览器向服务器发起请求时，服务器会将缓存规则放入HTTP响应报文的HTTP头中和请求结果一起返回给浏览器，控制强制缓存的字段分别是 Expires 和 Cache-Control，其中Cache-Control优先级比Expires高。
    强制缓存的情况主要有三种(暂不分析协商缓存过程)，如下：

        1. 不存在该缓存结果和缓存标识，强制缓存失效，则直接向服务器发起请求（跟第一次发起请求一致）。
        2. 存在该缓存结果和缓存标识，但该结果已失效，强制缓存失效，则使用协商缓存。
        3. 存在该缓存结果和缓存标识，且该结果尚未失效，强制缓存生效，直接返回该结果


协商缓存
    协商缓存就是强制缓存失效后，浏览器携带缓存标识向服务器发起请求，由服务器根据缓存标识决定是否使用缓存的过程，同样，协商缓存的标识也是在响应报文的HTTP头中和请求结果一起返回给浏览器的，控制协商缓存的字段分别有：Last-Modified / If-Modified-Since 和 Etag / If-None-Match，其中Etag / If-None-Match的优先级比Last-Modified / If-Modified-Since高。协商缓存主要有以下两种情况：

        1.协商缓存生效，返回304
        2.协商缓存失效，返回200和请求结果结果



//  ----------------------------------------------- this  --------------------------------------------

1. 作为普通函数执行时，this指向window。
2. 当函数作为对象的方法被调用时，this就会指向该对象。
3. 构造器调用，this指向返回的这个对象。
4. 箭头函数 箭头函数的this绑定看的是this所在函数定义在哪个对象下，就绑定哪个对象。如果有嵌套的情况，则this绑定到最近的一层对象上。
5. 基于Function.prototype上的 apply 、 call 和 bind 调用模式，这三个方法都可以显示的指定调用函数的 this 指向。apply接收参数的是数组，call接受参数列表，`` bind方法通过传入一个对象，返回一个 this 绑定了传入对象的新函数。这个函数的 this指向除了使用new `时会被改变，其他情况下都不会改变。若为空默认是指向全局对象window。



//  ----------------------------------------------- 微前端实践 --------------------------------------------
https://juejin.cn/post/7114589692560932878

//  -----------------------------------------------  --------------------------------------------
//  -----------------------------------------------  --------------------------------------------
//  -----------------------------------------------  --------------------------------------------
//  -----------------------------------------------  --------------------------------------------
//  -----------------------------------------------  --------------------------------------------
//  -----------------------------------------------  --------------------------------------------
//  -----------------------------------------------  --------------------------------------------
//  -----------------------------------------------  --------------------------------------------
//  -----------------------------------------------  --------------------------------------------
//  -----------------------------------------------  --------------------------------------------
//  -----------------------------------------------  --------------------------------------------
//  -----------------------------------------------  --------------------------------------------
//  -----------------------------------------------  --------------------------------------------
//  -----------------------------------------------  --------------------------------------------
//  -----------------------------------------------  --------------------------------------------
//  -----------------------------------------------  --------------------------------------------
//  -----------------------------------------------  --------------------------------------------
//  -----------------------------------------------  --------------------------------------------
//  -----------------------------------------------  --------------------------------------------
//  -----------------------------------------------  --------------------------------------------
//  -----------------------------------------------  --------------------------------------------


 



















































































































































































































































































































































































































































































































































































































































