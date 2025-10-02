---
tags: []
up:
related:
created: 2025-06-15
modified: 2025-06-17
---
#x/readitlater #source/article

## 手写 class 继承 [[https://www.mianshipai.com/docs/written-exam/JS-writing.html#手写-class-继承]]

在某网页中，有三种菜单：button menu，select menu，modal menu。

他们的共同特点：

- 都有 `title` `icon` 属性
- 都有 `isDisabled` 方法（可直接返回 `false`）
- 都有 `exec` 方法，执行菜单的逻辑

他们的不同点：

- button menu，执行 `exec` 时打印 `'hello'`
- select menu，执行 `exec` 时返回一个数组 `['item1', 'item2', 'item3']`
- modal menu，执行 `exec` 时返回一个 DOM Element `<div>modal</div>`

请用 ES6 语法写出这三种菜单的 class

参考答案

```js
class BaseMenu {
  constructor(title, icon) {
    this.title = title
    this.icon = icon
  }
  isDisabled() {
    return false
  }
}

class ButtonMenu extends BaseMenu {
  constructor(title, icon) {
    super(title, icon)
  }
  exec() {
    console.log('hello')
  }
}

class SelectMenu extends BaseMenu {
  constructor(title, icon) {
    super(title, icon)
  }
  exec() {
    return ['item1', 'item2', 'item3']
  }
}

class ModalMenu extends BaseMenu {
  constructor(title, icon) {
    super(title, icon)
  }
  exec() {
    const div = document.createElement('div')
    div.innerText = 'modal'
    return div
  }
}
```

## 手写防抖 Debounce [[https://www.mianshipai.com/docs/written-exam/JS-writing.html#手写防抖-debounce]]

参考答案

js

```
function debounce(func, wait, immediate) {
  var timeout, result

  var debounced = function () {
    var context = this
    var args = arguments

    if (timeout) clearTimeout(timeout)
    if (immediate) {
      // 如果已经执行过，不再执行
      var callNow = !timeout
      timeout = setTimeout(function () {
        timeout = null
      }, wait)
      if (callNow) result = func.apply(context, args)
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args)
      }, wait)
    }
    return result
  }

  debounced.cancel = function () {
    clearTimeout(timeout)
    timeout = null
  }

  return debounced
}
```

参考阅读：

