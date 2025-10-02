---
tags: []
up:
related:
created: 2025-06-14
modified: 2025-06-14
---


- count 从 0 计数，每一秒 +1 （可使用 setInterval）

```jsx
import { useState, useEffect } from 'react'

function useCountTimer() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    // 设置定时器，每秒钟增加 count
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount + 1)
    }, 1000)

    // 清理定时器
    return () => clearInterval(intervalId)
  }, []) // 空数组表示仅在组件挂载时执行一次

  return { count }
}


// 使用示例
function TimerComponent() { 
	const { count } = useCountTimer() 
	return ( 
		<div> <p>Count: {count}</p> </div> 
	)
}
```
