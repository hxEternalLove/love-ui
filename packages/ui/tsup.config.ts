/*
 * Copyright (c) 2025 by 星语恋心-星语 
 * All Rights Reserved. 
 * @Author: 星语
 * @Date: 2025-01-13 10:00:04
 * @LastEditors: hxlove
 * @LastEditTime: 2025-01-13 12:02:44
 * @FilePath: \love-ui\packages\ui\tsup.config.ts
 * @Description: 星语恋心出品，作者 @星语，版权归星语所有
 */
import { defineConfig } from 'tsup'

export default defineConfig({
  // entry: ['src/index.ts'],// 入口文件 打包到一起
  entry: ['src'],// 入口文件 各个文件打包成单独的文件 可以实现按需加载
  dts: true,// 生成类型声明文件
  splitting: false,// 不拆分
  sourcemap: false,// 不生成sourcemap文件
  clean: true,// 打包前清除目录
  format: ['esm'],// 打包格式
  outDir: 'es'// 输出目录
})