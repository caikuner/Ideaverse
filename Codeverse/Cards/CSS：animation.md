---
tags:
  - concept
  - fe/css
up:
related:
  - 图形学
rank:
companies:
created: 2025-04-19
modified: 2025-06-23
---

CSS3 动画是一种强大且实用的网页动画技术，可以不依赖 JavaScript 实现简单的动画效果，为网页增添生动性和交互性。 在实际开发中，可以根据具体需求结合 JavaScript 来实现更复杂的动画效果。

## 学习目标

- 知道 css 动画，css 动画属性主要关键字和用法 (面试可以口述 css 动画，至少能说对大概，而不是回答百度一下就会用)
- 知道 js 动画，能说出 1~2 个社区 js 动画库，知道 js 动画和 css 动画优缺点以及适用场景
- 性能相关：知道 raf 和其他达到 60fps 的方法。说出 raf 和 timeout 的区别，以及各自在优化时候的作用

## 主要概念

- **关键帧（Keyframes）**：关键帧定义了动画在不同时间点的状态。通过 `@keyframes` 规则来创建，开发者可指定元素在动画过程中不同阶段的样式。
- **动画属性**：用于控制动画的各个方面，如动画的持续时间、播放次数、播放方向等。
- **简写属性**：动画属性的简化定义方法

### 关键帧（`@keyframes`）

`@keyframes` 规则是创建 CSS3 动画的基础，它允许开发者定义动画的开始、中间和结束状态。
以下是其基本语法：

```css
@keyframes animationName {
  0% {
    /* 动画开始时的样式 */
    property: value;
  }
  50% {
    /* 动画进行到一半时的样式 */
    property: value;
  }
  100% {
    /* 动画结束时的样式 */
    property: value;
  }
}
```

也可以使用 `from` 和 `to` 来简化表示 0% 和 100%：

```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

### 动画属性 animation-x

#### 1. `animation-name`

**功能**：指定要应用的关键帧动画名称（通过 `@keyframes` 定义）。

**默认值**：`none`（无动画）。

**可选值**：

- 自定义的关键帧名称（如 `pulse`、`bounce`）。
- `none`（不应用任何动画）。

#### 2. `animation-duration`

**功能**：设置动画完成一个周期所需的时间（从开始到结束）。

**默认值**：`0s`（无动画效果，因为时长为 0）。

**可选值**：

时间值（单位：`s` 或 `ms`），如 `1s`、`500ms`。

```
.element { animation-duration: 0.5s; } /* 动画持续 0.5 秒 */
```

#### 3. `animation-timing-function`

**功能**：控制动画的速度曲线（加速、减速、匀速等）。

**默认值**：`ease`（慢进慢出，中间快）。

**可选值**：

- 预定义值：
  - `linear`：匀速（从头到尾速度一致）。
  - `ease-in`：慢开始（加速）。
  - `ease-out`：慢结束（减速）。
  - `ease-in-out`：慢开始和慢结束（先加速后减速）。
- 贝塞尔曲线：`cubic-bezier(n, n, n, n)`（自定义曲线）

```
.element { animation-timing-function: ease-in-out; } /* 平滑的开始和结束 */
```

#### 4. `animation-delay`

**功能**：设置动画开始前的延迟时间。

**默认值**：`0s`（立即开始）。

**可选值**：

时间值（单位：`s` 或 `ms`），如 `0.3s`、`200ms`。

**最常用用法**：让多个动画按顺序启动，例如：

```
.element1 { animation-delay: 0s; } /* 立即开始 */

