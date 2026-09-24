/*
 * @lc app=leetcode.cn id=442 lang=javascript
 *
 * [442] 数组中重复的数据
 *
 * https://leetcode.cn/problems/find-all-duplicates-in-an-array/description/
 *
 * algorithms
 * Medium (75.20%)
 * Likes:    779
 * Dislikes: 0
 * Total Accepted:    127.4K
 * Total Submissions: 169.4K
 * Testcase Example:  '[4,3,2,7,8,2,3,1]'
 *
 * 给你一个长度为 n 的整数数组 nums ，其中 nums 的所有整数都在范围 [1, n] 内，且每个整数出现 一次 或 两次 。请你找出所有出现
 * 两次 的整数，并以数组形式返回。
 *
 * 你必须设计并实现一个时间复杂度为 O(n) 且仅使用常量额外空间的算法解决此问题。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [4,3,2,7,8,2,3,1]
 * 输出：[2,3]
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [1,1,2]
 * 输出：[1]
 *
 *
 * 示例 3：
 *
 *
 * 输入：nums = [1]
 * 输出：[]
 *
 *
 *
 *
 * 提示：
 *
 *
 * n == nums.length
 * 1 <= n <= 10^5
 * 1 <= nums[i] <= n
 * nums 中的每个元素出现 一次 或 两次
 *
 *
 */

// 要求： 时间O(n), 空间O(1)

// 相似：41.缺失的第一个正数

// @lc code=start
/** 原地哈希： 索引 0-n-1放置 1-n 所有数；其中重复即置为相反数，用 <0 表示重复
 * @param {number[]} nums
 * @return {number[]}
 */
var findDuplicates = function (nums) {
  const res = [];
  for (const num of nums) {
    const index = Math.abs(num) - 1; // 把数字 i 放到索引 i-1 上 （由于使用了相反数表示重复，需要取绝对值）
    if (nums[index] > 0) {
      nums[index] = -nums[index]; // 出现第一次
    } else {
      res.push(index + 1); // 出现第二次
    }
  }
  return res;
};
// @lc code=end
