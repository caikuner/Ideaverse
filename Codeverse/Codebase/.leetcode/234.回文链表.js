/*
 * @lc app=leetcode.cn id=234 lang=javascript
 *
 * [234] 回文链表
 *
 * https://leetcode.cn/problems/palindrome-linked-list/description/
 *
 * algorithms
 * Easy (54.43%)
 * Likes:    1904
 * Dislikes: 0
 * Total Accepted:    745.9K
 * Total Submissions: 1.4M
 * Testcase Example:  '[1,2,2,1]'
 *
 * 给你一个单链表的头节点 head ，请你判断该链表是否为回文链表。如果是，返回 true ；否则，返回 false 。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：head = [1,2,2,1]
 * 输出：true
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：head = [1,2]
 * 输出：false
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 链表中节点数目在范围[1, 10^5] 内
 * 0 <= Node.val <= 9
 * 
 * 
 * 
 * 
 * 进阶：你能否用 O(n) 时间复杂度和 O(1) 空间复杂度解决此题？
 * 
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/** 1.转成数组用双指针：  O(n) 时间复杂度、 O(n) 空间复杂度
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
    const cache = [];
    let cur = head;
    while (cur !== null) {
        cache.push(cur.val);
        cur = cur.next;
    }

    let i = 0, j = cache.length - 1;
    while (i <= j && cache[i] === cache[j]) {
        i++
        j--
    }
    return i < j ? false : true;
};

// 2. 完全反转链表，同时遍历两个链表比大小，时间复杂度 O(n)，空间复杂度 O(n)

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/** 3.原地修改链表： 要想 O(1) 空间复杂度，必须原地修改链表
 * @param {ListNode} head
 * @return {boolean}
 */

var isPalindrome = function (head) {
    // 先找到 1/2 处，然后同时向左、右遍历比较。为了能向左，临时加 prev 指针，注意最后要还原
    head.prev = null;
    let slow = head, fast = head;

    while (fast !== null && fast.next !== null && fast.next.next !== null) {
        const temp = slow;
        slow = slow.next;
        slow.prev = temp

        fast = fast.next.next;
    }

    // 处理中间节点
    let left = slow, right = slow.next;
    if (fast.next === null) {
        // 奇数个节点，中间节点不需要比较
        left = slow.prev;
        right = slow.next;
    }

    // 左右遍历比较
    while (left !== null && right !== null && left.val === right.val) {
        left = left.prev;
        right = right.next;
    }

    // 还原 prev
    let cur = head;
    while (cur !== null) {
        delete cur.prev
        cur = cur.next
    }

    return left === null && right === null
};
// @lc code=end