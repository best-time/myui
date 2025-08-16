# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).


[package.json](https://juejin.cn/post/7126394898445500423#heading-7)


[docker入门文档](https://docker.easydoc.net/doc/81170005/cCewZWoN/N9VtYIIi)

### docker build
// mu-ui 项目名 : 版本号

docker build -t mu-ui:0215-1 .

docker build -t mu-ui/multi .  -f Dockerfile.multi

docker build -t test:v1 .

### docker run
docker run -p 8080:8080 --name test-hello test:v1

```text

-p 映射容器内端口到宿主机
--name 容器名字
-d 后台运行
```

### 容器通信
- 创建网络
  docker network create test-net
- 运行redis 在test-net网络中
  docker run -d --name redis --network test-net --network-alias redis redis:latest
- 运行web项目在同一个网络
  docker run -p 8080:8080 --name test -v D:/test:/app --network test-net -d test:v1
- 查看数据是否一致


### npkill
删除不在使用的node_modules文件
