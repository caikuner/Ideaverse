class EventBus {
  constructor() {
    this.deps = {};

    this.callbackId = 0;
    this.oncePrefix = "D_";
  }

  on(eventName, callback) {
    if (!this.deps[eventName]) {
      this.deps[eventName] = {};
    }
    const id = ++this.callbackId;
    this.deps[eventName][id] = callback;

    return id;
  }
  emit(eventName, ...args) {
    if (!this.deps[eventName]) return;

    const eventList = this.deps[eventName];
    for (const eventId in eventList) {
      const cb = eventList[eventId];
      cb(...args);

      if (eventId.startsWith(this.oncePrefix)) {
        this.off(eventName, eventId);
      }
    }
  }
  off(eventName, eventId) {
    // 支持单独取消某一个回调 eventId
    delete this.deps[eventName][eventId];

    if (Object.keys(this.deps[eventName]).length === 0) {
      delete this.deps[eventName];
    }
  }

  once(eventName, callback) {
    // 和 on一致，区别是 id 加上前缀
    if (!this.deps[eventName]) {
      this.deps[eventName] = {};
    }

    const id = this.oncePrefix + ++this.callbackId;
    this.deps[eventName][id] = callback;
  }
}

// test
const eb = new EventBus();

const id = eb.on("test", (v1, v2) => console.log(v1, v2));
eb.emit("test", "cc", "ck");
eb.off("test", id);
eb.emit("test", "cc", "ck"); // 已经 off 不触发

eb.once("test", (v1, v2) => console.log(v1, v2));
eb.emit("test", "cc2", "ck");
eb.emit("test", "cc2", "ck"); // 第二次不触发
