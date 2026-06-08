## 权限验证
#### 技术栈
  - Next.js 14+ App Router
  - JWT
  - cookies 存储（比 localStorage 安全，服务端可读取）
  - Middleware（全局路由守卫）

#### jwt
```javascript
import { jwtVerify, SignJWT } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

// 生成 token
export async function createToken(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(secret);
}

// 验证 token
export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}
```

#### 登录api
```javascript
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createToken } from '@/app/utils/auth';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) return NextResponse.json({ msg: '用户不存在' }, { status: 401 });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return NextResponse.json({ msg: '密码错误' }, { status: 401 });

  // 生成 token
  const token = await createToken({
    id: user.id,
    username: user.username,
    role: user.role,
  });

  // 存入 cookie
  cookies().set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });

  return NextResponse.json({
    user: { id: user.id, username: user.username, role: user.role },
  });
}
```

#### 退出登录
```javascript
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  cookies().delete('token');
  return NextResponse.json({ msg: '退出成功' });
}
```

#### 路由守卫
```javascript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './app/utils/auth';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const payload = token ? await verifyToken(token) : null;

  const isLogin = !!payload;
  const role = payload?.role as string;

  const { pathname } = req.nextUrl;

  // 白名单（不需要登录）
  const publicPaths = ['/login', '/register', '/api/'];
  if (publicPaths.some(p => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // 未登录 → 跳登录
  if (!isLogin) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // 管理员页面
  if (pathname.startsWith('/admin') && role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/403', req.url));
  }

  return NextResponse.next();
}

// 对哪些路径生效
export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
};
```

#### 获取用户信息
```javascript
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        setUser(data.user || null);
        setLoading(false);
      });
  }, []);

  const logout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    setUser(null);
    router.push('/login');
  };

  return { user, loading, logout, isAdmin: user?.role === 'ADMIN' };
}
```


## redis
#### 创建
```javascript
import Redis from 'ioredis';

// 连接本地 Redis
const redis = new Redis({
  host: 'localhost',
  port: 6379,
  // password: '你的密码',
  db: 0,
});

export default redis;
```
#### 封装工具
```javascript
import redis from './redis';

/**
 * 获取缓存，如果没有则执行函数并缓存结果
 * @param key 缓存 key
 * @param ttl 过期时间（秒）
 * @param fn 没有缓存时执行的方法（如 prisma 查询）
 */
export async function getCache<T>(
  key: string,
  ttl: number,
  fn: () => Promise<T>
): Promise<T> {
  // 1. 先读 Redis
  const cacheData = await redis.get(key);
  if (cacheData) {
    return JSON.parse(cacheData);
  }

  // 2. 没有缓存，执行 Prisma 查询
  const data = await fn();

  // 3. 存入缓存
  await redis.set(key, JSON.stringify(data), 'EX', ttl);

  return data;
}

/**
 * 清除缓存（新增/编辑/删除时调用）
 * @param keys
 */
export async function delCache(keys: string[]) {
  if (keys.length) await redis.del(keys);
}
```

#### 实战

查询用户 带缓存
```javascript

import prisma from '@/lib/prisma';
import { getCache } from '@/lib/cache';

// ✅ 先读缓存，没有再查数据库
async function getUserList() {
  return getCache(
    'user:list',       // 缓存 key
    60,                // 缓存 60 秒
    () => prisma.user.findMany() // Prisma 查询
  );
}
```

查询单用户
```javascript
async function getUserById(id: number) {
  return getCache(`user:${id}`, 120, () =>
    prisma.user.findUnique({ where: { id } })
  );
}
```

新增用户 -> 清除列标缓存
```javascript
import { delCache } from '@/lib/cache';

async function createUser(data: any) {
  const user = await prisma.user.create({ data });

  // 🔥 新增后删除缓存，下次查询就是最新数据
  await delCache(['user:list']);

  return user;
}
```

编辑 / 删除用户 → 清除详情 + 列表缓存
```javascript
async function updateUser(id: number, data: any) {
  const user = await prisma.user.update({ where: { id }, data });

  // 删除相关缓存
  await delCache([`user:${id}`, 'user:list']);

  return user;
}
```

#### 完整示例
```javascript
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCache, delCache } from '@/lib/cache';

export async function GET() {
  // 带缓存查询
  const list = await getCache('user:list', 60, () =>
    prisma.user.findMany()
  );
  return NextResponse.json({ list });
}

export async function POST(req: Request) {
  const data = await req.json();
  const user = await prisma.user.create({ data });

  // 新增后清理缓存
  await delCache(['user:list']);

  return NextResponse.json({ user });
}
```


## 作为BFF层

1. 接口聚合（BFF 核心）
合并多个微服务 / DB 查询，返回前端需要的结构。

```javascript
// BFF 聚合：一次性返回文章 + 作者 + 统计
export async function GET() {
  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      take: 10,
      include: {
        user: { select: { id: true, username: true } }, // 关联查询
      },
    }),
    prisma.post.count(),
  ])

  // BFF 数据转换
  return Response.json({
    list: posts,
    total,
    pageSize: 10,
  })
}
```

2. ✅ 权限控制（鉴权中心）
Middleware 做全局鉴权
Server Components 做数据权限
Prisma 动态拼接 where

```javascript
// 全局鉴权
export async function middleware(req) {
  const token = req.cookies.get('token')?.value
  if (!token && !req.nextUrl.pathname.startsWith('/login')) {
    return Response.redirect('/login')
  }
}
```

3. ✅ 数据格式转换
把复杂的数据库结构 → 前端友好结构。

4. ✅ 缓存、限流、日志
Redis 缓存
接口限流
日志监控

```javascript
import { getCache } from '@/lib/redis'

export async function getPosts() {
  return getCache('posts:list', 60, () =>
    prisma.post.findMany({ include: { user: true } })
  )
}
```

5. ✅ 对接微服务 / 第三方 API
BFF 可以：
调用其他微服务（gRPC / HTTP）
调用第三方接口
返回统一格式给前端

```text
Next.js + Prisma 是非常优秀的 BFF 层方案，
它能承担接口聚合、权限控制、数据查询、协议转换等 BFF 核心职责，
同时具备全栈统一、类型安全、部署简单、性能优秀等特点，是现代前端全栈架构的主流选择。
```

不适合：

- 超复杂微服务网关
- 重度业务逻辑中台
- 需要复杂事务、分布式锁、消息队列的核心后端

适合：

- 前端专属 BFF 层
- 中台轻接口
- SSR 项目
- 全栈快速开发
- 中小后台系统

#### 架构
```text
前端页面 (Client Components)
        ↓
Next.js 服务层 (BFF 核心)
  ↓    ↓    ↓
Server Actions / Route Handler（接口聚合/协议转换/权限控制）
        ↓
Prisma（数据访问层 DAO）
        ↓
MySQL/PostgreSQL 数据库
        ↓
（可选）Redis 缓存 / 微服务调用
```

server Action BFF
```javascript
'use server'
// BFF 直接给页面用，无需 API
export async function getHomeData() {
  const banners = prisma.banner.findMany()
  const articles = prisma.article.findMany()
  const users = prisma.user.count()

  const [b, a, u] = await Promise.all([banners, articles, users])
  return { banners: b, articles: a, userCount: u }
}
```