export default function chunkRenderWithRIC(data, container, chunkSize = 50) {
  if (!container) throw new Error("请确定容器");

  let index = 0;
  const total = data?.length ?? 0;

  function createRenderElement(text) {
    const item = document.createElement("div");
    item.textContent = text;
    item.style.height = "50px";
    item.style.borderBottom = "1px solid #eee";
    item.style.boxSizing = "border-box";
    return item;
  }

  function renderChunk(deadline) {
    // 创建文档片段: JavaScript 提供了一个文档片段 DocumentFragment 的机制。
    // 把所有要构造的节点都放在文档片段中执行，会在内存中构造节点，最后一次性插入 DOM，减少浏览器重绘
    const fragment = document.createDocumentFragment();

    // 在空闲时间内渲染尽可能多的项目
    while (index < total && (deadline.timeRemaining() > 0 || deadline.didTimeout)) {
      fragment.appendChild(createRenderElement(data[index]));
      index++;

      // 每次渲染一个chunkSize后检查时间
      if (index % chunkSize === 0) {
        break;
      }
    }
    // 放入 dom，完成 一次 chunk 渲染
    container.appendChild(fragment);

    // 如果还有数据，继续渲染
    if (index < total) {
      requestIdleCallback(renderChunk, { timeout: 100 });
    }
  }

  renderChunk();
}

// 使用示例
// const data = Array.from({length: 10000}, (_, i) => `Item ${i}`);
// const container = document.getElementById('chunk-render-container');
// chunkRenderWithRIC(data, container);
