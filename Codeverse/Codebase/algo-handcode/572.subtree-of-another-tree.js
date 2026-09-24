/*
 * @lc app=leetcode.cn id=572 lang=javascript
 * @lcpr version=30204
 *
 * [572] 另一棵树的子树
 *
 * https://leetcode.cn/problems/subtree-of-another-tree/description/
 *
 * algorithms
 * Easy (49.03%)
 * Likes:    1148
 * Dislikes: 0
 * Total Accepted:    251.3K
 * Total Submissions: 512.3K
 * Testcase Example:  '[3,4,5,1,2]\n[4,1,2]'
 *
 *
 *
 * 给你两棵二叉树 root 和 subRoot 。检验 root 中是否包含和 subRoot 具有相同结构和节点值的子树。如果存在，返回 true
 * ；否则，返回 false 。
 *
 * 二叉树 tree 的一棵子树包括 tree 的某个节点和这个节点的所有后代节点。tree 也可以看做它自身的一棵子树。
 *
 *
 *
 * 示例 1：
 *
 * 输入：root = [3,4,5,1,2], subRoot = [4,1,2]
 * 输出：true
 *
 *
 * 示例 2：
 *
 * 输入：root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]
 * 输出：false
 *
 *
 *
 *
 * 提示：
 *
 *
 * root 树上的节点数量范围是 [1, 2000]
 * subRoot 树上的节点数量范围是 [1, 1000]
 * -10^4 <= root.val <= 10^4
 * -10^4 <= subRoot.val <= 10^4
 *
 *
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
 * @param {TreeNode} subRoot
 * @return {boolean}
 */
var isSubtree = function (A, B) {
  if (!A && !B) return true;
  if (!A || !B) return false;

  const isSametree = (A, B) => {
    if (!A && !B) return true;
    if (!A || !B) return false;

    return A.val === B.val && isSametree(A.left, B.left) && isSametree(A.right, B.right);
  };

  return isSametree(A, B) || isSubtree(A.left, B) || isSubtree(A.right, B);
};
// @lc code=end

/*
// @lcpr case=start
// [3,4,5,1,2]\n[4,1,2]\n
// @lcpr case=end

// @lcpr case=start
// [3,4,5,1,2,null,null,null,null,0]\n[4,1,2]\n
// @lcpr case=end

 */
