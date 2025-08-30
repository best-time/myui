import typescript from 'rollup-plugin-typescript'
import sourceMaps from 'rollup-plugin-sourcemaps'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

export default {
  input: './src/main.ts',
  output: [
    {
      format: 'cjs',
      file: 'lib/bundle.cjs.js',
      sourcemap: true
    },
    {
      format: 'es',
      file: 'lib/bundle.esm.js',
      sourcemap: true
    },
    {
      format: 'iife',
      file: 'lib/bundle.iife.js',
      sourcemap: true
    }
    /**
     amd – 异步模块定义，用于像RequireJS这样的模块加载器
    cjs – CommonJS，适用于 Node 和 Browserify/Webpack
    esm – 将软件包保存为 ES 模块文件，在现代浏览器中可以通过 <script type=module> 标签引入
    iife – 一个自动执行的功能，适合作为<script>标签。（如果要为应用程序创建一个捆绑包，您可能想要使用它，因为它会使文件大小变小。）
    umd – 通用模块定义，以amd，cjs 和 iife 为一体
    system - SystemJS 加载器格式
     */
  ],
  plugins: [
    typescript({
      exclude: 'node_modules/**',
      typescript: require('typescript')
    }),
    sourceMaps(),
    livereload(),
    // 本地服务器
    serve({
      open: true, // 自动打开页面
      port: 8999,
      openPage: '/public/index.html', // 打开的页面
      contentBase: ''
    })
  ]
}
