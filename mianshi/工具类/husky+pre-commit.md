### 安装

npm install husky --save-dev

初始化

1.  npx husky install
    package.json添加命令

```
{
    scripts: {
        "prepare": "husky install"
    }
}

```

2.  npm run prepare

执行完上述安装命令后，将会发生如下几个变化：

    在.git同级目录生成.husky文件夹，文件夹下有一个可以编辑的示例pre-commit钩子
    在package.json中的scripts中添加了"prepare": "husky install"
    更改.git文件下面的config文件，配置项 core.hooksPath 为 .husky

添加husky钩子
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'

卸载并还原husky

      npm uninstall husky
      // 删除.husky文件夹，并且重置core.hooksPath
      rm -rf .husky && git config --unset core.hooksPath

### 项目中commit的时候，校验eslint, 警告和错误都不可以commit

1. 安装好 husky 之后，创建个 pre-commit 的 gitHook
   npx husky add .husky/pre-commit 'npm run lint'

2.安装lint-staged
npm install lint-staged --save-dev

lint-stated就是针对Git暂存区的文件做校验的一个工具

配置lint-stage

```
// package.json
{
    scripts: {
      lint-staged: "lint-staged"
    },
    "lint-staged": {
    "*.{js,vue}": [
      "eslint --max-warnings 0"
     ]
    }
}

```

修改 .husky/pre-push文件

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint-staged

```

提交 commit 的时候，触发了 pre-push的gitHook, 就执行了里面的脚本 lint-staged,
然后执行了 eslint --max-warnings 0,
最终eslint 0 警告 0 错误就可以commit成功
