/*
 * @lc app=leetcode.cn id=20 lang=javascript
 * @lcpr version=30204
 *
 * [20] 有效的括号
 *
 * https://leetcode.cn/problems/valid-parentheses/description/
 *
 * algorithms
 * Easy (44.90%)
 * Likes:    4741
 * Dislikes: 0
 * Total Accepted:    2.2M
 * Total Submissions: 4.9M
 * Testcase Example:  '"()"'
 *
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
 *
 * 有效字符串需满足：
 *
 *
 * 左括号必须用相同类型的右括号闭合。
 * 左括号必须以正确的顺序闭合。
 * 每个右括号都有一个对应的相同类型的左括号。
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "()"
 *
 * 输出：true
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "()[]{}"
 *
 * 输出：true
 *
 *
 * 示例 3：
 *
 *
 * 输入：s = "(]"
 *
 * 输出：false
 *
 *
 * 示例 4：
 *
 *
 * 输入：s = "([])"
 *
 * 输出：true
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 10^4
 * s 仅由括号 '()[]{}' 组成
 *
 *
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  if (!s || !s.length || s.length % 2 !== 0) return false;

  // ([{}])
  const pairs = new Map([
    ["}", "{"],
    ["]", "["],
    [")", "("],
  ]);

  const stk = [];
  for (let i = 0; i < s.length; i++) {
    if (pairs.has(s[i])) {
      // 右括号：检查栈顶的左括号是否和这个匹配
      if (stk.length && stk.pop() === pairs.get(s[i])) {
        continue;
      } else {
        return false;
      }
    } else {
      // 左括号：入栈
      stk.push(s[i]);
    }
  }

  // 栈中的括号必须清空
  return stk.length === 0;
};
// @lc code=end

/*
// @lcpr case=start
// "()"\n
// @lcpr case=end

// @lcpr case=start
// "()[]{}"\n
// @lcpr case=end

// @lcpr case=start
// "(]"\n
// @lcpr case=end

// @lcpr case=start
// "([])"\n
// @lcpr case=end

 */
