/*
 * @lc app=leetcode.cn id=7 lang=javascript
 * @lcpr version=30204
 *
 * [7] 整数反转
 *
 * https://leetcode.cn/problems/reverse-integer/description/
 *
 * algorithms
 * Medium (35.62%)
 * Likes:    4092
 * Dislikes: 0
 * Total Accepted:    1.4M
 * Total Submissions: 3.9M
 * Testcase Example:  '123'
 *
 * 给你一个 32 位的有符号整数 x ，返回将 x 中的数字部分反转后的结果。
 * 
 * 如果反转后整数超过 32 位的有符号整数的范围 [−2^31,  2^31 − 1] ，就返回 0。
 * 假设环境不允许存储 64 位整数（有符号或无符号）。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 输入：x = 123
 * 输出：321
 * 
 * 
 * 示例 2：
 * 
 * 输入：x = -123
 * 输出：-321
 * 
 * 
 * 示例 3：
 * 
 * 输入：x = 120
 * 输出：21
 * 
 * 
 * 示例 4：
 * 
 * 输入：x = 0
 * 输出：0
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * -2^31 <= x <= 2^31 - 1
 * 
 * 
 */


// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
  // 数字运算，不使用辅助数组 (可以使用数组的话直接变成字符串数组反转)
  // 从尾部开始，源数字不断/10的模，去给目标数组不断去乘
  
  let res = 0
  const INT_MAX = Math.pow(2, 31) - 1
  const INT_MIN = Math.pow(-2, 31)

  while (x != 0) {
    const m = x % 10
    x = ~~(x / 10) // 注意：按位非运算~~是向 0 取整

    res = res * 10 + m
    if (res > INT_MAX || res < INT_MIN) {
      return 0
    }
  }

  return res
};
// @lc code=end


// @lcpr case=start
// 123\n
// @lcpr case=end

// @lcpr case=start
// -123\n
// @lcpr case=end

// @lcpr case=start
// 120\n
// @lcpr case=end

// @lcpr case=start
// 0\n
// @lcpr case=end


// @lcpr-after-debug-begin
module.exports = reverse;
// @lcpr-after-debug-end