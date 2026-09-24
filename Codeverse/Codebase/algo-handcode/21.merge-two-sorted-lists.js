/*
 * @lc app=leetcode.cn id=21 lang=javascript
 * @lcpr version=30204
 *
 * [21] 合并两个有序链表
 *
 * https://leetcode.cn/problems/merge-two-sorted-lists/description/
 *
 * algorithms
 * Easy (67.90%)
 * Likes:    3787
 * Dislikes: 0
 * Total Accepted:    2.1M
 * Total Submissions: 3.1M
 * Testcase Example:  '[1,2,4]\n[1,3,4]'
 *
 * 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。
 *
 *
 *
 * 示例 1：
 *
 * 输入：l1 = [1,2,4], l2 = [1,3,4]
 * 输出：[1,1,2,3,4,4]
 *
 *
 * 示例 2：
 *
 * 输入：l1 = [], l2 = []
 * 输出：[]
 *
 *
 * 示例 3：
 *
 * 输入：l1 = [], l2 = [0]
 * 输出：[0]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 两个链表的节点数目范围是 [0, 50]
 * -100 <= Node.val <= 100
 * l1 和 l2 均按 非递减顺序 排列
 *
 *
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  if (!list1 && !list2) return null;

  // 从哑节点开始
  const dummy = new ListNode(-1);
  let prev = dummy;

  let cur1 = list1,
    cur2 = list2;
  while (cur1 && cur2) {
    let nextNode = null;

    if (cur1.val <= cur2.val) {
      nextNode = cur1;
      cur1 = cur1.next;
    } else {
      nextNode = cur2;
      cur2 = cur2.next;
    }

    prev.next = nextNode;
    prev = nextNode;
  }

  // 剩余
  if (cur1) prev.next = cur1;
  if (cur2) prev.next = cur2;

  return dummy.next;
};
// @lc code=end

/*
// @lcpr case=start
// [1,2,4]\n[1,3,4]\n
// @lcpr case=end

// @lcpr case=start
// []\n[]\n
// @lcpr case=end

// @lcpr case=start
// []\n[0]\n
// @lcpr case=end

 */
