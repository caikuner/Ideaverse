/*
 * @lc app=leetcode.cn id=503 lang=javascript
 * @lcpr version=30204
 *
 * [503] 下一个更大元素 II
 *
 * https://leetcode.cn/problems/next-greater-element-ii/description/
 *
 * algorithms
 * Medium (68.81%)
 * Likes:    1056
 * Dislikes: 0
 * Total Accepted:    307.9K
 * Total Submissions: 447.3K
 * Testcase Example:  '[1,2,1]'
 *
 * 给定一个循环数组 nums （ nums[nums.length - 1] 的下一个元素是 nums[0] ），返回 nums 中每个元素的
 * 下一个更大元素 。
 * 
 * 数字 x 的 下一个更大的元素 是按数组遍历顺序，这个数字之后的第一个比它更大的数，这意味着你应该循环地搜索它的下一个更大的数。如果不存在，则输出 -1
 * 。
 * 
 * 
 * 
 * 示例 1:
 * 
 * 输入: nums = [1,2,1]
 * 输出: [2,-1,2]
 * 解释: 第一个 1 的下一个更大的数是 2；
 * 数字 2 找不到下一个更大的数； 
 * 第二个 1 的下一个最大的数需要循环搜索，结果也是 2。
 * 
 * 
 * 示例 2:
 * 
 * 输入: nums = [1,2,3,4,3]
 * 输出: [2,3,4,-1,4]
 * 
 * 
 * 
 * 
 * 提示:
 * 
 * 
 * 1 <= nums.length <= 10^4
 * -10^9 <= nums[i] <= 10^9
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
var nextGreaterElements = function(nums) {
    // [1,2,3,4,3]   [2,3,4,-1,4]
    // 题目要求 nums 是循环的，考虑时候可以复制一份 [nums nums]。计算时取模即可 i%n
    // 由于是考虑右边的更大数，我们从右遍历，保存最值在栈顶
    // 从右往左倒着遍历，栈中记录下一个更大元素的「候选项」。
    // 由于左边更大元素会「挡住」右边更小的元素，所以右边更小的元素是无用信息（不会成为左边元素的下一个更大元素），这会导致栈底（右边）大，栈顶（左边）小。

    const n = nums.length
    const res = Array.from({length: n}).fill(-1)

    const stk = []
    for (let i = 2 * n - 1; i>=0; i--) {
      const x = nums[i % n]
      while (stk.length && x >= stk[stk.length - 1]) {  // ⚠️ 是 x >=, 就是说相等的话我们取更左边的
        stk.pop()
      }
      // now: x < 栈顶 || 栈空。所以栈顶六寸的一定是更大的值
      if (i < n && stk.length) {
        res[i] = stk[stk.length - 1]
      }
      stk.push(x)
    }

    return res
};
// @lc code=end



/*
// @lcpr case=start
// [1,2,1]\n
// @lcpr case=end

// @lcpr case=start
// [1,2,3,4,3]\n
// @lcpr case=end

 */


// @lcpr-after-debug-begin
module.exports = nextGreaterElements;
// @lcpr-after-debug-end