.element2 { animation-delay: 0.5s; } /* 延迟 0.5 秒开始 */
```

#### 5. `animation-iteration-count`

**功能**：设置动画循环播放的次数。

**默认值**：`1`（播放一次）。

**可选值**：

- 正整数（如 `2`、`3`）：指定循环次数。
- `infinite`：无限循环。

**最常用用法**：实现无限循环动画（如加载动画、脉冲效果）：

```
.loading { animation-iteration-count: infinite; } /\* 无限循环 \*/
```

#### 6. `animation-direction`

**功能**：控制动画的播放方向（正向、反向、交替等）。

**默认值**：`normal`（正向播放，每次从起点开始）。

**可选值**：

- `normal`：正向播放（默认）。
- `reverse`：反向播放（从关键帧的 `to` 状态开始，回到 `from` 状态）。
- `alternate`：交替播放（第一次正向，第二次反向，以此类推）。
- `alternate-reverse`：反向交替（第一次反向，第二次正向）。

**最常用用法**：实现往返动画（如弹性效果）：

```
.bounce { animation-direction: alternate; } /\* 正向和反向交替播放 \*/
```

#### 7. `animation-fill-mode`

**功能**：设置动画在开始前和结束后的样式（是否应用关键帧的初始或最终状态）。

**默认值**：`none`（动画期间应用样式，结束后回到原始状态）。

**可选值**：

- `none`：无填充（默认）。
- `forwards`：动画结束后，元素保留最后一帧的样式。
- `backwards`：动画开始前，元素应用第一帧的样式（基于 `animation-delay`）。
- `both`：同时应用 `forwards` 和 `backwards`（开始前和结束后都保留关键帧样式）。

**最常用用法**：让动画结束后保持最终状态（如渐变完成后停留在目标颜色）：

```
.fade { animation-fill-mode: forwards; } /* 动画结束后保持不透明 */
```

#### 8. `animation-play-state`

**功能**：控制动画的播放状态（运行或暂停）。

**默认值**：`running`（动画正在播放）。

**可选值**：

- `running`：播放动画（默认）。
- `paused`：暂停动画（停留在当前帧）。

**最常用用法**：鼠标悬停时暂停动画（如悬停时停止加载动画）：

```
.element:hover { animation-play-state: paused; } /* 悬停时暂停动画 */
```

#### 总结

| 属性                        | 必需性         | 核心作用               | 最常用场景                      |
| --------------------------- | -------------- | ---------------------- | ------------------------------- |
| `animation-name`            | 必需（简写中） | 指定关键帧动画         | 配合 `@keyframes` 定义动画效果  |
| `animation-duration`        | 必需（简写中） | 定义动画时长           | 控制动画快慢（如 `1s`、`0.3s`） |
| `animation-timing-function` | 可选           | 设置动画曲线           |                                 |
| `animation-iteration-count` | 可选           | 控制循环次数           | 无限循环（`infinite`）          |
| `animation-direction`       | 可选           | 控制播放方向           | 往返动画（`alternate`）         |
| `animation-fill-mode`       | 可选           | 控制动画前后的样式保留 | 结束后保持状态（`forwards`）    |
| `animation-play-state`      | 可选           | 控制动画的播放状态     | 鼠标悬停时暂停动画 (paused)     |

### 简写属性 animation

**功能**：将上述所有动画子属性合并为一条声明，简化代码。

**语法**：

```css
animation: name duration timing-function delay iteration-count direction fill-mode play-state;
```

例如：

```css
.element {
  animation: fadeIn 2s linear 1s infinite alternate forwards running;
}
```

#### 必选和可选属性

- **必需属性**：在简写中，有且仅有 `animation-name`（动画名称）和 `animation-duration`（动画时长）**必须存在**，否则简写无效。
- **可选属性**：子属性可按**任意顺序**出现，未声明的使用默认值。

#### 为什么顺序不固定？

CSS 设计时允许简写属性以任意顺序排列子属性，目的是灵活适应不同场景。例如：

**侧重时长优先**：`animation: 1s bounce;`（先写时长，再写名称）

**侧重动画名称优先**：`animation: bounce 1s ease-out;`（先写名称，再写时长和曲线）

#### 最佳实践（可读性优先）

虽然顺序合法，但建议按 **“名称 → 时长 → 曲线 → 延迟 → 循环 → 方向”** 的顺序书写，符合大多数开发者习惯，例如：

```
animation: bounce 0.8s ease-in-out 0.2s infinite alternate;
```

这样的顺序更清晰，便于他人快速理解动画的核心参数（名称、时长、运动曲线），再处理细节（延迟、循环、方向）。

## 示例代码

下面是一个完整的示例，展示了如何使用 CSS3 动画让一个元素淡入淡出：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      @keyframes fadeInOut {
        0% {
          opacity: 0;
        }
        50% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }

      .box {
        width: 100px;
        height: 100px;
        background-color: blue;
        animation: fadeInOut 4s linear infinite;
      }
    </style>
  </head>

  <body>
    <div class="box"></div>
  </body>
</html>
```

在这个示例中，定义了一个名为 `fadeInOut` 的关键帧动画，让元素的透明度在 0 和 1 之间变化。然后将这个动画应用到一个蓝色的盒子上，动画持续时间为 4 秒，匀速播放，无限循环。

## 对比分析

#todo

### 对比 Transition

### 对比 JavaScript 动画

- 各自主流社区库
- 优缺点和适用场景

#### 优点

- **性能优化**：CSS3 动画由浏览器的渲染引擎直接处理，性能通常优于 JavaScript 动画，特别是在移动设备上。
- **代码简洁**：相比于 JavaScript 动画，CSS3 动画的代码更简洁，易于维护和理解。
- **兼容性好**：现代浏览器对 CSS3 动画的支持良好，无需额外的插件。

#### 局限性

- **交互性有限**：CSS3 动画主要用于实现预定义的动画效果，对于复杂的交互逻辑，如根据用户输入动态改变动画，可能需要结合 JavaScript 实现。
- **动画逻辑简单**：难以实现复杂的动画逻辑，如物理模拟、动画序列控制等。

## 动画性能和优化

#todo
