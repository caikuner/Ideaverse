---
tags: []
up:
related:
created: 2025-06-14
modified: 2025-06-16
---

[[浏览器：页面加载和渲染过程#javascript 阻塞渲染：使用 defer、ayncs 优化]]

script 标签的 defer 和 async 属性都是用于控制 js 脚本的加载和执行时机：

普通 script

- 阻塞 HTML 解析
- 立即下载并执行脚本
- 按照在文档中出现的顺序执行

defer

- 异步下载脚本，不阻塞 HTML 解析
- 等到 HTML 全部解析完成后，DOMContentLoaded 事件触发前执行
- 多个 defer 脚本按照在文档中的顺序执行
- 适用于：需要操作 DOM 的脚本
- 只对引入的脚本文件有效

async

- 异步下载脚本，不阻塞 HTML 解析
- 下载完成后立即执行，可能在 HTML 解析完成前执行
- 多个 async 脚本的执行顺序不确定，取决于下载完成时间
  
- 适用于: 没有任何依赖的脚本，如统计和广告代码
- 只对引入的脚本文件有效

使用建议：

- 需要操作 DOM 或依赖其他脚本的代码使用 defer
- 独立的、不依赖 DOM 和其他脚本的代码使用 async
- 如果脚本之间有依赖关系，不要使用 async

```js
<!-- 普通脚本 -->
<script src="script.js"></script>

<!-- defer 脚本 -->
<script defer src="script.js"></script>

<!-- async 脚本 -->
<script async src="script.js"></script>
```
