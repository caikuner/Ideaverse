---
tags: []
up:
related:
created: 2025-06-13
modified: 2025-07-17
---

### HTTP 请求的构成

HTTP 请求由三部分构成，分别为：

- 请求行：由请求方法、URL、协议版本组成
- 首部：请求和返回携带的头部信息
- 实体：请求和返回携带的数据实体（和 header 间空行）

```http

GET /api/users?id=123 HTTP/1.1
Host: example.com
User-Agent: Mozilla/5.0
Accept: application/json
```

```http
POST /api/users HTTP/1.1
Host: example.com
Content-Type: application/json
Authorization: Bearer token123

{"name": "Alice", "age": 25}
```

协议版本见 [[HTTP：1&2&3]]

#### URL 构成

URL (Uniform Resource Locator) 包含以下部分：

1. 协议 (protocol)：如 `http://`、`https://`、`ftp://` 等
2. 域名 (domain)：如 `www.example.com`
   - 子域名：`www`
   - 主域名：`example`
   - 顶级域名：`com`

3. 端口号 (port)：如 `:80`、`:443`（可选，HTTP 默认 80，HTTPS 默认 443）
4. 路径 (path)：如 `/blog/article`
5. 查询参数 (query string)：如 `?id=123&name=test`
6. 锚点/片段标识符 (fragment)：如 `#header`

其中，同源域名是指：协议、域名、端口 都相同

### 请求方法

> 问题：Post 和 Get 的区别？

请求方法分为很多种：`GET`、`POST`、`PUT`、`DELETE`、`OPTIONS`
这些方法更多的是传达一个语义，而不是说 `Post` 能做的事情 `Get` 就不能做。

#### 副作用和幂等

- 副作用指对服务器上的资源做改变
  - 比如搜索是无副作用的，注册是副作用的。
- 幂等指发送 M 和 N 次请求（两者不相同且都大于 1），**服务器上资源的状态一致**
  - 比如注册 10 个和 11 个帐号是不幂等的，对文章进行更改 10 次和 11 次是幂等的。因为前者是多了一个账号（资源），后者只是更新同一个资源。

在规范的应用场景上说：

- Get 多用于无副作用，幂等的场景，例如搜索关键字。
- Post 多用于副作用，不幂等的场景，例如注册。

#### Post 和 Get 的区别

| **对比项**       | **GET 请求**                                               | **POST 请求**                                                                            |
| ---------------- | ---------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **语义**         | 从服务器获取数据                                           | 向服务器提交数据                                                                         |
| **幂等性**       | 幂等、无副作用                                             | 不幂等、有副作用                                                                         |
| **数据位置**     | 数据附加在 URL 后（查询参数 `?key=value`）                 | 数据放在请求体（Request Body）中                                                         |
| **数据长度限制** | 受 **URL 长度限制**（RFC 标准无限制，但浏览器规定 2KB 内） | 无严格限制（取决于服务器配置）                                                           |
| **安全性**       | 数据明文暴露在 URL 中（不适合敏感信息）                    | **数据在请求体中（可通过 HTTPS 加密，更安全）**                                          |
| **缓存**         | **可被浏览器缓存**                                         | 默认不缓存                                                                               |
| **历史记录**     | **保留在浏览器历史记录中**                                 | 不保留在浏览器历史记录中                                                                 |
| **编码类型**     | 仅支持 `application/x-www-form-urlencoded`                 | **支持多种编码类型**（`application/json`、`multipart/form-data`…）<br>且不对数据类型限制 |
| **典型场景**     | 搜索、分页、获取资源（如 `GET /api/users?id=1`）           | 登录、表单提交、文件上传（如 `POST /api/login`）                                         |
| **浏览器行为**   | 刷新/后退时直接重复请求（无警告）                          | 刷新/后退时可能提示“确认重新提交表单”                                                    |
| **服务器响应**   | 通常返回 200 OK（成功）或 304 Not Modified（缓存有效）     | 通常返回 201 Created（资源创建成功）或 400 Bad Request（数据错误）                       |

- Get 默认被缓存，如何能不被缓存？
  - 请求体加上**时间戳等随机串**，就不会命中缓存
- Post 默认不被缓存，如何能被缓存？
  - 显示加上缓存首部，但是不推荐，不符合幂等直觉！
  - 想被缓存推荐转成 Get 请求

---

### 常见首部

首部 (Header) 分为请求首部和响应首部，并且部分首部两种通用。可以分为四大类：

1. **通用首部**：适用于请求和响应（如 `Cache-Control`）。
2. **请求首部**：客户端发送的附加信息（如 `User-Agent`）。
3. **响应首部**：服务器返回的元数据（如 `Set-Cookie`）。
4. **实体首部**：描述资源本身特性（如 `Content-Type`）。

#### 通用首部（General Headers）

