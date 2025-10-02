---
tags: []
up: 
related: 
companies:
created: 2025-06-16
modified: 2025-06-26
---

> Q: 写过 webpack 插件吗

```js
class MyWebpackPlugin {
  constructor(options) {
    // 接收配置选项
    this.options = options || {};
  }

  apply(compiler) {
    // 在这里挂载webpack生命周期钩子
    compiler.hooks.done.tap('MyWebpackPlugin', (stats) => {
      console.log('MyWebpackPlugin: 编译完成!');
      if (this.options.message) {
        console.log(this.options.message);
      }
    });
  }
}

module.exports = MyWebpackPlugin;
```

```js
// use
const MyWebpackPlugin = require('./MyWebpackPlugin');

module.exports = {
  // …其他webpack配置
  plugins: [
    new MyWebpackPlugin({
      message: '这是我的第一个webpack插件!'
    })
  ]
};
```
