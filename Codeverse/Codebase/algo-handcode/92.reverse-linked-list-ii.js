/*
 * @lc app=leetcode.cn id=92 lang=javascript
 * @lcpr version=30204
 *
 * [92] 反转链表 II
 *
 * https://leetcode.cn/problems/reverse-linked-list-ii/description/
 *
 * algorithms
 * Medium (57.55%)
 * Likes:    1974
 * Dislikes: 0
 * Total Accepted:    644.1K
 * Total Submissions: 1.1M
 * Testcase Example:  '[1,2,3,4,5]\n2\n4'
 *
 * 给你单链表的头指针 head 和两个整数 left 和 right ，其中 left <= right 。请你反转从位置 left 到位置 right
 * 的链表节点，返回 反转后的链表 。
 *
 *
 * 示例 1：
 *
 * 输入：head = [1,2,3,4,5], left = 2, right = 4
 * 输出：[1,4,3,2,5]
 *
 *
 * 示例 2：
 *
 * 输入：head = [5], left = 1, right = 1
 * 输出：[5]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 链表中节点数目为 n
 * 1 <= n <= 500
 * -500 <= Node.val <= 500
 * 1 <= left <= right <= n
 *
 *
 *
 *
 * 进阶： 你可以使用一趟扫描完成反转吗？
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
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}
var reverseBetween = function (head, left, right) {
  // dummy 1 2 3 4 5, 2 4
  if (!head || !head.next || left >= right) return head;
  const k = right - left + 1;

  const dummy = new ListNode(-1, head);
  let p0 = dummy;
  for (let i = 0; i < left - 1; i++) {
    p0 = p0.next;
  }
  // now: p0 -> left 的上一个, 开始反转链表

  let prev = null;
  let cur = p0.next;
  for (let i = 0; i < k; i++) { // 同 206
    const next = cur.next;
    cur.next = prev; // 每次循环只修改一个 next

    prev = cur;
    cur = next;
  }

  // now: prev -> right, cur -> right.next
  p0.next.next = cur;
  p0.next = prev;

  return dummy.next;
};
// @lc code=end

/*
// @lcpr case=start
// [1,2,3,4,5]\n2\n4\n
// @lcpr case=end

// @lcpr case=start
// [5]\n1\n1\n
// @lcpr case=end

 */

// @lcpr-after-debug-begin
module.exports = reverseBetween;
// @lcpr-after-debug-end
