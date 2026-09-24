---
tags: []
up:
related:
companies:
created: 2025-06-14
modified: 2025-06-26
---

## 什么是 service worker

Service Worker 是运行在浏览器背后的**独立线程**，一般可以用来实现缓存功能。使用 Service Worker 的话，传输协议必须为 **HTTPS**。因为 Service Worker 中涉及到请求拦截，所以必须使用 HTTPS 协议来保障安全。

Service Worker 提供了强大的缓存控制能力，可以精细化管理 Web 应用的资源缓存。与浏览器其他内建的缓存机制不同，可以自由控制缓存哪些文件、如何匹配缓存、如何读取缓存，并且**缓存是持续性的。**

## Service Worker 缓存简介

Service Worker 实现缓存功能一般分为三个步骤：

- 注册 Service Worker
- Worker 监听到 `install` 事件以后就可以缓存需要的文件
- 监听 fetch 事件，通过拦截请求的方式查询是否存在缓存，存在缓存的话就可以直接读取缓存文件，否则就去请求数据

```js
// index.js
if (navigator.serviceWorker) {
  navigator.serviceWorker
    .register("sw.js")
    .then(function (registration) {
      console.log("service worker 注册成功");
    })
    .catch(function (err) {
      console.log("servcie worker 注册失败");
    });
}
```

```js
// sw.js

// 监听 `install` 事件，回调中缓存所需文件
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("my-cache").then(function (cache) {
      return cache.addAll(["./index.html", "./index.js"]);
    }),
  );
});

// 拦截所有请求事件
// 如果缓存中已经有请求的数据就直接用缓存，否则去请求数据
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then(function (response) {
      if (response) {
        return response;
      }
      console.log("fetch source");
    }),
  );
});
```

- 打开控制台查看 cache
  ![[Pasted image 20250614003417.png||400]]

## Cache API

Service Worker 的 Cache API 是一个专门为离线缓存设计的存储系统，它允许开发者精细控制网络请求和响应的缓存行为。

#### 特性

1. **请求 - 响应存储**：
   - 存储完整的 HTTP 请求/响应对
   - 保留所有响应头信息（Content-Type, ETag 等）

2. **存储限制**：
   - 通常共享浏览器缓存配额（约 50-250MB）
   - 可通过 StorageManager API 查询：

   ```javascript
   navigator.storage.estimate().then((estimate) => {
     console.log(`可用空间: ${estimate.quota - estimate.usage}`);
   });
   ```

3. **生命周期**：
   - **持久化存储**（不受页面刷新影响）
   - 遵循同源策略

### 基本操作

#### 1. 打开/创建缓存

```javascript
caches.open("my-cache-v1").then((cache) => {
  // 操作缓存
});
```

#### 2. 添加缓存项

```javascript
// 添加单个资源
cache.add("/styles/main.css");

// 批量添加
cache.addAll(["/", "/index.html", "/scripts/app.js"]);
```

#### 3. 匹配缓存

```javascript
// 精确匹配
cache.match(request);

// 匹配所有相关项
cache.matchAll(request, { options });
```

#### 4. 删除缓存项

```javascript
cache.delete(request);
```

#### 5. 获取所有缓存键

```javascript
cache.keys();
```

## 缓存控制

### 1. 自定义缓存策略

#### 1. 离线优先策略

```javascript
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((cached) => cached || fetch(event.request))
      .catch(() => caches.match("/offline.html")),
  );
});
```

#### 2. 网络优先策略

```javascript
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok) {
          // 更新缓存
          caches.open("dynamic-cache").then((cache) => {
            cache.put(event.request, response.clone());
          });
        }
        return response;
      })
      .catch(() => caches.match(event.request)),
  );
});
```

#### 3. 静态资源长期缓存

```javascript
const STATIC_CACHE = "static-v1";
const STATIC_URLS = ["/styles/main.css", "/scripts/app.js", "/images/logo.svg"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(STATIC_URLS))
      .then(() => self.skipWaiting()),
  );
});
```

