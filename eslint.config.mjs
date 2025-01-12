/**
 * ESLint 配置数组
 * 
 * 这个数组包含了一个或多个 ESLint 配置对象，每个对象定义了一组规则和配置选项。
 * 
 * @type {Array<Object>}
 */
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
// 只使用 js 配置 需要 这样 写
// export default [
//     js.configs.recommended,
//     {
//         rules: {
//             semi: "error",// 强制使用分号
//             "prefer-const": "error",// 使用const而不是let
//             "no-console": "warn",// 禁止使用console
//         }
//     }
// ];

// 使用 typescript-eslint 配置 需要 这样 写
export default tseslint.config({
    // 继承自哪些配置
    extends: [
        js.configs.recommended,
        tseslint.configs.recommended,
    ],
    // 哪些文件需要检查
    files: ['**/*.{js,ts,tsx,jsx}'],
    // 忽略哪些文件
    ignores: [
        'apps/**/*/{tmp,.dumi}/**/*', // 忽略umi生成的临时文件
        '*.js',// 忽略js文件
        '**/*/build/**/*',// 忽略build文件夹
        '**/*/es/**/*',// 忽略es文件夹
        '**/*/dist/**/*'// 忽略dist文件夹 
    ],
    // 自定义规则 -----------------------上下是基本配置--------------------------------
    rules: {
        // semi: "error",// 强制使用分号
        // "prefer-const": "error",// 使用const而不是let
        // "no-console": "warn",// 禁止使用console
    },
    // 语言选项
    languageOptions: {
        // 转换器
        parser: tseslint.parser,
        // 转换选项
        parserOptions: {
            // ts 项目配置文件位置
            project: [],
            // ts配置文件根目录
            tsconfigRootDir: import.meta.dirname,
        },
    },
})