| **首部字段名**      | **作用**                     | **常见值/示例**                      |
| ------------------- | ---------------------------- | ------------------------------------ |
| `Cache-Control`     | 控制缓存行为                 | `no-cache`, `max-age=3600`, `public` |
| `Connection`        | 管理连接状态                 | `keep-alive`, `close`                |
| `Date`              | 报文创建时间                 | `Tue, 15 Nov 2022 08:12:31 GMT`      |
| `Pragma`            | 遗留字段，兼容 HTTP/1.0 缓存 | `no-cache`                           |
| `Trailer`           | 声明报文末尾存在的首部列表   | `Trailer: ETag`                      |
| `Transfer-Encoding` | 指定传输编码方式             | `chunked`, `gzip`                    |
| `Upgrade`           | 升级协议（如 WebSocket）     | `Upgrade: websocket`                 |
| `Via`               | 记录代理服务器信息           | `Via: 1.1 proxy1, 1.1 proxy2`        |

#### 请求首部（Request Headers）

| **首部字段名**      | **作用**                      | **常见值/示例**                                    |
| ------------------- | ----------------------------- | -------------------------------------------------- |
| `Accept`            | 声明客户端可处理的媒体类型    | `text/html`, `application/json`                    |
| `Accept-Encoding`   | 支持的压缩算法                | `gzip`, `deflate`, `br`                            |
| `Accept-Language`   | 优先语言                      | `en-US`, `zh-CN`                                   |
| `Authorization`     | 身份凭证（如 Bearer Token）   | `Bearer xxxxxx`                                    |
| `Cookie`            | 客户端发送的 Cookie           | `Cookie: name=value; session=abc`                  |
| `Host`              | 目标服务器域名                | `Host: example.com`                                |
| `If-Modified-Since` | 资源修改时间比对（缓存控制）  | `If-Modified-Since: Thu, 01 Jan 2023 00:00:00 GMT` |
| `User-Agent`        | 客户端标识（浏览器/设备信息） | `Mozilla/5.0 (Windows NT 10.0)`                    |
| `Referer`           | 请求来源页面 URL              | `Referer: https://google.com`                      |

#### 响应首部（Response Headers）

| **首部字段名**                | **作用**                 | **常见值/示例**                          |
| ----------------------------- | ------------------------ | ---------------------------------------- |
| `Access-Control-Allow-Origin` | 跨域资源共享（CORS）     | `*`, `https://example.com`               |
| `ETag`                        | 资源版本标识（缓存验证） | `ETag: "33a64df5"`                       |
| `Location`                    | 重定向目标 URL           | `Location: /new-path`                    |
| `Server`                      | 服务器软件信息           | `Server: nginx/1.18.0`                   |
| `Set-Cookie`                  | 服务器设置 Cookie        | `Set-Cookie: session=123; Path=/`        |
| `WWW-Authenticate`            | 要求客户端身份验证       | `WWW-Authenticate: Basic realm="Access"` |
| `Retry-After`                 | 服务不可用时重试时间     | `Retry-After: 3600`                      |

#### 实体首部（Entity Headers）

| **首部字段名**     | **作用**             | **常见值/示例**                                |
| ------------------ | -------------------- | ---------------------------------------------- |
| `Content-Type`     | 实体主体的媒体类型   | `text/html`, `application/json`                |
| `Content-Length`   | 实体主体大小（字节） | `Content-Length: 1024`                         |
| `Content-Encoding` | 实体主体的压缩编码   | `gzip`, `deflate`                              |
| `Content-Language` | 实体主体的自然语言   | `en`, `zh`                                     |
| `Last-Modified`    | 资源最后修改时间     | `Last-Modified: Thu, 01 Jan 2023 00:00:00 GMT` |
| `Expires`          | 实体主体过期时间     | `Expires: Thu, 01 Jan 2023 00:00:00 GMT`       |

**扩展阅读**：

- [MDN HTTP Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)
- [HTTP/1.1 RFC 7231](https://tools.ietf.org/html/rfc7231)

---

### 常见状态码

状态码表示响应的状态，可以让我们清晰的了解到这一次请求是成功还是失败，如果失败的话，是什么原因导致的。

**2XX 成功**

- **200** OK，请求成功，请求在服务端被正确处理
- 204 No content，请求成功，但响应报文没有实体数据
- 205 Reset Content，服务器处理成功，但响应报文没有实体数据，并要求请求方重置内容
- 206 Partial Content，服务器成功处理了部分请求

**3XX 重定向**

- 301 moved permanently，**资源永久性重定向**，表示资源已被分配了新的 URL
- 302 found，**资源临时重定向**，表示资源临时被分配了新的 URL
- 303 see other，表示资源在另一个 URL
- **304** not modified，请求的资源没有修改，服务端无需返回任何资源（协商缓存成功）
- 307 temporary redirect，临时重定向，和 302 含义类似，但是期望客户端**保持请求方法不变**向新的地址发出请求

**4XX 客户端错误**

- 400 bad request，请求报文存在语法错误，服务器看不懂
- 401 unauthorized，发送的请求没有携带认证信息，比如 token
- 403 forbidden，对请求资源的访问被服务器拒绝，比如敏感词
- **404** not found，在服务器上没有找到请求的资源

**5XX 服务器错误**

- **500** internal sever error，表示服务器端内部错误
- 501 Not Implemented，表示服务器不支持当前请求所需的功能
- 503 service unavailable，表明服务器暂时无法处理请求
- **504** Gateway Timeout，表示扮演网关或者代理的服务器无法在规定的时间内获得想要的响应
  - 比如寻址服务挂掉，找不到目标服务器
