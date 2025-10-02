---
tags: []
up:
related:
companies:
created: 2025-06-15
modified: 2025-07-09
---

HTTP 是一个无状态协议，所以客户端每次发出请求时，下一次请求无法得知上一次请求所包含的状态数据。那么登录后的用户如何保持自己的认证权限不丢失呢？

本文介绍三种基于密码登录的方式。

## 1. HTTP Authentication

### 简介

HTTP 提供一个用于权限控制和认证的通用框架，有多个验证方案使用。

最常用的 HTTP 认证方案是 `HTTP Basic Authentication` 。

这是一种无状态认证方式，即服务端都不会在会话中记录相关信息，客户端**每次**访问都需要将**用户名和密码**放置报文一同发送给服务端，当然不可能每次访问都要用户输入用户名和密码，所以是第一次输入账号后，浏览器就保留住供后面每次请求的交互使用。

添加 HTTP Basic Authentication 认证信息 (即用户名和密码) 到每次的请求中，有两种常用方法：  

1. 在**请求参数**中直接添加用户名和密码 (显然很不安全)
2. 添加 Authorization **请求头**：  `Authorization: "Basic xxxx"` , 其中 xxx 为 `用户名:密码` 字符串的 base64 编码。

### 鉴权流程

当一个客户端向 HTTP 服务器进行需要 HTTP Basic Authentication 的 数据请求时：

- 如果客户端未被认证，服务器验证用户不合法返回错误代码，提示用户输入账号密码；
- 用户输入后，客户端将 `username:password` 的 **base64 编码**，附加到请求头 `Authorization: Basic xxxx`；
- 服务器收到请求包后，取得附加的 Authorization 请求头，**base64 解码**后进行用户名及密码的验证；
- 若账密正确，返回数据，若不正确，则返回错误代码要求重新提供用户名和密码。

