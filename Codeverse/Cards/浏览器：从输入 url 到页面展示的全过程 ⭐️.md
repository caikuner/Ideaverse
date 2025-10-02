---
tags: []
up:
related:
companies:
created: 2025-06-14
modified: 2025-07-14
---

> Q: 详细讲讲从输入 url 到页面展现的全过程

- [[DNS：缓存和域名解析过程]] 缓存 - 递归 - 迭代（根 - 顶级 - 权威）
- [[TCP：简述建立和断开连接的过程]] [[TCP：为什么建立连接需要三次握手]]
    - SYN-SEND，SYN-RECEIVED，ESTABLISHED
    - 断开连接请求，告诉应用层去释放，LAST-ACK，确认应答
- [[HTTP：简述 HTTPS 过程]] [[HTTP：TLS#TLS 1.2 握手过程]] [[HTTP：TLS#TLS 1.3]]
    - Client Random，Server Random，Pre-master secret，三个随机数
- [[HTTP：请求]]、 [[浏览器：跨域]] cors，Access-Control-Allow-(origin,method,header)
- [[浏览器：缓存机制#浏览器缓存策略 ⭐️]] 强 - 协商 - 启发 -servicework 缓存
- [[浏览器：多进程架构和渲染进程的多个线程 ⭐️]]
- [[浏览器：页面加载和渲染过程]] (从接收到文件到页面展示)
    - html 解析 dom，cssdom，渲染树，布局 几何 回流，绘制 外观 分层绘制，合成 帧提交 刷新

---

- [[从输入 URL 到页面 2]] 面试派总结 挺全
- [yuque.com/cai-panpan/fe-interview/femkxa](https://www.yuque.com/cai-panpan/fe-interview/femkxa) 自己总结版 #x/yuque （都是旧的）


**从浏览器进程的角度讲**
- 主进程
	- 获取 url
- 网络请求进程
	- http 缓存
	- dns 缓存 / dns 解析 : IP
	- TCP 连接 (+ TLS 握手)
	- HTTP 请求：重定向？服务器处理，返回响应 HTML
- 渲染 Renderer Process 【注：渲染 DOM 树存疑 ❌】
	- 【从多线程的角度讲】
	- HTML 解析：Renderer Process
	- 遇到子资源 js/css/图片：请求线程，读缓存/下载
	- 把请求回来的 `HTML` 代码经过解析，构建成 `DOM` 树    （字符流 -> token 流 -> DOM 树）
	- 计算 `DOM` 树上的 `CSS` 属性    （DOM 树 -> 包含样式信息的 DOM 树 -> 排版）
	- 不含样式信息的 DOM 树应用 CSS 规则，变成包含样式信息的 DOM 树。
	- 根据样式信息，计算每个元素的位置和大小
	- 实际上，CSS 规则是并不是等 DOM 树构建好了以后，再进行选择并给它添加样式的。而是在解析构建 DOM 时，并行解析 CSS，以影响 DOM 形成 CSSOM，最终执行 js 形成最终的渲染 DOM 树。
	- 根据 `CSS` 属性对每一个元素对应的盒进行渲染，得到内存中的一个个位图 （渲染）

	（出于性能考量，一个可选的步骤是对位图进行合成，这会最大限度减少后续的绘制次数，增加绘制的速度）
	
	- （CSS 性能优化，应该尽量避免 " 重排 " 和 " 重绘 " ）   
- 显示 GPU Process
	- Renderer Process 计算得到的图像帧，交给 GPU Process 将其转化为图像显示到界面

---
