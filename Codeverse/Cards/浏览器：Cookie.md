---
tags: []
up:
related:
created: 2025-06-14
modified: 2025-07-07
---

### 如何理解 Cookie

HTTP Cookie（也叫 Web Cookie 或浏览器 Cookie），是服务器发送到用户浏览器并保存在本地的一小块数据

主要特点：

- 由服务器生成，浏览器进行存储
- 每次请求时会自动携带同源域名下的 cookie
- 可设置过期时间，默认情况下随着浏览器关闭而删除（会话 cookie）

使用场景：

- 最早用于客户端存储会话 (seesion) 信息，告知服务端两个请求是否来自同一用户，如保持用户的登录状态。
- 个性化设置（如用户自定义设置、主题等）
- 浏览器行为跟踪（如跟踪分析用户行为等）
- 曾经用于客户端数据的存储，但已不推荐

### Cookie 的构成

cookie 就是一个字符串，由 `;空格` 拼接，主要有以下字段：

| 属性           | 作用                                                                                                                                                       |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name=value     | name 不区分大小写，但最好还是区分以避免误解<br>name 和 value 需要进行 URL 编解码 (encodeURIComponent decodeURLComponent)<br>敏感信息需要加密，不要使用明文 |
| domain=xxx.com | 默认为设置 cookie 的域；<br>注意：**相同 site 共享**，比如不同子域名、不同端口都可共享。和同源区分开）                                                     |
| path=xx_dir    | 默认 /，包含该路径的才会把 cookie **发到服务器**                                                                                                           |
| max-age=x      | 相对过期时间，单位 s                                                                                                                                       |
| expires        | 绝对过期时间，时间戳，eg：Expires=Wed, 21 Oct 2015 07:28:00 GMT;                                                                                           |
| http-only      | 不能通过 JS 访问 Cookie，只用于 http 传输，减少 XSS 攻击                                                                                                   |
| secure         | 安全标志，设置后只能在协议为 HTTPS 的请求中携带                                                                                                            |
| same-site      | 规定浏览器不能在跨域请求中携带 Cookie，减少 CSRF 攻击                                                                                                      |

```http
Set-Cookie: id=a3fWa; domain=a.com; path=/; max-age=3600; expires=Wed, 21 Oct 2015 07:28:00 GMT; secure; http-only; same-site
```

#### 会话期 cookie 和持久性 cookie

- 会话期 Cookie：未设置过期时间， 浏览器关闭之后它会被自动删除，也就是说它仅在会话期内有效
- 持久性 cookie：设置了绝对/相对过期时间，在有效期内 cookie 持续有效

注意：设定的过期时间只与客户端相关，而不是服务端

#### Cookie 的限制

- 大小限制：通常为 4KB
- 数量限制：每个域名下的 cookie 数量有限
- 作用域：只能在所属域名和路径下使用

#### 注意 cookie 的安全性

- 敏感信息注意加密
- http-only、secure、same-site 尽量设置上

### 后端操作 cookie

cookie 的一大特点就是可以由后端来操作设置：

- 服务端 HTTP 在响应头加上 `Set-Cookie:xxx` 就可以传递给客户端
- 客户端收到后，就会存储它。在后续的**同 site 请求**中都会自动带上请求头 `Cookie:xxx`（即使不需要）

```http
HTTP/1.0 200 OK
Content-type: text/html
Set-Cookie: yummy_cookie=choco
Set-Cookie: tasty_cookie=strawberry
```

```http
GET /sample_page.html HTTP/1.1
Host: <www.example.org>
Cookie: yummy_cookie=choco; tasty_cookie=strawberry
```

### 前端操作 cookie

浏览器可以 `document.cookie` 创建/访问存储的 cookie (非 `HttpOnly` 标记)。

```js
document.cookie = "yummy_cookie=choco";
document.cookie = "tasty_cookie=strawberry";
console.log(document.cookie);
// logs "yummy_cookie=choco; tasty_cookie=strawberry"
```

### 请求中携带 cookie ⭐️

通常情况下，请求会自动携带同 Site 的 cookie。但有些情况不会，比如使用 Options 进行预检请求。（当然 Options 请求不建议带 cookie）

如果要显式带上 cookie:

前端请求要加上 `credentials`

- XHR:
  - `xhr.withCredentials = true`
- fetch
  - `credentials: 'include'`
- axios
  - `axios.defaults.withCredentials = true`

后端响应加上响应头：`Access-Control-Allow-Credentials: true`

### 为何现代浏览器都禁用第三方 cookie

Cookie 的安全问题导致现在已经不被推荐使用，但是还有一些重要的作用就是广告。

禁用的主要原因就是保护用户隐私和安全：

隐私问题

- 第三方 Cookie 可以跨站点追踪用户行为
- 广告商可以构建用户画像和浏览历史
- 用户数据可能被未经授权收集和使用

安全风险

- 增加 CSRF（跨站请求伪造）攻击风险
- 可能被用于会话劫持
- 恶意网站可能滥用第三方 Cookie

技术影响

- Safari 和 Firefox 已默认禁用第三方 Cookie
- Chrome 计划在 2024 年完全禁用第三方 Cookie
- 替代方案：
  - First-Party Cookie
  - localStorage
  - Privacy Sandbox
  - FLoC (Federated Learning of Cohorts)
