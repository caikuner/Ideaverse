---
tags: []
up:
related:
companies:
created: 2025-06-19
modified: 2025-06-19
---

## 样式的来源和引入

### 样式的五种来源

我们的的样式有这些来源：

- **默认继承**来的样式
  - 有继承性的元素浏览器会让他默认继承，当然开发者自己加的 inherit 不在此列
  - 最近的祖先优先级别比远的高
  - 自身的样式级别优先于继承的
- **HTML 默认**样式
  - 比如各种标签 div{ display:block;} 都是 HTML 标准实现的
- **浏览器默认**样式
  - 比如各浏览器为了基本的美观加入了一些默认的 margin padding 等
- **开发者开发**的样式
  - 由于上面浏览器默认样式的存在，开发时为了各浏览器表现一致，要先进行初始样式标准化 normalize.css
  - 外部样式表、内嵌样式表、行内样式
- **使用者自定义**的样式
  - 比如用户个人通过浏览器插件定义的

上面五种，从上到下就是页面加载时引用的顺序，后者覆盖前者，直观上后者优先级别高。

### 开发者样式引入的四种方式

- @import
- `@import url("./style.css") or @import "./style.css"`
- 普通 CSS 中的 @import 只能放在代码最顶层；且会阻塞页面渲染，因为会当作文件去 import。
- 另外，由于它在顶层先引用，当然会被后面的样式覆盖 (如果重复)。
- 预处理器如 SCSS 中也有@import 语法糖，但是在编译时就会合并生成为同一个 css 文件，然后我们的打包工具 link 引入，就不会有阻塞渲染的情况
- 在预处理器 SCSS 中，下面的情况会当成普通 CSS 的语句：
- 文件拓展名是 .css；
- 文件名以 http:// 开头；
- 文件名是 url()；
- @import 包含 media queries。
- 外部引用样式表：link 标签
- `<link rel="stylesheet" type="text/css" href="style.css" />`
- link 方式引入的只会当作一种引用和链接关系的资源，浏览器认为它不是那么重要，所以不会先去下载，因此不会阻塞页面渲染
- 文档内嵌样式表：style 标签

`<style>.classname {width: 100px;} </style>`

- 内联式：

`<div style="width:100px;"></div>`

上面四种方式，基本上也是从上到下，优先级别渐高。

### link 和 @import 有什么不同

两者都是引用外部 CSS 的方式，但区别如下：

- link 是 XHTML 标签，除了加载 CSS 外，还可以定义 RSS 等其他事务；@import 属于 CSS 范畴，只能加载 CSS。
- link 是 XHTML 标签，无兼容问题；@import 是在 CSS2.1 提出的，低版本的浏览器不支持。
- **link 引用 CSS 时，在页面载入时同时加载，不会阻塞渲染；@import 需要页面网页完全载入以后加载，阻塞渲染（因为要 import 文件）**。
- link 支持使用 JavaScript 控制 DOM 去改变样式；而@import 不支持。

### FOUC（无样式内容闪烁）

在加载网页的时候，有时会出现短暂的 CSS 样式失效，这种现象称之为文档样式短暂失效 (Flash of Unstyled Content), 简称为 FOUC. 原因大致为：

- 将样式表放在了页面底部
- 普通样式表务必放在 head，它不会阻塞页面的
- 使用了 @import 方法导入样式表
- 相反，使用@import 导入的样式会去优先下载，会阻塞渲染，请尽量尽量不要使用
