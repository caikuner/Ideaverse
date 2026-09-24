// 递归
function nodeArrayToTree(items, parentId = null) {
  return items
    .filter((item) => item.parentId === parentId)
    .map((item) => ({ ...item, children: nodeArrayToTree(items, item.id) }));
}

// 迭代+map
function nodeArrayToTree(items) {
  const res = [];
  const treeMap = {};

  for (const item of items) {
    treeMap[item.id] = { ...item, children: [] };
  }

  for (const item of items) {
    const { id, parentId } = item;
    const treeItem = treeMap[id];
    if (parentId === null) {
      res.push(treeItem);
    } else {
      if (!treeMap[parentId]) {
        treeMap[parentId] = { children: [] };
      }
      treeMap[parentId].children.push(treeItem);
    }
  }

  return res;
}

// test
const flatArray = [
  { id: 1, name: "节点1", parentId: null },
  { id: 2, name: "节点2", parentId: 1 },
  { id: 3, name: "节点3", parentId: 1 },
  { id: 4, name: "节点4", parentId: 2 },
  { id: 5, name: "节点5", parentId: null },
  { id: 6, name: "节点6", parentId: 5 },
];

console.log(nodeArrayToTree(flatArray)[0].children[0].children[0]);
