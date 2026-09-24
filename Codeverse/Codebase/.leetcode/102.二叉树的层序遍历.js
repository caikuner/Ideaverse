/*
 * @lc app=leetcode.cn id=102 lang=javascript
 *
 * [102] 二叉树的层序遍历
 *
 * https://leetcode.cn/problems/binary-tree-level-order-traversal/description/
 *
 * algorithms
 * Medium (67.49%)
 * Likes:    1976
 * Dislikes: 0
 * Total Accepted:    1.1M
 * Total Submissions: 1.6M
 * Testcase Example:  '[3,9,20,null,null,15,7]'
 *
 * 给你二叉树的根节点 root ，返回其节点值的 层序遍历 。 （即逐层地，从左到右访问所有节点）。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：root = [3,9,20,null,null,15,7]
 * 输出：[[3],[9,20],[15,7]]
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
 * 时间复杂度：O(n)， 空间复杂度：O(n)
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (!root) return [];

  const res = [];
  const queue = [root]; // first level
  while (queue.length > 0) {
    // cur level
    const curLen = queue.length;
    const curRow = [];
    for (let i = 0; i < curLen; i++) {
      const node = queue.shift();
      curRow.push(node.val);

      // next level: 先左后右
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    res.push(curRow);
  }
  return res;
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

/** 递归
 * 时间复杂度：O(n)， 空间复杂度：O(n)
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  const traversal = (node, h, res) => {
    // 截止条件：null
    if (!node) return res;

    // cur level
    if (!res[h]) res[h] = [];
    res[h].push(node.val);

    // next level
    if (node.left) traversal(node.left, h + 1, res);
    if (node.right) traversal(node.right, h + 1, res);

    return res;
  };

  return traversal(root, 0, []);
};
// @lc code=end
