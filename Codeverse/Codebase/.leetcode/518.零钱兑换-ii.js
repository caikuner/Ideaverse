/*
 * @lc app=leetcode.cn id=518 lang=javascript
 *
 * [518] 零钱兑换 II
 *
 * https://leetcode.cn/problems/coin-change-ii/description/
 *
 * algorithms
 * Medium (71.44%)
 * Likes:    1309
 * Dislikes: 0
 * Total Accepted:    339.1K
 * Total Submissions: 474.3K
 * Testcase Example:  '5\n[1,2,5]'
 *
 * 给你一个整数数组 coins 表示不同面额的硬币，另给一个整数 amount 表示总金额。
 *
 * 请你计算并返回可以凑成总金额的硬币组合数。如果任何硬币组合都无法凑出总金额，返回 0 。
 *
 * 假设每一种面额的硬币有无限个。
 *
 * 题目数据保证结果符合 32 位带符号整数。
 *
 *
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：amount = 5, coins = [1, 2, 5]
 * 输出：4
 * 解释：有四种方式可以凑成总金额：
 * 5=5
 * 5=2+2+1
 * 5=2+1+1+1
 * 5=1+1+1+1+1
 *
 *
 * 示例 2：
 *
 *
 * 输入：amount = 3, coins = [2]
 * 输出：0
 * 解释：只用面额 2 的硬币不能凑成总金额 3 。
 *
 *
 * 示例 3：
 *
 *
 * 输入：amount = 10, coins = [10]
 * 输出：1
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * 1
 * coins 中的所有值 互不相同
 * 0
 *
 *
 */

// @lc code=start
/** 回溯，超时
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function (amount, coins) {
  const n = coins.length;
  let res = 0;

  function dfs(i, target) {
    if (i === n || target < 0) {
      return;
    }
    if (target === 0) {
      // 找到合法组合; 由于没有负数和 0，不会再有组合，可以结束递归
      res++;
      return;
    }

    // 不选当前元素
    dfs(i + 1, target);

    // 选当前元素 (注意可以重复选)
    dfs(i, target - coins[i]);
  }

  dfs(0, amount);

  return res;
};
// @lc code=end
