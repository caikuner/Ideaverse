/*
 * @lc app=leetcode.cn id=384 lang=javascript
 * @lcpr version=30204
 *
 * [384] 打乱数组
 *
 * https://leetcode.cn/problems/shuffle-an-array/description/
 *
 * algorithms
 * Medium (62.21%)
 * Likes:    365
 * Dislikes: 0
 * Total Accepted:    139.4K
 * Total Submissions: 224K
 * Testcase Example:  '["Solution","shuffle","reset","shuffle"]\n[[[1,2,3]],[],[],[]]'
 *
 * 给你一个整数数组 nums ，设计算法来打乱一个没有重复元素的数组。打乱后，数组的所有排列应该是 等可能 的。
 *
 * 实现 Solution class:
 *
 *
 * Solution(int[] nums) 使用整数数组 nums 初始化对象
 * int[] reset() 重设数组到它的初始状态并返回
 * int[] shuffle() 返回数组随机打乱后的结果
 *
 *
 *
 *
 * 示例 1：
 *
 * 输入
 * ["Solution", "shuffle", "reset", "shuffle"]
 * [[[1, 2, 3]], [], [], []]
 * 输出
 * [null, [3, 1, 2], [1, 2, 3], [1, 3, 2]]
 *
 * 解释
 * Solution solution = new Solution([1, 2, 3]);
 * solution.shuffle();    // 打乱数组 [1,2,3] 并返回结果。任何 [1,2,3]的排列返回的概率应该相同。例如，返回
 * [3, 1, 2]
 * solution.reset();      // 重设数组到它的初始状态 [1, 2, 3] 。返回 [1, 2, 3]
 * solution.shuffle();    // 随机返回数组 [1, 2, 3] 打乱后的结果。例如，返回 [1, 3, 2]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 50
 * -10^6 <= nums[i] <= 10^6
 * nums 中的所有元素都是 唯一的
 * 最多可以调用 10^4 次 reset 和 shuffle
 *
 *
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * @param {number[]} nums
 */
class Solution {
  constructor(nums) {
    this.nums = nums;
  }

  shuffle() {
    const arr = [...this.nums];
    for (let i = arr.length - 1; i > 0; i--) {
      // random in [0, i]
      const j = Math.floor(Math.random() * (i + 1));
      // swap
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  reset() {
    return [...this.nums];
  }
}

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(nums)
 * var param_1 = obj.reset()
 * var param_2 = obj.shuffle()
 */
// @lc code=end

const nums = [1, 2, 4, 3];
var obj = new Solution(nums);
console.log(obj.shuffle());
console.log(obj.reset());
