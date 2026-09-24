/*
 * @lc app=leetcode.cn id=238 lang=javascript
 *
 * [238] 除自身以外数组的乘积
 *
 * https://leetcode.cn/problems/product-of-array-except-self/description/
 *
 * algorithms
 * Medium (75.53%)
 * Likes:    1782
 * Dislikes: 0
 * Total Accepted:    448K
 * Total Submissions: 592.6K
 * Testcase Example:  '[1,2,3,4]'
 *
 * 给你一个整数数组 nums，返回 数组 answer ，其中 answer[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积 。
 *
 * 题目数据 保证 数组 nums之中任意元素的全部前缀元素和后缀的乘积都在  32 位 整数范围内。
 *
 * 请 不要使用除法，且在 O(n) 时间复杂度内完成此题。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: nums = [1,2,3,4]
 * 输出: [24,12,8,6]
 *
 *
 * 示例 2:
 *
 *
 * 输入: nums = [-1,1,0,-3,3]
 * 输出: [0,0,9,0,0]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 2 <= nums.length <= 10^5
 * -30 <= nums[i] <= 30
 * 保证 数组 nums之中任意元素的全部前缀元素和后缀的乘积都在  32 位 整数范围内
 *
 *
 *
 *
 * 进阶：你可以在 O(1) 的额外空间复杂度内完成这个题目吗？（ 出于对空间复杂度分析的目的，输出数组 不被视为 额外空间。）
 *
 */

// 最简单的，算出所有数的乘积，然后遍历数组，除掉每个数  (但 0 为除数时候无法处理；且题目不允许出现除法)
//
/** 左右乘积列表缓存
 * 时间复杂度 O(n)
 * 空间复杂度 O(n), 使用了两个 n 列表
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  const n = nums.length;

  const lMulti = new Array(n);
  lMulti[0] = 1;
  for (let i = 1; i < n; ++i) {
    lMulti[i] = lMulti[i - 1] * nums[i - 1];
  }

  const rMulti = new Array(n);
  rMulti[n - 1] = 1;
  for (let j = n - 2; j >= 0; --j) {
    rMulti[j] = rMulti[j + 1] * nums[j + 1];
  }

  const res = new Array(n);
  for (let i = 0; i < n; ++i) {
    res[i] = lMulti[i] * rMulti[i];
  }
  return res;
};

// @lc code=start
/** 滚动相乘：直接在原数组上相乘，用常量滚动保存上一个乘积
 * 时间复杂度 O(n)
 * 空间复杂度 O(1), 只有常数个变量
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  const n = nums.length;
  const res = new Array(n);

  // 第一轮先保存左乘积
  let lMulti = 1;
  res[0] = lMulti;
  for (let i = 1; i < n; ++i) {
    res[i] = nums[i - 1] * lMulti;
    lMulti *= nums[i - 1];
  }

  // 第二轮与右相乘，得到结果
  let rMulti = 1;
  for (let j = n - 1; j >= 0; --j) {
    res[j] = res[j] * rMulti;
    rMulti *= nums[j];
  }

  return res;
};
// @lc code=end
