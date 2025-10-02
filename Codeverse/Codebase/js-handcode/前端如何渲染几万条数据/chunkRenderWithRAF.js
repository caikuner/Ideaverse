export default function chunkRenderWithRAF(data, container, chunkSize = 50) {
  if (!container) throw new Error("请确定容器");
  let index = 0;
  const total = data.length;

  function createRenderElement(text) {
    const item = document.createElement("div");
    item.textContent = text;
    item.style.height = "50px";
    item.style.borderBottom = "1px solid #eee";
    item.style.boxSizing = "border-box";
    return item;
  }

  function renderChunk() {
    // 创建文档片段
    const fragment = document.createDocumentFragment();

    // 渲染当前分片
    while (index < total) {
      fragment.appendChild(createRenderElement(data[index]));
      if (index % chunkSize === 0) break;
    }
    container.appendChild(fragment);

    // 如果还有数据，继续渲染
    if (index < total) {
      requestAnimationFrame(renderChunk);
    }
  }

  renderChunk();
}

// 使用示例
// const data = Array.from({length: 10000}, (_, i) => `Item ${i}`);
// const container = document.getElementById('chunk-render-container');
// chunkRenderWithRAF(data, container);
