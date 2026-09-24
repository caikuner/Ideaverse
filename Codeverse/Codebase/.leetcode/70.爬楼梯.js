/*
 * @lc app=leetcode.cn id=70 lang=javascript
 *
 * [70] 爬楼梯
 *
 * https://leetcode.cn/problems/climbing-stairs/description/
 *
 * algorithms
 * Easy (54.64%)
 * Likes:    3557
 * Dislikes: 0
 * Total Accepted:    1.5M
 * Total Submissions: 2.8M
 * Testcase Example:  '2'
 *
 * 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
 *
 * 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：n = 2
 * 输出：2
 * 解释：有两种方法可以爬到楼顶。
 * 1. 1 阶 + 1 阶
 * 2. 2 阶
 *
 * 示例 2：
 *
 *
 * 输入：n = 3
 * 输出：3
 * 解释：有三种方法可以爬到楼顶。
 * 1. 1 阶 + 1 阶 + 1 阶
 * 2. 1 阶 + 2 阶
 * 3. 2 阶 + 1 阶
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= n <= 45
 *
 *
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  if (n <= 2) {
    return n;
  }

  // 如果最后一步爬 1 阶，那之前就有 pre 种方法;如果最后一步爬两节，那之前就有 pre_pre 种方法。根据加法原理相加，得到最后一步爬 n 阶的所有方法。

  let pre_pre = 1;
  let pre = 2;

  let res = -1;
  for (let i = 3; i <= n; i++) {
    const cur = pre_pre + pre;

    res = Math.max(res, cur);
    pre_pre = pre;
    pre = cur;
  }
  return res;
};
// @lc code=end
