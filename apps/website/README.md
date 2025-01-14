## 安装依赖
`pnpm install`
## 启动项目
`pnpm dev`
## 打包项目
`pnpm build`

**注意**: 
    - 自己手动创建项目后，启动报错大多数是版本问题
    - 可以使用最新版本或者使用锁死示例版本
    - 一般使用pnpm-lock.yaml 锁定版本
    ```
    "dependencies": {
        "@lobehub/ui": "1.144.5"
    },
    "devDependencies": {
        "dumi": "2.2.17",
        "dumi-theme-lobehub": "1.8.0",// 视频中^1.8.0 会安装 1.15.0 报dumi路由导出错误
    }
   ```