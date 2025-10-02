---
tags: []
up:
related:
companies:
created: 2025-06-15
modified: 2025-06-20
---

## Taro 的实现原理

一、JSX 转换：Taro 通过 自定义 Babel/TypeScript 编译器 将 JSX 转换为通用虚拟 DOM。针对不同前端框架（React/Vue），在编译时生成对应框架的运行时代码，例如：

```js
// 输入 
;<View>Hello</View> 

// React 输出 
import { createElement } from 'react' 
createElement('view', {}, 'Hello') 

// Vue 输出 
import { h } from 'vue' 
h('view', {}, 'Hello')
```

二、多端适配：Taro 的核心架构分为 `编译时 和 运行时` ：

1. 编译时：通过 AST 解析将代码按目标平台转换，生成平台专属模板（如.wxml /.swan）
2. 运行时：
	- 实现 统一 API 层（如 Taro.request 映射到 wx.request / my.request）
	- 提供 虚拟 DOM 渲染器，通过 React Reconciler 对接不同平台渲染引擎
	- 实现 事件系统桥接，统一各端事件差异

三、跨端样式处理：Taro 样式处理包含以下关键机制：

1. 条件编译：通过 CSS 注释实现多平台样式隔离
2. 单位转换：将 px 按比例转为目标平台单位（如小程序 rpx）
3. 作用域隔离：通过 CSS Modules 自动生成唯一类名
4. JavaScript 样式：支持 styled-components 等 CSS-in-JS 方案

四、构建系统：Taro 的构建系统特点：

1. 插件化架构：通过 @tarojs/plugin- 前缀插件扩展功能
2. 多编译引擎：
	- Web 端：仍使用 Webpack/Vite
	- 小程序：自研模板生成器
- 按需编译：通过 Tree-shaking 仅打包使用到的组件

五、运行时性能优化：

1. 数据通信优化：
	- 自动合并 setData 调用
	- 使用 差异更新算法 减少数据传输量
2. 渲染优化：
	- 虚拟 DOM 比对后批量更新
	- 组件按平台实现懒加载
3. 包体积优化：
	- 按目标平台裁剪无用代码
	- 使用 分包加载 控制主包大小

## Taro/Uni-app 跨端原理对比

| 框架 | 技术栈 | 微信小程序 | H5 | App | 支付宝/百度小程序 |
| --- | --- | --- | --- | --- | --- |
| Taro | React/Vue | ✅ | ✅ | ✅ | ✅ |
| uni-app | Vue | ✅ | ✅ | ✅ | ✅ |
| WePY | Vue | ✅ | ❌ | ❌ | ❌ |
| mpvue | Vue | ✅ | ✅ | ❌ | ❌ |

**1\. Taro**

京东凹凸实验室

**优缺点**

- Taro 在 App 端使用的是 React Native 的渲染引擎，原生的 UI 体验较好，但据说在实时交互和高响应要求的操作方面不是很理想。 微信小程序方面，结合度感觉没有那么顺滑，有一些常见功能还是需要自己去封装。
- 另外就是开发环境难度稍高，需要自己去搭建 iOS 和 Android 的环境，对于想要一处开发到处应用的傻瓜式操作来讲，稍显繁琐。
- 但 Taro 3 的出现，支持了 React 和 Vue 两种 DSL，适合的人群会更多一点，并且对快应用的支持也更好。

**2\. uni-app**

DCloud

**优缺点**

- uni-app 在 App 渲染方面，提供了原生渲染引擎和小程序引擎的双选方案，加上自身的一些技术优化（renderjs），对于高性能和响应要求的场景展现得更为流畅。
- 另外它整体的开发配套流程也做得很容易上手。比如有丰富的插件市场，使用简单，支持大量常用场景。
- 还比如它的定制 IDE——HBuilder，提供了强大的整合能力。在用 HBuilder 之前，我心想：“还要多装一个编辑器麻烦，再好用能有 VS Code 好用？”用过之后：“真香！”
- 虽然用惯了 VS Code 对比起来还是有一些痛点没有解决，但是对于跨平台开发太友好了，其他缺点都可以忍受。HBuilder 里支持直接跳转到微信开发者工具调试，支持真机实时预览，支持直接打包小程序和 App，零门槛上手。
