---
tags: []
up:
related:
created: 2025-05-15
modified: 2025-05-15
---
Tree Shaking 是一种通过静态分析来移除 JavaScript 上下文中未引用代码的优化技术，它像 " 摇树 " 一样把无用的 " 枯叶 "（未使用的代码）摇落。

## 核心原理

1. **静态分析**：
   - 在编译阶段（而非运行时）分析代码的导入导出关系
   - 通过 ES6 模块的静态结构特性实现（`import/export`）

2. **依赖关系图**：
   - 构建工具（如 Webpack、Rollup）会构建完整的模块依赖图
   - 标记所有被使用的导出（从入口文件开始追踪）

3. **死代码消除**：
   - 删除未被标记的导出代码
   - 保留被直接或间接引用的代码

## 实现条件

1. **必须使用 ES6 模块语法**：

   ```javascript
   // 支持 Tree Shaking 的写法
   import { funcA } from './moduleA';
   export const funcB = () => {…};
   
   // 不支持 Tree Shaking 的写法
   const moduleA = require('./moduleA');
   module.exports = {…};
   ```

2. **配置生产模式**：
   - Webpack 需要设置 `mode: 'production'`
   - 使用 `TerserPlugin` 进行代码压缩

3. **sideEffects 标记**：

   ```json
   // package.json
   {
     "sideEffects": false  // 或指定有副作用的文件数组
   }
   ```

## Webpack 实现机制

1. **标记阶段**：
   - 使用 `HarmonyImportSpecifierDependency` 标记被使用的导出

2. **优化阶段**：
   - 通过 `FlagDependencyUsagePlugin` 识别未使用的依赖
   - 使用 `TerserPlugin` 实际删除未使用代码

3. **作用域提升**：
   - 通过 `ModuleConcatenationPlugin` 将模块提升到单一作用域
   - 增强 Tree Shaking 效果

## 实际示例

假设有以下模块：

```javascript
// math.js
export const add = (a, b) => a + b;
export const minus = (a, b) => a - b;  // 未被使用的导出

// main.js
import { add } from './math';
console.log(add(1, 2));
```

经过 Tree Shaking 后，打包结果将不包含 `minus` 函数。

## 常见误区

1. **动态导入问题**：

   ```javascript
   // 无法静态分析的动态导入会影响 Tree Shaking
   const module = await import(`./${name}.js`);
   ```

2. **副作用代码**：
   - 立即执行的函数、polyfill 等可能被错误保留
   - 需要通过 `/*#__PURE__*/` 注释标记

3. **Babel 转译问题**：
   - 错误的 Babel 配置可能将 ES6 模块转译为 CommonJS
   - 应保留 ES6 模块语法：

     ```json
     // babel.config.js
     {
       "presets": [["@babel/preset-env", { "modules": false }]]
     }
     ```

## 优化建议

1. 使用支持 Tree Shaking 的库（如 Lodash ES 版本）
2. 避免在模块顶层执行具有副作用的代码
3. 合理拆分代码为小模块
4. 定期分析打包结果（使用 `webpack-bundle-analyzer`）

Tree Shaking 能显著减少打包体积，但需要开发者理解其工作原理并正确配置构建工具才能发挥最大效果。

## 如何禁用 treeshaking

禁用 Treeshaking 可能会导致打包后的文件体积增大，因此在生产环境中，应该谨慎考虑。  
在 Webpack 和 Vite 中，都可以通过配置来禁用 Treeshaking，以下是具体方法：

- Webpack

在 Webpack 中，可以通过在 `optimization` 选项中设置 `usedExports` 和 `sideEffects` 来控制 Treeshaking 的行为。如果要完全禁用 Treeshaking，可设置为 `false`：

```
module.exports = {
  // 其他配置项…
  optimization: {
    usedExports: false,
    sideEffects: false
  }
};
```

- Vite

在 Vite 中，可以通过在 `build` 选项中设置 `rollupOptions` 来配置 Rollup 的行为，从而禁用 Treeshaking。示例代码如下：

```
export default {
  // 其他配置项…
  build: {
    rollupOptions: {
      treeshake: false
    }
  }
};
```
