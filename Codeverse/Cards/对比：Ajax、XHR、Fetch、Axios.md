---
tags: []
up:
related:
created: 2025-06-14
modified: 2025-06-14
---

## Fetch 和 XMLHTTPRequest 有什么区别？

语法和使用

- Fetch 基于 Promise，代码更简洁优雅
- XHR 使用回调函数，容易产生回调地狱
- Fetch 的 API 设计更简单现代
- XHR 的 API 设计较老，使用相对复杂

功能特性

- Fetch 默认不发送 cookies，需要配置 credentials
- XHR 默认发送 cookies
- Fetch 不能监听上传进度
- XHR 可以监听上传和下载进度
- Fetch 不能直接取消请求（需要 AbortController）
- XHR 可以通过 abort() 直接取消请求

错误处理

- Fetch 只有网络错误才会 reject，HTTP 错误码不会导致 reject
- XHR 可以处理所有类型的错误，包括 HTTP 错误码

浏览器支持

- Fetch 是现代浏览器标准 API
- XHR 有更好的浏览器兼容性，包括旧版本

## Ajax Fetch Axios 三者有什么区别？

Ajax、Fetch 和 Axios 都是用于发送 HTTP 请求的技术，但有以下区别：

Ajax (Asynchronous JavaScript and XML)

- 是一种技术统称，不是具体的 API
- 最常用的实现是 XMLHttpRequest (XHR)
- 写法比较繁琐，需要手动处理各种状态
- 回调地狱问题
- 不支持 Promise

Fetch

- 浏览器原生 API
- 基于 Promise
- 更简洁的写法
- 不需要额外引入
- 只对网络请求报错，对 400、500 都当做成功的请求
- 默认不带 cookie
- 不支持请求超时控制
- 不支持请求取消
- 不支持请求进度监控

Axios

- 第三方库，需要额外引入
- 基于 Promise
- 支持浏览器和 Node.js
- 请求/响应拦截器
- 自动转换 JSON 数据
- 客户端支持防止 XSRF
- 支持请求取消
- 支持请求超时控制
- 支持请求进度监控
- 支持并发请求
- 自动转换请求和响应数据

使用建议：

- 如果是简单的请求，使用 Fetch 即可
- 如果需要更多功能，建议使用 Axios
- 现代项目中已经很少直接使用 XMLHttpRequest
