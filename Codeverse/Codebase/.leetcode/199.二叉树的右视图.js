/*
 * @lc app=leetcode.cn id=199 lang=javascript
 *
 * [199] 二叉树的右视图  (变化：左视图)
 *
 * https://leetcode.cn/problems/binary-tree-right-side-view/description/
 *
 * algorithms
 * Medium (67.25%)
 * Likes:    1082
 * Dislikes: 0
 * Total Accepted:    437.9K
 * Total Submissions: 650.8K
 * Testcase Example:  '[1,2,3,null,5,null,4]'
 *
 * 给定一个二叉树的 根节点 root，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。
 *
 *
 *
 * 示例 1:
 *
 *
 *
 *
 * 输入: [1,2,3,null,5,null,4]
 * 输出: [1,3,4]
 *
 *
 * 示例 2:
 *
 *
 * 输入: [1,null,3]
 * 输出: [1,3]
 *
 *
 * 示例 3:
 *
 *
 * 输入: []
 * 输出: []
 *
 *
 *
 *
 * 提示:
 *
 *
 * 二叉树的节点个数的范围是 [0,100]
 * -100
 *
 *
 */

// 变体： 左视图。 处理一样，只不过是打印每一层的第一个元素

/** 方法1. 先层序遍历完毕，然后打印每一层的最后一个元素  【左视图的话就打印每一层的第一个】
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/** 迭代：直接在遍历时候判断是否为最后一个元素即可，不需要全部打印
 * 时间复杂度：O(n)，空间复杂度：O(n)
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function (root) {
  if (!root) return [];

  const res = [];
  const queue = [root];
  while (queue.length > 0) {
    const curlen = queue.length;
    // cur level
    for (let i = 0; i < curlen; i++) {
      const node = queue.shift();

      // 如果是当前层的最后一个元素，则加入结果集
      if (i === curlen - 1) {
        res.push(node.val);
      }

      // next level
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
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
 * 时间复杂度：O(n)，空间复杂度：O(n)
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function (root) {
  if (!root) return [];

  const traversal = (node, h, res) => {
    if (!node) return res;

    // 如何判断是当前层最后一个元素？ - 不用判断，每次都更新值即可，最后的就是最右元素
    res[h] = node.val;

    // 扩展：打印左视图时，如何判断是当前层第一个元素？ - 不用判断，第一次更新值，然后不再更新即可
    // if (res[h] === undefined) { res[h] = node.val }

    // 下一层
    traversal(node.left, h + 1, res);
    traversal(node.right, h + 1, res);

    return res;
  };
  return traversal(root, 0, []);
};
// @lc code=end
