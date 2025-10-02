---
tags: []
up:
related:
created: 2025-06-12
modified: 2025-06-12
---


SSR (Server-Side Rendering) 和 SSG (Static Site Generation) 是现代前端开发的两种 加速渲染策略，以下是它们的全面对比：

## 🌐 基本概念

| 特性                | SSR (服务端渲染)                     | SSG (静态站点生成)                     |
|---------------------|-------------------------------------|----------------------------------------|
| **渲染时机**        | 每次请求时服务器实时渲染             | 构建时预渲染所有页面                    |
| **内容更新**        | 每次访问获取最新数据                | 需要重新构建才能更新内容                |
| **适用场景**        | 动态内容网站 (用户仪表盘等)         | 内容相对稳定的网站 (博客、文档等)       |

## ⚡ 性能对比

| 指标                | SSR                               | SSG                               |
|---------------------|-----------------------------------|-----------------------------------|
| **TTFB**            | 较高 (需要服务器处理)             | 极低 (CDN 直接返回)               |
| **首屏时间**        | 较快 (返回完整 HTML)               | 最快 (预渲染 HTML)                 |
| **服务器负载**      | 高 (每次请求都需渲染)             | 几乎为零 (纯静态文件)             |
| **可扩展性**        | 需要服务器扩容                    | 无限扩展 (CDN 支撑)                |

## 🛠 技术实现

### SSR 典型实现 (Next.js 示例)

```jsx
// pages/user/[id].js
export async function getServerSideProps(context) {
  const res = await fetch(`https://api.example.com/users/${context.params.id}`);
  const user = await res.json();
  
  return { 
    props: { user }  // 每次请求都会调用
  };
}

function UserPage({ user }) {
  return <div>{user.name}</div>;
}
```

### SSG 典型实现 (Next.js 示例)

```jsx
// pages/blog/[slug].js
export async function getStaticPaths() {
  const posts = await fetch('https://api.example.com/posts');
  const paths = posts.map(post => ({
    params: { slug: post.slug }
  }));
  
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const post = await fetch(`https://api.example.com/posts/${params.slug}`);
  return { 
    props: { post },
    revalidate: 60  // 增量静态再生(ISR)：60秒后重新验证
  };
}

function BlogPost({ post }) {
  return <article>{post.content}</article>;
}
```

## 📊 关键决策因素

| 考虑维度            | 选择 SSR 当…                      | 选择 SSG 当…                      |
|---------------------|----------------------------------|----------------------------------|
| **内容更新频率**    | 内容每分钟/秒变化                | 内容每天/周变化                   |
| **个性化需求**      | 需要用户专属内容                 | 内容对所有用户相同                |
| **流量规模**        | 可控的中等流量                   | 超高流量需求                      |
| **SEO 需求**         | 需要但动态内容                   | 强 SEO 需求且内容稳定               |
| **开发资源**        | 有服务器运维能力                 | 无服务器运维团队                  |

## 🔄 混合方案

现代框架支持混合模式：

1. **ISR (增量静态再生)**

   ```js
   // Next.js示例
   return {
     props: { data },
     revalidate: 3600 // 1小时后重新生成页面
   };
   ```

2. **动态 SSR+ 静态 SSG**

   ```js
   // Next.js页面配置
   // /pages/home.js - SSG
   // /pages/dashboard.js - SSR
   ```

3. **按路由定制**

   ```js
   // Next.js app router
   export const dynamic = 'auto'; // 自动选择最佳方式
   ```

## 🚀 2024 年最新趋势

1. **Edge SSR** (Vercel/Cloudflare Workers)
   - 在边缘节点运行 SSR，降低延迟

   ```js
   // Next.js配置
   export const runtime = 'edge';
   ```

2. **React Server Components**
   - 混合客户端/服务端组件

   ```jsx
   // app/page.js
   async function Page() {
     const data = await fetchData();
     return <ClientComponent data={data} />;
   }
   ```

3. **Partial Hydration** （Astro）
   - 仅对交互部分进行 hydration

   ```jsx
   // Astro 示例
   <Counter client:load />
   ```

## 💡 使用建议

1. **内容优先策略**：

   ```
   if (内容基本不变) → 纯SSG
   elseif (用户个性化) → SSR + CDN缓存
   else → ISR混合模式
   ```

2. **性能优化组合**：
   - SSG 主体 + 客户端动态部件
   - 关键路径 SSR + 非关键路径 CSR

3. **监控指标**：
   - SSR 关注服务器响应时间
   - SSG 关注构建时间和缓存命中率

根据项目需求，现代项目通常采用混合渲染策略，而非非此即彼的选择。Next.js 等框架的进步使得在同一个应用中灵活组合 SSR/SSG 成为可能。
