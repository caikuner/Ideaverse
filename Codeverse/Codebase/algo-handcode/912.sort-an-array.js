/*
 * @lc app=leetcode.cn id=912 lang=javascript
 * @lcpr version=30204
 *
 * [912] 排序数组
 *
 * https://leetcode.cn/problems/sort-an-array/description/
 *
 * algorithms
 * Medium (47.97%)
 * Likes:    1131
 * Dislikes: 0
 * Total Accepted:    775.1K
 * Total Submissions: 1.6M
 * Testcase Example:  '[5,2,3,1]'
 *
 * 给你一个整数数组 nums，请你将该数组升序排列。
 * 
 * 你必须在 不使用任何内置函数 的情况下解决问题，时间复杂度为 O(nlog(n))，并且空间复杂度尽可能小。
 * 
 * 
 * 
 * 
 * 
 * 
 * 示例 1：
 * 
 * 输入：nums = [5,2,3,1]
 * 输出：[1,2,3,5]
 * 
 * 
 * 示例 2：
 * 
 * 输入：nums = [5,1,1,2,0,0]
 * 输出：[0,0,1,1,2,5]
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= nums.length <= 5 * 10^4
 * -5 * 10^4 <= nums[i] <= 5 * 10^4
 * 
 * 
 */


// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */

var sortArray = function (nums) {
  if (!nums || nums.length <= 0) return nums;

  quickSort(nums, 0, nums.length - 1);
  return nums
};
function quickSort(arr, left = 0, right = arr.length - 1) {
  if (!arr || left >= right) return;

  // 分区操作，返回基准索引
  const pivotIndex = partition(arr, left, right);

  // 递归排序左右分区
  quickSort(arr, left, pivotIndex - 1);
  quickSort(arr, pivotIndex + 1, right);
}
function swap(arr, i, j) {
  if (!arr || i === j) return;
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

// 分区函数（核心）,一次分区会把一个基准值刚到排序后的正确位置
function partition(arr, left, right) {
  // 随机选择基准值（避免最坏情况），并放到最右
  const randomIndex = left + Math.floor(Math.random() * (right - left + 1));
  swap(arr, randomIndex, right);

  const pivot = arr[right]; // 也可以不随机，直接选最右

  let i = left; // 小于基准的边界指针

  for (let j = left; j < right; j++) { // 找 pivot 应该处在的位置：左边都比它小，右边都比它大
    if (arr[j] < pivot) {
      // 交换元素位置
      swap(arr, i, j);
      i++;
    }
  }

  // 将基准值放到正确位置
  swap(arr, i, right);
  return i;
}

// @lc code=end



/*
// @lcpr case=start
// [5,2,3,1]\n
// @lcpr case=end

// @lcpr case=start
// [5,1,1,2,0,0]\n
// @lcpr case=end

 */

