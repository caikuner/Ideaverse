---
tags: [be/redis]
up:
related:
rank: "3"
created: 2025-07-09
modified: 2025-07-09
---

问题: 为什么 redis (比 mysql) 快？

答案：

- **内存存储**：Redis 是基于内存存储的 NoSQL 数据库，能够更快地读取和写入数据，而无需像 MySQL 那样频繁进行磁盘 I/O 操作。
- **简单的数据结构**：Redis 是基于键值对存储数据的，支持简单的数据结构（字符串、哈希、列表、集合、有序集合）。相比于 MySQL，还需要定义表结构、索引等复杂的关系型数据结构。因此在某些场景下 Redis 的数据操作更为简单高效，比如 Redis 用哈希表查询， 只需要 O1 时间复杂度，而 MySQL 引擎的底层实现是 B+Tree，时间复杂度是 O(logn)
- **单线程模型**：Redis 的瓶颈在于机器内存或者网络带宽，而非 CPU，所以 Redis 采用了单线程模型，避免了多线程之间的竞争，省去了多线程切换带来的时间和性能上的开销，而且也不会导致死锁问题。

---

参考：

[[https://xiaolincoding.com/interview/redis.html#为什么redis比mysql要快]]
