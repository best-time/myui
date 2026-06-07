## .env
```
DATABASE_URL="mysql://root:你的密码@localhost:3306/prisma_demo"
```
### 模型实例

```prisma
model User {
  id    Int     @id @default(autoincrement())
  name  String?
  email String  @unique
  posts Post[]
}

model Post {
  id      Int     @id @default(autoincrement())
  title   String
  content String?
  userId  Int
  user    User    @relation(fields: [userId], references: [id])
}
```

### 查询api

```

// 查询所有
const users = await prisma.user.findMany()

// where 查询

const users = await prisma.user.findMany({
  where: {
    email: { contains: "qq.com" }, // 包含
    name: { not: null }, // 不为空
    id: { gt: 10 }, // 大于10
  },
})


// 单个查询
const user = await prisma.user.findUnique({
  where: { email: "a@qq.com" },
})

// 查询第一个
const user = await prisma.user.findFirst({
  where: { name: "张三" },
})

// 查询第一个
const users = await prisma.user.findMany({
  orderBy: { id: "desc" },
})

// 分页查询
const list = await prisma.user.findMany({
  skip: 0,
  take: 10,
})

// 查询指定字段
const user = await prisma.user.findUnique({
  where: { id: 1 },
  select: { id: true, name: true },
})
```

```
// 连表查询
const user = await prisma.user.findUnique({
  where: { id: 1 },
  include: { posts: true }, // 把关联的文章一起查
})
```


### 创建类

```
// 创建单个
const user = await prisma.user.create({
  data: {
    name: "张三",
    email: "test@qq.com",
  },
})


// 批量创建
await prisma.user.createMany({
  data: [
    { name: "A", email: "a@qq.com" },
    { name: "B", email: "b@qq.com" },
  ],
  skipDuplicates: true, // 跳过重复
})

// 有则更新,无则创建 upsert
await prisma.user.upsert({
  where: { email: "test@qq.com" },
  update: { name: "新名字..." },
  create: { name: "张三", email: "test@qq.com" },
})

```

### 更新类
```
// 更新单个
await prisma.user.update({
  where: { id: 1 },
  data: { name: "李四" },
})

// 批量更新

await prisma.user.updateMany({
  where: { name: "张三" },
  data: { name: "张三三" },
})
```

### 删除类

```
// 删除单个
await prisma.user.delete({
  where: { id: 1 },
})

// 批量删除
await prisma.user.deleteMany({
  where: { name: "测试" },
})

// 删除所有

await prisma.user.deleteMany()
```

### 关联查询

```
// 查询用户+所有文章
const user = await prisma.user.findUnique({
  where: { id: 1 },
  include: { posts: true },
})

// 创建用户+同时创建文章
await prisma.user.create({
  data: {
    name: "小明",
    email: "xx@qq.com",
    posts: {
      create: { title: "第一篇文章" },
    },
  },
})

// 文章关联到用户
await prisma.post.update({
  where: { id: 1 },
  data: {
    user: { connect: { id: 1 } },
  },
})

// 取消关联
await prisma.post.update({
  where: { id: 1 },
  data: { user: { disconnect: true } },
})
```

### 高级api

```
// 统计数量
const total = await prisma.user.count({
  where: { name: { contains: "张" } },
})

// 原生sql
const users = await prisma.$queryRaw`SELECT * FROM User WHERE id = 1`

// 事务 （保证多个操作同时成功 / 失败）
const [user, post] = await prisma.$transaction([
  prisma.user.create({ data: { name: "A", email: "a@a.com" } }),
  prisma.post.create({ data: { title: "标题" } }),
])

// 软删除

// 模型加 isDelete
await prisma.user.findMany({
  where: { isDelete: false }
})

// 模糊查询
where: {
  title: { contains: "关键词", mode: "insensitive" } // 不区分大小写
}
```

### 条件操作符
```
contains     // 包含
equals      // 等于
gt          // 大于
gte         // 大于等于
lt          // 小于
lte         // 小于等于
not         // 非
in          // 在数组中
notIn       // 不在数组中
```