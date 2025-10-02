---
tags: []
up:
related:
created: 2025-07-03
modified: 2025-07-03
---

```jsx
import { useEffect, useRef } from "react";
import { isEqual } from "lodash"; // 或自定义深度比较函数

function useDeepCompareEffect(callback, dependencies) {
  const currentDepsRef = useRef();

  if (!isEqual(currentDepsRef.current, dependencies)) {
    currentDepsRef.current = dependencies;
  }

  useEffect(callback, [currentDepsRef.current]);
}
```
