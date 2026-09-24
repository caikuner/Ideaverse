// 使用 react 实现一个简易版 实时搜索组件 （面试版）
import { useState } from "react";

export default function LiveSearch() {
  const data = [
    "Apple",
    "Banana",
    "Orange",
    "Grape",
    "Pineapple",
    "Mango",
    "Strawberry",
    "Blueberry",
    "Watermelon",
    "Lemon",
  ];

  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    const filtered = data.filter((item) => item.toLowerCase().includes(query.toLowerCase()));
    setResult(filtered);
  };

  const handleItemSelect = (e) => {
    const li = e.target.closest("li"); // 触发元素是否是 li
    if (!li) return;

    const selectedValue = li.dataset.value;
    console.log("select: ", selectedValue);
    setQuery(selectedValue);
    setResult([]);
  };

  return (
    <div>
      <input type="text" value={query} onChange={handleChange} />

      {result?.length > 0 && (
        <ul onClick={handleItemSelect}>
          {result.map((item) => (
            <li key={item} data-value={item}>
              {item}
            </li>
          ))}
        </ul>
      )}

      {!!query && result.length === 0 && <p>未找到结果</p>}
    </div>
  );
}
