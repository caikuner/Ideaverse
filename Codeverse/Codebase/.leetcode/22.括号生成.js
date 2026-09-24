/*
 * @lc app=leetcode.cn id=22 lang=javascript
 *
 * [22] 括号生成
 *
 * https://leetcode.cn/problems/generate-parentheses/description/
 *
 * algorithms
 * Medium (77.78%)
 * Likes:    3616
 * Dislikes: 0
 * Total Accepted:    867.8K
 * Total Submissions: 1.1M
 * Testcase Example:  '3'
 *
 * 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：n = 3
 * 输出：["((()))","(()())","(())()","()(())","()()()"]
 *
 *
 * 示例 2：
 *
 *
 * 输入：n = 1
 * 输出：["()"]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= n <= 8
 *
 *
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  const m = 2 * n; // 总位数
  const res = [];
  const path = [];

  // 递归填充第 i 位，用 open 参数记录当前左括号数量
  function dfs(i, open) {
    if (i === m) {
      // 得到合法的括号组合; 且结束递归
      res.push(path.join(""));
      return;
    }

    // 可以填左括号 (条件：当前左括号没用尽，就可以随意填)
    if (open < n) {
      path[i] = "(";
      dfs(i + 1, open + 1);
    }

    // 可以填右括号  (条件：⚠️ 当前左括号数量大于右括号数量)
    if (i - open < open) {
      path[i] = ")";
      dfs(i + 1, open);
    }
  }

  dfs(0, 0);
  return res;
};
// @lc code=end
