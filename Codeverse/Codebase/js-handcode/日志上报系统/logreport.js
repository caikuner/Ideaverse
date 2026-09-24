// 设计一个日志上报系统，要求：
// 支持大流量合并上传，
// 支持分类型添加、每种类型支持配置不同的采样比例 ratio

// 思路：
// 1.大流量合并 => 队列存储，后面再一次性批量上报。上报条件：定时 / 满足一定量
// 2. 分类型采样比例 => 维护类型比例配置，添加时就满足一定的采样概率

class LogReporter {
  constructor(reportUrl, interval = 60000) {
    // 构造函数，设置上报地址和时间间隔
    this.logBuffer = []; // 日志缓存池
    this.typeRatio = {}; // 类型采样配置
    this.reportUrl = reportUrl; // 上报接口
    this.timer = setInterval(() => this.report(), interval); // 定时上报
  }

  setTypeRatio(type, ratio) {
    // 设置某类型采样比例
    this.typeRatio[type] = ratio;
  }

  addLog(type, content) {
    // 添加日志
    const ratio = this.typeRatio[type] ?? 0;
    if (Math.random() < ratio) {
      // 按采样比例采集 （概率）
      this.logBuffer.push({ type, content, time: Date.now() });
    }
  }

  report() {
    // 批量上报
    if (this.logBuffer.length === 0) return;

    fetch(this.reportUrl, {
      method: "POST",
      body: JSON.stringify(this.logBuffer),
      headers: { "Content-Type": "application/json" },
    });

    this.logBuffer.length = 0; // 清空缓存
  }

  destroy() {
    // 销毁定时器
    clearInterval(this.timer);
  }
}

// 测试用例
const logger = new LogReporter("/api/report", 10000); // 每10秒上报
logger.setTypeRatio("error", 1);
logger.setTypeRatio("info", 0.1);
logger.addLog("error", "错误日志");
logger.addLog("info", "信息日志");
logger.setTypeRatio("custom", 0.5);
logger.addLog("custom", "自定义日志");

// ---

// - 时间复杂度：添加日志 $O(1)$，上报 $O(n)$
// - 空间复杂度：$O(n)$
// - 实现说明：将日志系统封装为类，支持定时批量上报、类型采样和动态配置。
// - 可优化点：支持本地存储持久化、异常重试、上报量动态调整等。
