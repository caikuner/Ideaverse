// 递归
function nodeTreeToArray(tree, parentId = null) {
  return tree.reduce((acc, node) => {
    const { children, ...rest } = node;
    acc.push({ ...rest, parentId });
    if (children && children.length > 0) {
      acc.push(...nodeTreeToArray(children, node.id));
    }
    return acc;
  }, []);
}

// 迭代
function nodeTreeToArray(tree) {
  const res = [];
  const queue = [...tree];

  while (queue.length) {
    const node = queue.shift();
    const { children, ...rest } = node;
    res.push({ ...rest, parentId: node.parentId ?? null });

    if (children && children.length > 0) {
      for (let i = 0; i < children.length; i++) {
        queue.push({
          ...children[i],
          parentId: node.id,
        });
      }
    }
  }

  return res;
}

// test
const tree = [
  {
    id: 1,
    name: "节点1",
    children: [
      {
        id: 2,
        name: "节点2",
        children: [{ id: 4, name: "节点4", children: [] }],
      },
      { id: 3, name: "节点3", children: [] },
    ],
  },
  {
    id: 5,
    name: "节点5",
    children: [{ id: 6, name: "节点6", children: [] }],
  },
];
console.log(nodeTreeToArray(tree));
