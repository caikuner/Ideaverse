---
tags: []
up:
related:
companies:
created: 2025-06-20
modified: 2025-06-20
---
以下是关于 Vite 项目启动、配置实践以及插件开发的详细指南，包含代码示例和最佳实践：

---

### 一、Vite 项目启动与基础配置

#### 1. 快速创建项目

```bash
# 使用 npm
npm create vite@latest my-vite-app --template react-ts

# 使用 yarn
yarn create vite my-vite-app --template vue
```

支持模板：`vanilla`、`vue`、`react`、`preact`、`lit`、`svelte`

#### 2. 目录结构

```
my-vite-app/
├── vite.config.ts       # 核心配置文件
├── public/             # 静态资源
├── src/
│   ├── main.tsx        # 入口文件
│   └── App.tsx
├── index.html          # 入口HTML
└── package.json
```

#### 3. 基础配置示例（`vite.config.ts`）

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsInlineLimit: 4096, // 4KB以下资源转base64
    rollupOptions: {
      output: {
        manualChunks: {
          lodash: ['lodash'],
          react: ['react', 'react-dom']
        }
      }
    }
  }
})
```

---

### 二、高级配置实践

#### 1. 环境变量管理

```bash
# .env.development
VITE_API_URL=http://dev.example.com
```

```typescript
// 使用变量
console.log(import.meta.env.VITE_API_URL)
```

#### 2. CSS 处理

```typescript
// vite.config.ts
export default defineConfig({
  css: {
    modules: {
      localsConvention: 'camelCase' // CSS Modules 命名规则
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/vars.scss";` // 全局SCSS变量
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
```

#### 3. 性能优化

```typescript
import { splitVendorChunkPlugin } from 'vite'

export default defineConfig({
  plugins: [
    splitVendorChunkPlugin(),
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
  build: {
    chunkSizeWarningLimit: 1000, // 块大小警告阈值
    reportCompressedSize: false   // 禁用gzip大小报告
  }
})
```

---

### 三、自定义插件开发

#### 1. 插件基础结构

```typescript
// plugins/my-plugin.ts
import type { Plugin } from 'vite'

interface Options {
  prefix?: string
}

export default function myPlugin(options: Options = {}): Plugin {
  return {
    name: 'vite-plugin-my',
    
    // 转换代码
    transform(code, id) {
      if (!id.endsWith('.vue') && !id.endsWith('.tsx')) return
      
      return code.replace(
        /console\.log\(('.*?'|".*?")\)/g, 
        `console.log('${options.prefix || 'DEBUG'}: $1')`
      )
    },
    
    // 修改index.html
    transformIndexHtml(html) {
      return html.replace(
        '<title>',
        `<title>${options.prefix || ''} `
      )
    }
  }
}
```

#### 2. 实际插件案例 - 自动生成路由

```typescript
// plugins/auto-routes.ts
import fs from 'fs'
import path from 'path'

export default function autoRoutes(): Plugin {
  return {
    name: 'vite-plugin-auto-routes',
    
    configureServer(server) {
      const routesDir = path.join(process.cwd(), 'src/pages')
      
      server.watcher.on('all', (event, filePath) => {
        if (filePath.includes(routesDir) {
          generateRouteFiles(routesDir)
        }
      })
    },
    
    buildStart() {
      generateRouteFiles(path.join(process.cwd(), 'src/pages'))
    }
  }
}

function generateRouteFiles(dir: string) {
  const files = fs.readdirSync(dir)
  const imports = files.map(f => `import ${f} from '${dir}/${f}'`).join('\n')
  const routes = `export default [${files.map(f => `{ path: '/${f}', component: ${f} }`).join(',')}]`
  
  fs.writeFileSync(
    path.join(process.cwd(), 'src/routes.ts'),
    `${imports}\n\n${routes}`
  )
}
```

#### 3. 组合插件使用

```typescript
// vite.config.ts
import myPlugin from './plugins/my-plugin'
import autoRoutes from './plugins/auto-routes'

export default defineConfig({
  plugins: [
    react(),
    myPlugin({ prefix: '[DEV]' }),
    autoRoutes()
  ]
})
```

---

### 四、实用插件推荐

| **插件**                  | **功能**                          | 安装命令                          |
|---------------------------|-----------------------------------|----------------------------------|
| vite-plugin-pwa           | PWA 支持                          | `npm i vite-plugin-pwa -D`       |
| vite-plugin-svg-icons     | SVG 雪碧图                        | `npm i vite-plugin-svg-icons -D` |
| vite-plugin-mock          | API Mock                         | `npm i vite-plugin-mock -D`      |
| vite-plugin-compression   | Gzip/Brotli 压缩                  | `npm i vite-plugin-compression -D` |
| vite-plugin-inspect       | 调试构建过程                     | `npm i vite-plugin-inspect -D`   |

---

### 五、调试技巧

#### 1. 查看插件执行顺序

```bash
npx vite --debug
```

#### 2. 使用 inspect 插件

```typescript
import inspect from 'vite-plugin-inspect'

// vite.config.ts
plugins: [
  inspect() // 访问 http://localhost:3000/__inspect/
]
```

#### 3. 性能分析

```bash
# 生成构建性能报告
npx vite build --profile
```

---

### 六、最佳实践

1. **开发环境优化**

   ```typescript
   server: {
     hmr: {
       overlay: false // 禁用错误遮罩
     },
     fs: {
       strict: false // 解决monorepo链接问题
     }
   }
   ```

2. **生产环境优化**

   ```typescript
   build: {
     terserOptions: {
       compress: {
         drop_console: true // 移除console
       }
     }
   }
   ```

3. **多环境配置**

   ```typescript
   // vite.config.prod.ts
   import { mergeConfig } from 'vite'
   import baseConfig from './vite.config'

   export default mergeConfig(baseConfig, {
     build: { minify: 'terser' }
   })
   ```

---

通过以上实践，你可以：
- 快速搭建现代化 Vite 项目
- 根据需求灵活配置
- 开发定制化插件解决特定问题
- 优化开发和生产体验

Vite 的插件系统基于 Rollup，但提供了更多针对开发时的钩子（如 `configureServer`），这使得它既能处理构建优化，也能增强开发体验。
