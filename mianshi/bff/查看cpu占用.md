### Linux 系统原生命令（应急快速查看，无需改造代码）
1. top 实时查看全局进程 CPU
```
top -c | grep node
```
2. htop（可视化，推荐安装）
```
# 安装
yum install htop -y  # CentOS
apt install htop -y  # Ubuntu
# 运行
htop
```
3. ps 一次性打印 CPU 占用（脚本 / 监控用）
```
# 所有进程按CPU降序，只展示前10
ps aux --sort=-%cpu | head -10
# 只过滤node进程
ps aux --sort=-%cpu | grep -E "node|next"
```

4. pidstat 细分用户态 / 内核态 CPU（定位计算 / IO 阻塞）
```
    pidstat -u 1
    # 指定PID持续监控（找到高负载PID后）
    pidstat -p 1234 1
```

### PM2 方案（线上部署标配，最推荐）
1. 查看所有应用 CPU 快照
```
pm2 list
# 或简写
pm2 status
```
2. 交互式实时监控面板（动态刷新）
```aiignore
pm2 monit
```
3. PM2 启动示例（规范部署区分两个服务）
```javascript
# Nest BFF 后端
pm2 start dist/main.js --name nest-bff
# Next.js SSR前端
pm2 start node_modules/next/dist/bin/next --name next-web -- start
```
4. PM2 持久化指标（搭配 Keymetrics 云监控）
```
pm2 link 密钥 名称
```
### 代码内置埋点：NestJS / Next 暴露 CPU 监控接口

- 生产监控标准：Prometheus + prom-client
给 Nest/Next 接入 Prometheus，长期存储 CPU 趋势、设置 CPU 持续 80% 告警：

    - Nest：nest-prometheus 一键内置 node_cpu_seconds_total 指标
    - Next：prom-client 手动埋点采集进程 CPU


### 深度排查, 定位代码
1. 停止 PM2，临时带采样参数启动 Nest/Next
```
# Nest BFF
node --prof dist/main.js
# Next
node --prof node_modules/next/dist/bin/next start
```

```
复现高 CPU5~10 分钟，Ctrl+C 停止，生成 isolate-xxx-v8.log
解析日志，输出 CPU 热点函数：

node --prof-process isolate-xxx-v8.log > cpu-log.txt
cat cpu-log.txt

重点看 [JavaScript] 下 Top Functions，找到耗时最高的业务函数。
```

2. --inspect 远程 Chrome 性能面板（临时调试，内网可用）

```
线上仅内网放行 9229 端口，禁止公网开放：

# Nest
NODE_OPTIONS="--inspect=0.0.0.0:9229" pm2 restart nest-bff
# Next
NODE_OPTIONS="--inspect=0.0.0.0:9230" pm2 restart next-web

本地 Chrome 打开 chrome://inspect，连接服务器 IP:9229，切换 Performance 面板录制 CPU 火焰图，
直观看到阻塞事件循环、死循环、大量 JSON 序列化的代码。
```
3. Linux perf 系统级采样（内核 + JS 混合分析）
```
# 安装工具
yum install perf -y
# 针对高负载PID采样5秒
perf record -g -p 进程PID sleep 5
# 生成可视化火焰图（配合FlameGraph）
perf script | ./stackcollapse-perf.pl | ./flamegraph.pl > cpu-flame.svg
```

### 完整线上排查流程
1. 先用 top/htop 确认是 Nest 还是 Next 进程 CPU 高，记录 PID
2. pm2 monit 持续观察 CPU 曲线，判断是瞬时尖峰还是持续打满
3. 访问 /monitor/cpu 接口看业务侧实时 CPU 指标
4. 高负载复现时执行 V8 采样 /perf 录制火焰图定位代码
5. 查看应用日志，核对高 CPU 时段是否有大量请求、定时任务触发
6. 优化代码逻辑，重启后持续监控 CPU 趋势确认恢复


### Next / Nest BFF 高 CPU 常见根因
1. Nest BFF 层
   - 接口同步大循环、无分页批量查询数据库
   - 未销毁定时任务 / 订阅（Redis、MQ 持续重试）
   - 序列化超大 JSON、循环深拷贝
2. Next.js SSR
   - getServerSideProps/API Routes 同步阻塞数据库请求
   - 图片批量优化并发过高
   - 全局 useEffect 未卸载监听、内存泄漏触发频繁 GC（GC 占满 CPU）
3. 公共问题
   - 未开启 PM2 集群模式，单核心跑满
   - 第三方依赖死循环、连接池耗尽无限重连