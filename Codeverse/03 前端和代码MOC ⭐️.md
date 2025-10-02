---
tags: []
up: 
related: 
companies:
created: 2025-04-03
modified: 2025-07-17
---

| 经验年限 | 重点                                   | 详情                                                                                            |
| ---- | ------------------------------------ | --------------------------------------------------------------------------------------------- |
| 0-3  | 计算机基础知识<br>现代前端技术栈<br>工程化流程<br>广度和深度 | 高级 JavaScript 与 TypeScript 编程<br>Vue 与 React 全家桶使用和原理<br>优化 Webpack/Vite 配置与构建流程<br>全面的前端性能优化 |
| 3-5  | 技术栈高阶特性<br>全套前端工程化<br>系统设计和工程架构      | 技术栈补全<br>实施前端工程化与持续集成<br>代码质量和可维护、可观测性<br>开发工具与调试、项目实战经验<br>                                  |
| 5 +  | 技术的应用<br>项目的推动落地<br>团队管理能力           |                                                                                               |

## 代码能力 ⭐️

> [!abstract]- 代码能力最重要，比八股重要
> 1. 最常考的还是前端手写代码；算法也考，但比重不高。建议权重 7:3
> 2. 算法，面试前一定针对公司刷刷 codetop.cc
> 3. 刷题操作请一律使用 VSCode 打开 `./Codebase` 文件夹进行

[[+todo code ⭐️]] #todo

### JS 手写代码实现

#x/面试派 #todo [[JS 手写代码｜前端面试派]]

- [[JS 读代码看输出 ⭐️]]
- 前端手写代码题 (`#handcode`)

```dataview  or "Codebase"
TABLE rank,tags
FROM #handcode
WHERE !startswith(file.path, "X/") and file.path != this.file.path 
SORT tags,rank DESC,file.name ASC
limit 50
```

- 变量、数据类型、继承、原型链
	- [[手写深拷贝]]
	- [[手写 getType 函数]]
	- 手写 sizeof
	- [[手写 new]]
	- [[手写 instanceOf]]
	- [[手写 call、apply​、bind]]
	- [[手写 ES6 Class 继承 polyfill]]
	- [[实现 class 继承]]
- Array、Object、Function
	- [[手写数组去重]] [[array.uniq.js]]
	- [[手写数组扁平化 Flatten]] [[array.flat.js]]
	- 手写 Array.group [[array.group.js]]
	- [[手写 filter、map、reduce]] [[array.map.js]] [[array.reduce.js]] [[array.filter.js]]
	- [[手写柯里化 Curry]] [[curry.js]]
	- [[手写函数组合 Compose、Pipe]] [[compose_pipe.js]]
	- [[实现链式调用]]
	- [[手写防抖节流 Debounce、Throttle]] [[debounce.js]] [[throttle.js]]
- [[手写 Promise 系列]]
	- [[promise.js]]
	- [[手写 Promise.all]] [[promise.all.js]]
	- 手写 Promise.any [[promise.any.js]]
	- [[手写 Promise.race]] [[promise.race.js]]
	- [[手写 Promise.allSettled]] [[promise.allSettled.js]]
	- [[手写 poromisify]] [[promisify.js]]
	- [[async_await.js]]
- 框架
	- [[React：实现 todo list]]
	- [[React：实现 useCountTimer Hook]]
	- [[React：实现 useRequest Hook]]
	- [[React：Redux 3.实现一个 mini-redux]]
	- [[Vue3：实现 useCount]]
	- [[Vues3：实现 useRequest]]
	- [[手写 VNode 对象，表示DOM 节点]]
- 场景题
	- [[实现上传文件，使用 fetch 或 axios]]
	- [[实现数组和树互转]]
	- [[实现解析 URL 参数]]
	- 实现请求并发控制 /实现 Promise.limit
		- [[实现批量请求队列法]]
		- promise 法
		- promise 队列法，支持链式调用
	- 实现红绿灯 [[trafficLight.js]]
	- 实现一个 LazyMan [[lazyMan.js]]
	- [[实现 EventBus 事件总线 ⭐️]]
	- [[实现 LRU 缓存]]
	- [[实现图片懒加载]]
	- 实现三级级联组件
	- 实现一个日志上报系统的功能函数，允许日志按比例采样、定时/定量上报
- 设计模式
    - [[实现发布订阅模式]] ⭐️
    - [[React：Redux 3.实现一个 mini-redux]] ⭐️
    - [[实现观察者模式]]
    - [[实现单例模式]]
- 正则表达式

---

### 数据结构和算法

