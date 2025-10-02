---
aliases: []
tags: []
up:
related:
url: 
created: 2024-03-03
modified: 2025-07-03
---

### React18 常用的内置 hook

1. **状态管理 Hooks**

- useState: 用于在函数组件中添加局部状态。
- useReducer: 用于管理复杂的状态逻辑，类似于 Redux 的 reducer。

**2. 副作用 Hooks**

- useEffect: 用于在函数组件中执行副作用操作（如数据获取、订阅、手动 DOM 操作等）。
- useLayoutEffect: 与 useEffect 类似，但在 DOM 更新后同步执行，适用于需要直接操作 DOM 的场景。

**3. 上下文 Hooks**

- useContext: 用于访问 React 的上下文（Context）。

**4. 引用 Hooks**

- useRef: 用于创建一个可变的引用对象，通常用于访问 DOM 元素或存储可变值。

**5. 性能优化 Hooks**

- useMemo: 用于缓存计算结果，避免在每次渲染时都重新计算。
- useCallback: 用于缓存回调函数，避免在每次渲染时都创建新的回调。


![[Pasted image 20250703160753.png]]

### useState

```jsx
const [count, setCount] = useState(0)

setCount(count + 1)
setCount(prev => prev + 1)
setCount(prev => prev + 1, （）=> {console.log(count)})
```

> [!NOTE] 注意
> - 多次的 set 会在后面批量更新
> - 和类组件的 setState 不同，useState 的 setter 方法不会自动合并状态对象
> - setter 可以根据之前的状态来修改 setState(pre=>next)
> - setter 方法第二个参数可以是一个回调，它会在状态更新完成且组件重新渲染后执行。
> - 不要在不需要重新渲染时使用 setState
> - 不要使用旧的状态，第二个参数拿到的值仍然只是当前渲染周期的值。如果需要处理状态更新的逻辑，请使用 useEffect + dependency

### `useReducer`

```js
const [state, dispatch] = useReducer(reducer, initialArg, init);

// eg:
const countReducer = (state, action) => {
    switch(action.type) {
        case 'increase':
            return state + 1
        case 'decrease':
            return state - 1
        default
            return state
    }
}
const [state, dispatch] = useReducer(countReducer, 0);
```

