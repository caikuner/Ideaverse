/*
 * @lc app=leetcode.cn id=19 lang=javascript
 *
 * [19] 删除链表的倒数第 N 个结点
 *
 * https://leetcode.cn/problems/remove-nth-node-from-end-of-list/description/
 *
 * algorithms
 * Medium (48.41%)
 * Likes:    2884
 * Dislikes: 0
 * Total Accepted:    1.5M
 * Total Submissions: 3M
 * Testcase Example:  '[1,2,3,4,5]\n2'
 *
 * 给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：head = [1,2,3,4,5], n = 2
 * 输出：[1,2,3,5]
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：head = [1], n = 1
 * 输出：[]
 * 
 * 
 * 示例 3：
 * 
 * 
 * 输入：head = [1,2], n = 1
 * 输出：[1]
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 链表中结点的数目为 sz
 * 1 <= sz <= 30
 * 0 <= Node.val <= 100
 * 1 <= n <= sz
 * 
 * 
 * 
 * 
 * 进阶：你能尝试使用一趟扫描实现吗？
 * 
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/** 双指针
 * 找倒数第n个节点，快指针先走 n 步，然后快慢指针同时走，当快指针到尾部，慢指针就走到了。
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */

var removeNthFromEnd = function(head, n) {
    // 虚拟头节点，方便处理 head
    const prevHead = new ListNode(-1, head);

    // 快指针，先走 n 步
    let fast = prevHead;
    for (let i = 0; i < n; i++) {
        fast = fast.next;
    }
    // 快慢指针，同时走
    let slow = prevHead;
    while(fast && fast.next) {
        fast = fast.next
        slow = slow.next;
    }
    // 这时，slow 指向“倒数第 N 个节点”的前一个，断开即可
    slow.next = slow.next.next;
    return prevHead.next;
    
};
// @lc code=end

