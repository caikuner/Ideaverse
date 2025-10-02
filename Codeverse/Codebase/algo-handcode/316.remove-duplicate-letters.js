/*
 * @lc app=leetcode.cn id=316 lang=javascript
 * @lcpr version=30204
 *
 * [316] 去除重复字母
 *
 * https://leetcode.cn/problems/remove-duplicate-letters/description/
 *
 * algorithms
 * Medium (49.92%)
 * Likes:    1144
 * Dislikes: 0
 * Total Accepted:    160.2K
 * Total Submissions: 320.9K
 * Testcase Example:  '"bcabc"'
 *
 * 给你一个字符串 s ，请你去除字符串中重复的字母，使得每个字母只出现一次。需保证 返回结果的字典序最小（要求不能打乱其他字符的相对位置）。
 *
 *
 *
 * 示例 1：
 *
 * 输入：s = "bcabc"
 * 输出："abc"
 *
 *
 * 示例 2：
 *
 * 输入：s = "cbacdcbc"
 * 输出："acdb"
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 10^4
 * s 由小写英文字母组成
 *
 *
 *
 *
 * 注意：该题与 1081
 * https://leetcode-cn.com/problems/smallest-subsequence-of-distinct-characters
 * 相同
 *
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicateLetters = function (s) {
  // 对于 x，如果 x 前后都有 >x 的字母，那么应该用后面那个
  // 怎么知道后面还有没有？ 先 map 存一下每个字母最后一次出现的 index
  const map = new Map(); // item-最后一次出现的 index
  for (let i = 0; i < s.length; i++) {
    map.set(s[i], i);
  }

  const seen = new Set();
  const stk = [];
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (!seen.has(char)) {
      while (stk.length && char < stk[stk.length - 1] && map.get(stk[stk.length - 1]) > i) {
        // 这个栈顶元素去掉后会使字典序变小
        seen.delete(stk.pop());
      }

      stk.push(char);
      seen.add(char);
    }
  }

  // stk剩余的
  return stk.join("");
};
// @lc code=end

/*
// @lcpr case=start
// "bcabc"\n
// @lcpr case=end

// @lcpr case=start
// "cbacdcbc"\n
// @lcpr case=end

 */
