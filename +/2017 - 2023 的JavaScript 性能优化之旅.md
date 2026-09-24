---
aliases: []
tags: []
up:
related:
companies:
url: https://mp.weixin.qq.com/s/0ZcObUm6eS7tSMbrT-cL4Q
created: 2023-09-03
modified: 2025-06-20
---

#x/readitlater #source/article

# [2017 - 2023 的JavaScript 性能优化之旅](https://mp.weixin.qq.com/s/0ZcObUm6eS7tSMbrT-cL4Q)

## 吐槽时间

不知道从什么时候开始，前端开始卷一些 “高端知识”，动不动就**浏览器底层原理**，**V8 是如何运行的**，倒不是说这些没啥用，只是来势汹汹好像不懂这些就不能糊页面一样。

我工作中和内核团队与虚拟机团队也合作过并咨询过他们这些相关问题，大家的态度也很明确，面对这种千万行代码的大型工程项目，他们作为专业人士也不是啥都懂，万一遇到个真的啥都懂的，人家必然也不会去做前端，这就显得一些面试官和求职者的八股攻防战可笑了起来。

那么如果真的遇到一些场景需要学习相关知识，或者就是单纯的个人感兴趣想了解一下原理和细节，最好的办法是什么呢？很简单，直接看**相关团队的 Blog 或核心开发人员的 Blog & 演讲**，这都是除去源码的第一手消息，水平比那些二道贩子不知道高到哪里去了。

## The Cost Of JavaScript

the-cost-of-js

今天的标题是 **The Cost Of JavaScript**，是作者 Addy Osmani\[1\] 的系列 Blog 主标题，到今年为止一共写了 4 篇，从 开发者/内核/框架 等角度探索如何优化 JS 执行成本。

Addy Osmani 何许人也？Google 工作 11 年，Chrome Developer Experience organization（Chrome DX 部门）的技术主管，这个 Title 很够分量了。

> 📌
>
> I am the engineering lead for Google Chrome's Developer Experience organization. Our projects include Chrome DevTools, Lighthouse, PageSpeed Insights and Chrome User Experience Report, Aurora and WordPress Performance. We recently shipped User Flows for DevTools and Lighthouse!
>
> — <https://addyosmani.com/>

不多说了，下面我直接介绍他的这个 Blog 系列大概讲了些啥。

### 2017

Blog 链接：<https://medium.com/dev-channel/the-cost-of-javascript-84009f51e99e>

这篇文章是 **The Cost Of JavaScript** 系列的第一篇文章，主要是抛出了一个概念，揭露 JavaScript 在浏览器上的 parse + compile + execution 成本还是很高的（这部分对于前端开发者来说最直观的就是 `long task`），开发者需要关心并优化这个耗时。

这篇 Blog 有个案例非常有意思，就是对比同体积的 JS Script 和 Img 的解析时间。因为体积相同，所以对 network 来说耗时是一样的，但是一张 jpg 的解析和光栅化时间加起来不到 0.1s，对人眼来说基本上是没有感知的；但是 JS 代码的 Parse + Compile + execution 时间加起来是 3.5s，几十倍的差距，对比非常的明显。

img vs js

缩小 JS 解析运行成本的方式也很简单，就是 `preload`/`tree shaking`/`minify`/`code split`。站在 2023 这个节点看，这些方案现如今都有比较成熟的解决方案了，各个新兴或老牌框架也在这些能力上做了相关的探索，我就不展开说了。

### 2018

Blog 链接：<https://medium.com/@addyosmani/the-cost-of-javascript-in-2018-7d8950fbb5d4>

本篇文章可是说是**完全面向前端开发者的 JS 优化指南**，前半部分都是各种列数据说 JS 多了有多影响用户体验，后半部分就是介绍了一些 JS 优化手段，在我看来都是被国内抄烂了的一些优化：

- minify/compression/cache
- tree shaking/code split/lazy load/code coverage
- preload/web worker/serive worker
- ……

具体细节看原文吧，不展开说了。

### 2019

Blog 链接：<https://v8.dev/blog/cost-of-javascript-2019>

这篇文章相对来说会深入一些，从 Blog 发布网站就能看出，这个是从 **内核/V8** 的角度做的优化，对前端工程师来说可操作性会小一些，但是对理解原理（比如说看懂各种性能火焰图）还是有些帮助的，下面我们就走马观花的看一下他们做的工作。

#### 1.Script Streaming

第一个优化是 `Script Streaming`，从功能上翻译（非直译）应该叫 “流式加载编译”。

