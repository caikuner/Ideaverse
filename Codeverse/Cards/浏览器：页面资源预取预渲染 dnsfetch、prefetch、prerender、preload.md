---
tags: []
up:
related:
created: 2025-06-14
modified: 2025-06-14
---

### 有哪些资源预取标识

HTML5 资源预取标识（Resource Hint）
- dns-prefetch（dns 解析）
- preconnect（dns+TCP+TLS）
- prefetch （预下载资源但不执行）
- prerender （预下载资源并执行）
	- → NoState Prerender（预下载资源，并加载 DOM，但不执行 js）
- preload（高优下载本页面资源）

> 可以使用在 meta 标签或者 HTTP 请求头中，如：

```
// HTML: 
<link rel="prefetch" href="/uploads/images/pic.png">

//HTTP Header: 
Link: </uploads/images/pic.png>; rel=prefetch
```

---

### dns-prefetch vs. preconnect

**这两个标识都是为了预先在后台建立连接**
- 减少网络连接时间
- 适用于即将请求其他域名的资源
- 对跨域资源加载特别有效，因为跨域需要重新连接

**dns-prefetch**：预先解析域名的 DNS 记录

```html
<link rel="dns-prefetch" href="//fonts.googleapis.com">
<link rel="dns-prefetch" href="//www.google-analytics.com"> 
<link rel="dns-prefetch" href="//opensource.keycdn.com">
<link rel="dns-prefetch" href="//cdn.domain.com">
```

**preconnect**：预先执行所有网络连接操作（DNS + TCP + TLS）

```html
<link rel="preconnect" href="https://cdn.domain.com" crossorigin>
```

![[Pasted image 20250614130802.png]]

### prefetch vs. prerender

**这两个标识都是为了在浏览器空闲时，预先在后台获取资源，获得渲染优化**
- 减少资源获取时间
- 适用于加速获取即将访问的资源
- 虽然是在空闲时下载，但也消耗性能，确实需要再使用

**prefetch**
- 用于预下载将来可能需要的资源，但不会进行任何渲染（加载 DOM，执行 JS，CSS 布局等）
- 浏览器空闲时才会下载
- 缺点：只下载，达不到 prerender 那样好的页面优化
- 适用：下一页有可能用到的资源

```html
<!-- 只预下载资源，但不做任何执行 -->
<link rel="prefetch" href="page.html" as="document">
```

 **prerender**
 - **后台静默下载，并完整渲染指定页面**（包括加载 DOM，执行 JS、CSS 布局计算等）
 - 当用户实际访问该页面时，能实现**瞬间加载**（如同从缓存中直接读取）
 - 缺点：资源消耗较大，存在内存压力和带宽浪费
 - 适用：**高确定性导航**场景（如分页器下一页）

```html
<link rel="prerender" href="page.html">
```

**prerender2.0**:
- prerender 消耗过大，已被 `NoState Prerender` 方案替代
- `NoState Prerender` 就是 prefetch 和 prerender 的折中方案
	- 下载资源并预加载 DOM
	- 但不执行 JS，也不保留页面状态

```html
<!-- 预加载DOM，但不执行 JS，也不保留页面状态 -->
<link rel="prerender" href="page.html" as="document" pr="no-state">
```

#### prerender 的工作原理

- 通过 `<link>` 标签声明预渲染资源
- 浏览器会：
	- 创建隐藏的 `iframe` 加载目标页面
	- 解析 DOM 结构（**但不展示给用户**），并且完整执行页面所有资源（包括 JS）

#### 使用建议

1. 优先使用 `prefetch` 加载关键资源
2. 如果页面不敏感，可使用 `NoState Prefetch` 预加载页面结构
3. 对确实高概率访问的页面使用 `prerender`（但需权衡资源消耗）
4. 配合 `Page Visibility API` 检测预渲染状态：

```javascript
// 标签页被隐藏或显示的时候会触发visibilitychange
document.addEventListener('visibilitychange', () => {
	// document.visibilityState: 返回document的可见性, 即当前可见元素的上下文环境，由此可以知道当前文档(即为页面)是在背后, 或是不可见的隐藏的标签页，或者(正在)预渲染.
	// 可用值：visible, hidden, prerender, unload
	if (document.visibilityState === 'prerender') {
		// 预渲染阶段执行轻量级初始化
	}
});
```

### preload：高优先级为当前页面加载资源

preload 指令事实上克服了只能在 HTML 中使用的限制并且允许预加载在 CSS 和 JavaScript 中定义的资源，并允许决定何时应用每个资源。

设定优先级：
- 使用 as=“style” 属性将获得最高的优先级
- as =“script” 将获得低优先级或中优先级
- 没有 “as” 属性的将被看作异步请求。 通常有 JS 文件，图片资源、字体等。

```html
<link rel="preload" href="image.png"> // 预加载图片
<link rel="preload" href="https://example.com/fonts/font.woff" as="font" crossorigin> // 跨域预加载
<link rel='preload' as='style' href='./style.css' onload='this.rel=stylesheet'>
```

preload 不仅可以通过 HTML 标签设置，还可以通过 js 设置

```js
var res = document.createElement("link"); 
res.rel = "preload"; 
res.as = "style"; 
res.href = "css/mystyles.css"; 
document.head.appendChild(res); 
```
