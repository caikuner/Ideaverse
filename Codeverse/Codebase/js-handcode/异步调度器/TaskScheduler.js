// js: 实现异步并发调度 / promise.limit

class TaskScheduler {
  constructor(limit) {
    this.limit = limit; // 并发限制
    this.queue = []; // 等待队列
    this.running = 0; // 当前执行的任务数量
  }

  add(task) {
    return new Promise((resolve, reject) => {
      // add a taskFn
      const runTask = () => {
        this.running++;
        task()
          .then(resolve)
          .catch(reject)
          .finally(() => {
            this.running--;
            this.next();
          });
      };

      this.queue.push(runTask);
      this.next();
    });
  }

  // next: 检查队列，调用下一个
  next() {
    if (this.queue.length === 0 || this.running >= this.limit) return;

    const taskFn = this.queue.shift();
    taskFn();
  }
}

// 使用示例
// 模拟异步任务
function asyncTask(id, delay) {
  return () =>
    new Promise((resolve) => {
      console.log(`Start ${id}`);
      setTimeout(() => {
        console.log(`End ${id}`);
        resolve(id);
      }, delay);
    });
}
const getInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const tasks = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => asyncTask(i, getInt(1000, 3000)));

// 使用
const plimit = new TaskScheduler(3);

tasks.forEach((task) => plimit.add(task).then((data) => console.log("d", data)));
setTimeout(() => {
  plimit.add(asyncTask(10, 1000));
}, 3000);

// 2. 进阶：支持链式调用
function promiseLimit(limit) {
  const controller = new TaskScheduler(limit);

  return function (fn) {
    return (...args) => controller.add(() => fn(...args));
  };
}

// // 使用示例
// const limitedFetch = promiseLimit(3)(fetch);

// // 并行发起5个请求（同时最多3个）
// const urls = ['/api1', '/api2', '/api3', '/api4', '/api5'];
// urls.map(url => limitedFetch(url));
