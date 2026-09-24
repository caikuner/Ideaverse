---
tags: [be/mysql]
up:
related:
rank:
created: 2025-07-14
modified: 2025-07-17
---

当多个用户同时操作 MySQL 中的同一行数据时，可能会导致数据不一致问题。MySQL 提供了几种机制来解决这种并发冲突：

## 1. 事务隔离级别

通过设置适当的事务隔离级别来控制并发访问：

```sql
-- 查看当前隔离级别
SELECT @@transaction_isolation;

-- 设置隔离级别（通常使用REPEATABLE READ或SERIALIZABLE解决并发问题）
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
```

## 2. 锁机制

### 2.1 行级锁

```sql
-- 共享锁（读锁），其他事务可以读但不能写
SELECT * FROM table WHERE id = 1 LOCK IN SHARE MODE;

-- 排他锁（写锁），其他事务不能读也不能写
SELECT * FROM table WHERE id = 1 FOR UPDATE;
```

### 2.2 乐观锁

通过版本号或时间戳实现：

```sql
-- 表中添加version字段
UPDATE products
SET stock = stock - 1, version = version + 1
WHERE id = 100 AND version = 5;
-- 如果受影响行数为0，说明版本号已变更，需要重试
```

## 3. 悲观锁

在事务开始时直接锁定数据：

```sql
START TRANSACTION;
SELECT * FROM accounts WHERE user_id = 1 FOR UPDATE; -- 获取排他锁
-- 执行更新操作
UPDATE accounts SET balance = balance - 100 WHERE user_id = 1;
COMMIT;
```

## 4. 应用层解决方案

### 4.1 队列处理

将并发请求放入队列顺序处理。

### 4.2 重试机制

当检测到冲突时自动重试操作。

## 最佳实践建议

1. 根据业务场景选择合适的锁策略
2. 尽量缩短事务执行时间
3. 避免在事务中执行耗时操作
4. 为高频更新的表设计合理的索引
5. 考虑使用读写分离架构分担压力

选择哪种方案取决于您的具体应用场景、并发量和性能要求。

---

在 Node.js 应用中为 MySQL 加行锁主要有以下几种方法，根据不同的使用场景可以选择合适的方案：

## 1. 使用 SELECT … FOR UPDATE (悲观锁)

这是最常用的行锁方式，适用于需要修改数据前先锁定记录的场景。

```javascript
const mysql = require("mysql2/promise");

async function updateWithLock() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "test",
    password: "password",
  });

  try {
    // 开始事务
    await connection.beginTransaction();

    // 锁定要修改的行
    const [rows] = await connection.query("SELECT * FROM products WHERE id = ? FOR UPDATE", [
      productId,
    ]);

    if (rows.length === 0) {
      throw new Error("Product not found");
    }

    const product = rows[0];

    // 检查库存等业务逻辑
    if (product.stock < quantity) {
      throw new Error("Insufficient stock");
    }

    // 更新数据
    await connection.query("UPDATE products SET stock = stock - ? WHERE id = ?", [
      quantity,
      productId,
    ]);

    // 提交事务，释放锁
    await connection.commit();
  } catch (error) {
    // 发生错误时回滚
    await connection.rollback();
    console.error("Transaction failed:", error);
  } finally {
    // 关闭连接
    await connection.end();
  }
}
```

## 2. 使用 SELECT … LOCK IN SHARE MODE (共享锁)

当需要读取但不修改数据时，可以使用共享锁：

```javascript
async function readWithLock() {
  const [rows] = await connection.query("SELECT * FROM products WHERE id = ? LOCK IN SHARE MODE", [
    productId,
  ]);
  // 其他会话可以加共享锁但不能加排他锁
}
```

## 3. 使用乐观锁（无实际锁，通过版本控制）

乐观锁不是真正的数据库锁，而是一种并发控制策略：

```javascript
async function updateWithOptimisticLock() {
  const [rows] = await connection.query("SELECT id, stock, version FROM products WHERE id = ?", [
    productId,
  ]);

  const product = rows[0];
  const newStock = product.stock - quantity;

  const [result] = await connection.query(
    "UPDATE products SET stock = ?, version = version + 1 WHERE id = ? AND version = ?",
    [newStock, productId, product.version],
  );

  if (result.affectedRows === 0) {
    throw new Error("Update failed, data may have been modified by another transaction");
  }
}
```

## 4. 使用 GET_LOCK() 函数（命名锁）

MySQL 还提供了命名锁机制：

```javascript
async function useNamedLock() {
  // 获取命名锁
  const [lockResult] = await connection.query(
    "SELECT GET_LOCK(?, ?) as lock_obtained",
    ["my_resource_lock", 10], // 锁名称和超时时间(秒)
  );

  if (lockResult[0].lock_obtained !== 1) {
    throw new Error("Could not obtain lock");
  }

  try {
    // 执行需要加锁的操作
    await connection.query("UPDATE products SET stock = stock - 1 WHERE id = 1");
  } finally {
    // 释放锁
    await connection.query("SELECT RELEASE_LOCK(?)", ["my_resource_lock"]);
  }
}
```

## 重要注意事项

1. **事务必须简短**：长时间持有锁会导致性能问题
2. **正确处理连接**：确保在错误情况下释放连接
3. **死锁预防**：按固定顺序访问多行数据
4. **隔离级别**：行锁行为受事务隔离级别影响
5. **连接池**：在使用连接池时确保同一事务使用同一连接

## 最佳实践建议

- 优先考虑乐观锁，除非确实需要悲观锁
- 锁定最小必要的数据范围
- 设置合理的锁等待超时
- 在生产环境中添加重试机制处理锁冲突

以上方法可以根据你的具体业务场景选择使用，在高并发环境下正确使用行锁可以有效避免数据竞争问题。
