DNS(domain name system)

1. 将域名映射到ip上

## 域名解析整个过程

1. 用户输入域名
2. 检查自身DNS缓存
3. 操作系统DNS缓存
4. 本地域名服务器
5. 根据本地DNS服务器去查找根DNS服务器/顶级域名服务器 TLD / 权威DNS服务器

## DNS记录

1. A记录: 将域名映射到IPv4地址
2. AAAA记录: 将域名映射到IPv6地址
3. CNAME记录: 将域名映射到另一个域名
4. MX记录: 指定邮件服务器
5. TXT: 文本信息存储,域名验证SPF记录

## DNS常见问题

### DNS解析慢

1. DNS预解析
2. 使用CDN, CDN节点用户就近
3. 减少外部资源请求,自己域名+oss+cdn

### DNS劫持

1. HTTPS, 整数保证传输安全性
2. DNSSEC: DNS安全扩展

## 优化

1. DNS 缓存结果
2. nslookup
3. dig
