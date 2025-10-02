---
tags: [todo]
up: 
related: 
created: 2025-05-24
modified: 2025-07-03
---


jsx
props
key
vdom, diff, 协调
事件处理
数据快照
闭包陷阱。对于 useEfefct 等使用了 callback 的 hook
受控和非受控组件
纯函数组件：渲染期间变量无更改，无论多少次调用结果都一样
stric mode
副作用 side effect
useRef 操作 dom
useContext
creating portals，传送门，脱离当前 dom

```js
function Modal({ onClose, children }) {
  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
        <button onClick={onClose}>关闭</button>
      </div>
    </div>,
    document.body
  );
}
```

suspense
error boundary
