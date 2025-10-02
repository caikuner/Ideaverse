---
tags:
  - be/mysql
up: 
related: 
rank: 
created: 2025-07-14
modified: 2025-07-17
---

事务是数据库操作中的重要概念，它能确保一系列操作要么全部成功，要么全部失败回滚。
下面以 Node.js + MySQL 环境详细讲解事务操作。

## 一、基础事务操作

### 1. 基本事务流程

```javascript
const mysql = require('mysql2/promise'); // 使用 promise 接口

async function transferFunds(senderId, receiverId, amount) {
    // 创建连接
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'bank',
        password: 'password'
    });

    try {
        // 1. 开始事务
        await connection.beginTransaction();

        // 2. 执行一系列SQL操作
        // 从发送方账户扣款
        await connection.query(
            'UPDATE accounts SET balance = balance - ? WHERE id = ? AND balance >= ?',
            [amount, senderId, amount]
        );

        // 检查是否扣款成功
        const [result] = await connection.query(
            'SELECT ROW_COUNT() as affectedRows'
        );
        if (result[0].affectedRows === 0) {
            throw new Error('扣款失败，余额不足或账户不存在');
        }

        // 向接收方账户加款
        await connection.query(
            'UPDATE accounts SET balance = balance + ? WHERE id = ?',
            [amount, receiverId]
        );

        // 3. 提交事务
        await connection.commit();
        console.log('转账成功');
    } catch (error) {
        // 4. 出错时回滚
        await connection.rollback();
        console.error('转账失败:', error.message);
    } finally {
        // 5. 释放连接
        await connection.end();
    }
}
```

### 2. 使用连接池的事务

在实际应用中，我们通常使用连接池：

```javascript
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'bank',
    password: 'password',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function poolTransfer(senderId, receiverId, amount) {
    const connection = await pool.getConnection();
    
    try {
        await connection.beginTransaction();
        
        // 执行SQL操作…
        
        await connection.commit();
    } catch (error) {
        await connection.rollback();
        throw error; // 抛出错误给上层处理
    } finally {
        connection.release(); // 释放连接到池中
    }
}
```

## 二、事务隔离级别

MySQL 支持四种隔离级别，可以通过以下方式设置：

```javascript
// 设置隔离级别
await connection.query('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');

// 查询当前隔离级别
const [rows] = await connection.query('SELECT @@tx_isolation');
console.log('当前隔离级别:', rows[0]['@@tx_isolation']);
```

不同隔离级别的特点：

1. **READ UNCOMMITTED** - 可能读取到未提交的数据（脏读）
2. **READ COMMITTED** - 只能读取已提交的数据（解决脏读）
3. **REPEATABLE READ** - MySQL 默认级别，同一事务中多次读取结果一致（解决不可重复读）
4. **SERIALIZABLE** - 最高隔离级别（解决幻读）

## 三、高级事务模式

### 1. 保存点 (Savepoint)

```javascript
async function complexTransaction() {
    const connection = await pool.getConnection();
    
    try {
        await connection.beginTransaction();
        
        // 操作1
        await connection.query('INSERT INTO table1 VALUES (…)');
        
        // 设置保存点
        await connection.query('SAVEPOINT point1');
        
        try {
            // 操作2
            await connection.query('UPDATE table2 SET …');
        } catch (error) {
            // 回滚到保存点
            await connection.query('ROLLBACK TO SAVEPOINT point1');
        }
        
        // 操作3
        await connection.query('DELETE FROM table3 WHERE …');
        
        await connection.commit();
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}
```

### 2. 自动提交模式

```javascript
// 关闭自动提交
await connection.query('SET autocommit = 0');

// 执行一些操作…

// 手动提交
await connection.query('COMMIT');

// 或回滚
await connection.query('ROLLBACK');

// 重新开启自动提交
await connection.query('SET autocommit = 1');
```

## 四、事务最佳实践

1. **保持事务简短**：长时间事务会锁定资源，影响性能
2. **合理设置隔离级别**：根据业务需求选择最低可行的隔离级别
3. **错误处理**：确保所有可能的错误路径都有回滚
4. **连接管理**：确保连接正确释放，避免连接泄漏
5. **重试机制**：对于死锁等临时错误实现重试逻辑

```javascript
async function runWithRetry(transactionFn, maxRetries = 3) {
    let attempt = 0;
    while (attempt < maxRetries) {
        try {
            return await transactionFn();
        } catch (error) {
            if (error.code === 'ER_LOCK_DEADLOCK' && attempt < maxRetries - 1) {
                attempt++;
                console.log(`遇到死锁，第${attempt}次重试…`);
                await new Promise(resolve => setTimeout(resolve, 50 * attempt));
                continue;
            }
            throw error;
        }
    }
}
```

## 五、常见问题解决方案

### 1. 处理死锁

```javascript
async function safeTransfer() {
    try {
        await runWithRetry(() => transferFunds(1, 2, 100));
    } catch (error) {
        if (error.code === 'ER_LOCK_DEADLOCK') {
            console.error('多次重试后仍遇到死锁');
        } else {
            console.error('转账错误:', error);
        }
    }
}
```

### 2. 嵌套事务模拟

MySQL 不支持真正的嵌套事务，但可以通过保存点模拟：

```javascript
async function nestedTransactionExample() {
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();
        
        // 外层事务操作…
        
        try {
            // 内层事务开始（保存点）
            await conn.query('SAVEPOINT inner_transaction');
            
            // 内层操作…
            
            // 内层提交（释放保存点）
            await conn.query('RELEASE SAVEPOINT inner_transaction');
        } catch (innerError) {
            // 内层回滚
            await conn.query('ROLLBACK TO SAVEPOINT inner_transaction');
            throw innerError;
        }
        
        await conn.commit();
    } catch (error) {
        await conn.rollback();
        throw error;
    } finally {
        conn.release();
    }
}
```

通过以上内容，你应该能够在 Node.js 应用中正确使用 MySQL 事务，处理各种复杂的数据操作场景。
