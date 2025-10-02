---
tags:
  - algo/链表
  - handcode

related: 
rank: "4"
companies: 
created: 2025-06-15
modified: 2025-06-18
---

> 手写 [[146.lru-cache.js]]，[[146.lru-cache-map.js]]

LRU（Least Recently Used）是一种缓存淘汰策略，它会优先删除最近最少使用的数据。
下面提供两种实现方式：使用 Map 的简单实现和 使用链表的基实现。

1. 使用 Map 的实现

```js
class LRUCache {
  constructor(capacity) {
    this.cache = new Map()
    this.capacity = capacity
  }

  get(key) {
    if (!this.cache.has(key)) return -1

    // 将访问的元素移到最新使用的位置
    const value = this.cache.get(key)
    this.cache.delete(key)
    this.cache.set(key, value)
    return value
  }

  put(key, value) {
    // 如果 key 已存在，先删除
    if (this.cache.has(key)) {
      this.cache.delete(key)
    }
    // 如果达到容量限制，删除最久未使用的元素
    else if (this.cache.size >= this.capacity) {
      // Map 的 keys() 会按插入顺序返回键
      const firstKey = this.cache.keys().next().value
      this.cache.delete(firstKey)
    }

    this.cache.set(key, value)
  }
}

// 使用示例
const cache = new LRUCache(2)
cache.put(1, 1) // 缓存是 {1=1}
cache.put(2, 2) // 缓存是 {1=1, 2=2}
console.log(cache.get(1)) // 返回 1
cache.put(3, 3) // 删除 key 2，缓存是 {1=1, 3=3}
console.log(cache.get(2)) // 返回 -1 (未找到)
```

1. 使用双向链表的实现（不依赖 Map）

```js
// 双向链表节点
class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = {}; // 哈希表用于O(1)查找
    this.count = 0;
    // 创建头尾哨兵节点
    this.head = new Node(0, 0);
    this.tail = new Node(0, 0);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  // 在链表头部添加节点
  addToHead(node) {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
  }

  // 从链表中删除节点
  removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  // 将节点移到双向链表头部
  moveToHead(node) {
    this.removeNode(node);
    this.addToHead(node);
  }

  // 删除链表尾部节点
  removeTail() {
    const node = this.tail.prev;
    this.removeNode(node);
    return node;
  }

  get(key) {
    if (key in this.cache) {
      const node = this.cache[key];
      this.moveToHead(node);
      return node.value;
    }
    return -1;
  }

  put(key, value) {
    if (key in this.cache) {
      // 如果 key 存在，更新值并移到头部
      const node = this.cache[key];
      node.value = value;
      this.moveToHead(node);
    } else {
      // 创建新节点
      const newNode = new Node(key, value);
      this.cache[key] = newNode;
      this.addToHead(newNode);
      this.count++;

      // 如果超过容量，删除最久未使用的
      if (this.count > this.capacity) {
        const tail = this.removeTail();
        delete this.cache[tail.key];
        this.count--;
      }
    }
  }
}

// 使用示例
const cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1)); // 返回 1
cache.put(3, 3); // 删除 key 2
console.log(cache.get(2)); // 返回 -1 (未找到)
cache.put(4, 4); // 删除 key 1
console.log(cache.get(1)); // 返回 -1 (未找到)
console.log(cache.get(3)); // 返回 3
console.log(cache.get(4)); // 返回 4

```

实现原理说明：

1. **Map 实现版本**：
    - 利用 Map 的特性，它能够记住键的原始插入顺序
    - get 操作时将访问的元素移到最后（最新使用）
    - put 操作时如果超出容量，删除第一个元素（最久未使用）
      
2. **双向链表实现版本**：
    - 使用哈希表实现 O(1) 的查找
    - 使用双向链表维护数据的使用顺序
    - 最近使用的数据放在链表头部
    - 最久未使用的数据在链表尾部

性能分析：

1. **时间复杂度**：
    - get 操作：O(1)
    - put 操作：O(1)
      
2. **空间复杂度**：
    - O(capacity)，其中 capacity 是缓存的容量

使用场景：

1. **浏览器、内存缓存**：

	```js
	const browserCache = new LRUCache(100)
	browserCache.put('url1', 'response1')
	browserCache.put('url2', 'response2')
	```

2. **数据库查询缓存**：

```js
const queryCache = new LRUCache(50)
function query(sql) {
  const cached = queryCache.get(sql)
  if (cached !== -1) return cached

  const result = executeQuery(sql)
  queryCache.put(sql, result)
  return result
}
```
