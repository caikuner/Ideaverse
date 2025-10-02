/*
 * @lc app=leetcode.cn id=146 lang=javascript
 * @lcpr version=30204
 *
 * [146] LRU 缓存
 *
 * https://leetcode.cn/problems/lru-cache/description/
 *
 * algorithms
 * Medium (54.69%)
 * Likes:    3515
 * Dislikes: 0
 * Total Accepted:    863.4K
 * Total Submissions: 1.6M
 * Testcase Example:  '["LRUCache","put","put","get","put","get","put","get","get","get"]\n' +
  '[[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]'
 *
 * 请你设计并实现一个满足  LRU (最近最少使用) 缓存 约束的数据结构。
 * 
 * 实现 LRUCache 类：
 * 
 * 
 * 
 * 
 * LRUCache(int capacity) 以 正整数 作为容量 capacity 初始化 LRU 缓存
 * int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。
 * void put(int key, int value) 如果关键字 key 已经存在，则变更其数据值 value ；如果不存在，则向缓存中插入该组
 * key-value 。如果插入操作导致关键字数量超过 capacity ，则应该 逐出 最久未使用的关键字。
 * 
 * 
 * 函数 get 和 put 必须以 O(1) 的平均时间复杂度运行。
 * 
 * 
 * 
 * 
 * 
 * 示例：
 * 
 * 输入
 * ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
 * [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
 * 输出
 * [null, null, null, 1, null, -1, null, -1, 3, 4]
 * 
 * 解释
 * LRUCache lRUCache = new LRUCache(2);
 * lRUCache.put(1, 1); // 缓存是 {1=1}
 * lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
 * lRUCache.get(1);    // 返回 1
 * lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
 * lRUCache.get(2);    // 返回 -1 (未找到)
 * lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
 * lRUCache.get(1);    // 返回 -1 (未找到)
 * lRUCache.get(3);    // 返回 3
 * lRUCache.get(4);    // 返回 4
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= capacity <= 3000
 * 0 <= key <= 10000
 * 0 <= value <= 10^5
 * 最多调用 2 * 10^5 次 get 和 put
 * 
 * 
 */


// @lcpr-template-start

// @lcpr-template-end
// @lc code=start

class Node {
  constructor(key, value) {
    this.key = key
    this.value = value
    this.prev = null
    this.next = null
  }
}
/**
 * @param {number} capacity
 */
class LRUCache {
    constructor(capacity) {
      this.capacity = capacity
      this.cache = {}  // 缓存节点，用于快速查询
      this.head = new Node(-1, -1)
      this.tail = new Node(-1, -1)

      this.head.next = this.tail
      this.tail.prev = this.head
    }
    #addToHead(node) { // 用于没有旧缓存时，新增。   [容易写错的]👈
      node.prev = this.head
      node.next = this.head.next

      this.head.next.prev = node
      this.head.next = node
    }

    #moveToHead(node) { // 用于有旧缓存时，移动到头
      this.#removeNode(node)
      this.#addToHead(node)
    }

    #removeTail() { // 用于容量达到上限时，删除一个尾
      const tailPrev = this.tail.prev
      this.#removeNode(tailPrev)
      return tailPrev
    }

    #removeNode(node) {
      node.prev.next = node.next
      node.next.prev = node.prev
    }

    get(key) {
      if (key in this.cache) {
        const node = this.cache[key]
        this.#moveToHead(node)
        return node.value
      }
      return -1
    }
    put(key, value){
      if (key in this.cache) { // 有就删除
        this.#removeNode(this.cache[key])
        delete this.cache[key]
      }

      // 容量超了就删除一个尾
      if (this.capacity <= Object.keys(this.cache).length) {
        const node = this.#removeTail()
        delete this.cache[node.key]
      }

      // 新增
      const newNode = new Node(key, value)
      this.#addToHead(newNode)
      this.cache[key] = newNode
    }
};

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
// @lc code=end



