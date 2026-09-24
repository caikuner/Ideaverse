---
tags: []
up:
related:
rank: "4"
created: 2025-06-12
modified: 2025-06-16
---

### 1. Store 的实现

Redux 的核心是 `createStore` 函数，简化实现如下：

```javascript
function createStore(reducer, initialState) {
  let state = initialState;
  let listeners = [];

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
    return action;
  }

  function subscribe(listener) {
    listeners.push(listener);
    return function unsubscribe() {
      listeners = listeners.filter((l) => l !== listener);
    };
  }

  // 初始化 state
  dispatch({ type: "@@redux/INIT" });

  return { getState, dispatch, subscribe };
}
```

### 2. combineReducers 实现

用于将多个 reducer 合并为一个：

```javascript
// reducerMap：{name1: reducer1, name2: reducer2}
function combineReducers(reducerMap) {
  return function combination(state = {}, action) {
    const nextState = {};
    let hasChanged = false;

    Object.keys(reducerMap).forEach((key) => {
      const reducer = reducerMap[key];
      const previousStateForKey = state[key];
      const nextStateForKey = reducer(previousStateForKey, action);

      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    });

    return hasChanged ? nextState : state;
  };
}

// use case
const todosReducer = (state = 0, action) => {};
const visibilityReducer = (state = "SHOW_ALL", action) => {};

const combinedReducer = combineReducers({
  todos: todosReducer,
  visibilityFilter: visibilityFilterReducer,
});
```

### 3. Middleware 中间件机制

Redux 中间件提供第三方扩展点，位于 action 被 dispatch 和到达 reducer 之间：

```javascript
function createStore(reducer, initialState, enhancer){
  if (enhancer) {
	return enhancer(createStore)(reducer, initialState)
  }
  // 同上...
}

function compose(…funcs) {
  return funcs.reduce((a, b) => (…args) => a(b(…args)));
}

function applyMiddleware(…middlewares) {
  return createStore => (reducer, initialState) => {
    const store = createStore(reducer, initialState);
    let dispatch = store.dispatch;

    const middlewareAPI = {
      getState: store.getState,
      dispatch: action => dispatch(action)
    };

    const chain = middlewares.map(middleware => middleware(middlewareAPI));
    dispatch = compose(…chain)(store.dispatch);

    return {
      …store,
      dispatch
    };
  };
}

// applyMiddleware(...) 作为 enhancer 传递给 createStore
```

### 使用示例

```js
// ================== 示例使用 ==================
// Reducer 示例
function counterReducer(state = 0, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}

// 中间件示例：日志记录
const loggerMiddleware =
  ({ getState }) =>
  (next) =>
  (action) => {
    console.log("Dispatching:", action);
    const result = next(action);
    console.log("New state:", getState());
    return result;
  };

// 中间件示例：支持异步 action
const thunkMiddleware =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (typeof action === "function") {
      return action(dispatch, getState);
    }
    return next(action);
  };

// 创建增强后的 store
const store = createStore(counterReducer, applyMiddleware(thunkMiddleware, loggerMiddleware));

// 订阅状态变化
const unsubscribe = store.subscribe(() => {
  console.log("Current state:", store.getState());
});

// 同步 action
store.dispatch({ type: "INCREMENT" }); // +1

// 异步 action
function asyncIncrement() {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({ type: "DECREMENT" });
    }, 1000);
  };
}
store.dispatch(asyncIncrement()); // 1秒后 +1

// 取消订阅
// unsubscribe()
```
