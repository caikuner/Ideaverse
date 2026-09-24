// 层序遍历，字节点个数不定，自定义结构。 快手用增二面

class TreeNode {
  constructor(val) {
    this.val = val;
    this.children = [];
  }
}

function levelOrder(root) {
  if (!root) return []; // 空树直接返回空数组
  const res = []; // 结果数组
  const queue = [root]; // 队列初始放入根节点
  while (queue.length) {
    // 队列不为空时循环
    const level = []; // 当前层结果
    const len = queue.length; // 当前层节点数
    for (let i = 0; i < len; i++) {
      const node = queue.shift();
      level.push(node.val);
      queue.push(...node.children);
    }
    res.push(...level); // 当前层结果加入总结果
  }
  return res; // 返回最终层序遍历结果
}

// test

const A = new TreeNode("A");
const B = new TreeNode("B");
const C = new TreeNode("C");
const D = new TreeNode("D");
const E = new TreeNode("E");
const F = new TreeNode("F");
const H = new TreeNode("H");
const I = new TreeNode("I");
const J = new TreeNode("J");
const K = new TreeNode("K");
A.children = [B, C, D];
B.children = [E, F];
D.children = [H, I, J, K];

console.log(levelOrder(A)); // 输出: [['A'], ['B','C','D'], ['E','F','H','I','J','K']]