[[#usestate|`useState`]] 的替代方案。它接收一个形如 `(state, action) => newState` 的 reducer，并返回当前的 state 以及与其配套的 `dispatch` 方法。（和 redux 一致）

在某些场景下，`useReducer` 会比 `useState` 更适用，例如 state 逻辑较复杂且包含多个子值，或者下一个 state 依赖于之前的 state 等。并且，使用 `useReducer` 还能给那些会触发深更新的组件做性能优化，因为 可以向子组件传递 `dispatch` 而不是回调函数

### useEffect & useLayoutEffect

```js
useEffect(callback, dependencyArray)

useEffect(()=>{console.log(count)}, [count])
```

> 1. 不要缺少 useEffect 依赖
> 2. 依赖如果是数组或者对象，可能会因为内存地址相同而无限执行。请优先使用值类型，对象类型可以自定义 useDeepEffect，equal 对比逻辑改为深度比较
> 3. 不要忘记清理副作用
> 4. 什么时候使用：当希望将某个数据状态和浏览器进行同步

- useLayoutEffect 是在 DOM 更新之后，但在浏览器绘制之前**同步**执行。用于获取一些界面相关的状态
![[Pasted image 20250703163159.png|300]]

- useEffect 是浏览器绘制之后**异步**执行
![[Pasted image 20250703163229.png|300]]

### useRef

用于访问 DOM 元素或组件。

```js
const ref = useRef(0)

ref.current  // 可以直接获取和赋值更新
```

- ref 是引用，值是可变的
![[Pasted image 20250703163524.png|400]]

### useMemo & useCallback

用于性能优化。
- useMemo 计算结果并缓存，当依赖数组不变时 (Object.is)，会读取缓存，而不是重新计算。
- useCallback, 和 useMemo 类似，区别在于是用于包裹函数，缓存函数，适用于吧函数作为 prop 传递给 child，想进行性能优化的情况

### `useContext`

```js
const value = useContext(MyContext);
```

接收一个 context 对象（`React.createContext` 的返回值）并返回该 context 的当前值。当前的 context 值由上层组件中距离当前组件最近的 `<MyContext.Provider>` 的 `value` prop 决定。

当组件上层最近的 `<MyContext.Provider>` 更新时，该 Hook 会触发重渲染，并使用最新传递给 `MyContext` provider 的 context `value` 值。
![[Pasted image 20250703164005.png|300]]



忘记 `useContext` 的参数必须是 *context 对象本身*：

- **正确：** `useContext(MyContext)`
- **错误：** `useContext(MyContext.Consumer)`
- **错误：** `useContext(MyContext.Provider)`

调用了 `useContext` 的组件总会在 context 值变化时重新渲染。如果重渲染组件的开销较大，你可以 [[https://github.com/facebook/react/issues/15156#issuecomment-474590693]]。


**把如下代码与 Context.Provider 放在一起**

```js{31-36}
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

const ThemeContext = React.createContext(themes.light);

function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);

  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}
```

### useTransition & useDeferredValue

`useTransition` 是 React 18 引入的一个 Hook，用于**优化用户界面的响应性**，特别是在处理耗时任务（如数据加载、大量计算）时，可以避免页面卡顿，保持交互流畅。

```jsx
import { useTransition } from 'react';

function MyComponent() {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    // 使用 startTransition 包裹低优先级任务（如数据获取、状态更新）
    startTransition(() => {
      // 在这里执行可能导致 UI 卡顿的操作
      fetchDataAndUpdateState();
    });
  };

  return (
    <div>
      <button onClick={handleClick}>加载数据</button>
      {isPending ? <Spinner /> : <Content />}
    </div>
  );
}
```

**参数说明**

| 返回值 | 说明 |
|--------|------|
| `isPending` | 布尔值，表示是否有过渡任务正在执行（可用于显示加载状态）。 |
| `startTransition` | 函数，用于包裹低优先级任务，告诉 React 可以中断该任务以保持 UI 响应。 |

**使用示例：输入框搜索（防抖 + 过渡）**

```jsx
function SearchBox() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery); // 高优先级：立即更新输入框

    startTransition(() => {
      // 低优先级：搜索逻辑（可被中断）
      fetchSearchResults(newQuery).then(setResults);
    });
  };

  return (
    <div>
      <input value={query} onChange={handleChange} />
      {isPending ? <LoadingSpinner /> : <SearchResults data={results} />}
    </div>
  );
}
```

1. **不要滥用**
   - 仅对**非紧急更新**使用 `startTransition`（如数据加载、后台计算）。
   - 紧急更新（如用户输入、按钮点击）应直接执行。

2. **与 `useDeferredValue` 的区别**
   - `useTransition` 用于**控制任务优先级**（主动延迟任务）。
   - `useDeferredValue` 用于**延迟显示某个值**（被动优化渲染）。

3. **错误边界**
   - `startTransition` 内的错误不会冒泡到最近的错误边界（需自行处理）。



**useDeferredValue**

![[Pasted image 20250703164725.png|340]]

| 场景                | 解决方案              | 适用 Hook                    |
| ----------------- | ----------------- | -------------------------- |
| **优化耗时任务**（如数据加载） | 标记低优先级任务          | `useTransition`            |
| **延迟显示值**（如输入防抖）  | 延迟渲染某个状态          | `useDeferredValue`         |
| **路由切换优化**        | 配合 `React Router` | `useTransition + Suspense` |

### 参考

- [Hook 简介 – React](https://zh-hans.legacy.reactjs.org/docs/hooks-intro.html)
- [Built-in React Hooks – React](https://react.dev/reference/react/hooks)
- [React Hooks Cheat Sheet: The 7 Hooks You Need To Know](https://www.freecodecamp.org/news/react-hooks-cheatsheet)
- [使用 React Hooks 时要避免的6个错误 - 掘金](https://juejin.cn/post/7034695882347905060)