`#algo`

[[20250615 数据结构和算法 前端面试派]] #x/面试派

- [[前端常见数据结构及其应用]]
- [[算法：时空复杂度]]

```dataview 汇总 #tag, 按照 rank+tags 排序
LIST
FROM #algo or "Codebase"
WHERE !startswith(file.path, "X/") and file.path != this.file.path 
SORT rank DESC,tags,file.name ASC
limit 100
```

---

## 计算机基础

[[计算机基础  前端面试派]] #x/面试派

[[计算机：进程、线程]]

计算机组成
操作系统
计算机网络

## 前端基础

### HTML

- [[20250616 HTML 和 CSS]] #x/面试派 #todo

### CSS

- 基础原理
	- [[CSS：继承]]
	- [[CSS：样式来源和引入]]
	- [[CSS：优先级]]
    	- 选择器优先级：**!important > 内联样式** > **ID 选择器** **>** **类选择器 = 属性选择器 =** **伪类选择器 >** **标签选择器** **= 伪元素选择器** **>** **通配选择器** >**HTML 和浏览器默认样式** > 默认**继承来的**
	- [[CSS：层叠顺序]]
- 布局相关
	- [[CSS：盒模型]]
		- content-box：默认，只含内容，不含 padding，border， margin
		- border-box，包含 padding，border，不含 margin
	- [[CSS：BFC、IFC]]
	- [[CSS：position]]
	- [[CSS：float]]
    - inline，block
    - [[CSS：Flex]] ⭐️
        - [[CSS：Flex：1]]
    - [[CSS：Grid]]
- 重要特性
	- Transform
	- Transition
	- [[CSS：animation]]
- 使用属性
    - [[CSS：相对单位]]
    - [[CSS：隐藏元素的方法]]
- 兼容适配
    - 媒体查询
    - autoprefix

#### 样式实现

