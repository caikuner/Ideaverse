---
tags: []
up:
related:
created: 2025-05-15
modified: 2025-05-15
---

## 如何保留小数点位数，如两位

```
// 1. (num).toFixed(2)

// 2. Math.round(num * 100) / 100

// 3. Intl.NumberFormat
function formattedNum(num, dig = 2) {
  return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: dig,
      maximumFractionDigits: dig
  }).format(num)
}

console.log(formattedNum(123.456, 2))
```
