---
tags: []
up:
related:
created: 2025-06-15
modified: 2025-06-15
---
轮询 (Polling)：客户端定期发送请求，达到尽可能实时获得响应。

#### **短轮询（Short Polling）**

  客户端定期发送 HTTP 请求（如每 5 秒），服务端立即响应（无论数据是否更新）。

  ```mermaid
  sequenceDiagram
      loop 每 5 秒
          Client->>Server: GET /data
          Server-->>Client: 返回最新数据
      end
  ```

#### **长轮询（Long Polling）**

  客户端发送请求后，服务端 hold 住连接，直到数据更新或超时才响应。

【注意】前后端请求库、Nginx 等都会设置一个超时时间，注意这个时间。

  ```mermaid
  sequenceDiagram
      Client->>Server: GET /data (等待)
      Server-->>Client: 数据更新后立即返回
      Client->>Server: 立即发起新请求
  ```

#### **Polling（客户端代码）**

```javascript
// 短轮询
setInterval(() => {
  fetch('/data').then(res => res.json()).then(console.log);
}, 5000);



// 长轮询
function longPoll() {
  fetch('/data').then(res => res.json()).then(data => {
    console.log(data);
	// 服务端要注意控制超时时间
    longPoll(); // 立即发起下一次请求
  });
}
longPoll();
```
