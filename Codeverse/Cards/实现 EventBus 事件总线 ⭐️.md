---
tags: [handcode]

related: 
rank: "5"
companies:
created: 2025-06-11
modified: 2025-06-20
---
- 同一 type 支持多个事件注册
- 注册：保存事件 id 并返回，用于后续清除
- 单次注册：id 用一个特殊标识，用于后续识别
- 触发：如果识别到 id 是单次事件，触发完毕需要删除订阅
- 清除：订阅者列表长度为 0 时，直接清除该类型

```js
class EventBus {
  constructor() {
    this.eventObj = {} // {eventType: {eventId: callback}}
    this.callbcakId = 0
  }

  $on(name, callbcak) {
    if (!this.eventObj[name]) {
      this.eventObj[name] = {}
    }
    const id = this.callbcakId++
    this.eventObj[name][id] = callbcak
    return id
  }
  
  $emit(name, …args) {
    const eventList = this.eventObj[name]
    for (const id in eventList) {
      eventList[[…args|id]]
      if (id.indexOf('D') !== -1) {
        delete eventList[id]
      }
    }
  }
  
  $off(name, id) {
    delete this.eventObj[name][id]
    if (!Object.keys(this.eventObj[name]).length) {
      delete this.eventObj[name]
    }
  }
  
  $once(name, callbcak) {
    if (!this.eventObj[name]) {
      this.eventObj[name] = {}
    }
    const id = 'D' + this.callbcakId++
    this.eventObj[name][id] = callbcak
    return id
  }
}
```