- [JavaScript 专题之跟着 underscore 学防抖](https://github.com/mqyqingfeng/Blog/issues/22)

## 手写截流 Throttle [[https://www.mianshipai.com/docs/written-exam/JS-writing.html#手写截流-throttle]]

参考答案

js

```
function throttle(func, wait, options) {
  var timeout, context, args, result
  var previous = 0
  if (!options) options = {}

  var later = function () {
    previous = options.leading === false ? 0 : new Date().getTime()
    timeout = null
    func.apply(context, args)
    if (!timeout) context = args = null
  }

  var throttled = function () {
    var now = new Date().getTime()
    if (!previous && options.leading === false) previous = now
    var remaining = wait - (now - previous)
    context = this
    args = arguments
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func.apply(context, args)
      if (!timeout) context = args = null
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }
  }
  throttled.cancel = function () {
    clearTimeout(timeout)
    previous = 0
    timeout = null
  }
  return throttled
}
```

参考阅读：

- [JavaScript专题之跟着 underscore 学节流](https://github.com/mqyqingfeng/Blog/issues/26)

## 手写解析 URL 参数为 JS 对象 [[https://www.mianshipai.com/docs/written-exam/JS-writing.html#手写解析-url-参数为-js-对象]]

参考答案

js

```js
function parseParam(url) {
  const paramsStr = /.+\?(.+)$/.exec(url)[1] // 将 ? 后面的字符串取出来
  // exec() 方法用于检索字符串中的正则表达式的匹配。
  const paramsArr = paramsStr.split('&') // 将字符串以 & 分割后存到数组中
  let paramsObj = {}
  // 将 params 存到对象中
  paramsArr.forEach((param) => {
    if (/=/.test(param)) {
      // 处理有 value 的参数
      let [key, val] = param.split('=') // 分割 key 和 value
      val = decodeURIComponent(val) // 解码
      val = /^\d+$/.test(val) ? parseFloat(val) : val // 判断是否转为数字
      //test() 方法用于检测一个字符串是否匹配某个模式.
      if (paramsObj.hasOwnProperty(key)) {
        // 如果对象有 key，则添加一个值
        paramsObj[key] = [].concat(paramsObj[key], val)
        //concat() 方法用于连接两个或多个数组。
        //该方法不会改变现有的数组，而仅仅会返回被连接数组的一个副本。
      } else {
        // 如果对象没有这个 key，创建 key 并设置值
        paramsObj[key] = val
      }
    } else {
      // 处理没有 value 的参数
      paramsObj[param] = true
    }
  })

  return paramsObj
}
```

参考阅读：

- [解析 URL 参数为对象和字符串模板](https://juejin.cn/post/6950554221242499103)

## 手写 Promise [[https://www.mianshipai.com/docs/written-exam/JS-writing.html#手写-promise]]

参考答案

```js
class MyPromise {
  // 构造方法
  constructor(executor) {
    // 初始化值
    this.initValue()
    // 初始化this指向
    this.initBind()
    // 执行传进来的函数
    executor(this.resolve, this.reject)
  }

  initBind() {
    // 初始化this
    this.resolve = this.resolve.bind(this)
    this.reject = this.reject.bind(this)
  }

  initValue() {
    // 初始化值
    this.PromiseResult = null // 终值
    this.PromiseState = 'pending' // 状态
  }

  resolve(value) {
    // 如果执行resolve，状态变为fulfilled
    this.PromiseState = 'fulfilled'
    // 终值为传进来的值
    this.PromiseResult = value
  }

  reject(reason) {
    // 如果执行reject，状态变为rejected
    this.PromiseState = 'rejected'
    // 终值为传进来的reason
    this.PromiseResult = reason
  }
}
```

参考阅读：

- [看了就会，手写Promise原理，最通俗易懂的版本！！！](https://juejin.cn/post/6994594642280857630)

## 手写 Promise.all [[https://www.mianshipai.com/docs/written-exam/JS-writing.html#手写-promise-all]]

参考答案

js

```
static all(promises) {
  const result = []
  let count = 0
  return new MyPromise((resolve, reject) => {
    const addData = (index, value) => {
        result[index] = value
        count++
        if (count === promises.length) resolve(result)
    }
    promises.forEach((promise, index) => {
        if (promise instanceof MyPromise) {
            promise.then(res => {
                addData(index, res)
            }, err => reject(err))
        } else {
            addData(index, promise)
        }
    })
  })
}
```

参考阅读：

- [看了就会，手写Promise原理，最通俗易懂的版本！！！](https://juejin.cn/post/6994594642280857630)

## 手写 Promise.race [[https://www.mianshipai.com/docs/written-exam/JS-writing.html#手写-promise-race]]

参考答案

js

```
static race(promises) {
  return new MyPromise((resolve, reject) => {
    promises.forEach(promise => {
      if (promise instanceof MyPromise) {
          promise.then(res => {
              resolve(res)
          }, err => {
              reject(err)
          })
      } else {
          resolve(promise)
      }
    })
  })
}
```

参考阅读：

- [看了就会，手写Promise原理，最通俗易懂的版本！！！](https://juejin.cn/post/6994594642280857630)

## 手写 Promise.allSettled [[https://www.mianshipai.com/docs/written-exam/JS-writing.html#手写-promise-allsettled]]

参考答案

js

```
static allSettled(promises) {
  return new Promise((resolve, reject) => {
    const res = []
    let count = 0
    const addData = (status, value, i) => {
      res[i] = {
          status,
          value
      }
      count++
      if (count === promises.length) {
          resolve(res)
      }
    }
    promises.forEach((promise, i) => {
      if (promise instanceof MyPromise) {
        promise.then(res => {
          addData('fulfilled', res, i)
        }, err => {
          addData('rejected', err, i)
        })
      } else {
        addData('fulfilled', promise, i)
      }
    })
  })
}
```

参考阅读：

- [看了就会，手写Promise原理，最通俗易懂的版本！！！](https://juejin.cn/post/6994594642280857630)

## 使用 Vue3 Composable 组合式函数，实现 useCount [[https://www.mianshipai.com/docs/written-exam/JS-writing.html#使用-vue3-composable-组合式函数-实现-usecount]]

js

```
const { count } = useCount() // count 初始值是 0 ，每一秒 count 加 1
```

参考答案

js

```
import { ref, onMounted, onUnmounted } from 'vue'

export function useCount() {
  const count = ref(0)
  let timer = null

  // 开始计数
  const startCount = () => {
    timer = setInterval(() => {
      count.value++
    }, 1000)
  }

  // 组件挂载时开始计数
  onMounted(() => {
    startCount()
  })

  // 组件卸载时清除定时器
  onUnmounted(() => {
    if (timer) {
      clearInterval(timer)
    }
  })

  return {
    count,
  }
}
```

## 使用 Vue3 Composable 组合式函数，实现 useRequest [[https://www.mianshipai.com/docs/written-exam/JS-writing.html#使用-vue3-composable-组合式函数-实现-userequest]]

js

```
const { loading, data, error } = useRequest(url) // 可只考虑 get 请求
```

参考答案

js

```
import { ref } from 'vue'

export function useRequest(url) {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const fetchData = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      data.value = await response.json()
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }

  // 立即执行请求
  fetchData()

  return {
    data,
    loading,
    error,
  }
}
```
