## 设计架构


### 步骤
1. npm init - 初始化项目
2. monorepo
   1. monorepo 配置 - 根目录下 有 pnmp-workspace.yaml 文件
   2. monorepo 项目的位置 - 根目录下的 packages 文件夹
   ```
      packages
         |- 'apps/*'
         |- 'packages/*'
   ```
3. 设计子包
4. 考虑调试问题，可以用dumi调试，也可以搭建react项目调试
5. 规范设计
   - js（eslint9、prettier）、style（stylelint）
   - 拼写检查（cspell） 
   - commit规范（commitlint、husky）
   1. eslint
      可以 安装 vscode 插件 ESLint 来检查 js 和 ts 文件
      - 安装 
      1. package.json 中指明依赖
      ```
         "eslint": "9.6.0",
         "@eslint/js": "9.6.0",
         // 检查 ts 还需安装以下依赖
         "typescript": "5.5.2",
         "typescript-eslint": "7.14.1",
      ```
      - 使用 依赖包 `@eslint/js` 和 `typescript-eslint` 检查 js 和 ts 文件
      1. 单独吧eslint配置文件放到根目录下，创建 eslint.config.js 文件
      ```eslint.config.mjs 
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
               files: ['**/*.{ts,tsx,jsx}'],
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
                  semi: "error",// 强制使用分号
                  "prefer-const": "error",// 使用const而不是let
                  "no-console": "warn",// 禁止使用console
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
         ```
      2. 在 scripts 中添加 lint 命令
         - `"lint:es": "eslint packages/**/*.{js,jsx,ts,tsx}"` 检查 packages 文件夹下的所有 js、jsx、ts、tsx 文件
      3. 跑脚本测试 `pnpm lint:es` 
   
   2. 编辑器 代码格式化工具 - prettier 
      - 在项目根目录下创建 .prettierrc 文件，配置 prettier 规则
      ```.prettierrc
         {
            "arrowParens": "avoid",// 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
            "endOfLine": "lf",// 换行符使用 lf
            "printWidth": 140,// 一行的字符数，如果超过会进行换行，默认为80，此处设置为140
            "semi": false,// 使用分号,默认为true
            "singleQuote": true,// 使用单引号，默认为false，我们使用单引号
            "tabWidth": 4,// 缩进字节数，默认为2，我们使用4
            "trailingComma": "none"// 行尾是否使用逗号 none：省略。 可选值："all" | "es5" | "none"
         }
      ```
      - 在 VSCode 中，安装 Prettier - Code Formatter 插件后，会自动格式化代码。
      - 或者 在 package.json 中添加以下配置 `"prettier": "^3.0.3"`
      - 需要 配置脚本 - `prettier:format": "prettier --write packages/**/*.{js,jsx,ts,tsx}"` // 格式化 packages 文件夹下的所有 js、jsx、ts、tsx 文件
      - 执行脚本测试 - `pnpm prettier:format`

   3. spellcheck - 拼写检查
      可以安装 vscode 插件 Code Spell Checker 检查拼写错误
     安装：cspell
      1. package.json 中指明依赖 `"cspell": "^6.30.0"`
      2. 配置 cspell.json
      ```cspell.json
      {
         "import": ["@cspell/dict-lorem-ipsum/cspell-ext.json"],  // 导入其他字典 
         "caseSensitive": false, // 大小写敏感 false 意为不区分大小写
         "dictionaries": ["custom-words"],   // 自定义字典
         "dictionaryDefinitions": [// 自定义字典
            {
               "name": "custom-words", // 自定义字典名称
               "path": "./.cspell/custom-words.txt",  // 自定义字典路径
               "addWords": true  // 是否添加到默认字典中
            }
         ],
         "ignorePaths": [  // 忽略路径
            "**/node_modules/**",
            "**/dist/**",
            "**/lib/**",
            "**/docs/**",
            "**/stats.html",
            "**/language/**",
            "**/language.ts",
            "**/package.json",
            "eslint.config.js"
         ]
      }
      ``` 
      3. 定义脚本 - `"spellcheck": "cspell lint --dot --gitignore --color --cache --show-suggestions \"(packages|apps)/**/*.@(html|js|cjs|mjs|ts|tsx|css|scss|md)\""`
      4. 执行脚本 - `pnpm spellcheck`

   4. stylelint
      可以安装 vscode 插件 Stylelint 检查 style 文件
      - 安装
      1. package.json 中指明依赖 `"stylelint": "^15.10.3"`
      2. 配置 stylelint.config.mjs
      ```stylelint.config.js
      /** @type {import('stylelint').Config} */
      export default {// 导出配置
         rules: {// 规则
            'block-no-empty': true // 禁止空块
         }
      }
      ```
      3. 定义脚本 - `"lint:style": "stylelint \"(packages|apps)/**/*.{css,less,scss}\""`
      4. 跑脚本测试 - `pnpm lint:style`

   可以合并命令 - `"lint": "pnpm lint:es && pnpm lint:style"`
   直接执行 `pnpm lint`
   
   5.  commitlint + cz-git + commitizen + husky           git 钩子 用于检查提交信息和提交前的代码
      - 安装
      1. package.json 中指明依赖

      ```
      "husky": "^8.0.3",
      "commitlint": "^17.7.2",
      “cz-git": "^6.1.0",
      "commitizen": "^4.3.0",
      "lint-staged": "^13.0.3",
      ```
      2. 初始化 husky
         `npx husky init`
         - 初始化 husky 后会在根目录下生成 .husky 文件夹
         - 文件夹下有 pre-commit 和 commit-msg 两个文件，分别对应提交前和提交信息检查

         - 在类 Unix 系统中，#!开头的这一行有特殊的用途。它不是注释，注释是在脚本中以#开头的行，
         - 而#!开头的行则是告诉操作系统使用哪个解释器来执行这个脚本文件。

         pre-commit 脚本  提交前检查
         ```
            #!/usr/bin/env sh                   // '#!'告诉系统使用sh来执行此脚本，被执行时会被shell解释器解释执行，而不是直接执行
            . "$(dirname -- "$0")/_/husky.sh"   // 引入husky.sh脚本
            echo 'husky: pre-commit'            // 输出提示信息

            # pnpm lint && pnpm spellcheck      // 执行 pnpm lint 和 pnpm spellcheck 命令 - 加 # 表示注释掉
            npx lint-staged                     // 执行 lint-staged 命令  替代 上面的 另一种方案

         ```
         commit-msg 脚本 提交信息检查
         ```
            #!/usr/bin/env sh
            . "$(dirname -- "$0")/_/husky.sh"
            echo 'husky: commit'                // 输出提示信息

            npx --no -- commitlint --edit "$1"  // 执行 commitlint 命令
         ```
      
      3. 使用 commitlint 结合 cz-git + commitzen 来检查提交信息
      - commitlint 是一个用于检查提交信息的工具，它只是检查提交信息是否符合规范，但不会引导用户如何编写符合规范的提交信息。
         - 配置commitlint 
         ```commitlint.config.mjs
            const { defineConfig } = require('cz-git')
            export default defineConfig({
               rules: {
                  // @see: https://commitlint.js.org/#/reference-rules
               },
               prompt: {
                  alias: { fd: 'docs: fix typos' },
                  messages: {
                        type: 'Select the type of change that you\'re committing:',
                        scope: 'Denote the SCOPE of this change (optional):',
                        customScope: 'Denote the SCOPE of this change:',
                        subject: 'Write a SHORT, IMPERATIVE tense description of the change:\n',
                        body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
                        breaking: 'List any BREAKING CHANGES (optional). Use "|" to break new line:\n',
                        footerPrefixesSelect: 'Select the ISSUES type of changeList by this change (optional):',
                        customFooterPrefix: 'Input ISSUES prefix:',
                        footer: 'List any ISSUES by this change. E.g.: #31, #34:\n',
                        generatingByAI: 'Generating your AI commit subject...',
                        generatedSelectByAI: 'Select suitable subject by AI generated:',
                        confirmCommit: 'Are you sure you want to proceed with the commit above?',
                  },
                  types: [
                        { value: 'feat', name: 'feat:     ✨  A new feature', emoji: ':sparkles:' },
                        { value: 'fix', name: 'fix:      🐛  A bug fix', emoji: ':bug:' },
                        { value: 'docs', name: 'docs:     📝  Documentation only changes', emoji: ':memo:' },
                        { value: 'style', name: 'style:    💄  Changes that do not affect the meaning of the code', emoji: ':lipstick:' },
                        { value: 'refactor', name: 'refactor: ♻️   A code change that neither fixes a bug nor adds a feature', emoji: ':recycle:' },
                        { value: 'perf', name: 'perf:     ⚡️  A code change that improves performance', emoji: ':zap:' },
                        { value: 'test', name: 'test:     ✅  Adding missing tests or correcting existing tests', emoji: ':white_check_mark:' },
                        { value: 'build', name: 'build:    📦️   Changes that affect the build system or external dependencies', emoji: ':package:' },
                        { value: 'ci', name: 'ci:       🎡  Changes to our CI configuration files and scripts', emoji: ':ferris_wheel:' },
                        { value: 'chore', name: 'chore:    🔨  Other changes that don\'t modify src or test files', emoji: ':hammer:' },
                        { value: 'revert', name: 'revert:   ⏪️  Reverts a previous commit', emoji: ':rewind:' },
                  ],
                  useEmoji: true,
                  emojiAlign: 'center',
                  useAI: false,
                  aiNumber: 1,
                  themeColorCode: '',
                  scopes: [],
                  allowCustomScopes: true,
                  allowEmptyScopes: true,
                  customScopesAlign: 'bottom',
                  customScopesAlias: 'custom',
                  emptyScopesAlias: 'empty',
                  upperCaseSubject: false,
                  markBreakingChangeMode: false,
                  allowBreakingChanges: ['feat', 'fix'],
                  breaklineNumber: 100,
                  breaklineChar: '|',
                  skipQuestions: [],
                  issuePrefixes: [{ value: 'closed', name: 'closed:   ISSUES has been processed' }],
                  customIssuePrefixAlign: 'top',
                  emptyIssuePrefixAlias: 'skip',
                  customIssuePrefixAlias: 'custom',
                  allowCustomIssuePrefix: true,
                  allowEmptyIssuePrefix: true,
                  confirmColorize: true,
                  scopeOverrides: undefined,
                  defaultBody: '',
                  defaultIssues: '',
                  defaultScope: '',
                  defaultSubject: '',
               },
            })
            ```

      https://cz-git.qbb.sh/zh/
      - cz-git 是一个用于在Git提交信息中使用交互式命令行界面的工具，它可以帮助用户按照特定的格式编写Git提交信息。
        -  主要用于引导用户按照特定的格式编写Git提交信息。
        - 缺点：
          - 缺乏强制检查-可以引导用户生成规范的提交信息，但没有像commitlint那样的强制检查机制来确保最终的提交信息完全符合规范
          - 依赖用户配合-如果用户不使用git-cz进行提交，而是直接使用git commit，就无法享受到它引导编写规范提交信息的好处，可能会导致提交信息不符合预期的规范。
        - cz-git是一个自定义的commitizen适配器，commitizen是一个用于帮助用户生成规范化Git提交信息的工具框架。
        - 当使用cz-git配合commitizen时，可以充分利用commitizen的基础设施
      - commitzen 是一个用于生成规范化Git提交信息的工具框架。
        - 在package.json中配置commitizen的适配器
        ```package.json
          "config": {
            "commitizen": {
              "path": "node_modules/cz-git"     // 指定 commitizen 在生成 Git 提交信息（commit message）时所使用的适配器路径。
            }
          }
        ```
        - 定义脚本 - `"commit": "git-cz"` // 执行 git-cz 命令
        - 执行脚本测试 - `pnpm commit`
        - 或者 结合 husky 来使用 cz-git
        - 在 commit-msg 脚本中添加以下代码
         ```commit-msg
            #!/usr/bin/env sh
            . "$(dirname -- "$0")/_/husky.sh"
            echo 'husky: commit'                // 输出提示信息

            npx commitlint --edit "$1"  // 执行 commitlint 命令
         ```

      - 另一种方案 lint-staged
        - 安装 package.json 中指明依赖 `"lint-staged": "^13.0.3"`
        - 配置 lint-staged 在 package.json 中
        ```package.json
        "lint-staged": {
           "*.{js,jsx,ts,tsx}": [
               "eslint --fix", // 执行 eslint --fix 命令
               "pnpm spellcheck" // 执行 pnpm spellcheck 命令
            ], // 检查 js、jsx、ts、tsx 文件
           "*.{css,less,scss}": ["stylelint --fix"], // 检查 css、less、scss 文件
        }
        ```
        直接在 pre-commit 执行 `npx lint-staged` 即可