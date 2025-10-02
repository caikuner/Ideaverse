/*
 * @lc app=leetcode.cn id=226 lang=javascript
 * @lcpr version=30204
 *
 * [226] 翻转二叉树
 *
 * https://leetcode.cn/problems/invert-binary-tree/description/
 *
 * algorithms
 * Easy (82.05%)
 * Likes:    1969
 * Dislikes: 0
 * Total Accepted:    1.2M
 * Total Submissions: 1.5M
 * Testcase Example:  '[4,2,7,1,3,6,9]'
 *
 * 给你一棵二叉树的根节点 root ，翻转这棵二叉树，并返回其根节点。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 
 * 输入：root = [4,2,7,1,3,6,9]
 * 输出：[4,7,2,9,6,3,1]
 * 
 * 
 * 示例 2：
 * 
 * 
 * 
 * 输入：root = [2,1,3]
 * 输出：[2,3,1]
 * 
 * 
 * 示例 3：
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
 * 树中节点数目范围在 [0, 100] 内
 * -100 <= Node.val <= 100
 * 
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
 * @return {TreeNode}
 */
var invertTree = function(root) {
    if (!root) return null

    const stack = [root]
    while(stack.length) {
      // 为什么是 pop？
      // 左右互换后，左右reverse 了，需要按照入栈的反顺序出
      const node = stack.pop()
      if (node.left) stack.push(node.left)
      if (node.right) stack.push(node.right)

      // swap
      const right = node.right
      node.right = node.left
      node.left = right
    }

    return root
};
// @lc code=end

// 递归
// var invertTree = function(root) {
//     if (!root) return null

//     // 中间变量保存一下
//     const left = invertTree(root.right)
//     const right = invertTree(root.left)

//     root.left = left
//     root.right = right
//     return root
// };

/*
// @lcpr case=start
// [4,2,7,1,3,6,9]\n
// @lcpr case=end

// @lcpr case=start
// [2,1,3]\n
// @lcpr case=end

// @lcpr case=start
// []\n
// @lcpr case=end

 */


// @lcpr-after-debug-begin
module.exports = invertTree;
// @lcpr-after-debug-end