// 给定两个链表形式的数字，对其求和，并以链表形式返回

class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

// 链表翻转
function reverseLinkedList(head) {
    let prev = null;
    while (head) {
        let next = head.next; // 暂存下一个节点
        head.next = prev;     // 当前节点指向前一个
        prev = head;          // 前移
        head = next;          // 继续遍历
    }
    return prev; // 新的头节点
}

// 主函数：链表求和，结果以链表返回
function sumLinkedList(l1, l2) {
  // 反转后从低位计算
  l1 = reverseLinkedList(l1)
  l2 = reverseLinkedList(l2)
  
  const dummy = new ListNode(-1, null)
  let cur = dummy

  let carry = 0

  while(l1 || l2 || carry) {
    let sum = carry
    if (l1) {
      sum += l1.val
      l1 = l1.next
    }
    if (l2) {
      sum += l2.val
      l2 = l2.next
    }

    cur.next = new ListNode(sum % 10)
    carry = Math.floor(sum / 10)

    cur = cur.next
  }

  return reverseLinkedList(dummy.next)
}

// 测试用例
let L1 = new ListNode(5, new ListNode(6, new ListNode(2, new ListNode(3, new ListNode(7)))));
let L2 = new ListNode(1, new ListNode(7, new ListNode(0, new ListNode(9, new ListNode(2)))));
let result = sumLinkedList(L1, L2);

let arr = [];
while (result) {
    arr.push(result.val);
    result = result.next;
}
console.log(arr); // [7,3,3,2,9]
