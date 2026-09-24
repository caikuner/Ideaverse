/*
 * @lc app=leetcode.cn id=144 lang=javascript
 * @lcpr version=30204
 *
 * [144] 二叉树的前序遍历
 *
 * https://leetcode.cn/problems/binary-tree-preorder-traversal/description/
 *
 * algorithms
 * Easy (73.14%)
 * Likes:    1337
 * Dislikes: 0
 * Total Accepted:    1.3M
 * Total Submissions: 1.7M
 * Testcase Example:  '[1,null,2,3]'
 *
 * 给你二叉树的根节点 root ，返回它节点值的 前序 遍历。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：root = [1,null,2,3]
 *
 * 输出：[1,2,3]
 *
 * 解释：
 *
 *
 *
 *
 * 示例 2：
 *
 *
 * 输入：root = [1,2,3,4,5,null,8,null,null,6,7,9]
 *
 * 输出：[1,2,4,5,6,7,3,8,9]
 *
 * 解释：
 *
 *
 *
 *
 * 示例 3：
 *
 *
 * 输入：root = []
 *
 * 输出：[]
 *
 *
 * 示例 4：
 *
 *
 * 输入：root = [1]
 *
 * 输出：[1]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树中节点数目在范围 [0, 100] 内
 * -100 <= Node.val <= 100
 *
 *
 *
 *
 * 进阶：递归算法很简单，你可以通过迭代算法完成吗？
 *
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function (root) {
  // 遍历顺序：(中)左右； 入栈顺序：右左
  // 1, 2 3, 4 5  6 7 .  1 245 367
  if (!root) return [];

  const res = [];
  const stack = [root];

  while (stack.length) {
    const node = stack.pop();
    res.push(node.val);

    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left); // 后入栈，先出栈
  }

  return res;
};
// @lc code=end

// 递归
var preorderTraversalRecursive = function (root) {
  // 递归就是原顺序 中左右

  const dfs = (node) => {
    if (!node) return;
    res.push(node.val);
    dfs(node.left);
    dfs(node.right);
  };

  const res = [];
  dfs(root);
  return res;
};

/*
// @lcpr case=start
// [1,null,2,3]\n
// @lcpr case=end

// @lcpr case=start
// [1,2,3,4,5,null,8,null,null,6,7,9]\n
// @lcpr case=end

// @lcpr case=start
// []\n
// @lcpr case=end

// @lcpr case=start
// [1]\n
// @lcpr case=end

 */
