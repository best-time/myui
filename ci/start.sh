#/bin/bash

# 拉取最新代码
git pull

# 安装依赖
npm install

# 构建打包
npm run build

# 停止、删除容器
docker stop vite && docker rm vite

# 构建镜像
docker build -t myui .

# 创建容器
docker run -d -p 3000:80 --name vite-demo myui
