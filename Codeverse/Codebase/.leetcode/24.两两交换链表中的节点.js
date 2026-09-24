/*
 * @lc app=leetcode.cn id=24 lang=javascript
 *
 * [24] 两两交换链表中的节点
 *
 * https://leetcode.cn/problems/swap-nodes-in-pairs/description/
 *
 * algorithms
 * Medium (72.22%)
 * Likes:    2205
 * Dislikes: 0
 * Total Accepted:    845.8K
 * Total Submissions: 1.2M
 * Testcase Example:  '[1,2,3,4]'
 *
 * 给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：head = [1,2,3,4]
 * 输出：[2,1,4,3]
 *
 *
 * 示例 2：
 *
 *
 * 输入：head = []
 * 输出：[]
 *
 *
 * 示例 3：
 *
 *
 * 输入：head = [1]
 * 输出：[1]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 链表中节点的数目在范围 [0, 100] 内
 * 0 <= Node.val <= 100
 *
 *
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/** 递归, 时间复杂度O(n), 空间复杂度O(n) [调用栈空间]
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
  if (head === null || head.next === null) {
    return head;
  }
  const newHead = head.next;
  head.next = swapPairs(newHead.next);
  newHead.next = head;

  return newHead;
};

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/** 迭代, 时间复杂度O(n), 空间复杂度O(1)
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
  const preHead = new ListNode(-1, null);
  preHead.next = head;

  let prev = preHead;
  while (prev !== null && prev.next !== null && prev.next.next !== null) {
    const node1 = prev.next;
    const node2 = prev.next.next;

    prev.next = node2;
    node1.next = node2.next;
    node2.next = node1;

    prev = node1; // 前进两步
  }
  return preHead.next;
};
// @lc code=end
