// 三种状态
const PENDING = "pending"
const FULFILLED = "fulfilled"
const REJECTED = "rejected"

class MyPromise {
  constructor(executor) {
    this.state = PENDING; // 'pending' 'fulfilled' 'rejected'

    this.value = undefined; // fulfilled result
    this.reason = undefined; // rejected reason

    this.onFullfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state !== PENDING) return;
      this.state = FULFILLED;
      this.value = value;
      this.onFullfilledCallbacks.forEach((fn) => fn());
    };
    const reject = (reason) => {
      if (this.state !== PENDING) return;
      this.state = REJECTED;
      this.reason = reason;
      this.onRejectedCallbacks.forEach((fn) => fn());
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  // 实例方法
  then(onResolved, onRejected) {
    // 当参数不是函数类型时，需要创建一个函数直接把参数返回，实现值透传。
    // 如 Promise.resolve(4).then().then(v=>console.log(v))
    const onResolvedCb = typeof onResolved === "function" ? onResolved : (v) => v;
    const onRejectedCb = typeof onRejected === "function" ? onRejected : (err) => {throw err};

    return new MyPromise((resolve, reject) => {
      const handleFulfilled = () => {
        queueMicrotask(() => { // 入队微任务
          try {
            const value = onResolvedCb(this.value);
            resolve(value);
          } catch (err) {
            reject(err);
          }
        });
      };

      const handleRejected = () => {
        queueMicrotask(() => {
          try {
            const reason = onRejectedCb(this.reason);
            resolve(reason);
          } catch (err) {
            reject(err);
          }
        });
      };

      // 状态切换逻辑，简易版
      switch (this.state) {
        case PENDING:
          this.onFullfilledCallbacks.push(onResolvedCb);
          this.onRejectedCallbacks.push(onRejectedCb);
          break;
        case FULFILLED:
          handleFulfilled();
          break;
        case REJECTED:
          handleRejected();
          break;
      }
    });
  }
  catch(onRejected) {
    return this.then(null, onRejected);
  }
  finally(onFinally) {
    // 实现
    return this.then(onFinally, onFinally)
  }

  // 以下是静态方法
  static resolve(value) {
    return new MyPromise((resolve) => resolve(value));
  }
  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason));
  }
}

// use case
new MyPromise((resolve, reject) => {
    resolve(1);
})
.then(console.log)  // 1
.finally(()=>console.log('end'))

new MyPromise((resolve, reject) => {
  reject(2);
})
.catch(console.log) // 2
.finally(()=>console.log('end'))

MyPromise.resolve(3).then(console.log);
MyPromise.reject(4).catch(console.log);
