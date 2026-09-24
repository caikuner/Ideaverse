function uniq(arr) {
  return [...new Set(arr)];
}

function uniqBy(arr, keyGetter) {
  const keyGetterFn = typeof keyGetter === "function" ? keyGetter : (item) => item[keyGetter];
  const seen = new Set(); // cache

  return arr.reduce((acc, item) => {
    const key = keyGetterFn(item);

    if (!seen.has(key)) {
      seen.add(key);
      acc.push(item);
    }
    return acc;
  }, []);
}

// 使用示例
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 1, name: "alice" },
  { id: 3, name: "Charlie" },
];

console.log(uniqBy(users, "id"));
console.log(uniqBy(users, (user) => user.name.toLowerCase()));
// [{id: 1, name: 'Alice'}, {id: 2, name: 'Bob'}, {id: 3, name: 'Charlie'}]
