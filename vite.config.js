import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers';
import ElementPlus from 'unplugin-element-plus/vite';
import vueJsx from "@vitejs/plugin-vue-jsx";
import path, { resolve} from 'path'
import { VineVitePlugin } from 'vue-vine/vite'
// const path = require('path')
// https://vitejs.dev/config/
export default defineConfig ({
  // 别名配置
  resolve: {
    alias: {
      // 键必须以斜线开始和结束
      '@': resolve(__dirname, './src'),
      "@assets": resolve(__dirname, "./src/assets"),
      "@common": resolve(__dirname, "./src/common"),
      "@utils": resolve(__dirname, "./src/utils"),
      "@components": resolve(__dirname, "./src/components"),
      "@styles": resolve(__dirname, "./src/styles"),
      "@store": resolve(__dirname, "./src/store"),
      "@views": resolve(__dirname, "./src/views"),
    },
  },
  // 设置scss的api类型为modern-compiler
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        silenceDeprecations: ["legacy-js-api"],
      },
      sass: {
        api: 'modern-compiler'
      }
    }
  },
  plugins: [
    VineVitePlugin(),
    vue (),
    AutoImport ({
      imports: [
        'vue',
        'vue-router',
        'pinia',
        // 定义文件中的某个方法自动引入
        {
          '@utils': ['hello']
        },
      ],
      // 配置本地目录自动引入
      // dirs: ['.src/utils/**', '.src/store/**'],
      // 默认引入 src/components 目录下的组件
      // Components({})
      // 防止组件名冲突
      // directoryAsNamespace:true
      // 生成的d.ts文件,在ts中配置引入
      resolvers: [ElementPlusResolver ()],
      dts: 'src/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json', // 生成json文件路径
        globalsPropValue: true
      }, // 生成eslint配置文件
      vueTemplate: true
    }),
    Components ({
      resolvers: [ElementPlusResolver ()],
    }),
    ElementPlus ({
      useSource: true,
    }),
    vueJsx(),
  ],
  server: {
    port: 8000, // 设置服务启动端口号
    open: true, // 设置服务启动时是否自动打开浏览器
    // proxy: {
    //   '/api': {
    //     target: 'http://API网关所在域名',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '')
    //   },
    // }
    hmr: {
      // overlay: false
    }
  }
})
