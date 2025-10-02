/*
 * @lc app=leetcode.cn id=15 lang=javascript
 * @lcpr version=30204
 *
 * [15] 三数之和
 *
 * https://leetcode.cn/problems/3sum/description/
 *
 * algorithms
 * Medium (39.54%)
 * Likes:    7516
 * Dislikes: 0
 * Total Accepted:    2.4M
 * Total Submissions: 6M
 * Testcase Example:  '[-1,0,1,2,-1,-4]'
 *
 * 给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j !=
 * k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。请你返回所有和为 0 且不重复的三元组。
 * 
 * 注意：答案中不可以包含重复的三元组。
 * 
 * 
 * 
 * 
 * 
 * 示例 1：
 * 
 * 输入：nums = [-1,0,1,2,-1,-4]
 * 输出：[[-1,-1,2],[-1,0,1]]
 * 解释：
 * nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0 。
 * nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0 。
 * nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0 。
 * 不同的三元组是 [-1,0,1] 和 [-1,-1,2] 。
 * 注意，输出的顺序和三元组的顺序并不重要。
 * 
 * 
 * 示例 2：
 * 
 * 输入：nums = [0,1,1]
 * 输出：[]
 * 解释：唯一可能的三元组和不为 0 。
 * 
 * 
 * 示例 3：
 * 
 * 输入：nums = [0,0,0]
 * 输出：[[0,0,0]]
 * 解释：唯一可能的三元组和为 0 。
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 3 <= nums.length <= 3000
 * -10^5 <= nums[i] <= 10^5
 * 
 * 
 */


// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    const n = nums.length
    nums.sort((a, b) => a - b)     // 要求返回三元组的值，而不是下标。所以进行排序不影响

    const res = []
    for (let i = 0; i < nums.length; i++) {
      if (i > 0 && nums[i] === nums[i-1]) continue  // 找过不用再找
      if (nums[i] > 0) return res

      let j = i + 1, k = n - 1
      while(j < k) {
        const sum = nums[i] + nums[j] + nums[k]
        if (sum > 0) {
          k--
        } else if (sum < 0) {
          j++
        } else {
          res.push([nums[i], nums[j], nums[k]])
          // 继续找，这一轮（找nums[i]的）可能还有
          j++
          k--

          // 跳过重复的值 ⭐️
          while(j < k && j > 0 && nums[j] === nums[j - 1]) {
            j++
          }
          while(j < k && k < n - 1 && nums[k] === nums[k + 1]) {
            k++
          }
        }
      }
    }

    return res
};
// @lc code=end



/*
// @lcpr case=start
// [-1,0,1,2,-1,-4]\n
// @lcpr case=end

// @lcpr case=start
// [0,1,1]\n
// @lcpr case=end

// @lcpr case=start
// [0,0,0]\n
// @lcpr case=end

 */


// @lcpr-after-debug-begin
module.exports = threeSum;
// @lcpr-after-debug-end