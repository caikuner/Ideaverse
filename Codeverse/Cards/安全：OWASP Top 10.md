---
tags: []
up: 
related: 
created: 2025-06-12
modified: 2025-06-12
---

## OWASP Top 10

**OWASP Top 10**（Open Web Application Security Project Top 10）是由 **OWASP 基金会**发布的全球最严重的 **Web 应用程序安全风险** 排名清单。它每 3-4 年更新一次，目前 2021 版的名单按照风险高低是：

- 注入（Injection）
- 失效的身份认证（Broken Authentication）
- 敏感数据暴露（Sensitive Data Exposure）
- XML 外部实体（XXE）
- 失效的访问控制（Broken Access Control）
- 安全配置错误（Security Misconfiguration）
- 跨站脚本攻击（XSS）
- 不安全的反序列化（Insecure Deserialization）
- 使用含已知漏洞的组件（Using Components with Known Vulnerabilities）
- 日志与监控不足（Insufficient Logging & Monitoring）

---

### 1. 注入（Injection）

- **风险**：SQL、NoSQL、OS 或 LDAP 注入，通过未过滤的输入破坏数据层。
  - **前端**：
    - 输入验证（正则表达式、白名单过滤）。
    - 使用参数化 UI 组件（如日期选择器、下拉菜单）。
  - **后端**：
    - **必做**：预编译 SQL（如 PreparedStatement）、ORM 框架（Hibernate）、参数化查询。
    - 禁用动态查询拼接，最小化数据库权限。

---

### 2. 失效的身份认证（Broken Authentication）

- **风险**：弱密码、会话固定、JWT 滥用导致账户劫持。
  - **前端**：
    - 强制密码复杂度提示，多因素认证（MFA）UI 集成。
    - 会话超时自动跳转登录页。
  - **后端**：
    - 密码哈希（Argon2、bcrypt）+ Salt。
    - JWT 设置短有效期，强制 HTTPS 传输，禁用旧会话。

---

### 3. 敏感数据暴露（Sensitive Data Exposure）

- **风险**：明文存储或传输密码、信用卡号、电话等敏感信息。
  - **前端**：
    - 禁用浏览器缓存敏感数据（`Cache-Control: no-store`）。
    - 使用 TLS 1.2+，混合内容警告（Mixed Content）。
  - **后端**：
    - 加密存储（AES-256），密钥管理（HSM/KMS）。
    - 响应头移除敏感信息（如 `X-Powered-By`）。

---

### 4. XML 外部实体（XXE）

- **风险**：解析恶意 XML 导致文件读取/SSRF。
  - **前端**：
    - 避免直接上传 XML，改用 JSON（前端校验 Content-Type）。
  - **后端**：
    - 禁用 DTD（`DocumentBuilderFactory.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true)`）。
    - 使用 SAX 解析器替代 DOM。

---

### 5. 失效的访问控制（Broken Access Control）

- **风险**：水平/垂直越权（如用户 A 访问用户 B 的数据）。
  - **前端**：
    - 前端权限控制，比如按角色动态渲染 UI（如 Vue 的 `v-if="isAdmin"`），但**不可依赖前端校验**。
  - **后端**：
    - **必做**：RBAC 模型，每次请求校验资源所有权（如 `user_id=session.user_id`）。
    - 默认拒绝所有权限。

---

### 6. 安全配置错误（Security Misconfiguration）

- **风险**：默认密码、暴露调试信息、CORS 宽松。
  - **前端**：
    - 生产环境禁用 SourceMap，移除 console.log。
    - **限制 CORS 白名单**（`Access-Control-Allow-Origin`），不要设置为 `*`。
  - **后端**：
    - 自动化扫描配置（如 Chef/Puppet）。
    - 关闭目录列表（Apache 的 `Options -Indexes`）。

---

### 7. 跨站脚本（XSS）

- **风险**：注入恶意脚本到表单、URL 参数等可输入区域，进而在用户浏览器执行。
  - **前端**：
    - 转义动态内容（React 的 `dangerouslySetInnerHTML` 慎用）。
    - CSP 策略（如 `Content-Security-Policy: default-src 'self'`）。
  - **后端**：
    - 输入进行过滤（如 DOMPurify 库）
    - 输出进行编码（HTML/URL/JavaScript 上下文）。

---

### 8. 不安全的反序列化（Insecure Deserialization）

- **风险**：RCE 或数据篡改（如 Java 的 `readObject()`）。
  - **前端**：
    - 优先使用 JSON.parse（避免 `eval()`）。
  - **后端**：
    - 禁用反序列化（如 Java 的 `ObjectInputStream` 替换为 JSON 库）。
    - 签名验证序列化数据（HMAC）。

---

### 9. 使用含已知漏洞的组件（Using Components with Known Vulnerabilities）

- **风险**：依赖库漏洞（如 Log4j）。
  - **前后端通用**：
    - 定期扫描依赖（`npm audit`/`OWASP Dependency-Check`）。
    - 及时升级（如 `package.json` 固定小版本 `~1.2.3`）。

---

### 10. 日志与监控不足（Insufficient Logging & Monitoring）

- **风险**：遇到问题，无法追溯攻击行为。
  - **前端**：
    - 关键操作日志（如支付）发送到后端。
    - 监控 API 错误率（如 Sentry）。
  - **后端**：
    - 结构化日志（JSON 格式），集中存储（ELK）。
    - 告警规则（如 5 分钟内 500 错误>10 次）。

---

### 防御策略总结

| 风险                | 前端关键措施                    | 后端关键措施                     |
|---------------------|-------------------------------|----------------------------------|
| 注入                | 输入验证                      | 参数化查询                       |
| 身份认证            | MFA 集成                       | 强哈希 + 会话管理                  |
| XSS                 | CSP+ 转义                      | 输入过滤 + 输出编码                |
| 访问控制            | 动态 UI 隐藏                    | 每次请求权限校验                 |

**核心原则**：前端防御可被绕过，后端必须独立校验所有请求！
