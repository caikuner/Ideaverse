/*
 * @lc app=leetcode.cn id=94 lang=javascript
 * @lcpr version=30204
 *
 * [94] 二叉树的中序遍历
 *
 * https://leetcode.cn/problems/binary-tree-inorder-traversal/description/
 *
 * algorithms
 * Easy (78.21%)
 * Likes:    2257
 * Dislikes: 0
 * Total Accepted:    1.8M
 * Total Submissions: 2.3M
 * Testcase Example:  '[1,null,2,3]'
 *
 * 给定一个二叉树的根节点 root ，返回 它的 中序 遍历 。
 *
 *
 *
 * 示例 1：
 *
 * 输入：root = [1,null,2,3]
 * 输出：[1,3,2]
 *
 *
 * 示例 2：
 *
 * 输入：root = []
 * 输出：[]
 *
 *
 * 示例 3：
 *
 * 输入：root = [1]
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
 * 进阶: 递归算法很简单，你可以通过迭代算法完成吗？
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
var inorderTraversal = function (root) {
  // 遍历顺序 左中右
  // 1 ,2  3 ,4 5  6 7   425 1 637
  if (!root) return root;

  const res = [];
  const stack = [];

  while (root || stack.length) {
    if (root) {
      // 一直向左走，找到了最左下的点
      stack.push(root);
      root = root.left;
    } else {
      // 走到了头，从栈中弹出节点保存
      // 先保存到的就是左；往上走，于是保存了中；
      // 然后root转到右节点
      const node = stack.pop();
      res.push(node.val);

      root = node.right;
    }
  }

  return res;
};
// @lc code=end

var inorderTraversalRecurive = function (root) {
  const dfs = (node) => {
    if (node === null) return;
    dfs(node.left);
    res.push(node.val);
    dfs(node.right);
  };

  const res = [];
  dfs(root);
  return res;
};

/** Morris遍历：
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversalMorris = function (root) {
  const res = [];

  let pre = null;
  while (root) {
    if (root.left) {
      // 寻找左子树下的最右节点
      pre = root.left;
      while (pre.right) {
        pre = pre.right;
      }

      // 将当前节点及其右子树挂载到该“左子树的最右节点”上
      pre.right = root;

      // 将 root 指向 root 的 left
      const tmp = root;
      root = root.left; // 继续处理下一级左子树
      tmp.left = null; // 断开原 root 的 left
    } else {
      // 左子树遍历完毕，保存当前节点，并转到右子树
      res.push(root.val);
      root = root.right;
    }
  }

  return res;
};

/*
// @lcpr case=start
// [1,null,2,3]\n
// @lcpr case=end

// @lcpr case=start
// []\n
// @lcpr case=end

// @lcpr case=start
// [1]\n
// @lcpr case=end

 */