### 2. 缓存版本控制

```javascript
const CURRENT_CACHE = "app-v2";

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CURRENT_CACHE).map((key) => caches.delete(key)),
      );
    }),
  );
});
```

### 3. 缓存过期管理

```javascript
function cleanOldCaches() {
  const MAX_CACHE_AGE = 30 * 24 * 60 * 60 * 1000; // 30天

  return caches.open("my-cache").then((cache) => {
    return cache.keys().then((requests) => {
      return Promise.all(
        requests.map((request) => {
          return cache.match(request).then((response) => {
            const cacheTime = new Date(response.headers.get("date")).getTime();
            if (Date.now() - cacheTime > MAX_CACHE_AGE) {
              return cache.delete(request);
            }
          });
        }),
      );
    });
  });
}
```

### 4. 缓存清理

```javascript
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name)),
        );
      })
      .then(() => self.clients.claim()),
  );
});
```

## 实际应用示例

### 1. 离线页面

```javascript
const OFFLINE_URL = "/offline.html";

self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(fetch(event.request).catch(() => caches.match(OFFLINE_URL)));
  } else {
    event.respondWith(
      caches.match(event.request).then((response) => response || fetch(event.request)),
    );
  }
});
```

### 2. API 响应缓存

```javascript
const API_CACHE_NAME = 'api-cache-v1';

self.addEventListener('fetch', event => {
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      caches.open(API_CACHE_NAME)
        .then(cache => cache.match(event.request)
        .then(response => response ||
          fetch(event.request)
            .then(response => {
              if (response.ok) {
                const clone = response.clone();
                caches.open(API_CACHE_NAME)
                  .then(cache => cache.put(event.request, clone));
              }
              return response;
            })
        )
    );
  }
});
```

## 性能优化技巧

1. **缓存分片**：

   ```javascript
   // 按类型分开缓存
   const CACHES = {
     static: "static-v1",
     images: "images-v1",
     api: "api-responses",
   };
   ```

2. **缓存过滤**：

   ```javascript
   // 不缓存非GET请求和大文件
   if (event.request.method !== "GET" || event.request.url.includes("large-video.mp4")) {
     return fetch(event.request);
   }
   ```

3. **部分响应缓存**：

   ```javascript
   fetch(event.request).then((response) => {
     // 只缓存响应体前1MB
     const reader = response.body.getReader();
     // …处理部分读取逻辑
   });
   ```

## 调试与监控

1. **Chrome DevTools**：
   - Application → Cache Storage
   - 查看/删除缓存内容

2. **控制台命令**：

   ```javascript
   // 列出所有缓存
   caches.keys().then((keys) => console.log(keys));

   // 检查特定缓存内容
   caches.open("my-cache").then((cache) => cache.keys());
   ```

3. **日志记录**：

   ```javascript
   // 在Service Worker中添加日志
   self.addEventListener("fetch", (event) => {
     console.log("Fetch:", event.request.url);
     // …
   });
   ```

```javascript
// 发现 sw
navigator.serviceWorker.register("/sw.js").then((reg) => {
  reg.addEventListener("updatefound", () => {
    console.log("New Service Worker found");
  });
});
```

## 最佳实践

1. **缓存策略选择**：
   - 静态资源：Cache First
   - 动态内容：Network First
   - 关键 API：Network Only

2. **缓存容量管理**：
   - 限制缓存总大小
   - 定期清理旧缓存

3. **更新机制**：
   - 修改 Service Worker 文件触发更新
   - 使用 skipWaiting() 和 clients.claim() 立即激活

4. **安全考虑**：
   - 仅缓存安全请求 (GET)
   - 不缓存敏感数据

Cache API 为现代 Web 应用提供了强大的离线能力，合理使用可以显著提升用户体验，特别是在网络不稳定或完全离线的场景下。
