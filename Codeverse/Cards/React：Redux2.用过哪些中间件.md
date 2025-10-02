---
tags: []
up:
related:
created: 2025-06-12
modified: 2025-06-12
---
Redux 中间件（Middleware）允许在 `action` 被分发（`dispatch`）到 `reducer` 之前或之后执行额外的逻辑。  

中间件通常用于处理异步操作、日志记录、错误处理等任务。

### Redux Logger

- **描述**: Redux Logger 是一个用于记录 `action` 和 `state` 变化的中间件。
- **特点**:
    - 在控制台中打印每个 `action` 的分发和 `state` 的变化。
    - 便于调试和开发。
- **使用场景**: 开发环境中的调试。
- **示例**:

```js
import { createLogger } from 'redux-logger';
const logger = createLogger()

const store = createStore(rootReducer, applyMiddleware(logger))
```

### Redux Thunk

- **描述**: Redux Thunk 是最常用的中间件之一，用于处理异步操作（如 API 调用）。
- **特点**:
    - 允许 `action` 是一个函数（而不仅仅是一个对象）。
    - 函数可以接收 `dispatch` 和 `getState` 作为参数，从而在异步操作完成后手动分发 `action`。
- **使用场景**: 处理异步逻辑（如数据获取）。
- **示例**

```js
import thunk from 'redux-thunk';
const store = createStore(rootReducer, applyMiddleware(thunk))

const fetchData = () => {
  return (dispatch, getState) => {
	dispatch({ type: 'FETCH_DATA_REQUEST' })
	fetch('/api/data')
	  .then((response) => response.json())
	  .then((data) => dispatch({ type: 'FETCH_DATA_SUCCESS', payload: data }))
	  .catch((error) => dispatch({ type: 'FETCH_DATA_FAILURE', error }))
  }
}
```

### Redux Promise

- **描述**: Redux Promise 是一个用于处理 Promise 的中间件。
- **特点**:
    - 自动处理 Promise 类型的 `action`。
    - 当 Promise 完成时，自动分发成功的 `action`；当 Promise 失败时，自动分发失败的 `action`。
- **使用场景**: 简单的异步操作。
- **示例**

```js
import promiseMiddleware from 'redux-promise-middleware';
const store = createStore(rootReducer, applyMiddleware(promiseMiddleware))

const fetchData = () => ({
  type: 'FETCH_DATA',
  payload: fetch('/api/data').then((response) => response.json()),
})
```

### Redux Saga

- **描述**: Redux Saga 是一个基于生成器函数（Generator）的中间件，用于管理复杂的异步流程和副作用。
    
- **特点**:
    
    - 使用 ES6 的生成器函数来处理异步逻辑。
    - 提供强大的副作用管理（如取消任务、并发执行等）。
- **使用场景**: 复杂的异步流程（如竞态条件、任务取消等）。
    
- **示例**:

```js
import { call, put, takeEvery } from 'redux-saga/effects'

function* fetchData() {  
  try {  
	const data = yield call(fetch, '/api/data')  
	yield put({ type: 'FETCH_DATA_SUCCESS', payload: data })  
  } catch (error) {  
	yield put({ type: 'FETCH_DATA_FAILURE', error })  
  }  
}

function* watchFetchData() {  
  yield takeEvery('FETCH_DATA_REQUEST', fetchData)  
}

```
