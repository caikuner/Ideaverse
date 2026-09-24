/*
 * @lc app=leetcode.cn id=105 lang=javascript
 *
 * [105] 从前序与中序遍历序列构造二叉树
 *
 * https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/
 *
 * algorithms
 * Medium (71.70%)
 * Likes:    2325
 * Dislikes: 0
 * Total Accepted:    671.4K
 * Total Submissions: 935.9K
 * Testcase Example:  '[3,9,20,15,7]\n[9,3,15,20,7]'
 *
 * 给定两个整数数组 preorder 和 inorder ，其中 preorder 是二叉树的先序遍历， inorder
 * 是同一棵树的中序遍历，请构造二叉树并返回其根节点。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
 * 输出: [3,9,20,null,null,15,7]
 *
 *
 * 示例 2:
 *
 *
 * 输入: preorder = [-1], inorder = [-1]
 * 输出: [-1]
 *
 *
 *
 *
 * 提示:
 *
 *
 * 1 <= preorder.length <= 3000
 * inorder.length == preorder.length
 * -3000 <= preorder[i], inorder[i] <= 3000
 * preorder 和 inorder 均 无重复 元素
 * inorder 均出现在 preorder
 * preorder 保证 为二叉树的前序遍历序列
 * inorder 保证 为二叉树的中序遍历序列
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
/** 分治：preorder 首元素就是根节点，从 inorder 中寻找根节点，然后左右分治
 * 时间复杂度 O(n^2)：需要递归 O(n), 且每次递归需要 O(n) 的时间寻找根节点位置
 * 空间复杂度 O(n^2)
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
  if (!preorder?.length) return null;

  const rootVal = preorder[0];
  const mid = inorder.indexOf(rootVal); // 题目假设无重复元素才能这么写
  const left = buildTree(preorder.slice(1, mid + 1), inorder.slice(0, mid));
  const right = buildTree(preorder.slice(mid + 1), inorder.slice(mid + 1));
  return new TreeNode(rootVal, left, right);
};

// @lc code=start
/** 分治+哈希: 把从 inorder寻找根节点位置的 O(n)， 使用哈希表优化为 O(1)
 * 时间复杂度 O(n)，空间复杂度 O(n)
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
  const n = preorder.length;
  if (!n) return null;

  // inorder 建立 value 和 index 的映射关系，方便快速查找索引
  const indexMap = new Map();
  for (let i = 0; i < n; i++) {
    indexMap.set(inorder[i], i);
  }

  function dfs(preL, preR, inL, inR) {
    if (preL >= preR || inL >= inR) return null;

    const rootVal = preorder[preL];
    const leftSize = indexMap.get(rootVal) - inL; // 使用节点个数来定位，比索引计算更直观

    // preorder 要跳过左边第一个根节点，inorder 跳过中间的根节点
    const left = dfs(preL + 1, preL + 1 + leftSize, inL, inL + leftSize);
    const right = dfs(preL + 1 + leftSize, preR, inL + 1 + leftSize, inR);

    return new TreeNode(rootVal, left, right);
  }
  return dfs(0, n, 0, n); // 左开右闭
};
// @lc code=end
