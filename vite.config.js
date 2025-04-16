import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers';
import ElementPlus from 'unplugin-element-plus/vite';
import vueJsx from "@vitejs/plugin-vue-jsx";
import path, { resolve} from 'path'
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
    vue (),
    AutoImport ({
      resolvers: [ElementPlusResolver ()],
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
  }
})
