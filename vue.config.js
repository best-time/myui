const path = require('path')

module.exports = {

  runtimeCompiler: true,
    // 配置入口
    pages:{
        index:{
            entry:'src/main.js',
            template:'public/index.html',
            filename:'index.html'
        }
    },
    // 扩展webpack配置
    chainWebpack:config => {
        // 配置别名
        config.resolve.alias
            .set('@',path.resolve('src'))
            .set('~',path.resolve('packages'))
        config.module
            .rule('js')
            .include.add(/packages/).end()
            .include.add(/src/).end()
            .use('babel')
            .loader('babel-loader')
            .tap(options => {
                return options
            })
    }
}