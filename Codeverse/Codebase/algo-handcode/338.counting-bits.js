/*
 * @lc app=leetcode.cn id=338 lang=javascript
 * @lcpr version=30204
 *
 * [338] 比特位计数
 *
 * https://leetcode.cn/problems/counting-bits/description/
 *
 * algorithms
 * Easy (79.08%)
 * Likes:    1383
 * Dislikes: 0
 * Total Accepted:    371.9K
 * Total Submissions: 470.2K
 * Testcase Example:  '2'
 *
 * 给你一个整数 n ，对于 0 <= i <= n 中的每个 i ，计算其二进制表示中 1 的个数 ，返回一个长度为 n + 1 的数组 ans
 * 作为答案。
 * 
 * 
 * 
 * 
 * 
 * 示例 1：
 * 
 * 输入：n = 2
 * 输出：[0,1,1]
 * 解释：
 * 0 --> 0
 * 1 --> 1
 * 2 --> 10
 * 
 * 
 * 示例 2：
 * 
 * 输入：n = 5
 * 输出：[0,1,1,2,1,2]
 * 解释：
 * 0 --> 0
 * 1 --> 1
 * 2 --> 10
 * 3 --> 11
 * 4 --> 100
 * 5 --> 101
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 0 <= n <= 10^5
 * 
 * 
 * 
 * 
 * 进阶：
 * 
 * 
 * 很容易就能实现时间复杂度为 O(n log n) 的解决方案，你可以在线性时间复杂度 O(n) 内用一趟扫描解决此问题吗？
 * 你能不使用任何内置函数解决此问题吗？（如，C++ 中的 __builtin_popcount ）
 * 
 * 
 * 
 * 
 */


// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function(n) {
    // 5: 101  4: 100 3:011  2:010  1: 001
    // i: 只需要把 i>>1 中，最前面的 1 左移一位，不需要增加 1的个数。
    // 再考虑下 >>1 除不尽的情况，最低位是 0/1 

    const res = Array.from({length: n + 1}).fill(0)

    for (let i = 1; i<=n; i++) {
      res[i] = res[i >> 1] + (i & 1)
    }
    return res
};
// @lc code=end



/*
// @lcpr case=start
// 2\n
// @lcpr case=end

// @lcpr case=start
// 5\n
// @lcpr case=end

 */

