/*
 * @lc app=leetcode.cn id=394 lang=javascript
 * @lcpr version=30204
 *
 * [394] 字符串解码
 *
 * https://leetcode.cn/problems/decode-string/description/
 *
 * algorithms
 * Medium (60.03%)
 * Likes:    2004
 * Dislikes: 0
 * Total Accepted:    464K
 * Total Submissions: 772.1K
 * Testcase Example:  '"3[a]2[bc]"'
 *
 * 给定一个经过编码的字符串，返回它解码后的字符串。
 *
 * 编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。注意 k 保证为正整数。
 *
 * 你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。
 *
 * 此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 k ，例如不会出现像 3a 或 2[4] 的输入。
 *
 *
 *
 * 示例 1：
 *
 * 输入：s = "3[a]2[bc]"
 * 输出："aaabcbc"
 *
 *
 * 示例 2：
 *
 * 输入：s = "3[a2[c]]"
 * 输出："accaccacc"
 *
 *
 * 示例 3：
 *
 * 输入：s = "2[abc]3[cd]ef"
 * 输出："abcabccdcdcdef"
 *
 *
 * 示例 4：
 *
 * 输入：s = "abc3[cd]xyz"
 * 输出："abccdcdcdxyz"
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 30
 * s 由小写英文字母、数字和方括号 '[]' 组成
 * s 保证是一个 有效 的输入。
 * s 中所有整数的取值范围为 [1, 300]
 *
 *
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function (s) {
  const stk = [];
  let count = 0; // 当前段的次数
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (char >= 0 && char <= 9) {
      count = count * 10 + Number(char);
    } else if (char === "[") {
      // 把当前段的次数入栈并重置次数
      stk.push(count);
      count = 0;
      stk.push(char);
    } else if (char === "]") {
      // 处理当前段的重复字符
      let chars = [];
      while (stk[stk.length - 1] !== "[") {
        chars.unshift(stk.pop());
      }
      // [ 没用了弹出
      stk.pop();
      // 写入字符
      const repeatCount = stk.pop();
      stk.push(chars.join("").repeat(repeatCount));
    } else {
      stk.push(char);
    }
  }
  return stk.join("");
};
// @lc code=end

/*
// @lcpr case=start
// "3[a]2[bc]"\n
// @lcpr case=end

// @lcpr case=start
// "3[a2[c]]"\n
// @lcpr case=end

// @lcpr case=start
// "2[abc]3[cd]ef"\n
// @lcpr case=end

// @lcpr case=start
// "abc3[cd]xyz"\n
// @lcpr case=end

// @lcpr case=start
// "100[leetcode]"\n
// @lcpr case=end
 */

// @lcpr-after-debug-begin
module.exports = decodeString;
// @lcpr-after-debug-end
