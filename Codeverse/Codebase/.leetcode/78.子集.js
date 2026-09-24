/*
 * @lc app=leetcode.cn id=78 lang=javascript
 *
 * [78] 子集
 *
 * https://leetcode.cn/problems/subsets/description/
 *
 * algorithms
 * Medium (81.37%)
 * Likes:    2318
 * Dislikes: 0
 * Total Accepted:    816.3K
 * Total Submissions: 1M
 * Testcase Example:  '[1,2,3]'
 *
 * 给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。
 *
 * 解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,2,3]
 * 输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [0]
 * 输出：[[],[0]]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 10
 * -10 <= nums[i] <= 10
 * nums 中的所有元素 互不相同
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  const n = nums.length;

  const res = [];
  const path = [];

  function dfs(i) {
    if (i === n) {
      // 得到一个合法子集；且是递归截止条件
      res.push([...path]);
      return;
    }

    // 不选nums[i], 直接跳下一个
    dfs(i + 1);

    // 选nums[i]
    path.push(nums[i]);
    dfs(i + 1);

    path.pop(); // 恢复现场
  }

  dfs(0);
  return res;
};
// @lc code=end
