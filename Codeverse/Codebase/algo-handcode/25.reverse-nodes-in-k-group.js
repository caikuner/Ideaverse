/*
 * @lc app=leetcode.cn id=25 lang=javascript
 * @lcpr version=30204
 *
 * [25] K 个一组翻转链表
 *
 * https://leetcode.cn/problems/reverse-nodes-in-k-group/description/
 *
 * algorithms
 * Hard (69.59%)
 * Likes:    2585
 * Dislikes: 0
 * Total Accepted:    827.4K
 * Total Submissions: 1.2M
 * Testcase Example:  '[1,2,3,4,5]\n2'
 *
 * 给你链表的头节点 head ，每 k 个节点一组进行翻转，请你返回修改后的链表。
 * 
 * k 是一个正整数，它的值小于或等于链表的长度。如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。
 * 
 * 你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 输入：head = [1,2,3,4,5], k = 2
 * 输出：[2,1,4,3,5]
 * 
 * 
 * 示例 2：
 * 
 * 
 * 
 * 输入：head = [1,2,3,4,5], k = 3
 * 输出：[3,2,1,4,5]
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 链表中的节点数目为 n
 * 1 <= k <= n <= 5000
 * 0 <= Node.val <= 1000
 * 
 * 
 * 
 * 
 * 进阶：你可以设计一个只用 O(1) 额外内存空间的算法解决此问题吗？
 * 
 * 
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
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function(head, k) {
    // 统计节点个数
    let n = 0;
    for (let cur = head; cur; cur = cur.next) {
        n++;
    }

    const dummy = new ListNode(0, head);
    let p0 = dummy;

    let pre = null;
    let cur = head;

    // k 个一组处理
    for (; n >= k; n -= k) {
        for (let i = 0; i < k; i++) { // 同 206、92 
            const nxt = cur.next;
            cur.next = pre; // 每次循环只修改一个 next
            pre = cur;
            cur = nxt;
        }

        // now: ⚠️
        // pre -> 这一组的 tail，也就是反转后的 head
        // cur -> 下一组的 head
        const nxt = p0.next; // 上一组的head (p0.next)，反转后就是下一组的哨兵p0
        p0.next.next = cur; // 上一组的head (p0.next)， 指向下一组的head
        p0.next = pre; // 哨兵指向反转后的尾部
        p0 = nxt; // 迭代哨兵
    }
    return dummy.next;
};
// @lc code=end

function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

/*
// @lcpr case=start
// [1,2,3,4,5]\n2\n
// @lcpr case=end

// @lcpr case=start
// [1,2,3,4,5]\n3\n
// @lcpr case=end

 */


// @lcpr-after-debug-begin
module.exports = reverseKGroup;
// @lcpr-after-debug-end