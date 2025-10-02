---
tags: []
up:
related:
created: 2025-06-16
modified: 2025-06-16
---

Vite 的构建流程与 Webpack 有显著不同，因为它使用现代浏览器特性 ESM。

目前 Vite 开发环境和生产环境是两种不同的构建方式
- 这带来了不一致性
- Rolldown 驱动的 Vite 即将发布，它统一使用了 Rolldown 构建

## 一、开发模式（基于原生 ES Modules）

```mermaid
graph LR
    A[启动服务器] --> B[预构建依赖]
    B --> C[浏览器请求]
    C --> D[按需编译]
```

### 1. 依赖预构建（首次启动）

- **目的**：将 CommonJS/UMD 依赖转换为 ESM 格式
- **触发条件**：
  - 首次启动项目
  - `node_modules` 发生变化
  - `vite.config.js` 更改
- **关键过程**：
  - 扫描 `import` 语句找出依赖
  - 使用 Rollup 打包依赖到 `node_modules/.vite` 缓存目录
  - 生成 `_metadata.json` 记录依赖信息

### 2. 按需编译（请求时）

- **HTML 请求**：
  - 返回主 HTML 文件
  - 注入 Vite 客户端脚本
- **模块请求**：

  ```mermaid
  graph LR
    A[浏览器请求模块] --> B{是否为预构建依赖?}
    B -->|是| C[返回预构建代码]
    B -->|否| D[实时编译]
  ```

  - **非预构建依赖**：直接返回源码（`.vue`/`.jsx` 等）
  - **项目文件**：
    - 使用对应插件实时转换（如 Vue/Svelte 单文件组件）
    - 添加 HMR 相关代码

## 二、生产模式（基于 Rollup）

```mermaid
graph LR
    A[代码分析] --> B[依赖扫描]
    B --> C[全量构建]
    C --> D[分块优化]
    D --> E[生成产物]
```

### 1. 构建准备阶段

- 读取 `vite.config.js` 生产配置
- 初始化 Rollup 打包环境
- 注册所有插件（Vite 内置 + 用户插件）

### 2. 完整构建流程

#### (1) 依赖扫描

```javascript
// 示例：扫描到的依赖关系
{
  "vue": "^3.2.0",
  "lodash": {
    "imported": ["cloneDeep"],
    "dynamicImported": ["debounce"]
  }
}
```

- 使用 `esbuild` 快速扫描所有 `import` 语句
- 生成优化依赖图（用于 Code Splitting）

#### (2) Rollup 打包

- **JS/TS 处理**：
  - 通过 `esbuild` 转译（速度比 Babel 快 10-100x）
  - 保留 ESM 语法
- **CSS 处理**：

  ```mermaid
  graph LR
    A[CSS文件] --> B[PostCSS处理]
    B --> C[压缩优化]
    C --> D[生成.css或内联]
  ```

  - 支持 `import './style.css'`
  - 自动提取 CSS 到独立文件
  - 支持 CSS Modules

#### (3) 分块优化

- **自动代码分割**：
  - 动态 import 自动拆包
  - 公共依赖提取（如 `lodash`）
  
- **配置示例**：

  ```javascript
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        }
      }
    }
  }
  ```

#### (4) 生成最终产物

- **输出结构**：

  ```
  dist/
  ├─ assets/
  │  ├─ index.abc123.js
  │  ├─ vendor.def456.js
  │  └─ style.ghi789.css
  ├─ index.html
  └─ favicon.ico
  ```

- **特性**：
  - 文件名包含内容 hash
  - 自动生成预加载指令
  - 可配置多页面输出

## 三、与 Webpack 的关键差异

| 特性                | Vite                      | Webpack                   |
|---------------------|---------------------------|---------------------------|
| **开发模式原理**     | 原生 ESM + 按需编译        | 监听文件 + 全量打包        |
| **生产打包工具**     | Rollup                    | Webpack 自身              |
| **转译工具**        | esbuild（开发） + Rollup（生产） | Babel + Terser       |
| **启动速度**        | 即时启动                   | 随项目增长变慢             |
| **HMR 更新速度**    | 毫秒级                    | 随项目增长变慢             |

## 四、性能优化技巧

1. **依赖预构建配置**：

   ```javascript
   optimizeDeps: {
     include: ['lodash-es'], // 强制预构建
     exclude: ['vue-demi']  // 排除不需要的
   }
   ```

2. **构建优化**：

   ```javascript
   build: {
     target: 'es2015', // 更现代的浏览器目标
     minify: 'terser', // 或 'esbuild'
     cssTarget: 'chrome80'
   }
   ```

3. **分片策略**：

   ```javascript
   rollupOptions: {
     output: {
       chunkFileNames: 'assets/[name]-[hash].js',
       entryFileNames: 'assets/[name]-[hash].js'
     }
   }
   ```

Vite 的打包流程通过利用现代浏览器特性（ESM）和高效工具链（esbuild + Rollup），在开发体验和构建效率上实现了质的飞跃。生产构建虽然仍是全量打包，但通过智能的依赖分析和优化的工具链，仍然能保持出色的性能。
