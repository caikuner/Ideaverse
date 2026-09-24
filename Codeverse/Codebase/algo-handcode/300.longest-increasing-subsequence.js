/*
 * @lc app=leetcode.cn id=300 lang=javascript
 * @lcpr version=30204
 *
 * [300] 最长递增子序列
 *
 * https://leetcode.cn/problems/longest-increasing-subsequence/description/
 *
 * algorithms
 * Medium (57.50%)
 * Likes:    4011
 * Dislikes: 0
 * Total Accepted:    1.3M
 * Total Submissions: 2.2M
 * Testcase Example:  '[10,9,2,5,3,7,101,18]'
 *
 * 给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。
 *
 * 子序列 是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7]
 * 的子序列。
 *
 *
 * 示例 1：
 *
 * 输入：nums = [10,9,2,5,3,7,101,18]
 * 输出：4
 * 解释：最长递增子序列是 [2,3,7,101]，因此长度为 4 。
 *
 *
 * 示例 2：
 *
 * 输入：nums = [0,1,0,3,2,3]
 * 输出：4
 *
 *
 * 示例 3：
 *
 * 输入：nums = [7,7,7,7,7,7,7]
 * 输出：1
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 2500
 * -10^4 <= nums[i] <= 10^4
 *
 *
 *
 *
 * 进阶：
 *
 *
 * 你能将算法的时间复杂度降低到 O(n log(n)) 吗?
 *
 *
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  // [10,9,2,5,3,7,101,18]，4
  const res = []; // 有序
  for (let num of nums) {
    let left = 0,
      right = res.length;
    // nlogn的复杂度，只能使用二分查找
    // 查找当前元素可以插进 res 的位置，如果更大就可以扩大 res了。
    // 最终遍历完得到的就是最长的
    while (left < right) {
      const mid = (left + right) >> 1;
      if (res[mid] < num) left = mid + 1;
      else right = mid;
    }

    // find: num
    res[left] = num;
  }

  return res.length;
};
// @lc code=end

/*
// @lcpr case=start
// [10,9,2,5,3,7,101,18]\n
// @lcpr case=end

// @lcpr case=start
// [0,1,0,3,2,3]\n
// @lcpr case=end

// @lcpr case=start
// [7,7,7,7,7,7,7]\n
// @lcpr case=end

 */

// @lcpr-after-debug-begin
module.exports = lengthOfLIS;
// @lcpr-after-debug-end
