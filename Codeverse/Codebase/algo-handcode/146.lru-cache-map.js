class LRUCache {
  constructor(compacity) {
    this.compacity = compacity;
    this.cache = new Map(); // Map的特性，最早插入的在最前
  }

  get(key) {
    if (!this.cache.has(key)) return -1;
    const value = this.cache.get(key);
    this.cache.delete(key); // 更新
    this.cache.set(key, value);
    return value;
  }
  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }

    if (this.compacity <= this.cache.size) {
      // 如何删除最早那个。这里是 map keys()的特性，就是按照插入顺序排的
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    this.cache.set(key, value);
  }
}

// test
const lru = new LRUCache(2);
console.log(lru.get("a"));

lru.put("b", 1);
lru.put("c", 2);
console.log(lru.get("b"));
console.log(lru.get("c"));

lru.put("d", 3);
console.log(lru.get("b"));
console.log(lru.get("c"));
console.log(lru.get("d"));

// -1
// 1
// 2
// -1
// 2
// 3
