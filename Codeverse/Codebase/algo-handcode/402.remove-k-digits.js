/*
 * @lc app=leetcode.cn id=402 lang=javascript
 * @lcpr version=30204
 *
 * [402] 移掉 K 位数字
 *
 * https://leetcode.cn/problems/remove-k-digits/description/
 *
 * algorithms
 * Medium (32.52%)
 * Likes:    1120
 * Dislikes: 0
 * Total Accepted:    183.9K
 * Total Submissions: 565.4K
 * Testcase Example:  '"1432219"\n3'
 *
 * 给你一个以字符串表示的非负整数 num 和一个整数 k ，移除这个数中的 k 位数字，使得剩下的数字最小。请你以字符串形式返回这个最小的数字。
 *
 *
 * 示例 1 ：
 *
 * 输入：num = "1432219", k = 3
 * 输出："1219"
 * 解释：移除掉三个数字 4, 3, 和 2 形成一个新的最小的数字 1219 。
 *
 *
 * 示例 2 ：
 *
 * 输入：num = "10200", k = 1
 * 输出："200"
 * 解释：移掉首位的 1 剩下的数字为 200. 注意输出不能有任何前导零。
 *
 *
 * 示例 3 ：
 *
 * 输入：num = "10", k = 2
 * 输出："0"
 * 解释：从原数字移除所有的数字，剩余为空就是 0 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= k <= num.length <= 10^5
 * num 仅由若干位数字（0 - 9）组成
 * 除了 0 本身之外，num 不含任何前导零
 *
 *
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * @param {string} num
 * @param {number} k
 * @return {string}
 */
var removeKdigits = function (num, k) {
  // 1432219, 1219
  const stk = [];
  for (const digit of num) {
    // stk 留下较小的，一共最多弹出 k 次
    while (k && stk.length > 0 && digit < stk[stk.length - 1]) {
      stk.pop();
      k -= 1;
    }
    stk.push(digit);
  }

  // 如果没弹出 k 次，继续弹出
  for (; k > 0; --k) {
    stk.pop();
  }

  let res = "";
  // 去除前导 0，不能转成数字，因为可能会精度溢出
  let isZeroLeading = true;
  for (const digit of stk) {
    if (isZeroLeading && digit === "0") {
      continue;
    }
    isZeroLeading = false;
    res += digit;
  }
  return res === "" ? "0" : res;
};
// @lc code=end

/*
// @lcpr case=start
// "1432219"\n3\n
// @lcpr case=end

// @lcpr case=start
// "10200"\n1\n
// @lcpr case=end

// @lcpr case=start
// "10"\n2\n
// @lcpr case=end

 */

// @lcpr-after-debug-begin
module.exports = removeKdigits;
// @lcpr-after-debug-end
