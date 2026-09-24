---
tags: []
up:
related:
created: 2025-06-12
modified: 2025-06-12
---

**SSR**  
服务端渲染（Server-Side Rendering, SSR）是一种在服务器端生成 HTML 并将其发送到客户端的技术。与传统的客户端渲染（CSR）相比，SSR 可以提供更快的首屏加载速度、更好的 SEO 支持以及更友好的用户体验。

**SSR 的核心优势**

1. **更快的首屏加载** ：
   - SSR 在服务器端生成 HTML，用户无需等待 JavaScript 加载完成即可看到页面内容。
2. **更好的 SEO** ：
   - 搜索引擎可以抓取服务器渲染的完整 HTML 内容，而不是空的 `<div id="root"></div>` 。
3. **更好的用户体验** ：
   - 对于低性能设备或网络较差的用户，SSR 可以提供更快的初始渲染。

**SSR 的基本原理**

1. **服务器端** ：
   - 使用 `ReactDOMServer` 将 React 组件渲染为 HTML 字符串。
   - 将生成的 HTML 字符串嵌入到 HTML 模板中，并发送给客户端。
2. **客户端** ：
   - 客户端接收到 HTML 后，React 会“接管”页面（hydration），使其成为可交互的 SPA（单页应用）。

**React SSR 的框架支持**

最常用的框架就是 Next.js，它是一个基于 React 的全栈开发框架，集成了最新的 React 特性，内置 SSR 支持，可以帮助你快速创建全栈应用。s
