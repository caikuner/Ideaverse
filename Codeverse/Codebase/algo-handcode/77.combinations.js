/*
 * @lc app=leetcode.cn id=77 lang=javascript
 * @lcpr version=30204
 *
 * [77] 组合
 *
 * https://leetcode.cn/problems/combinations/description/
 *
 * algorithms
 * Medium (77.70%)
 * Likes:    1776
 * Dislikes: 0
 * Total Accepted:    901.3K
 * Total Submissions: 1.2M
 * Testcase Example:  '4\n2'
 *
 * 给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。
 *
 * 你可以按 任何顺序 返回答案。
 *
 *
 *
 * 示例 1：
 *
 * 输入：n = 4, k = 2
 * 输出：
 * [
 * ⁠ [2,4],
 * ⁠ [3,4],
 * ⁠ [2,3],
 * ⁠ [1,2],
 * ⁠ [1,3],
 * ⁠ [1,4],
 * ]
 *
 * 示例 2：
 *
 * 输入：n = 1, k = 1
 * 输出：[[1]]
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= n <= 20
 * 1 <= k <= n
 *
 *
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
  // [1,2,3,...,n], k 个数组合
  const arr = Array.from({ length: n })
    .fill(0)
    .map((_, i) => i + 1); // 转成数组好考虑
  if (n < k) return [];
  if (n === k) return [arr];

  const res = [];
  const path = Array.from({ length: k });

  // i:处理arr第 i 个数；x：已经选了 x 个
  const dfs = (i, x) => {
    if (x === k) {
      res.push([...path]);
      return;
    }

    if (x < k) {
      // 选这一个：没选满就都可以选
      path[x] = arr[i];
      dfs(i + 1, x + 1);

      path.pop(); // 恢复现场

      // 不选这一个：剩余元素多于未选元素，否则选不满
      if (n - i - 1 >= k - x) {
        dfs(i + 1, x);
      }

    }
  };

  dfs(0, 0);
  return res;
};
// @lc code=end

/*
// @lcpr case=start
// 4\n2\n
// @lcpr case=end

// @lcpr case=start
// 1\n1\n
// @lcpr case=end

 */

// @lcpr-after-debug-begin
module.exports = combine;
// @lcpr-after-debug-end
