---
aliases: []
tags: ["clippings"]
up:
related:
url: "https://www.mianshipai.com/docs/first-exam/HTTP.html#%E4%BB%80%E4%B9%88%E6%98%AF%E8%B7%A8%E5%9F%9F-%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E8%B7%A8%E5%9F%9F%E9%80%9A%E8%AE%AF"
author:
created: 2025-06-13
modified: 2025-06-15
published:
description:
---

### RESTful API

[链接](https://www.runoob.com/w3cnote/restful-architecture.html) RESTful API 是一种软件架构风格，用于设计网络应用程序的接口。主要特点：

资源导向

- 使用 URL 定位资源
- 每个资源都有唯一的 URL
- 资源可以有多种表现形式（如 JSON、XML）

HTTP 方法对应操作

- GET：获取资源
- POST：创建资源
- PUT：更新资源（完整更新）
- PATCH：更新资源（部分更新）
- DELETE：删除资源

无状态

- 服务器不保存客户端状态
- 每个请求包含所需的所有信息
- 有利于横向扩展

统一接口

- 使用标准的 HTTP 方法
- 使用标准的 HTTP 状态码
- 返回格式一致（通常是 JSON）

### GraphQL

[链接](https://graphql.bootcss.com/) GraphQL 是一种用于 API 的查询语言和运行时，由 Facebook 开发。主要特点：

查询灵活性

- 客户端可以精确指定需要哪些数据
- 可以在一个请求中获取多个资源
- 避免了传统 REST API 的过度获取和获取不足问题

类型系统

- 强类型的 Schema 定义
- 自动生成文档
- 开发时有更好的类型提示

单个端点

- 只需要一个 API 端点
- 所有查询都发送到同一个地址
- 通过查询语句区分不同的操作

主要操作类型

- Query：获取数据
- Mutation：修改数据
- Subscription：实时数据订阅

优点

- 减少网络请求
- 避免版本化问题
- 强类型保障
- 更好的开发体验

缺点

- 学习成本较高
- 缓存较为复杂
- 服务端实现复杂度增加

### JSON API

### gRPC

---

### 对比总结

#### 表格对比

| **特性**     | **RESTful API**         | **GraphQL**                             | **JSON API** (标准规范)          | **gRPC**                                  |
| ------------ | ----------------------- | --------------------------------------- | -------------------------------- | ----------------------------------------- |
| **协议**     | HTTP(S)                 | HTTP(S)                                 | HTTP(S)                          | HTTP/2                                    |
| **数据格式** | JSON/XML                | JSON                                    | JSON（严格规范）                 | Protocol Buffers（二进制）                |
| \*\*查询     | 固定端点，返回完整资源  | 客户端自定义查询，按需获取数据          | 固定结构，支持稀疏字段           | 强类型，需预定义服务和方法                |
| **请求**     | GET/POST/PUT/DELETE 等  | POST（所有操作通过查询/变更）           | 遵循 RESTful 方法                | 基于 Protobuf 的远程过程调用（RPC）       |
| **性能**     | 中等（可能多次请求）    | 高（单次请求获取多数据）                | 中等（类似 RESTful）             | **极高**（二进制编码 + HTTP/2 多路复用）  |
| **缓存**     | 完善（HTTP 缓存头）     | 需手动实现                              | 支持 HTTP 缓存                   | 需自定义（无原生缓存机制）                |
| **版本**     | 通过 URL/Header 版本化  | 无版本（通过 Schema 演进）              | 类似 RESTful                     | 通过 Protobuf 文件版本控制                |
| **实时通信** | 需 WebSocket/SSE 扩展   | 需订阅（GraphQL Subscriptions）         | 无原生支持                       | 支持双向流（Streaming）                   |
| **适用**     | 简单 CRUD、资源型操作   | 复杂查询、多端数据聚合                  | 标准化 JSON 响应（如前后端分离） | 微服务通信、高性能内部调用                |
| **生态**     | 丰富（Swagger/OpenAPI） | 完善（Apollo/Relay）                    | 较少（特定框架支持）             | 强大（代码生成、跨语言支持）              |
| **示例**     | `GET /users/1`          | `POST /graphql { user(id:1) { name } }` | `GET /users/1?fields=name,age`   | `rpc GetUser(UserRequest) returns (User)` |

---

#### **关键总结**

1. **RESTful**：
   - **优点**：简单通用、缓存友好。
   - **缺点**：过度获取/欠获取（Over/Under-fetching）；啰哩啰嗦。

2. **GraphQL**：
   - **优点**：灵活查询、减少请求次数。
   - **缺点**：缓存复杂、N+1 查询问题。

3. **JSON API**：
   - **优点**：标准化 JSON 结构，适合前后端协作。
   - **缺点**：灵活性低于 GraphQL。

4. **gRPC**：
   - **优点**：高性能、跨语言、强类型。
   - **缺点**：浏览器支持有限（需 gRPC-Web）。

#### **选择建议**

- **Web 前端**：RESTful（简单）或 GraphQL（复杂数据需求）。
- **移动端**：GraphQL（按需加载）或 RESTful + JSON API。
- **微服务**：gRPC（内部通信） + RESTful（对外暴露）。
- **实时系统**：gRPC（Streaming）或 GraphQL（Subscriptions）。
