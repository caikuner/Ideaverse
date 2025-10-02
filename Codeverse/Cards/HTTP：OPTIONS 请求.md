---
tags: []
up:
related:
created: 2025-06-14
modified: 2025-06-14
---

> About: 预检请求

## Options 请求会携带 cookie 吗

OPTIONS 请求：获取目的资源所支持的通信选项。
它是一个预检请求，用于检查实际请求是否可以安全地发送，通常不会携带 Cookie。
浏览器在发送 OPTIONS 请求时，不会自动附带 Cookie 和 Authorization 等认证信息，除非明确设置了 `credentials` 选项。

如果需要在 OPTIONS 请求中携带 Cookie，可以在请求中设置 `credentials: 'include'` ，但通常不推荐这样做，因为 OPTIONS 请求的目的就是检查跨域请求的安全性，而不是进行身份验证。
