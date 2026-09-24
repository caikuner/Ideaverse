/*
 * @lc app=leetcode.cn id=32 lang=javascript
 * @lcpr version=30204
 *
 * [32] 最长有效括号
 *
 * https://leetcode.cn/problems/longest-valid-parentheses/description/
 *
 * algorithms
 * Hard (39.91%)
 * Likes:    2724
 * Dislikes: 0
 * Total Accepted:    580.8K
 * Total Submissions: 1.5M
 * Testcase Example:  '"(()"'
 *
 * 给你一个只包含 '(' 和 ')' 的字符串，找出最长有效（格式正确且连续）括号子串的长度。
 *
 *
 *
 *
 *
 * 示例 1：
 *
 * 输入：s = "(()"
 * 输出：2
 * 解释：最长有效括号子串是 "()"
 *
 *
 * 示例 2：
 *
 * 输入：s = ")()())"
 * 输出：4
 * 解释：最长有效括号子串是 "()()"
 *
 *
 * 示例 3：
 *
 * 输入：s = ""
 * 输出：0
 *
 *
 *
 *
 * 提示：
 *
 *
 * 0 <= s.length <= 3 * 10^4
 * s[i] 为 '(' 或 ')'
 *
 *
 *
 *
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function (s) {
  // )()())  4
  // ()()) 4
  if (!s) return 0;

  let res = 0;
  const stk = [-1];
  // 由于只需要求长度，保存 index 即可。
  // 为了求长度，还需要存一个左边界
  // 从 0 开始左边界不好处理，先入一个-1

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      // push stk
      stk.push(i);
    } else {
      // pop a left, to pair
      stk.pop();
      if (stk.length) {
        res = Math.max(res, i - stk[stk.length - 1]);
      } else {
        // 更新左边界
        stk.push(i);
      }
    }
  }

  return res;
};
// @lc code=end

/*
// @lcpr case=start
// "(()"\n
// @lcpr case=end

// @lcpr case=start
// ")()())"\n
// @lcpr case=end

// @lcpr case=start
// ""\n
// @lcpr case=end

 */
