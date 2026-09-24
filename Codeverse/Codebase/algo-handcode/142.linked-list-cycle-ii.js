/*
 * @lc app=leetcode.cn id=142 lang=javascript
 * @lcpr version=30204
 *
 * [142] 环形链表 II
 *
 * https://leetcode.cn/problems/linked-list-cycle-ii/description/
 *
 * algorithms
 * Medium (61.53%)
 * Likes:    2818
 * Dislikes: 0
 * Total Accepted:    1.2M
 * Total Submissions: 1.9M
 * Testcase Example:  '[3,2,0,-4]\n1'
 *
 * 给定一个链表的头节点  head ，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。
 *
 * 如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数 pos
 * 来表示链表尾连接到链表中的位置（索引从 0 开始）。如果 pos 是 -1，则在该链表中没有环。注意：pos
 * 不作为参数进行传递，仅仅是为了标识链表的实际情况。
 *
 * 不允许修改 链表。
 *
 *
 *
 *
 *
 *
 * 示例 1：
 *
 *
 *
 * 输入：head = [3,2,0,-4], pos = 1
 * 输出：返回索引为 1 的链表节点
 * 解释：链表中有一个环，其尾部连接到第二个节点。
 *
 *
 * 示例 2：
 *
 *
 *
 * 输入：head = [1,2], pos = 0
 * 输出：返回索引为 0 的链表节点
 * 解释：链表中有一个环，其尾部连接到第一个节点。
 *
 *
 * 示例 3：
 *
 *
 *
 * 输入：head = [1], pos = -1
 * 输出：返回 null
 * 解释：链表中没有环。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 链表中节点的数目范围在范围 [0, 10^4] 内
 * -10^5 <= Node.val <= 10^5
 * pos 的值为 -1 或者链表中的一个有效索引
 *
 *
 *
 *
 * 进阶：你是否可以使用 O(1) 空间解决此题？
 *
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {
  if (!head) return null;

  let slow = head,
    fast = head;
  while (slow && fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      // 有环，找出环的位置：从开头再走一次，直到两者相遇
      let res = head;
      while (res !== slow) {
        res = res.next;
        slow = slow.next;
      }

      return res;
    }
  }
  return null;
};
// @lc code=end

/*【数学证明】
设链表共有 a+b 个节点，其中 链表头部到链表入口 有 a 个节点（不计链表入口节点）， 链表环 有 b 个节点（这里需要注意，a 和 b 是未知数）：【问题关键在于不管环形链表中走多少个循环(n*b)，都走且只走一个a，那么只需要两个指针相遇，它们步数的差值就会消掉变量a】

两指针 fast，slow 指向链表头部 head，fast 每轮走 2 步，slow 每轮走 1 步:
fast 指针走过链表末端，说明链表无环，直接返回 null;(若有环，两指针一定会相遇。因为每走 mEJAY1 轮，fast 与 slow 的间距 +1，fast 终会追上 slow)

当 fast == slow 时， 两指针在环中 第一次相遇：
  设两指针分别走了 f,s 步，则有：
  fast走了slow的2倍长度：f = 2s
  fast比slow多走了n个环的长度：f = s + nb

  解方程得，s=nb, f=2nb
  就是说，当slow与fast相遇，fast、slow指针分别走了2n、n个环的长度。那么想找到入口就不难了，只需要让slow或fast再走a步，就正好到入口处 a+nb。

那么现在，如何让slow再走a步呢，毕竟a未知？
- 再来一个辅助指针point指向head，然后和slow同步移动。显然point也是走a步到入口，所以只需要 point===alow 就说明二者同时走到了入口。

*/

/*
// @lcpr case=start
// [3,2,0,-4]\n1\n
// @lcpr case=end

// @lcpr case=start
// [1,2]\n0\n
// @lcpr case=end

// @lcpr case=start
// [1]\n-1\n
// @lcpr case=end

 */
