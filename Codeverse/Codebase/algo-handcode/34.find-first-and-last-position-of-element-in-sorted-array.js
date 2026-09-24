/*
 * @lc app=leetcode.cn id=34 lang=javascript
 * @lcpr version=30204
 *
 * [34] 在排序数组中查找元素的第一个和最后一个位置
 *
 * https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/description/
 *
 * algorithms
 * Medium (45.38%)
 * Likes:    3031
 * Dislikes: 0
 * Total Accepted:    1.3M
 * Total Submissions: 2.8M
 * Testcase Example:  '[5,7,7,8,8,10]\n8'
 *
 * 给你一个按照非递减顺序排列的整数数组 nums，和一个目标值 target。请你找出给定目标值在数组中的开始位置和结束位置。
 *
 * 如果数组中不存在目标值 target，返回 [-1, -1]。
 *
 * 你必须设计并实现时间复杂度为 O(log n) 的算法解决此问题。
 *
 *
 *
 * 示例 1：
 *
 * 输入：nums = [5,7,7,8,8,10], target = 8
 * 输出：[3,4]
 *
 * 示例 2：
 *
 * 输入：nums = [5,7,7,8,8,10], target = 6
 * 输出：[-1,-1]
 *
 * 示例 3：
 *
 * 输入：nums = [], target = 0
 * 输出：[-1,-1]
 *
 *
 *
 * 提示：
 *
 *
 * 0 <= nums.length <= 10^5
 * -10^9 <= nums[i] <= 10^9
 * nums 是一个非递减数组
 * -10^9 <= target <= 10^9
 *
 *
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
// 要求复杂度为 O(log n)，只能二分查找，和 704、快排 一样
// 如何取中值， (left+right)/2  => 更安全的写法 left + (right - left) / 2
// 只记忆一种开区间写法

// lowerBound 使用二分查找，返回最小满足 nums[i]>= target 的下标 i
// 如果数组为空，或者所有数都 < target，则返回 nums.length
// 要求 nums 是非递减的，即 nums[i] <= nums[i + 1]
function lowerBound(nums, target) {
  let left = -1,
    right = nums.length; // 开区间 (left, right)
  while (left + 1 < right) {
    // 区间不为空
    // 循环不变量：
    // nums[left] < target
    // nums[right] >= target
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] >= target) {
      right = mid; // 范围缩小到 (left, mid)
    } else {
      left = mid; // 范围缩小到 (mid, right)
    }
  }
  // 循环结束后 left+1 = right
  // 此时 nums[left] < target 而 nums[right] >= target
  // 所以 right 就是第一个 >= target 的元素下标
  return right;
}
var searchRange = function (nums, target) {
  const start = lowerBound(nums, target);

  if (start === nums.length || nums[start] !== target) {
    return [-1, -1];
  }

  // 问：如何理解 end = lowerBound(nums, target + 1) - 1 这段代码？
  // 答：要想找到 ≤target 的最后一个数，无需单独再写一个二分。我们可以先找到这个数的右边相邻数字，也就是 >target 的第一个数。
  // 在所有数都是整数的前提下，>target 等价于 ≥target+1，这样就可以复用我们已经写好的二分函数了，即 lowerBound(nums, target + 1)，算出这个数的下标后，将其减一，就得到 ≤target 的最后一个数的下标。
  const end = lowerBound(nums, target + 1) - 1;
  return [start, end];
};
// @lc code=end

console.log(searchRange([1, 3, 5, 7], 5));
/*
// @lcpr case=start
// [5,7,7,8,8,10]\n8\n
// @lcpr case=end

// @lcpr case=start
// [5,7,7,8,8,10]\n6\n
// @lcpr case=end

// @lcpr case=start
// []\n0\n
// @lcpr case=end

 */
