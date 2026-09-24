/*
 * @lc app=leetcode.cn id=14 lang=javascript
 * @lcpr version=30204
 *
 * [14] 最长公共前缀
 *
 * https://leetcode.cn/problems/longest-common-prefix/description/
 *
 * algorithms
 * Easy (44.68%)
 * Likes:    3348
 * Dislikes: 0
 * Total Accepted:    1.5M
 * Total Submissions: 3.4M
 * Testcase Example:  '["flower","flow","flight"]'
 *
 * 编写一个函数来查找字符串数组中的最长公共前缀。
 *
 * 如果不存在公共前缀，返回空字符串 ""。
 *
 *
 *
 * 示例 1：
 *
 * 输入：strs = ["flower","flow","flight"]
 * 输出："fl"
 *
 *
 * 示例 2：
 *
 * 输入：strs = ["dog","racecar","car"]
 * 输出：""
 * 解释：输入不存在公共前缀。
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= strs.length <= 200
 * 0 <= strs[i].length <= 200
 * strs[i] 如果非空，则仅由小写英文字母组成
 *
 *
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  if (!strs || strs.length === 0) return "";
  if (strs.length === 1) return strs[0];
  const n = Math.min(...strs.map((s) => s.length));

  const res = [];
  for (let i = 0; i < n; i++) {
    const target = strs[0][i];
    for (let j = 1; j < strs.length; j++) {
      if (strs[j][i] !== target) {
        return res.join("");
      }
    }
    // target 全部相同
    res.push(target);
  }
  return res.join("");
};
// @lc code=end

longestCommonPrefix(["flower", "flow", "flight"]);
console.log(longestCommonPrefix(["ac", "cd"]));

/*
// @lcpr case=start
// ["flower","flow","flight"]\n
// @lcpr case=end

// @lcpr case=start
// ["dog","racecar","car"]\n
// @lcpr case=end

 */

// @lcpr-after-debug-begin
module.exports = longestCommonPrefix;
// @lcpr-after-debug-end
