---
tags: []
up:
related:
created: 2025-06-12
modified: 2025-06-12
---

### Error Boundaries（错误边界）

默认情况下，如果应用程序在渲染过程中抛出错误，React 将从屏幕上删除其 UI。  
为了防止这种情况，可以将 UI 的一部分包装到 错误边界 中。错误边界是一个特殊的组件，可用于显示一些后备 UI，而不是显示错误消息。

要实现错误边界组件，你需要提供 static getDerivedStateFromError，它允许你更新状态以响应错误并向用户显示错误消息。你还可以选择实现 componentDidCatch 来添加一些额外的逻辑，例如将错误添加到分析服务。

以下是简单的实现，实际开发可以使用第三方库 **error-boundary**

```jsx
import * as React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // 更新状态，以便下一次渲染将显示后备 UI。
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    logErrorToMyService(
      error,
      // 示例“组件堆栈”：
      // 在 ComponentThatThrows 中（由 App 创建）
      // 在 ErrorBoundary 中（由 APP 创建）
      // 在 div 中（由 APP 创建）
      // 在 App 中
      info.componentStack,
      // 仅在 react@canary 版本可用
      // 警告：Owner Stack 在生产中不可用
      React.captureOwnerStack()
    )
  }

  render() {
    if (this.state.hasError) {
      // 你可以渲染任何自定义后备 UI
      return this.props.fallback
    }

    return this.props.children
  }
}
```

然后你可以用它包装组件树的一部分：

```jsx
<ErrorBoundary fallback={<p>Something went wrong</p>}>
  <Profile />
</ErrorBoundary>
```

如果 Profile 或其子组件抛出错误，ErrorBoundary 将“捕获”该错误，然后显示 fallback 指定的组件，并抛出错误报告。

### 全局错误监听

为了捕获 Error Boundaries 无法处理的错误（如事件处理器或异步代码中的错误），可以使用 JavaScript 的全局错误监听机制。

- 使用 window.onerror 监听全局错误。
- 使用 window.addEventListener('error', handler) 监听未捕获的错误。
- 使用 window.addEventListener('unhandledrejection', handler) 监听未处理的 Promise 拒绝。

```jsx
import React, { useEffect } from 'react'

function GlobalErrorHandler() {
  useEffect(() => {
    // 监听全局错误
    const handleError = (error) => {
      console.error('Global error:', error)
    }

    // 监听未捕获的错误
    window.onerror = (message, source, lineno, colno, error) => {
      handleError(error)
      return true // 阻止默认错误处理
    }

    // 监听未处理的 Promise 拒绝
    window.addEventListener('unhandledrejection', (event) => {
      handleError(event.reason)
    })

    // 清理监听器
    return () => {
      window.onerror = null
      window.removeEventListener('unhandledrejection', handleError)
    }
  }, [])

  return null
}

// 在应用的根组件中使用
function App() {
  return (
    <div>
      <GlobalErrorHandler />
      <MyComponent />
    </div>
  )
}
```

注意事项：
1. 全局错误监听可以捕获 Error Boundaries 无法处理的错误，但无法阻止组件崩溃。
2. 需要确保在生产环境中正确处理错误信息，避免暴露敏感信息。
