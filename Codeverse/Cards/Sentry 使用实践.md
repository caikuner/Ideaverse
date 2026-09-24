---
tags: [fe/sentry]
up:
related:
rank:
created: 2025-07-16
modified: 2025-07-17
---

Sentry 是一个开源的 **实时错误监控和日志聚合** 平台，主要用于跟踪应用程序中的异常、崩溃和性能问题。它支持多种编程语言（JavaScript、Python、Java、Go 等）和平台（Web、移动端、后端）。以下是 Sentry 的核心使用方法和错误监控类型：

---

## **1. Sentry 的核心功能**

- **错误监控**：捕获未处理的异常、崩溃、日志错误。
- **性能监控**（APM）：跟踪请求延迟、数据库查询、事务性能。
- **用户反馈**：收集用户遇到错误时的上下文信息。
- **发布跟踪**：关联错误与代码版本，方便定位问题。
- **告警通知**：集成 Slack、Email、Webhook 等，实时通知异常。

---

## **2. Sentry 的基本使用**

### **(1) 安装与初始化**

以 **JavaScript (前端)** 为例：

```javascript
// 安装 SDK
npm install @sentry/browser @sentry/tracing

// 初始化 Sentry
import * as Sentry from "@sentry/browser";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
  dsn: "YOUR_DSN", // 从 Sentry 后台获取
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0, // 性能监控采样率
  environment: "production",
});
```

### **(2) 手动捕获错误**

```javascript
try {
  someBuggyFunction();
} catch (err) {
  Sentry.captureException(err); // 手动上报错误
}
```

### **(3) 记录自定义事件**

```javascript
Sentry.captureMessage("Something went wrong!", "warning");
```

### **(4) 设置用户上下文**

```javascript
Sentry.setUser({ email: "user@example.com" });
```

---

## **3. Sentry 的错误监控类型**

Sentry 可以监控多种错误类型，主要分为以下几类：

### **(1) 未捕获的异常（Uncaught Exceptions）**

- **前端**：JavaScript 运行时错误、`Promise` rejections、`window.onerror` 事件。
- **后端**：Python `Exception`、Java `RuntimeException`、Go `panic` 等。

### **(2) 崩溃报告（Crashes）**

- **移动端**（Android/iOS）：应用崩溃日志（Native Crash）。
- **桌面应用**（Electron）：进程崩溃信息。

### **(3) HTTP 请求错误**

- 监控 API 请求失败（4xx/5xx 状态码）。
- 支持 Axios、Fetch、XHR 等前端请求库。

### **(4) 日志错误（Log Errors）**

- 手动记录错误日志：

  ```javascript
  Sentry.captureMessage("Failed to fetch data", "error");
  ```

### **(5) 性能监控（Performance Monitoring）**

- 跟踪 **页面加载时间**、**API 请求耗时**、**数据库查询**。
- 示例（Node.js）：

  ```javascript
  const transaction = Sentry.startTransaction({ name: "GET /users" });
  // 执行数据库查询
  transaction.finish();
  ```

### **(6) 资源加载错误**

- 监控 **图片、CSS、JS 加载失败**（前端）。
- 通过 `window.addEventListener('error')` 捕获。

### **(7) 内存泄漏 & 长任务**

- 结合 **Performance API** 监控内存泄漏。
- 通过 `Long Tasks API` 检测阻塞主线程的任务。

---

## **4. Sentry 的高级配置**

### **(1) 过滤敏感数据**

```javascript
Sentry.init({
  beforeSend(event) {
    if (event.user) delete event.user.email; // 移除敏感信息
    return event;
  },
});
```

### **(2) 采样率控制**

```javascript
Sentry.init({
  tracesSampleRate: 0.1, // 10% 的请求采样
});
```

### **(3) 环境区分**

```javascript
Sentry.init({
  environment: process.env.NODE_ENV, // "dev" | "prod"
});
```

### **(4) 集成 Source Maps（前端）**

- 上传 Source Maps 以查看压缩后的错误堆栈：

  ```bash
  sentry-cli releases --org=my-org --project=my-project files VERSION upload-sourcemaps ./dist
  ```

---

## **5. Sentry 的告警与通知**

- **Slack 通知**：
  ![Sentry Slack Alert](https://sentry.io/_assets/img/integrations/slack/sentry-slack-alert.png)
- **邮件告警**：
  ![Sentry Email Alert](https://sentry.io/_assets/img/email-alert.png)
- **Webhook 集成**（如钉钉、企业微信）。

---

## **6. 替代方案**

- **前端监控**：
  - [Bugsnag](https://www.bugsnag.com/)（更轻量）
  - [LogRocket](https://logrocket.com/)（录屏回放）
- **后端监控**：
  - [Datadog](https://www.datadoghq.com/)（全栈 APM）
  - [New Relic](https://newrelic.com/)（企业级监控）

---

## **总结**

| 功能         | 说明                        |
| ------------ | --------------------------- |
| **错误监控** | 自动捕获未处理的异常、崩溃  |
| **性能监控** | 跟踪 API、DB 查询、页面加载 |
| **用户反馈** | 收集用户遇到错误时的上下文  |
| **告警通知** | 邮件、Slack、Webhook        |
| **发布跟踪** | 关联错误与代码版本          |

Sentry 适合需要 **实时错误监控** 和 **深度问题分析** 的团队，尤其对 **前端、移动端、后端** 均有良好支持。
