---
tags: []
up:
related:
created: 2025-06-14
modified: 2025-06-15
---

> Q: 说说 DNS 域名解析过程？了解 A 记录吗

DNS（Domain Name System）域名解析是将人类可读的域名（如 `www.example.com`）转换为机器可识别的 IP 地址（如 `192.0.2.1`）的过程。

---

### **DNS 解析 8 步流程**

```mermaid
graph LR
    subgraph 客户端本地解析
        A[用户输入域名] --> B[浏览器缓存]
        B --> C[操作系统缓存]
        C --> D[路由器缓存]
        D --> E[本地DNS服务器]
    end

    subgraph DNS服务器解析
        E --> F[根域名服务器]
        F --> G[顶级域名服务器]
        G --> H[权威域名服务器]
        H --> I[返回IP地址]
    end
```

#### **1. 浏览器缓存检查**

- 浏览器首先检查自身缓存（Chrome 可通过 `chrome://net-internals/#dns` 查看）
- 缓存有效则直接使用，否则进入下一步
- **缓存时间**：由 DNS 记录的 TTL（Time to Live）值决定

#### **2. 操作系统缓存检查**

- 检查操作系统 DNS 缓存（Windows：`ipconfig /displaydns`）
- Linux/Unix 系统查看 `/etc/hosts` 文件
- macOS 使用 `dscacheutil -cachedump` 查看

#### **3. 路由器缓存检查**

- 请求发送到本地路由器
- 家用路由器通常会缓存 DNS 记录

#### **4. 本地 DNS 服务器查询**

- 请求到达 ISP（互联网服务提供商）的 DNS 递归解析器
- 常见公共 DNS：
  - Google DNS：`8.8.8.8`
  - Cloudflare：`1.1.1.1`
  - 阿里 DNS：`223.5.5.5`

#### **5. 根域名服务器查询（.）**

- 全球共 **13 组** 根服务器（A-M）
- 返回顶级域（TLD）服务器地址
- 例如：查询 `.com` 返回管理 `.com` 的服务器地址

#### **6. 顶级域名服务器查询（TLD）**

- 根据域名后缀访问对应 TLD 服务器：
  - `.com` / `.org`：通用顶级域（gTLD）
  - `.cn` / `.uk`：国家代码顶级域（ccTLD）
- 返回权威域名服务器地址

#### **7. 权威域名服务器查询**

- 存储域名最终解析记录的服务器
- 常见类型：
  - 域名注册商提供的 DNS 服务器
  - 云服务商（如 AWS Route53、阿里云 DNS）
- 返回域名对应的 IP 地址

#### **8. 返回解析结果**

- 解析结果沿路径返回：

  ```
  权威服务器 → TLD服务器 → 根服务器
  → 本地DNS → 路由器 → 操作系统 → 浏览器
  ```

- 所有中间节点缓存结果（遵循 TTL）

---

### **完整解析示例（<www.example.com>）**

1. 浏览器查缓存 → 无记录
2. 操作系统查 `hosts` 文件 → 无记录
3. 查询本地 DNS（如 `8.8.8.8`）
4. 本地 DNS 查询根服务器 → 返回 `.com` TLD 地址
5. 查询 `.com` TLD → 返回 `example.com` 权威服务器
6. 查询权威服务器 → 返回 `www.example.com` 的 IP
7. 本地 DNS 缓存结果并返回给浏览器
8. 浏览器缓存 IP 并发起 HTTP 请求

---

### **DNS 记录类型**

| 记录类型  | 作用       | 示例                            |
| --------- | ---------- | ------------------------------- |
| **A**     | IPv4 地址  | `192.0.2.1`                     |
| **AAAA**  | IPv6 地址  | `2001:db8::1`                   |
| **CNAME** | 域名别名   | `www.example.com → example.com` |
| **MX**    | 邮件服务器 | `10 mail.example.com`           |
| **NS**    | 权威服务器 | `ns1.example.com`               |
| **TXT**   | 文本记录   | 验证信息/SPF 记录               |

---

### **DNS 查询类型**

1. **递归查询**
   - 客户端 → 本地 DNS：_" 请给我最终答案 "_
   - 本地 DNS 负责完成所有查询

2. **迭代查询**
   - 本地 DNS → 根/TLD/权威：_" 谁能回答这个问题？"_
   - 服务器只返回下一级指引

---

### **DNS 优化技术**

1. **缓存机制**
   - 各级节点缓存结果（TTL 控制时效性）

2. **负载均衡**

   ```dns
   www.example.com. 300 IN A 192.0.2.1
   www.example.com. 300 IN A 192.0.2.2
   ```

   - DNS 存储多条 A 记录，轮询时返回多个 IP 地址

3. **CDN 智能解析**
   - 根据用户位置返回最近的 IP
   - EDNS 扩展协议传递客户端子网信息

4. **DNS 预取**
   [[浏览器：页面资源预取预渲染 dnsfetch、prefetch、prerender、preload]]

   ```html
   <!-- 网页中声明需要预解析的域名 -->
   <link rel="dns-prefetch" href="//cdn.example.com" />
   ```

---

### **DNS 安全机制**

1. **DNSSEC**
   - 数字签名验证记录真实性
   - 防止 DNS 劫持和污染

2. **DoH/DoT**
   - DNS over HTTPS (TCP/443)
   - DNS over TLS (TCP/853)
   - 加密 DNS 查询防止窃听

3. **响应率限制**
   - 防护 DNS 放大攻击

> ⏱️ **解析耗时**：首次解析通常 100-300ms，缓存命中后可降至 0-10ms
