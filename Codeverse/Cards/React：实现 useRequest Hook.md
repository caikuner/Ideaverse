---
tags: []
up:
related:
created: 2025-06-14
modified: 2025-06-14
---

```jsx
import { useState, useEffect } from 'react'

// 也可以传 url，不过我们一般在外面使用封装好的请求库
export default function useRequest(requestPromiseFn) {
  const [data, setData] = useState(null) // 存储请求的数据
  const [loading, setLoading] = useState(true) // 加载状态
  const [error, setError] = useState(null) // 错误信息

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true) // 设置加载状态为 true
      setError(null) // 清空先前的错误

      try {
        const response = await requestPromiseFn()
        if (!response.ok) {
          throw new Error('请求失败!')
        }
        setData(response.data) // 设置数据
      } catch (err) {
        setError(err.message) // 捕获错误并设置错误信息
      } finally {
        setLoading(false) // 请求结束，设置加载状态为 false
      }
    }

    fetchData()
  }, [url]) // 依赖于 url，当 url 改变时重新发起请求

  return { loading, data, error }
}


// 使用示例
function RequestComponent() {
  const { loading, data, error } = useRequest('https://xxx.xxxx.com/data')
  if (loading) return <p>Loading...</p>
  if (error) return <p>错误信息: {error}</p>
  return (
    <div>
      <h3>请求结果:</h3>
      <pre>{JSON.stringify(data)}</pre>
    </div>
  )
}
```
