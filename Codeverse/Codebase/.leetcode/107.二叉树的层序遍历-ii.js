/*
 * @lc app=leetcode.cn id=107 lang=javascript
 *
 * [107] 二叉树的层序遍历 II
 *
 * https://leetcode.cn/problems/binary-tree-level-order-traversal-ii/description/
 *
 * algorithms
 * Medium (74.18%)
 * Likes:    800
 * Dislikes: 0
 * Total Accepted:    345.4K
 * Total Submissions: 465.4K
 * Testcase Example:  '[3,9,20,null,null,15,7]'
 *
 * 给你二叉树的根节点 root ，返回其节点值 自底向上的层序遍历 。 （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：root = [3,9,20,null,null,15,7]
 * 输出：[[15,7],[9,20],[3]]
 *
 *
 * 示例 2：
 *
 *
 * 输入：root = [1]
 * 输出：[[1]]
 *
 *
 * 示例 3：
 *
 *
 * 输入：root = []
 * 输出：[]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树中节点数目在范围 [0, 2000] 内
 * -1000 <= Node.val <= 1000
 *
 *
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/** 迭代
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrderBottom = function (root) {
  if (!root) return [];

  const res = [];
  const queue = [root];
  while (queue.length > 0) {
    const curLen = queue.length;
    const curLevel = [];
    for (let i = 0; i < curLen; i++) {
      const node = queue.shift();
      curLevel.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    res.push(curLevel);
  }
  return res.reverse();
};

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**递归
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrderBottom = function (root) {
  const traversal = (node, h, res) => {
    if (!node) return res;

    if (!res[h]) res[h] = [];
    res[h].push(node.val);

    if (node.left) traversal(node.left, h + 1, res);
    if (node.right) traversal(node.right, h + 1, res);

    return res;
  };

  const res = traversal(root, 0, []);
  return res.reverse();
};
// @lc code=end
