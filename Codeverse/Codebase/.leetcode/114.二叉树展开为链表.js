/*
 * @lc app=leetcode.cn id=114 lang=javascript
 *
 * [114] 二叉树展开为链表
 *
 * https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/description/
 *
 * algorithms
 * Medium (73.84%)
 * Likes:    1691
 * Dislikes: 0
 * Total Accepted:    487.3K
 * Total Submissions: 659.5K
 * Testcase Example:  '[1,2,5,3,4,null,6]'
 *
 * 给你二叉树的根结点 root ，请你将它展开为一个单链表：
 * 
 * 
 * 展开后的单链表应该同样使用 TreeNode ，其中 right 子指针指向链表中下一个结点，而左子指针始终为 null 。
 * 展开后的单链表应该与二叉树 先序遍历 顺序相同。
 * 
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：root = [1,2,5,3,4,null,6]
 * 输出：[1,null,2,null,3,null,4,null,5,null,6]
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：root = []
 * 输出：[]
 * 
 * 
 * 示例 3：
 * 
 * 
 * 输入：root = [0]
 * 输出：[0]
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 树中结点数在范围 [0, 2000] 内
 * -100 
 * 
 * 
 * 
 * 
 * 进阶：你可以使用原地算法（O(1) 额外空间）展开这棵树吗？
 * 
 */


// 要求：先序遍历顺序； O(1)空间

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/** 先序遍历，遍历过程中连接链表
 * 时间复杂度 O(n),空间复杂度 O(n)
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function (root) {
    if (!root) return null

    const preHead = new TreeNode(-1, null, null)
    let cur = preHead, stack = [root]

    while (stack.length) {
        const node = stack.pop()
        if (node.right) stack.push(node.right)
        if (node.left) stack.push(node.left)

        cur.right = node
        cur.left = null

        cur = cur.right
    }
    return preHead.right
};



// @lc code=start
/** 参考 Morris
 * 时间复杂度 O(n),空间复杂度 O(1)
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function (root) {
    let cur = root;
    while (cur) {
        if (cur.left) {
            // find 左子树的最右节点
            let pre = cur.left
            while (pre.right) {
                pre = pre.right
            }

            // 左子树的最右节点，连接原右子树
            pre.right = cur.right

            // 将左子树插入到右子树的地方，断开原 left
            cur.right = cur.left
            cur.left = null
        }
        cur = cur.right
    }
}

// @lc code=end
