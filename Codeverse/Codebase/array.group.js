// ES2023新语法 Object.groupBy(object, keyGetter)

const groupBy = (array, keyGetter) => {
  const keyGetterFn = typeof keyGetter === "function" ? keyGetter : (item) => item[keyGetter];

  return array.reduce((acc, item) => {
    const key = keyGetterFn(item);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});
};

// 使用示例
const people = [
  { name: "Alice", age: 21 },
  { name: "Bob", age: 21 },
  { name: "Charlie", age: 22 },
];

console.log(groupBy(people, (person) => person.age));
console.log(groupBy(people, "name"));
/*
{
  "21": [
    { "name": "Alice", "age": 21 },
    { "name": "Bob", "age": 21 }
  ],
  "22": [
    { "name": "Charlie", "age": 22 }
  ]
}
*/
