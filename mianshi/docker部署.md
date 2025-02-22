[参考文档](https://juejin.cn/post/7454451635407945739?utm_source=gold_browser_extension)
[参考文档](https://juejin.cn/post/6844903955760152583)

### 三个基本概念

- 镜像（Image）： Docker 镜像是一个只读的模板，用来创建容器,简单来说就是为容器运行提供需要的程序、资源、配置等, 他在构建成功后就不会变化,只用于启动容器
- 容器（Container）： 容器是镜像的运行实例，可以被启动、停止、删除 ,一个Docker镜像可以例化出来多个容器，每个容器之间是独立的。Docker的容器是用来运行程序的,可以理解为Docker的容器就是一个操作系统，目的是运行我们写的程序。
- 仓库（Repository）： 用来存储和分发 Docker 镜像的地方 Dockerhub 有点类似于github用户可以在上面托管镜像

### 为什么要使用Docker

- 环境一致性:  避免发生在我的电脑上能运行,别人的电脑上用不了的问题，确保开发、测试和生产环境的一致性
- 版本隔离： 在同一台服务器上运行不同版本的应用（如不同版本的Node.js），避免项目报错
- 服务迁移： 容器化后的应用可以轻松地在不同服务器间迁移，无需担心环境差异
- 标准化交付： 提供了一个标准的软件交付方式，减少了人为部署错误


### 验证是否成功
docker --version

### 尝试运行服务器
docker run -d -p 80:80 --name webserver nginx`
访问: http://localhost

停止服务
docker stop webser2ver
删除服务
docker rm webserver

配置镜像
"registry-mirrors":[
"https://registry.docker-cn.com",
"https://docker.mirrors.ustc.edu.cn",
"http://hub-mirror.c.163.com"
]


如果是构建过程中npm因为网络原因,安装依赖失败可以考虑使用 npm镜像地址或者使用cnpm

# 运行 npm install 安装cnpm 再通过cnpm安装依赖
RUN npm -g --cache=none --registry https://registry.npmmirror.com \
&& cnpm install


dockerfile
```text
# 使用 Node.js 16 作为基础镜像
FROM node:16.14.2

# 将当前工作目录设置为/app
WORKDIR /app

# 将 package.json 和 package-lock.json 复制到 /app 目录下
COPY package*.json ./

# 运行 npm install 安装依赖
RUN yarn install


# 将源代码复制到 /app 目录下
COPY . .

# 打包构建
RUN npm run build

# 将构建后的代码复制到 nginx 镜像中
FROM nginx:latest
COPY --from=0 /app/dist /usr/share/nginx/html

# 复制自定义的Nginx配置到镜像中，覆盖默认配置
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# 启动 nginx 服务
CMD ["nginx", "-g", "daemon off;"]

```

dockerignore 与.gitignore 语法一致


### 构建前端镜像

docker build -t gyljr-admin:v1 .
gyljr-admin 项目名
:v1 tag号
后的.号代表上下文路径

如果成功打出了镜像,可以在本地运行一下这个镜像进行验证

通过docker run -d -p 3000:80 --name gyljr-admin-web gyljr-admin:v1 来运行


### 常用 Docker 命令速查


构建镜像：docker build -t <镜像名> .

运行容器：docker run -p <本地端口>:<容器端口> -d <镜像名>

查看正在运行的容器：docker ps

停止容器：docker stop <容器ID>

删除容器：docker rm <容器ID>

查看镜像列表：docker images

删除镜像：docker rmi <镜像ID>

查看容器日志：docker logs <容器ID>

进入容器内部：docker exec -it <容器ID> /bin/bash

查看容器内部文件：docker exec -it <容器ID> ls