![](https://segmentfault.com/img/remote/1460000037691319)

### 加解密代码

由上述流程得知，实际应是**客户端编码，服务端解码验证**

- encodeURIComponent decodeURIComponent 是为了支持中文
- window 下的全局方法 `btoa（string转base64）` `atob` 在 base64 - ascii 之间转换
- Nodejs 可以使用 Buffer 对象操作

```js
// 编码 (实际由客户端浏览器进行)
let email = "caikun@test.com"
let password = "123456"
let auth = `${email}:${password}`

// browser
// 先 encodeURIComponent()进行URL编码以支持中文；
// 再调用全局方法 btoa：从 String 对象中创建一个 base-64 编码的 ASCII 字符串
const authorization = btoa(encodeURIComponent(auth)); 
console.log('authorization: ', authorization); // JUU4JTk0JUExJUU1JTlEJUE0JTQwdGVzdC5jb20lM0ExMjM0NTY=

// Node 也演示一下编码
const buf = Buffer.from(auth, 'ascii');
const authorization = buf.toString('base64'); 
console.log('authorization: ', authorization); // Y2Fpa3VuQHRlc3QuY29tOjEyMzQ1Ng==
```

```js
// 解码 （实际由后端解码，这里用浏览器api和node分别演示）

// browser
const user = decodeURIComponent(atob(authorization));
console.log('user: ', user); // caikun@test.com:123456

// node
const buf2 = Buffer.from(authorization.split(' ')[0] || '', 'base64');
const user = buf2.toString('ascii'); 
console.log('user: ', user); // caikun@test.com:123456
```

### 其他基于 HTTP 的认证

通用 HTTP 身份验证框架有多个验证方案使用。不同的验证方案会在安全强度上有所不同。

IANA 维护了 [一系列的验证方案](http://www.iana.org/assignments/http-authschemes/http-authschemes.xhtml)，除此之外还有其他类型的验证方案由虚拟主机服务提供，例如 Amazon AWS ，常见的验证方案包括：

- Basic (查看 [RFC 7617](https://tools.ietf.org/html/rfc7617), Base64 编码凭证。详情请参阅下文.)
- ⭐ Bearer (查看 [RFC 6750](https://tools.ietf.org/html/rfc6750), bearer 令牌通过 OAuth 2.0 保护资源)
- Digest (查看 [RFC 7616](https://tools.ietf.org/html/rfc6750), 只有 md5 散列 在 Firefox 中支持，查看 [bug 472823](https://bugzilla.mozilla.org/show_bug.cgi?id=472823) 用于 SHA 加密支持)
- HOBA (查看 [RFC 7486](https://tools.ietf.org/html/rfc7486) (草案), HTTP Origin-Bound 认证，基于数字签名)
- Mutual (查看 [draft-ietf-httpauth-mutual](https://tools.ietf.org/html/draft-ietf-httpauth-mutual-11))
- AWS4-HMAC-SHA256 (查看 [AWS docs](http://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-auth-using-authorization-header.html))

### HBA 小结

通用 HTTP 身份验证框架有多个验证方案使用。不同的验证方案会在安全强度上有所不同。HTTP Basic Authentication 是最常用的 HTTP 认证方案，为了减少泄露风险一般要求 **HTTPS** 协议。

在请求头中添加 `Authorization: "Basic xxxx"` , 其中 xxx 为 `用户名:密码` 字符串的 base64 编码。浏览器和服务器进行编码和解码来验证用户。

- 优点：简单
- 问题：
	1. 请求上携带验证信息，容易被嗅探到，即使用 base64 也只是常规编码，起不到加密的左右
	2. 无法注销登录

- 适用场景：一般多被用在**内部**安全性要求不高的的系统上，如路由器网页管理接口

## 2. Cookie + Session

Cookie + Session 的登录方式是最经典的一种登录方式，现在仍然有大量的企业在使用。

什么是 Cookie： [[浏览器：Cookie]]

### 什么是 Session

Session 是服务器端的会话管理机制：

- 服务器为每个用户创建的临时会话存储空间，用于保存用户的会话状态
- 通过 SessionID 来识别不同用户
- SessionID 通常保存在 Cookie 中，客户端带着它发送数据给服务端，服务端就会认为 SessionID 相同的为同一用户，达到认证的目的

与 Cookie 的区别

- 存储位置：Session 在服务器，Cookie 在客户端
- 安全性：Session 较安全，Cookie 相对不安全
- 存储容量：Session 容量较大，Cookie 通常限制 4KB
- 性能：Session 消耗服务器资源，Cookie 消耗带宽资源

### 工作流程

1. 用户首次访问服务器时，服务器创建 Session 并生成 SessionID
2. 服务器将 SessionID 通过 Cookie 发送给客户端
3. 客户端后续请求会自动携带包含 SessionID 的 Cookie
4. 服务器通过 SessionID 找到对应 Session 并识别用户

如下图：
- 用户首次登录
![[Pasted image 20250615222202.png|400]]

- 后续请求的识别认证
![[Pasted image 20250615222238.png|400]]

### Session 存储

最常用的 Session 存储方式是 KV 存储，如 Redis，在分布式、API 支持、性能方面都是比较好的，除此之外还有 mysql、file 存储。

如果服务是分布式的，使用 file 存储，多个服务间存在**同步 session** 的问题；高并发情况下**错误读写锁的控制**。

### Session Refresh

上面提到的流程中，缺少 Session 的刷新的环节。expires 时间到期后不能就直接把用户踢出去，而是如果在 Session 有效期间用户一直在操作，这时候 expires 时间就应该刷新才对。

1. 又不能频繁更新 session，会影响性能，所以要在 session **快过期的时候续一次。
2. 有可能会有 cookie 泄露，导致 sessionID 被盗用而保持了长期有效。所以，可以在生成 sessionID 的同时生成一个 refreshID，在 sessionID 过期之后使用 refreshID 请求服务端生成新的 sessionID（这个方案需要前端判断 sessionID 失效，并携带 refreshID 发请求)。

### 单设备登录

有些情况下，只允许一个帐号在一个端下登录，如果换了一个端，需要把之前登录的端踢下线（默认情况下，同一个帐号可以在不同的端下同时登录的）。

这时候可以借助一个服务保存用户唯一标识和 sessionId 值的对应关系，如果同一个用户，但 sessionId 不一样，则不允许登录或者把之前的踢下线 (删除旧 session)。

### 特点和使用场景

特点

- 依赖 Cookie：通常需要 Cookie 来存储 SessionID
- 服务器负载较大：需要存储所有用户的 Session
- 集群问题：需要考虑 Session 共享
- 安全性：SessionId 存放在 Cookie 中，所以无法避免 CSRF 攻击
- 权限撤回：服务端很容易通过操作 cookie 来撤回权限

使用场景

- 用户登录状态管理
- 购物车
- 权限验证
- 表单验证

## 3. Token + Signature ⭐

为了解决 Session + Cookie 机制暴露出的诸多问题，我们可以使用 Token 的登录方式。

### Token 机制

Token 是服务端生成的一串字符串，以作为客户端请求的一个令牌。

- 当第一次登录后，服务器会生成一个 Token 并返回给客户端
- 客户端后续访问时，带上这个 Token，服务端进行验证，从而完成身份认证。

优点：
- 服务器端不需要存放 Token，所以不会对服务器端造成压力，即使是服务器集群，也不需要增加维护成本。
- Token 可以存放在前端任何地方，可以不用保存在 Cookie 中，提升了页面的安全性。
缺点：
- Token 下发之后，只要在生效时间之内，就一直有效，如果服务器端想收回此 Token 的权限，就不像 cookie 那么容易。

### JWT (Json Web Token)

最常见的 Token 生成方式是使用 JSON Web Token (JWT) ，它是一个开放标准 (RFC 7519)，用于作为 JSON 对象在各方之间安全地传输信息。该信息可以被验证和信任，因为它是数字签名的。

**组成部分（用. 分隔的三部分）**：

- Header（头部）：指定加密算法和令牌类型
- Payload（负载）：包含声明（claims）的实际数据
- Signature（签名）：对前两部分的签名，用于验证消息未被篡改

```
// cookie
jwt-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibHVzaGlqaWUiLCJpYXQiOjE1MzI1OTUyNTUsImV4cCI6MTUzMjU5NTI3MH0.WZ9_poToN9llFFUfkswcpTljRDjF4JfZcmqYS0JcKO8
```

### 工作流程

1. 用户登录成功后，服务器创建 JWT
	- 设置 Header 和 Payload
	- 使用密钥生成**签名**
	- 将三部分组合成 token
2. 服务器将 token 返回给客户端
	- 客户端存储在 localStorage 或 cookie 中
3. 后续请求携带 token
	- 通常放在 Authorization header
	- 格式： `Bearer <token>`
4. 服务器验证 token
	- 检查签名是否有效
	- 验证是否过期
	- 验证其他声明（claims）

```mermaid
sequenceDiagram
    participant 用户
    participant 服务器
    
    用户->>服务器: 提交登录凭证
    服务器->>服务器: 验证凭证
    alt 验证成功
        服务器->>服务器: 创建JWT
            Note right of 服务器: 1. 设置Header/Payload<br>2. 用密钥生成签名<br>3. 组合三部分成token
        服务器-->>用户: 返回JWT token
            Note left of 用户: 存储在localStorage<br>或cookie中
    else 验证失败
        服务器-->>用户: 返回错误
    end
    
    用户->>服务器: 后续请求(携带token)
        Note left of 用户: Authorization头<br>Bearer <token>
    服务器->>服务器: 验证token
        Note right of 服务器: 1. 检查签名有效性<br>2. 验证过期时间<br>3. 检查其他claims
    alt 验证通过
        服务器-->>用户: 返回请求数据
    else 验证失败
        服务器-->>用户: 返回401未授权
    end
```

### JWT 特点

- 无状态：服务器**不需要存储会话信息**
- 可扩展：负载部分可以包含自定义数据
- 跨域友好：可以在不同域名下使用
- 性能好：验证在服务端完成，不需要查询数据库

安全考虑：

- 不要在 payload 中存储敏感信息
- 设置合理的过期时间
- 使用 HTTPS 传输
- 妥善保管签名密钥

### JWT Token Refresh

和上面的刷新 session 一样，为了减少 JWT Token 泄露风险，一般有效期会设置的比较短。 这样就会存在 JWT Token 过期的情况，我们不可能让用户频繁去登录获取新的 JWT Token。

**双 token 刷新机制** ⭐️

- access token：短期令牌，用于接口认证
- refresh token：长期令牌，用于刷新 access token
- 优点：安全性高，即使 access token 泄露影响有限
- 缺点：实现相对复杂，需要额外存储 refresh token

工作流程：

1. 用户登录后获取 access token 和 refresh token
2. 使用 access token 访问接口
3. access token 过期时，返回 401，前端识别到后重新发一个刷新 token 请求：使用 refresh token 获取新的 access token
4. refresh token 过期时，需要重新登录

最佳实践：

- 根据业务安全需求选择合适的方案
- access token 过期时间不宜过长（如 2 小时）
- refresh token 过期时间可以较长（如 7 天）
- 重要操作仍需要二次验证
- 考虑 token 注销机制

### 如何使用 token 标识用户

两种方式：
- 无状态：在 payload 中存 userId，后续验证只需要解析 Token 中的 userId 既可
    - 优点：无需查库
    - 缺点：用户和 token 强绑定了，除非 token 过期，否则无法使用户失效
    - 适合：无状态、高并发，如 API 网关
- 有状态：数据库维护 用户与 Token 的映射关系（如 `user_tokens` 表）
    - 优点：**精准控制 用户的 Token 生命周期**，如用户下线时候删除 token、主动拉黑 token 等
    - 缺点：token 需要存库查库；
    - 适合：严格管理 token 安全性，如金融系统等

结合上面的双 token 刷新机制，我们可以混合使用两种标识方式：
- 短期 accesstoken ：直接解析 userid 标识用户
- 长期 refreshtoken：存数据库，当短期 token 需要刷新时候使用。也可以主动控制 refreshtoken 的生命周期

```js
// 1. 登录时生成 Token
const accessToken = jwt.sign({ userId: "123" }, 'secret', { expiresIn: '1h' });
const refreshToken = uuidv4(); // 随机字符串
await db.storeRefreshToken(userId, refreshToken); // 存入数据库


// 后续验证：
const {accessToken, refreshToken} = ... // 从header取

// 2. 后续请求中，校验 access_token（无状态）
jwt.verify(accessToken, 'secret', (err, decoded) => {
  const userId = decoded.userId; // 直接解析
});


// 3. 后续请求中，校验 refresh_token（有状态）
const isValid = await db.checkRefreshToken(refreshToken); // 查数据库
```

---
