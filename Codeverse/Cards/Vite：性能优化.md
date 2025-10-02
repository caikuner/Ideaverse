---
tags: []
up: 
related: 
url: https://www.mianshipai.com/docs/second-exam/engineering.html
created: 2025-06-13
modified: 2025-06-13
---

## 减少 Vite 打包时间

### 依赖预构建

配置 Vite 的 `optimizeDeps` 选项，提前预构建常用依赖，减少开发环境下的启动时间。

```js
export default defineConfig({
  optimizeDeps: {
    include: ['lodash', 'vue', 'react'], // 预构建依赖
  },
})
```

### Rolldown

## 缩小 Vite 打包体积

### 启用 Gzip/Brotli 压缩

使用 `vite-plugin-compression` 插件开启 Gzip 或 Brotli 压缩，可以有效减小传输的文件体积，提升加载速度。

安装依赖：

```javascript
npm install vite - plugin - compression--save - dev
```

配置示例：

```javascript
import compression from 'vite-plugin-compression'
export default defineConfig({
  plugins: [
    compression({
      algorithm: 'gzip', // 或 'brotli' 压缩
      threshold: 10240, // 文件大于 10KB 时启用压缩
    }),
  ],
})
```

### 代码分割

- 🎯 路由分割

使用动态导入实现按需加载，减小初始包的体积，提高页面加载速度。

```javascript
const module = import('./module.js') // 动态导入
```

或者在路由中使用懒加载：

```javascript
const MyComponent = () => import('./MyComponent.vue')
```

- 🎯 手动控制分包

在 Vite 中，你可以通过配置 Rollup 的 `manualChunks` 选项来手动控制如何分割代码。这个策略适用于想要将特定的依赖或模块提取成单独的 chunk 文件。

```javascript
import { defineConfig } from 'vite'
export default defineConfig({
  build: {
    minify: false,
    // 在这里配置打包时的rollup配置
    rollupOptions: {
      manualChunks: (id) => {
        if (id.includes('node_modules')) {
          return 'vendor'
        }
      },
    },
  },
})
```

### 图片优化

使用 `vite-plugin-imagemin` 插件对项目中的图片进行压缩，减少图片体积，提升加载速度。


- 安装依赖

```javascript
npm install vite-plugin-imagemin -D
```

- 配置示例

```js
export default defineConfig({
  plugins: [
    ViteImagemin({
      gifsicle: {
        optimizationLevel: 3,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 85,
      },
      pngquant: {
        quality: [0.65, 0.9],
      },
    }),
  ],
})
```
