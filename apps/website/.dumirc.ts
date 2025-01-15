import { defineConfig } from 'dumi'
import path from 'node:path'

const isProduction = /* process.env.NODE_ENV === 'production' */ true
const isWin = process.platform === 'win32'

export default defineConfig({
    outputPath: 'docs-dist',// 输出目录
    npmClient: 'pnpm',// 使用pnpm作为包管理工具
    mfsu: isWin ? undefined : {},// MFSU（Module Federation Service Unit，模块联邦服务单元）的配置，在 Windows 系统下禁用 MFSU 功能
    apiParser: isProduction ? {} : false,// 在生产环境下禁用 API 解析功能
    resolve: {
        // 配置入口文件路径，API 解析将从这里开始
        entryFile: path.join(__dirname, '../../packages/ui/src/index.ts')
    },
    locales: [{ id: 'zh-CN', name: '中文' }],
    themeConfig: {
        favicons: ['https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/243319ee8c054bf2bf6da261c945367f~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6bm_5a6I5b-D55WU5YWJ:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMjk0NjM0Njg5MDgzMDcwMSJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1736955447&x-orig-sign=6YCuFDAycSRcuj7QCfY3DNNCJOA%3D'],
        logo: 'https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/243319ee8c054bf2bf6da261c945367f~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6bm_5a6I5b-D55WU5YWJ:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMjk0NjM0Njg5MDgzMDcwMSJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1736955447&x-orig-sign=6YCuFDAycSRcuj7QCfY3DNNCJOA%3D',
        
        title:"星语恋心 | @love/ui",
        name:"@love/ui",
        // name: 'love',
        footer: false,
        hideHomeNav: true,
        prefersColor: {
            default: 'dark',
            switch: false
        },
        apiHeader: {
            docUrl: `{github}/tree/master/src/{atomId}/index.md`,
            match: ['/components', '/mdx'],
            pkg: '@love/ui',
            serviceList: false,
            sourceUrl: `{github}/tree/master/src/{atomId}/index.tsx`
        }
    },
    styles: [
        `html, body { background: transparent;  }

        @media (prefers-color-scheme: dark) {
            html, body { background: #000; }
        }
        `
    ],
    // 子包不打包的方案，用 alias
    alias: {
        '@love/ui': path.join(__dirname, '../../packages/ui/src')
    }
})
