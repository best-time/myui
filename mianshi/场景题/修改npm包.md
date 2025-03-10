- 直接修改node_modules
- patch 方案
- fork package, 自己来维护

## 直接修改

## patch

```html
pnpm i patch-package postinstall
```

```json
// package.json hooks
{
  "scripts": {
    "postinstall": "patch-package"
  }
}
```

创建补丁

```bash
# 举例: 修改rspack库
npx patch-package rspack
# 会生成 patchs/rspack+1.0.0.patch
```

## github fork

直接改源码, 构建发布到npm私服 verdaccio/阿里云效制品库
