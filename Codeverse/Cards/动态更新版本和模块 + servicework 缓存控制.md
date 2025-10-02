---
tags: []
up:
related:
created: 2025-07-01
modified: 2025-07-01
---

> 生产环境 Web 应用模块热更新方案：动态 import() + Service Worker 缓存控制

## 核心实现方案

### 1. 架构设计

```
客户端浏览器
├── 主应用 (长期缓存)
├── 动态模块 (按需加载)
└── Service Worker (缓存控制中枢)
```

### 2. 关键实现步骤

#### 2.1 模块拆分与动态导入

```javascript
// 使用动态import()加载模块
const loadModule = async (moduleName) => {
  try {
    const module = await import(`./modules/${moduleName}.js?v=${__BUILD_VERSION__}`);
    return module;
  } catch (err) {
    console.error('模块加载失败:', err);
    // 回退策略
  }
};
```

#### 2.2 Service Worker 缓存策略

```javascript
// sw.js
const CACHE_NAME = 'dynamic-modules-v1';
const VERSIONED_MODULES = new Set();

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(['/main-app.js']))
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // 动态模块请求处理
  if (url.pathname.includes('/modules/')) {
    event.respondWith(
      caches.match(event.request)
        .then(cached => {
          // 网络优先策略
          return fetch(event.request)
            .then(networkResponse => {
              // 更新缓存
              caches.open(CACHE_NAME)
                .then(cache => cache.put(event.request, networkResponse.clone()));
              return networkResponse;
            })
            .catch(() => cached || Response.error());
        })
    );
  } else {
    // 主应用使用缓存优先
    event.respondWith(
      caches.match(event.request)
        .then(cached => cached || fetch(event.request))
    );
  }
});
```

### 3. 热更新触发机制

#### 3.1 版本检测方案

```javascript
// 主应用中的更新检查
async function checkUpdates() {
  const manifest = await fetch('/asset-manifest.json?v=' + Date.now());
  const { version } = await manifest.json();
  
  if (version !== localStorage.getItem('appVersion')) {
    // 触发更新流程
    notifyUserUpdateAvailable();
  }
}

// 定期检查（每小时）
setInterval(checkUpdates, 60 * 60 * 1000);
```

#### 3.2 模块更新通知

```javascript
// 使用BroadcastChannel通知所有标签页
const updateChannel = new BroadcastChannel('app-updates');

function notifyUserUpdateAvailable() {
  updateChannel.postMessage({ type: 'UPDATE_AVAILABLE' });
  
  // 或者显示UI提示
  if (confirm('新版本可用，是否立即更新？')) {
    window.location.reload();
  }
}
```

### 4. 生产环境优化策略

#### 4.1 缓存清除策略

```javascript
// 激活时清理旧缓存
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
```

#### 4.2 增量更新机制

```javascript
// 模块级版本控制
function getModuleVersion(moduleName) {
  return fetch(`/modules/${moduleName}.version`)
    .then(res => res.text());
}

// 使用前检查版本
async function useModule(moduleName) {
  const currentVer = await getModuleVersion(moduleName);
  const cachedVer = localStorage.getItem(`module_${moduleName}_version`);
  
  if (currentVer !== cachedVer) {
    // 强制更新模块
    const module = await loadModule(`${moduleName}?force=${Date.now()}`);
    localStorage.setItem(`module_${moduleName}_version`, currentVer);
    return module;
  }
  
  return loadModule(moduleName);
}
```

## 部署最佳实践

1. **文件命名策略**：
   - 主应用：`main-[hash].js` (长期缓存)
   - 动态模块：`[name]-[chunkhash].js` (内容哈希)

2. **CDN 配置**：

   ```nginx
   location ~* \.(js|css)$ {
     add_header Cache-Control "public, max-age=31536000, immutable";
     if ($query_string) {
       add_header Cache-Control "no-cache";
     }
   }
   ```

3. **构建工具配置** (Webpack 示例)：

   ```javascript
   output: {
     filename: '[name]-[chunkhash].js',
     chunkFilename: '[name]-[chunkhash].js',
     publicPath: '/'
   }
   ```

## 监控与回滚

1. **更新成功率监控**：

   ```javascript
   // 上报更新状态
   function reportUpdateStatus(module, success) {
     navigator.sendBeacon('/log', JSON.stringify({
       type: 'module_update',
       module,
       success,
       timestamp: Date.now()
     }));
   }
   ```

2. **自动回滚机制**：

   ```javascript
   // 模块加载失败时回退到旧版本
   async function loadWithFallback(moduleName) {
     try {
       return await useModule(moduleName);
     } catch (err) {
       console.warn('加载失败，尝试回退:', err);
       return loadModule(`${moduleName}?v=${localStorage.getItem(`module_${moduleName}_fallback`)}`);
     }
   }
   ```

这种方案实现了细粒度的模块热更新能力，同时保持了应用的稳定性，适合大型生产环境应用。Service Worker 作为缓存控制中枢，配合动态 import() 实现了按需更新，而版本查询机制确保了用户能及时获取更新。
