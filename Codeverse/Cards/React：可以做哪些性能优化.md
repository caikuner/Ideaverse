---
tags: []
up:
related:
created: 2025-06-12
modified: 2025-06-12
---

### React.useMemo() / React.memo`

`React.useMemo() / React.memo`: 用于缓存昂贵的计算结果，避免在每次渲染时重复计算。

```jsx
function ExpensiveComponent({ items, filter }) {
  const filteredItems = useMemo(() => {
    return items.filter((item) => item.includes(filter))
  }, [items, filter]) // 仅在 items 或 filter 变化时重新计算

  return (
    <ul>
      {filteredItems.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}
```

### React.useCallback()

`useCallback`: 用于缓存回调函数，避免在每次渲染时创建新的函数实例。 

```jsx
function ParentComponent() {
  const [count, setCount] = React.useState(0)

  const handleClick = React.useCallback(() => {
    setCount((prevCount) => prevCount + 1)
  }, []) // 空依赖数组，函数不会重新创建

  return (
    <div>
      <ChildComponent onClick={handleClick} />
      <p>Count: {count}</p>
    </div>
  )
}

const ChildComponent = React.memo(({ onClick }) => {
  console.log('ChildComponent rendered')
  return <button onClick={onClick}>Click me</button>
})
```

### React.lazy()

`组件/路由懒加载`：通过动态导入（dynamic import）将组件拆分为单独的代码块，按需加载。可以减少初始加载的代码量，提升页面加载速度

```jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React, { Suspense } from 'react'

const Home = React.lazy(() => import('./Home'))
const About = React.lazy(() => import('./About'))

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading…</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </Router>
  )
}
```

### React.Suspense

`Suspense`: 用于在异步加载数据或组件时显示加载状态，可以减少初始加载时间，提升用户体验。  
可以在未加载时，fallback 显示 loading 或者骨架屏。

```jsx
const LazyComponent = React.lazy(() => import('./LazyComponent'))

function MyComponent() {
  return (
    <React.Suspense fallback={<div>Loading…</div>}>
      <LazyComponent />
    </React.Suspense>
  )
}
```
