
### webpack3升级到5
[参考](https://juejin.cn/post/7083146700939853832?from=search-suggest)

删除 resolve.alias或resolve.modules

loader版本升级

新增 mode 设置 mode = 'development'

升级所有使用到的 plugin 和 loader 为最新的可用版本。

    webpack-dev-server 2.11.5 -> 4.15.1
    webpack-merge 4.1.0 -> 5.9.0
    css-loader 0.28.0 -> 6.8.1
    friendly-errors-webpack-plugin 1.6.1 -> 1.7.0
    html-webpack-plugin	2.30.1 -> 5.5.3
    style-loader	1.2.1 -> 3.3.3
    vue-loader	13.3.0 -> 15.10.1
    vue-template-compiler	2.6.10	-> 2.7.14

移除所有废弃的 plugin 和 loader。

    url-loader
    file-loader
    optimize-css-assets-webpack-plugin
    extract-text-webpack-plugin
    vue-style-loader

新增所有使用到的 plugin 和 loader。

    clean-webpack-plugin 4.0.0
    cross-env 7.0.3
    css-minimizer-webpack-plugin 5.0.1
    speed-measure-webpack-plugin 1.5.0
    mini-css-extract-plugin 7.0.3

配置 rules

    引入 vue-loader，移除 vue-loader.conf.js 配置文件。
    移除 url-loader 使用 webpack5自带 asset/resource 模块解析图片字体等静态资源。
    使用 mini-css-extract-plugin 压缩 css（开发环境下关闭）。
    使用 dart-sass 替换 node-sass（解决 Node.js 版本必须和 node-sass 对应问题
    常常因为项目较多在多个项目切换过程中需要频繁切换 NodeJS 版本，
    以及经常因为网络不稳定导致安装失败等问题）。


配置 plugins

    移除 uglifyjs-webpack-plugin 插件使用 terser-webpack-plugin 压缩js。
    移除 extract-text-webpack-plugin 和 optimize-css-assets-webpack-plugin。
    配置 mini-css-extract-plugin 压缩 css。
    新增 speed-measure-webpack-plugin 插件查看打包花费时长。

配置 optimization

    在 optimization.minimizer 对象下使用 terser-webpack-plugin 插件开启多线程压缩 js 并配置删除注释和日志。
    在 optimization.minimizer 对象下使用 css-minimizer-webpack-plugin 插件压缩 css。


plugins及一些依赖使用方式的改变

- 项目webpack-dev-server升到了4版本用来配套webpack5，所以npm run dev的命令需要相改为webpack serve启动
- 需要再plugins里面增加VueLoaderPlugin（vue-loader）
- extract-text-webpack-plugin和optimize-css-assets-webpack-plugin已经过时了需要由mini-css-extract-plugin和css-minimizer-webpack-plugin来代替
- webpack5自带了资源解析，所以不需要什么url-loader,file-loader之类的，直接用assets就可以解析
- 调整copyWebpackPlugin（copy-webpack-plugin）使用方法
- webpack-merge要解构出来，const { merge } = require('webpack-merge')
- NamedModulesPlugin已过时，由optimization的moduleIds进行替换
- copy-webpack-plugin插件使用方式有变化
- devServer改动很多可以参考以上文章链接，自定义参考官网devserver专题
- UglifyJsPlugin已经过时，可以直接使用webpack5开箱提供的TerserPlugin
- 代码拆分webpack.optimize.CommonsChunkPlugin已经过时现在使用webpack5提供的optimization.splitChunks属性来实现功能来实现
- build->util.js文件中修改了一处 MiniCssExtractPlugin.loader。ExtractTextPlugin（extract-text-webpack-plugin）已过时，使用MiniCssExtractPlugin（mini-css-extract-plugin）进行替换。
- devtool有做一定修改
- 由于vue-loader升级了，所以之前css如果使用/deep/有可能出错。我是在根节点使用/deep/然后换到::v-deep就正常了。如果有类似问题，可以相应调整。
