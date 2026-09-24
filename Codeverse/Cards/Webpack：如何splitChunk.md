---
tags: []
up:
related:
created: 2025-05-15
modified: 2025-05-15
---

`splitChunks` 是 Webpack 4 开始引入的代码分割优化配置，用于提取公共代码和拆分 bundle，替代了之前第三方插件 `CommonsChunkPlugin`。

## 核心概念

### 代码分割的三种方式

1. **入口分割**：通过 `entry` 配置手动分离代码
2. **动态导入**：使用 `import()` 语法实现按需加载
3. **splitChunks**：自动提取公共依赖

## 默认配置

Webpack 的默认 `splitChunks` 配置如下：

```javascript
module.exports = {
  optimization: {
    splitChunks: {
      chunks: "async", // 只对异步代码进行分割
      minSize: 20000, // 生成 chunk 的最小体积（字节）
      minRemainingSize: 0,
      minChunks: 1, // 被引用次数
      maxAsyncRequests: 30, // 最大异步请求数
      maxInitialRequests: 30, // 最大初始请求数
      enforceSizeThreshold: 50000,
      cacheGroups: {
        // 缓存组
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
```

## 关键配置项详解

### 1. `chunks` 选项

- `'async'` (默认)：只分割动态导入的模块
- `'initial'`：只分割同步导入的模块
- `'all'`：同时处理同步和异步代码（最常用）

### 2. `minSize` 和 `maxSize`

- `minSize`：生成 chunk 的最小体积（默认 20KB）
- `maxSize`：尝试将大于此值的 chunk 拆分为更小的 chunk

### 3. `cacheGroups` 缓存组

最强大的功能，可以自定义分割规则：

- 其中，priority 数值越大优先级越高，默认组的 priority 是 0

```javascript
cacheGroups: {
  vendor: {
    test: /[[react|react-dom|\\/]][\\/]/,
    name: 'vendor-react',
    priority: 10,
    chunks: 'all'
  },
  utils: {
    test: /[\\/]src[\\/]utils[\\/]/,
    name: 'utils',
    // priority: 0, // 默认
    chunks: 'all',
    minSize: 0 // 即使很小也提取
  }
}
```

## 常用配置方案

### 1. 基础优化配置

```javascript
splitChunks: {
  chunks: 'all',
  minSize: 30000, // 30KB
  maxSize: 244000, // 244KB
  minChunks: 1,
  cacheGroups: {
    vendors: {
      test: /[\\/]node_modules[\\/]/,
      priority: -10,
      name: 'vendors'
    },
    common: {
      minChunks: 2,
      priority: -20,
      reuseExistingChunk: true
    }
  }
}
```

### 2. 按组件拆分

```javascript
cacheGroups: {
  react: {
    test: /[[react|react-dom|\\/]][\\/]/,
    name: 'react-vendor',
    chunks: 'all'
  },
  lodash: {
    test: /[\\/]node_modules[\\/]lodash[\\/]/,
    name: 'lodash-vendor',
    chunks: 'all'
  }
}
```

## 最佳实践

1. **合理设置 `minSize`**：避免生成过多小文件
2. **给高频更新和低频更新的代码分组**：

   ```javascript
   cacheGroups: {
     core: {
       test: /[[react|react-dom|redux|\\/]]/,
       name: 'core'
     }
   }
   ```

3. **配合 `runtimeChunk` 使用**：

   ```javascript
   optimization: {
     runtimeChunk: "single";
   }
   ```

4. **使用 `name` 函数动态生成名称**：

   ```javascript
   name(module, chunks, cacheGroupKey) {
     return `${cacheGroupKey}-${chunks.map(c => c.name).join('~')}`;
   }
   ```

## 效果验证

使用 `webpack-bundle-analyzer` 分析打包结果：

```javascript
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  plugins: [new BundleAnalyzerPlugin()],
};
```

## 常见问题解决

1. **分割过度**：调整 `minSize` 和 `maxAsyncRequests`
2. **未按预期分割**：
   - 检查 `chunks` 设置是否正确
   - 确认模块确实被多个入口引用
3. **HMR 热更新失效**：确保 runtime 代码被正确提取

通过合理配置 `splitChunks` 可以显著优化应用加载性能，通常能减少 20%-40% 的初始加载体积。
