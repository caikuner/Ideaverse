/*
 * @lc app=leetcode.cn id=22 lang=javascript
 * @lcpr version=30204
 *
 * [22] 括号生成
 *
 * https://leetcode.cn/problems/generate-parentheses/description/
 *
 * algorithms
 * Medium (78.90%)
 * Likes:    3871
 * Dislikes: 0
 * Total Accepted:    1.1M
 * Total Submissions: 1.3M
 * Testcase Example:  '3'
 *
 * 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
 *
 *
 *
 * 示例 1：
 *
 * 输入：n = 3
 * 输出：["((()))","(()())","(())()","()(())","()()()"]
 *
 *
 * 示例 2：
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

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  const m = n * 2; // 全部位数
  const res = [];
  const path = Array.from({ length: m });

  // i: 固定第 i 位
  // open：固定了多少个左括号
  const dfs = (i, open) => {
    if (i === m) {
      res.push(path.join(""));
      return;
    }

    // 和全排列的区别：左括号的填写有条件限制，需要完成匹配
    // - 左括号可以填的条件：不超过半数，就一定能填
    // - 右括号可以填的条件：左括号 > 右括号
    if (open < n) {
      // (可以) 填左括号
      path[i] = "(";
      dfs(i + 1, open + 1);
    }
    if (open > i - open) {
      // (可以) 填右括号   <-- 注意⚠️
      path[i] = ")";
      dfs(i + 1, open);
    }
  };

  dfs(0, 0);
  return res;
};
// @lc code=end

/*
// @lcpr case=start
// 3\n
// @lcpr case=end

// @lcpr case=start
// 1\n
// @lcpr case=end

 */