首先来些前置知识。出于 UI 系统的特性，UI 更新的逻辑都必须在 main thread（UI thread）上执行，也就是 script evaluate，但是前置的 parse + compile 可以多线程并行执行的。所以浏览器很早就有一种优化：对于标识了 `defer` or `async` 的 script 文件，浏览器都可以开启多线程编译能力，优化 UI thread 被阻塞的时间。

Chrome 基于这个优化背景，又做了一些优化，那就是流式编译。最终的效果就是 network streaming 直接对接 streaming parser，效率大大增加。

这个怎么理解呢，这个就有些像要从屋里把水接到院里：

- 一开始就是在屋里接满一桶水，然后运到院里，而且你只有一个桶运水（JS 代码的 parse + compile + executio 都在 UI thread 执行）
- 后来多买了几个桶，可以一次并行运水（基于多线程能力做 parse + compile，最后统一给 UI thread 消费）
- 一桶一桶的接水，还要搬来搬去，太麻烦了，直接买了几根长水管，接好直接把水传到院子里（Chrome 做的优化，network streaming 直接对接 streaming parser，充分利用 CPU 时间）

最后的实际效果就如下图，让后台编译线程等待时间大大降低，增强性能：

script streaming

#### 2.JSON Parse

JSON 解析要比 object 快（这个是显然易见的，JSON 语法要比 object 简单多了，解析成本要低很多），Google 建议大于 10KB 的 JSON 可以尝试这种优化：

```
const data = { foo: 42, bar: 1337 }; // 🐌const data = JSON.parse('{"foo":42,"bar":1337}'); // 🚀
```

其实从 Google 建议也可以看出，大部分情况下都没必要抠搜这部分性能。node 后端场景可能会遇到，前端较大的数据管理库可能会遇到（比如说很大的一个 redux 状态对象），其余场景没必要因为这点儿性能降低代码维护性。

#### 3.Code Caching

这部分内容说的是 Chrome 的 Code Caching。它本质上也是 cache 的一种，比如说我们最常接触到的缓存就是基于 HTTP Cache Head 的网络资源缓存，即 memory cache 和 disk cache，这两个缓存的主要是 http response，命中后可以节约网络请求的耗时。

code caching 从大类上分其实是 disk caching 的一种，但是它缓存的不是 http response，**而是 javascript 文件 parse + compile 后的  bytecode**，所以如果命中 code caching，network + parse + compile 的时间就全省了，直接 evaluate 就行。

不过 code caching 的命中条件会相对苛刻一些，同一个资源需要前 72h 命中两次，之后**第 3 次请求**才会命中 code caching，这部分更详细的知识建议直接看 V8 对 code caching 的系列 Blog。

### 2023

YouTube 链接：<https://www.youtube.com/watch?v=ZKH3DLT4BKw&t=0s>

可能因为疫情原因，这个系列的演讲中断了 3 年，不过今年又续上了。

演讲前段说的还是一些数据统计，中段说的通用优化，和 2018 的内容差不多。后段介绍了一些这两年较火的框架和新技术，来我给你报一下菜名：

- Astro/Qwik
- Route & Component Based Code Spliting/Import On Visibility
- Islands Architecture
- Partial Hydration/Progressive Hydration/Resumabilty Hydration/Selective Hydration
- React Server Components
- Streaming Server Rendering

我就问你怕不怕。这些技术内容总体上都是化整为零，减少浏览器端 JS 的 `long task`。例如最原始的 Hydration 就是全量执行，导致 TTI 高居不下，所以框架层这两年搞了一堆 Hydration 方案来优化。

这些内容在原视频里也就介绍了 10 分钟，但是想搞懂每个东西的含义，不读十几篇相关 Blog 是搞不懂的，大家感兴趣的话还是需要自己收集资料了解。

## Summary

通体看下来，这 4 篇 Blog 料还是挺足的，以这个系列为引进行发散，其实可以收集到不少好东西，对现实开发和眼界提升都是很好的内容。

Web 因为 JavaScript 提升了天花板，但开发者又需提升 UX 去减少 JavaScript 的执行，这一来一回，工作不就来了嘛，所以谢谢 JavaScript 赏饭吃 🙏。

## Blog 推荐

本篇文章主要推荐的就是 Addy Osmani 的个人网站 addyosmani.com\[2\]，有意思的内容很多，大家可以挖掘一下；另一个有意思的内容就是 V8 的 Blog：v8.dev/blog\[3\]，别看国内那些被嚼了好几遍的性能优化文章了，直接看一手信息多好。

### 参考资料

\[1\]

Addy Osmani: _<https://addyosmani.com/_>

\[2\]

addyosmani.com: _<https://addyosmani.com>_

\[3\]

v8.dev/blog: _<https://v8.dev/blog_>
