/*
 * @lc app=leetcode.cn id=113 lang=javascript
 *
 * [113] 路径总和 II
 *
 * https://leetcode.cn/problems/path-sum-ii/description/
 *
 * algorithms
 * Medium (63.30%)
 * Likes:    1118
 * Dislikes: 0
 * Total Accepted:    417.4K
 * Total Submissions: 659.1K
 * Testcase Example:  '[5,4,8,11,null,13,4,7,2,null,null,5,1]\n22'
 *
 * 给你二叉树的根节点 root 和一个整数目标和 targetSum ，找出所有 从根节点到叶子节点 路径总和等于给定目标和的路径。
 *
 * 叶子节点 是指没有子节点的节点。
 *
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
 * 输出：[[5,4,11,2],[5,8,4,5]]
 *
 *
 * 示例 2：
 *
 *
 * 输入：root = [1,2,3], targetSum = 5
 * 输出：[]
 *
 *
 * 示例 3：
 *
 *
 * 输入：root = [1,2], targetSum = 0
 * 输出：[]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树中节点总数在范围 [0, 5000] 内
 * -1000
 * -1000
 *
 *
 *
 *
 */

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
 * @param {number} targetSum
 * @return {number[][]}
 */
var pathSum = function (root, targetSum) {
  function traversal(root, targetSum) {
    if (!root) return;

    path.push(root.val);
    targetSum -= root.val;
    if (!root.left && !root.right && targetSum === 0) {
      res.push([...path]); // 必须复制path数组，否则 path.pop 时候会改变 res
    }
    traversal(root.left, targetSum);
    traversal(root.right, targetSum);

    // 恢复现场：回溯时，当前路径走到头没发现结果，就会 return，回溯到上一层
    // 此时 path 需要去掉当前节点，但是 targetSum 不需要加回去，因为回去后会用上一层的 targetSum
    path.pop();
    return;
  }

  const res = [],
    path = [];
  traversal(root, targetSum);
  return res;
};
// @lc code=end
