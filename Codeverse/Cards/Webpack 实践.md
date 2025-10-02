---
tags: []
up:
related:
companies:
created: 2025-06-20
modified: 2025-06-20
---
以下是关于 Webpack 项目启动、配置实践以及自定义 Loader 和 Plugin 开发的完整指南：

---

### 一、Webpack 项目初始化与基础配置

#### 1. 创建项目并安装 Webpack

```bash
mkdir webpack-demo && cd webpack-demo
npm init -y
npm install webpack webpack-cli webpack-dev-server --save-dev
```

#### 2. 基础目录结构

```
webpack-demo/
├── config/
│   ├── webpack.common.js   # 通用配置
│   ├── webpack.dev.js      # 开发配置
│   └── webpack.prod.js     # 生产配置
├── src/
│   ├── index.js            # 入口文件
│   └── styles/
├── public/
│   └── index.html          # HTML模板
└── package.json
```

#### 3. 基础配置文件示例

```javascript
// config/webpack.common.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    main: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[contenthash].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}
```

#### 4. 环境分离配置

```javascript
// config/webpack.dev.js
const { merge } = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    hot: true,
    open: true,
    port: 3000,
    historyApiFallback: true
  }
})
```

```javascript
// config/webpack.prod.js
const { merge } = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        }
      }
    }
  }
})
```

#### 5. 添加 npm scripts

```json
{
  "scripts": {
    "start": "webpack serve --config config/webpack.dev.js",
    "build": "webpack --config config/webpack.prod.js",
    "analyze": "webpack-bundle-analyzer dist/stats.json"
  }
}
```

---

### 二、高级配置实践

#### 1. 性能优化配置

```javascript
// webpack.prod.js
module.exports = merge(common, {
  performance: {
    hints: 'warning',
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: {
            drop_console: true
          }
        }
      }),
      new CssMinimizerPlugin()
    ],
    runtimeChunk: 'single'
  }
})
```

#### 2. 多页面应用配置

```javascript
// 动态生成多页面配置
const fs = require('fs')
const pages = fs.readdirSync('./src/pages')
  .filter(file => file.endsWith('.js'))
  .map(page => ({
    name: page.replace('.js', ''),
    path: `./src/pages/${page}`
  }))

module.exports = {
  entry: pages.reduce((config, page) => ({
    …config,
    [page.name]: page.path
  }), {}),
  plugins: [
    …pages.map(page => new HtmlWebpackPlugin({
      filename: `${page.name}.html`,
      chunks: [page.name]
    }))
  ]
}
```

#### 3. 模块联邦配置（微前端）

```javascript
// webpack.config.js
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'app1',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/components/Button'
      },
      shared: ['react', 'react-dom']
    })
  ]
}
```

---

### 三、自定义 Loader 开发

#### 1. Markdown 文件加载器

```javascript
// loaders/markdown-loader.js
const marked = require('marked')

module.exports = function(source) {
  this.cacheable && this.cacheable()
  
  // 处理选项
  const options = this.getOptions() || {}
  marked.setOptions(options)
  
  // 返回JS模块
  return `
    import React from 'react'
    export default function() {
      return (
        <div className="markdown">
          ${JSON.stringify(marked.parse(source))}
        </div>
      )
    }
  `
}
```

#### 2. 使用自定义 Loader

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: path.resolve(__dirname, 'loaders/markdown-loader.js'),
            options: {
              breaks: true
            }
          }
        ]
      }
    ]
  },
  resolveLoader: {
    modules: ['node_modules', path.resolve(__dirname, 'loaders')]
  }
}
```

---

### 四、自定义 Plugin 开发

#### 1. 构建时间分析插件

```javascript
// plugins/build-time-plugin.js
class BuildTimePlugin {
  apply(compiler) {
    let startTime
    
    compiler.hooks.beforeRun.tap('BuildTimePlugin', () => {
      startTime = Date.now()
    })
    
    compiler.hooks.done.tap('BuildTimePlugin', stats => {
      const endTime = Date.now()
      const buildTime = (endTime - startTime) / 1000
      
      stats.compilation.errors.forEach(err => {
        console.error('❌ Error:', err.message)
      })
      
      console.log(`✅ Build completed in ${buildTime}s`)
    })
  }
}

module.exports = BuildTimePlugin
```

#### 2. 自动上传 CDN 插件

```javascript
// plugins/cdn-upload-plugin.js
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')

class CDNUploadPlugin {
  constructor(options) {
    this.options = options
    this.s3 = new S3Client(options.awsConfig)
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tapPromise('CDNUploadPlugin', async compilation => {
      const { assets } = compilation
      const uploads = Object.keys(assets).map(async filename => {
        const content = assets[filename].source()
        const command = new PutObjectCommand({
          Bucket: this.options.bucket,
          Key: filename,
          Body: content
        })
        await this.s3.send(command)
      })
      
      await Promise.all(uploads)
      console.log('All assets uploaded to CDN')
    })
  }
}

module.exports = CDNUploadPlugin
```

#### 3. 使用自定义插件

```javascript
// webpack.prod.js
const BuildTimePlugin = require('./plugins/build-time-plugin')
const CDNUploadPlugin = require('./plugins/cdn-upload-plugin')

module.exports = merge(common, {
  plugins: [
    new BuildTimePlugin(),
    new CDNUploadPlugin({
      bucket: 'my-bucket',
      awsConfig: {
        region: 'us-east-1'
      }
    })
  ]
})
```

---

### 五、实用配置技巧

#### 1. 环境变量注入

```javascript
const webpack = require('webpack')

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify(process.env.API_URL)
    })
  ]
}
```

#### 2. 动态加载 Polyfill

```javascript
module.exports = {
  entry: {
    app: ['core-js/stable', './src/index.js']
  }
}
```

#### 3. 自定义解析规则

```javascript
module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      'react': path.resolve(__dirname, './node_modules/react')
    },
    extensions: ['.ts', '.js', '.json']
  }
}
```

---

### 六、调试与分析工具

#### 1. 性能分析

```bash
npm install --save-dev speed-measure-webpack-plugin
```

```javascript
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin()

module.exports = smp.wrap({
  // 正常webpack配置
})
```

#### 2. 依赖图可视化

```bash
npm install --save-dev webpack-bundle-analyzer
```

```javascript
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static'
    })
  ]
}
```

#### 3. 缓存优化

```javascript
module.exports = {
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename]
    }
  }
}
```

---

### 七、最佳实践总结

1. **配置组织**
   - 分离基础/开发/生产配置
   - 使用 `webpack-merge` 合并配置
   - 按功能拆分配置文件（如 `webpack.fonts.js`）

2. **构建优化**
   - 使用 `thread-loader` 并行处理
   - 配置 `cache` 提升二次构建速度
   - 合理使用 `splitChunks`

3. **开发体验**
   - 配置友好的错误提示
   - 使用 `webpack-dashboard` 增强 CLI 界面
   - 设置合理的 `devtool` 选项

4. **插件开发原则**
   - 单一职责原则
   - 合理使用 compiler 和 compilation 钩子
   - 考虑缓存和增量构建

通过以上实践，可以构建出高性能、可维护的 Webpack 配置体系。自定义 Loader 和 Plugin 的开发能力是 Webpack 高级使用的关键，能够解决项目中的特殊需求。
