---
tags: []
up:
related:
created: 2025-06-11
modified: 2025-06-11
---

## 父子通信

### 父组件通过 props 向子组件传递数据

```js
//父组件
const Parent = () => {
  const message = "Hello from Parent";
  return <Child message={message} />;
};

// 子组件
const Child = ({ message }) => {
  return <div>{message}</div>;
};
```

### **子组件通过回调函数向父组件传递数据**

```js
//父组件
const Parent = () => {
  const handleData = (data) => {
    console.log("Data from Child:", data);
  };
  return <Child onSendData={handleData} />;
};

// 子组件
const Child = ({ message }) => {
  return <button onClick={() => onSendData("Hello from Child")}>Send Data</button>;
};
```

### **父组件使用 Refs 调用子组件暴露的方法**

> 注：react19 不再需要 forwardref

```js
import React, { useRef, forwardRef, useImperativeHandle } from "react";

// 子组件
const Child = forwardRef((props, ref) => {
  // 暴露方法给父组件
  useImperativeHandle(ref, () => ({
    sayHello() {
      alert("Hello from Child Component!");
    },
  }));

  return <div>Child Component</div>;
});

// 父组件
function Parent() {
  const childRef = useRef(null);

  const handleClick = () => {
    if (childRef.current) {
      childRef.current.sayHello();
    }
  };

  return (
    <div>
      <Child ref={childRef} />
      <button onClick={handleClick}>Call Child Method</button>
    </div>
  );
}

export default Parent;
```

## 跨组件通信

### **通过 Context 进行跨组件通信**

```js
import React, { useState } from "react";

// 创建一个 Context
const MyContext = React.createContext();

// 父组件
function Parent() {
  const [sharedData, setSharedData] = useState("Hello from Context");

  const updateData = () => {
    setSharedData("Updated Data from Context");
  };

  return (
    // 提供数据和更新函数
    <MyContext.Provider value={{ sharedData, updateData }}>
      <ChildA />
    </MyContext.Provider>
  );
}

// 子组件 A（引用子组件 B）
function ChildA() {
  return (
    <div>
      <ChildB />
    </div>
  );
}

// 子组件 B（使用 useContext）
function ChildB() {
  const { sharedData, updateData } = React.useContext(MyContext);
  return (
    <div>
      <div>ChildB: {sharedData}</div>
      <button onClick={updateData}>Update Data</button>
    </div>
  );
}

export default Parent;
```

### **React Context + useReducer**

```js
import React, { useReducer } from "react";

const initialState = { count: 0 };

function counterReducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

const CounterContext = React.createContext();

function CounterProvider({ children }) {
  const [state, dispatch] = useReducer(counterReducer, initialState);
  return;
  <CounterContext.Provider value={{ state, dispatch }}>{children}</CounterContext.Provider>;
}

function Counter() {
  const { state, dispatch } = React.useContext(CounterContext);
  return (
    <div>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </div>
  );
}

function App() {
  return (
    <CounterProvider>
      <Counter />
    </CounterProvider>
  );
}

export default App;
```

### 使用第三方状态管理库

- **Redux**

> redux 使用方法和上面的一样，但可以使用 `Redux Toolkit` 简化 Redux 开发。

```js
import { createSlice, configureStore } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

const { increment, decrement } = counterSlice.actions;

const store = configureStore({
  reducer: counterSlice.reducer,
});

store.subscribe(() => console.log(store.getState()));

store.dispatch(increment());
store.dispatch(decrement());
```

- **MobX**

```js
import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react-lite";

class CounterStore {
  count = 0;

  constructor() {
    makeAutoObservable(this);
  }

  increment() {
    this.count += 1;
  }

  decrement() {
    this.count -= 1;
  }
}

const counterStore = new CounterStore();

const Counter = observer(() => {
  return (
    <div>
      Count: {counterStore.count}
      <button onClick={() => counterStore.increment()}>+</button>
      <button onClick={() => counterStore.decrement()}>-</button>
    </div>
  );
});

export default Counter;
```

- **Zustand** ⭐️

  ```js
  import create from "zustand";

  const useStore = create((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
  }));

  function Counter() {
    const { count, increment, decrement } = useStore();
    return (
      <div>
        Count: {count}
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
      </div>
    );
  }

  export default Counter;
  ```

### **使用事件总线（Event Bus）进行通信**

    mitt

可以使用第三方库如 mitt、pubsub-js 来实现父子组件间通信。  
在父组件中订阅一个事件，子组件在特定情况下发布这个事件并传递数据。

也可以自行 [[实现 EventBus 事件总线 ⭐️]]

```js
import React from "react";
import PubSub from "pubsub-js";

const ParentComponent = () => {
  React.useEffect(() => {
    const token = PubSub.subscribe("childData", (msg, data) => {
      console.log("Received data from child:", data);
    });
    return () => {
      PubSub.unsubscribe(token);
    };
  }, []);

  return <ChildComponent />;
};

const ChildComponent = () => {
  const sendData = () => {
    PubSub.publish("childData", { message: "Hello from child" });
  };

  return <button onClick={sendData}>Send data from child</button>;
};

export default ParentComponent;
```
