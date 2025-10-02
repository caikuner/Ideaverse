/*
 * @lc app=leetcode.cn id=53 lang=javascript
 *
 * [53] 最大子数组和
 *
 * https://leetcode.cn/problems/maximum-subarray/description/
 *
 * algorithms
 * Medium (55.26%)
 * Likes:    6624
 * Dislikes: 0
 * Total Accepted:    1.7M
 * Total Submissions: 3.1M
 * Testcase Example:  '[-2,1,-3,4,-1,2,1,-5,4]'
 *
 * 给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
 * 
 * 子数组 是数组中的一个连续部分。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
 * 输出：6
 * 解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：nums = [1]
 * 输出：1
 * 
 * 
 * 示例 3：
 * 
 * 
 * 输入：nums = [5,4,-1,7,8]
 * 输出：23
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= nums.length <= 10^5
 * -10^4 <= nums[i] <= 10^4
 * 
 * 
 * 
 * 
 * 进阶：如果你已经实现复杂度为 O(n) 的解法，尝试使用更为精妙的 分治法 求解。
 * 
 */
// @lc code=start
/** 动态规划，时间复杂度O(n)，空间复杂度O(1)
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
    // premax 记录前一个最大值，max 记录当前最大值 (类似滚动数组)
    let preMax = -Infinity, max = nums[0]
    for (const num of nums) {
        preMax = Math.max(preMax + num, num)
        max = Math.max(preMax, max)
    }
    return max
};
// @lc code=end



// TODO: 分治
/** 
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
};
