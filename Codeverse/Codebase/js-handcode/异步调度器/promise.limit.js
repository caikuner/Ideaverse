// js: 实现 promise.limit
// 实现 Promise.limit 方法，限制最大并发数
Promise.limit = function (tasks, limit) {
  let i = 0; // 当前任务下标
  let running = 0; // 当前运行中的任务数量
  const results = []; // 用于存储每个任务的结果

  return new Promise((resolve, _) => {
    function run() {
      if (i === tasks.length && running === 0) {
        // 所有任务完成
        resolve(results); // 结束并返回所有结果
        return;
      }
      while (running < limit && i < tasks.length) {
        // 并发窗口未满且有任务可执行
        const cur = i; // 保存当前任务下标
        const task = tasks[i++]; // 取出下一个任务并下标递增
        running++; // 增加运行中任务数
        task()
          .then((res) => {
            results[cur] = { status: "ok", value: res }; // 保存结果
          })
          .catch((err) => {
            results[cur] = { status: "error", value: err }; // 保存异常
          })
          .finally(() => {
            running--; // 任务完成，减少运行中数量
            run(); // 调度下一个任务
          });
      }
    }

    run(); // 启动
  });
};

// 测试用例
function createTask(time, value) {
  return () => new Promise((resolve) => setTimeout(() => resolve(value), time)); // 返回延迟Promise
}

const tasks = [
  createTask(1000, "A"),
  createTask(500, "B"),
  createTask(300, "C"),
  createTask(400, "D"),
  createTask(200, "E"),
];

Promise.limit(tasks, 2).then((res) => {
  console.log(res); // 预期输出: ['A', 'B', 'C', 'D', 'E']
});

// ; - **时间复杂度**：$O(n)$，其中 $n$ 是任务数量，每个任务至多被调度一次。
// ; - **空间复杂度**：$O(n)$，用于存储结果数组。
// ; - **思路说明**：维护当前并发数running，递归调度下一批任务，保证同时运行的任务数不超过limit，全部完成后resolve总体Promise。
// ; - **可优化方向**：可以用 async/await 重写逻辑提升可读性；增加错误集中处理/中止功能等。
