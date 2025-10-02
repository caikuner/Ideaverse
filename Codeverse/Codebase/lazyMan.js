// 实现 LazyMan('Tony').eat('breakfast').sleep(3).eat('lunch').sleep(1).eat('dinner')

// 输出:
// Hi I am Tony
// I am eating breakfast
// 等待3秒...
// I am eating lunch
// 等待1秒...
// I am eating dinner


// 要点：方法返回 this 以支持链式调用；使用 promise链作为任务链；promise 支持异步任务
class LazyMan {
  constructor(name) {
    this.name = name;
    this.promiseChain = Promise.resolve(); // 
    this.start();
  }

  start() {
    this.promiseChain = this.promiseChain.then(() => {
      console.log(`Hi, I'm ${this.name}`);
    });
    return this;
  }

  eat(food) {
    this.promiseChain = this.promiseChain.then(() => {
      console.log(`Eating ${food}`);
    });
    return this;
  }

  sleep(seconds) {
    this.promiseChain = this.promiseChain.then(() => {
      return new Promise(resolve => {
        console.log(`Sleeping for ${seconds} seconds...`);
        setTimeout(() => {
          console.log(`Wake up after ${seconds} seconds`);
          resolve();
        }, seconds * 1000); // seconds后唤醒，resolve 继续 promise 链条
      });
    });
    return this;
  }
}

// 工厂函数，返回实例，方便链式调用
function createLazyMan(name) {
  return new LazyMan(name);
}

// 测试
createLazyMan('Tony')
  .eat('breakfast')
  .sleep(3)
  .eat('lunch')
  .sleep(1)
  .eat('dinner');



// 方法二：普通函数控制 tash queue

class LazyMan2 {
  constructor(name) {
    this.name = name
    this.tasks = [] // 任务队列

    // 初始任务
    this.tasks.push(() => {
      console.log(`Hi I am ${name}`)
      return Promise.resolve()
    })

    // 使用 setTimeout 确保所有任务入队后再执行
    setTimeout(() => {
      this.runTasks()
    }, 0)
  }

  // 执行任务队列
  async runTasks() {
    for (const task of this.tasks) {
      await task()
    }
  }

  eat(food) {
    this.tasks.push(() => {
      console.log(`I am eating ${food}`)
      return Promise.resolve()
    })
    return this
  }

  sleep(seconds) {
    this.tasks.push(() => {
      console.log(`等待${seconds}秒...`)
      return new Promise((resolve) => {
        setTimeout(resolve, seconds * 1000)
      })
    })
    return this
  }
}