- [[CSS：水平垂直居中]]
- 写一个动画
- 清除浮动 [[CSS：BFC、IFC#用来清除浮动]]
- 主题：css 变量
- [[CSS：圣杯布局]]
- [[CSS：实现一个三角形]]
- [[移动端：1px 问题]]
- [[CSS：毛玻璃特效]]

### JavaScript (ECMAScript) ⭐️

 [[JS 基础知识 前端面试派]] #x/面试派

- ES6 新特性
- 数据类型
	- 值类型和引用类型
	- [[JS：浮点数问题]]
	- 对象 API
		- [[对象：获取属性的方法]]
		- [[对象：解构赋值]]
	- 数组 API
- 变量、作用域
	- 变量提升和函数声明提升 => 解决循环调用；但带来了复杂的作用域/this 问题
	- 作用域、var Vs. let
	- [[JS：理解闭包]]
- 执行上下文和作用域
- 函数
	- [[JS：箭头函数 VS. 普通函数]]
	- [[JS：call、apply、bind]]
	- [[JS：this 指向问题]]
- 面向对象
	- [[JS：理解原型和原型链]]
		- class 的链条
	- [[JS：new 的过程]]
	- [[JS：实现继承的七种方式]]
	- [[JS：代理]]
	- 代理、反射
- 函数式编程
	- 高阶函数（如 `map`、`filter`、`reduce`）
	- 柯里化及其应用 [[curry.js]]
	- 函数组合 [[compose_pipe.js]]
	- 函数 API
- 异步编程方案
	- 回调
	- [[JS：理解Promise]]
	- async/await
	- [[setTimeout 不准怎么办]]
	- [[requestAnimationFrame]]
- 事件循环机制
	- [[浏览器：事件循环机制]]
	- [[Node.js：事件循环机制]]
- 模块化方案
	- [[模块化历程]]
	- [[Commonjs 和 esm 区别；如何处理循环依赖的]]
- JS 引擎底层原理
	- [[JS：JS堆栈 VS. V8堆栈]]
	- [[JS：解释型语言的执行环节]]

### 浏览器过程和渲染原理 ⭐️

- [[浏览器：事件绑定]]
- [[前端异常错误捕获全指南]]
- [[浏览器：前端持久存储]]，[[Service Worker 缓存]]
- [[浏览器：Cookie]]
- [[浏览器：缓存机制]]
- [[浏览器：跨域]]（跨域是浏览器限制）
  
- 浏览器：加载和渲染原理
	- [[浏览器：组成结构]]
	- [[浏览器：多进程架构和渲染进程的多个线程 ⭐️]]
	- [[浏览器：帧原理]]， [[保持 FPS 60 帧]]
	- [[浏览器：页面加载和渲染过程]]
		- [[浏览器：Script 标签的 defer 和 async 的作用]]
		- [[浏览器：页面资源预取预渲染 dnsfetch、prefetch、prerender、preload]]
  
	- [[网页性能优化总结]]，[[内存管理优化]]
	  
- 浏览器：内存管理
    - V8 的内存管理机制
    - [[内存管理优化]]
    - [[Node.js 处理线上内存泄露问题]]
  
- DOM 文档操作模型
- BOM 浏览器环境 API
	- [[浏览器：同源标签页如何跨页面通信]]
	- [[Web Worker 类型及使用场景全面介绍]]
	- [[JS：Message Channel]]
	- …

### TypeScript

- [[TypeScript：面试题汇总]]

## 网络和请求

> Ajax、HTTP 、API、缓存等 是前后端沟通的桥梁，不管面试还是实际开发都是重点

### 计算机网络

- [[网络参考模型]]
- 应用层
	- HTTP & HTTPS ⭐️ - 开发最常用
		- [[HTTP：请求]]
			- [[HTTP：OPTIONS 请求]]
		- [[HTTP：1&2&3]]
			- [[HTTP：基于 UDP 的 HTTP3 是如何保证可靠的]]
		- [[HTTP：TLS]]
			- [[HTTP：简述 HTTPS 过程]]
	- DNS
		- [[DNS：缓存和域名解析过程]]
		- [[DNS：负载均衡]]
	- [[CDN]]
	- Nginx
		- Nginx 反向代理、负载均衡
		- [[Nginx：如何实现流量按比例分发]]
- 传输层
	- [[TCP]]
		- [[TCP：简述建立和断开连接的过程]]
		- [[TCP：为什么建立连接需要三次握手]]
		- 停止等待 ARQ，连续 ARQ
		- 流量控制: 滑动窗口
		- 拥塞处理：慢开始，拥塞避免，快速重传，快速恢复。
	- [[UDP]]
	- [[对比：TCP vs. UDP]]
- 网络层
	- 子网划分
- 网络接口层
	- 以太网发展阶段

### Ajax

- [[请求：xhr-fetch-axios]]
- [[对比：Ajax、XHR、Fetch、Axios]]
- [[业务：如何做全局的请求封装]] ⭐️
- [[React：实现 useRequest Hook]]

### API

Roadmap：[API Design Roadmap](https://roadmap.sh/api-design)

- [[API：风格]] | RESTfull,GraphQL,JSONAPI,gRPC
- Real-Time API
	- [[Polling]]
	- [[WebSocket]]
		- [[对比：WebSocket 协议 vs. HTTP 协议]]
	- [[Server-Sent Events(SSE)]]
	- [[对比：WebSocket、SSE、Polling]]
- API：身份认证·登录
	- [[API：身份认证]] (cookie+session, jwt token)
	- [[API：三种便捷登录方式]] (OAuth，扫码，单点)
- [[API：权限验证]]
	- 权限模型 RBAC，ABAC
- Mock 数据

### 安全、加密

- [[安全：OWASP Top 10]]
- [[安全：前端常见的安全攻防]] ⭐️
- 加密：常见加密算法总结 - #todo #x/yuque [yuque.com/cai-panpan/fe-interview/cb3lwp](https://www.yuque.com/cai-panpan/fe-interview/cb3lwp)

### 网络调试

- 工具
	- wireshark
	- whistle
	- fiddler
	- charles
- [[移动端：H5 如何抓包]]
- 远程调试

## 前端框架 ⭐️

### 框架通识

- [[前端框架：MVVM 架构]]
- [[前端框架：Virtual DOM]]
- [[前端框架：路由原理]]
- 前端框架：状态管理和数据流
- 前端框架：对比 Vue vs. React vs. Solid

### React

[[React：基本概念]]

#### 状态 state & 属性 props

- [[React：state 不可变原则|React：state 不可变原则]]
- [[React：state 合并特性]]
- [[React：setState 是同步还是异步的]]
    - [[React：如何让 setState同步执行]]
    - [[setState 后发生了什么]]⭐️
- [[React：单向数据流原则|React：单向数据流原则｜不要直接修改 props]]
- [[React：state 和 props 有什么区别]]

> 总结:
> - state：数据不可变；state 合并；异步 setState
> - props：单项数据流；不要直接修改 props

#### 组件和生命周期

- [[React：组件生命周期及hooks模拟]]
- [[React：父子组件生命周期调用顺序]]
- [[React：组件通信方式]]
- [[React：受控和非受控组件]]
- [[React：组件销毁有哪几种方式]]

#### Hooks

- [[React：hooks使用注意事项、闭包陷阱]]
- [[React：有哪些内置hooks]]
- [[React：useEffect vs. useLayoutEffect]]
- [[React：dev 模式下 useEffect 为什么执行两次]]
- React：自定义 hook
	- [[React：实现 useCountTimer Hook]]
	- [[React：实现 useWindowResize Hook]]
	- [[React：实现 useRequest Hook]]

#### 最佳实践

- 性能优化
	- [[React：可以做哪些性能优化]]
	- [[todo：React：性能优化原则 a1]]
- 错误处理
	- [[React：如何统一监听 React 组件错误]]
- 路由
	- React Router
- 状态管理
	- [[React：用过哪些状态管理库]]
	- [[React：Redux1.基本使用和工作流程]]
	- [[React：Redux2.用过哪些中间件]]
	- [[React：Redux 3.实现一个 mini-redux]]
	- Zustand
- 服务端渲染
	- [[React：用过 SSR 服务端渲染吗]]
	- [[React：SSR vs. SSG]]
- [[React：v19有哪些升级]]

#### 底层原理

- 并发模式
    - [[React：并发模式]]
- 虚拟 DOM（Virtual DOM）& Fiber 架构
	- [[React：JSX 的本质]]
	- [[React：如何理解 React Fiber 架构]] ⭐️⭐️
	- [[React：Fiber 架构 vs. 之前的虚拟 DOM 架构]]
	- [[React：React FiberNode vs. Vue VNode]]
	- [[React：为何 Hooks 不能放在条件或循环之内]]
- 渲染原理 ⭐️
	- [[React：Reconciliation 协调的过程]]
	- [[React：Diff 算法，并对比 Vue]]
	- [[React：循环中为何要使用 key]]
	- [[React：batchUpdate 批量更新机制]]8
	- ~~React：事务机制（v16-）~~
	- [[React：Concurrency 并发机制]]
	- [[React：commit 阶段的双缓存优化]]
	- [[React：组件渲染和更新的全过程]]
	- [[React：原理简介]]
- 事件机制
	- [[React：合成事件机制 (SyntheticEvent)]] ⭐️
	- [[React：合成事件和 DOM 事件区别]]
- hooks 底层实现
	- [[React：useEffect 的底层是如何实现的]]
	- [[React：useState 的底层是如何实现的]]

### Vue

#x/面试派 #todo
[[Vue 使用 前端面试派]]
[[Vue 原理 前端面试派]]


- [[Vue3 的数组如何实现响应式的]]

---

## 前端工程化

> 前端工程化通过自动化工具和标准化流程，提升开发效率、代码质量和可维护性。其核心目标是优化开发、构建、测试和部署流程，减少人工干预和重复劳动，便于项目扩展和团队协作。

[[如何从零搭建前端项目 ⭐️]]
[[前端工程化实践]]
[[Monorepo 实践指南]]
Tubrorepo
[[微前端原理与实践指南]]

### 包管理和库管理

- npm vs. yarn 、pnpm、corepack
- Monorepo、Tuborepo、Nx
- [[npm：如何发布 npm 包]]

### Build：Vite & Webpack

- [[前端分包策略]]
- [[Webpack 实践]]， [[Vite 实践]]
  
- [[Vite：面试汇总]]
- [[Vite：构建流程]]
- [[Vite：性能优化]]
- [[Vite：热更新原理]]
- [[Vite：插件开发流程]]
- [[todo：Vite：原理与实践]]
- [[Vite：兼容性问题]]
  
- [[Webpack：面试汇总]]
- [[Webpack：原理与实践]]
- [[Webpack：构建流程]]
- Webpack：loader & plugin
- [[Webpack：性能优化]]
	- [[Webpack：Treeshaking 原理以及如何禁用]]
	- [[Webpack：如何splitChunk]]
- Webpack：热更新原理
- [[Webpack：写一个插件]]
  
- [[实现一个小型打包工具]] （不太重要）
  
- 浏览器兼容性：browserlist，babel（preset-env），autoprefix

### 技术栈集成

- 路由
    - tanstack/vue/react router
- 状态管理
    - vue pinia
    - react zustand
- 请求
    - axios
    - react query
    - tanstck query
- 现代 CSS 工具
    - 预处理器
    - 后处理器
    - CSS-in-JS、CSS Module
    - Tailwind/UnoCSS
- 组件库
    - Shadcn
    - element
    - antd
- 动画
    - frame motion
    - react bits

### Bundler

- Babel
- esbuild
- Rolldown
- SWC

### Linter

- eslint
- prettier
- oxc

### 测试工具

- Vitest
- Playwright

### CI/CD

- [[CI·CD：什么是]]
- Docker
- Vercel

### 微前端

## 系统设计和工程能力 ⭐️

> 3 年经验以上、三面 Leader 重点考察

### 性能优化

- [[性能优化：浏览器网页性能指标]]
- [[性能优化：前端全链路 ⭐️]]
- 性能优化：如何优化首屏
- 性能优化：如何做 SEO
- [[性能优化：长列表大数据渲染优化方案]]

### 质量和可维护性

质量：代码质量
可观测性：指标、监控
安全、稳定：上线流程、灰度、回滚、快速修复
可维护性：codereview、代码规范、项目结构、文档

- [[前端灰度发布与快速回滚]]
    - [[Nginx：如何实现流量按比例分发]]
    - [[Apollo：基于 Apollo 配置中心的实时流量调整方案]]
- 热更新
    - [[动态更新版本和模块 + servicework 缓存控制]]
    - [[前端模块级热更新（Module-Level Hot Update）]]
      
- 可观测性：监控 （用户行为，性能监控，错误监控，业务行为 => 日志上报）
    - [[前端监控系统]]
    - [[RUM（真实用户监控）]]
    - [[前端异常错误捕获全指南]]
    - [[前端错误监控与快速修复]]
    - 业务行为和指标？
    - [[前端日志上报系统]]
      
- [[稳定性：如何考虑前端稳定性]]
      
- [[安全：前端常见的安全攻防]]
- [[如何实现图片防盗链]]
- [[如何防止缓存在 CDN 上的视频被盗版]]

### 工程化

> 项目搭建、研发流程、技术选型

- [[浏览器：从输入 url 到页面展示的全过程 ⭐️]]
- [[如何从零搭建前端项目 ⭐️]]
- [[前端工程化实践]]
- [[工程：前端开发规范]]
- [[todo 工程：Code Review 规范]]
- [[工程：用分层结构扩展你的 React 项目]]
- [[研发流程：做过哪些提效工具]]
- [[工程：前端有哪些最新技术]]
    - vite，rolldown
    - vue vopar
    - nginx 支持 quickjs，支持完整的 es2023 语法

### 系统设计、设计模式

- 系统设计、软件设计 ⭐️
- 设计模式
    - [[前端常见设计模式及其应用]]
    - [[对比：观察者模式和发布订阅模式]]

### 业务实践和项目经验

- [[业务：如何搭建一个 UI 组件库]]
- [[业务：如何设计一个文件上传功能]]
- [[业务：如何设计一个文件下载功能]]
- [[业务：如何处理大文件上传和下载]]
- [[设计一个可视化拖拽搭建平台的技术方案]]

### AI 和大模型

- [[401 AI全家桶]]
- [[你了解 AI 吗]]
- [[AI：MCP-streamable http]]

[[大模型入门指南.canvas|大模型入门指南]]

---

## 服务端环境

### Nodejs/Bun/Deno

- [[Node.js：事件循环机制]]
- [[Node.js：常见面试题]]
- [[Node.js 处理线上内存泄露问题]]

### 数据库

- [[MySQL：事务操作]]
- [[MySQL：如何加行锁]]

### Redis

[[Redis：为什么快]]

### 消息队列

### 分布式

## 跨端开发

### Taro

[[Taro的实现原理]]
[[Taro·Uniapp 的差量更新机制]]

### 移动端 H5

- [[移动端：适配方案]]
- [[移动端：1px 问题]]
- 40 条移动端排坑指南🌟 #todo #x/yuque [yuque.com/cai-panpan/fe-interview/92249bba-a9d6-438e-b059-0fc6bbc3e382](https://www.yuque.com/cai-panpan/fe-interview/92249bba-a9d6-438e-b059-0fc6bbc3e382)
- [[了解 H5 开发吗]]
- [[移动端：底部安全区如何设置]]

### 小程序

[[20250615 小程序 前端面试派]] #x/面试派 #todo

### 鸿蒙

### 桌面端

[[PWA：如何快速转换成 PWA]]

## 工具和调试

### Linux 命令行

### Git

- [[Git：命令清单]]
- [[Git：pull vs. fetch]]
- [[Git：rebase vs. merge]]
- [[Git：cherry-pick]]

### 开发工具

- [[浏览器：Devtools]]
- 网络抓包调试工具
- 远程调试 工具
- VSCode
- VIM
- Tmux
- …
