/*
 * @lc app=leetcode.cn id=560 lang=javascript
 *
 * [560] 和为 K 的子数组
 *
 * https://leetcode.cn/problems/subarray-sum-equals-k/description/
 *
 * algorithms
 * Medium (44.09%)
 * Likes:    2306
 * Dislikes: 0
 * Total Accepted:    439.6K
 * Total Submissions: 997.3K
 * Testcase Example:  '[1,1,1]\n2'
 *
 * 给你一个整数数组 nums 和一个整数 k ，请你统计并返回 该数组中和为 k 的子数组的个数 。
 * 
 * 子数组是数组中元素的连续非空序列。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：nums = [1,1,1], k = 2
 * 输出：2
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：nums = [1,2,3], k = 3
 * 输出：2
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= nums.length <= 2 * 10^4
 * -1000 <= nums[i] <= 1000
 * -10^7 <= k <= 10^7
 * 
 * 
 */

// 思考
// 注意题目要求是: 连续非空子数组；如果不要求连续，那就是：全排列 和为 k 的排列个数
// 注意隐含条件: 元素可以为负数，比如：1 3 -1，其中 [3]、[1,3,-1]都可以组成k=3

// 前缀和的必要条件： 连续
// 思考时类比  数列求和


/**
 * 暴力解法 - 时间 n^2，超时
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
    if (nums.length === 0) {
        return 0
    }
    if (nums.length === 1) {
        return k === nums[0] ? 1 : 0;
    }

    let res = 0;
    for (let i = 0; i < nums.length; ++i) {
        let sum = 0
        for (let j = i; j < nums.length; ++j) {
            sum += nums[j]
            if (sum === k) {
                res++
            }
        }
    }
    return res
};


/**
 * 前缀和数组 - 时间还是 n^2，会超时
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
    if (!nums || nums.length === 0) {
        return 0
    }

    const len = nums.length;
    const preSum = new Array(len + 1)
    preSum[0] = 0
    for (let i = 0; i < len; ++i) {
        preSum[i + 1] = preSum[i] + nums[i]
    }

    let res = 0
    for (let i = 0; i < nums.length; ++i) {
        for (let j = i; j < len; ++j) {
            if (preSum[j + 1] - preSum[i] === k) {
                // i~j 的连续子区间的和 （两数列和的差）
                res++
            }
        }
    }
    return res
};



// @lc code=start
/**
 * 前缀和+Hash
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
    if (!nums || nums.length === 0) {
        return 0
    }
    // 前面方法第二个循环会超时，用 hashmap 替代。
    // 设Sum(i) 为 0～i 元素之和，欲求区间[i,j]之和为 k，即转化为求 Sum(j) - Sum(i) = k。
    // 再推一步得，Sum(j) - k = Sum(i) - Sum(0),其中 Sum(0)=0。
    // 即使用指针 i 遍历数组，检查是否存在 Sum(j) - k 的前缀和，如果存在，说明存在 0～当前位置 i 的连续子区间。
    const map = new Map()
    map.set(0, 1) // 初始值。前缀和sum[0]=0单独统计, 可以这样理解：空数组的子区间和为 0 (当然题目要求非空)。不设为 1 的话，无法表示单元素： [1] 是符合 k=1的子区间，因为这时候前缀和无法减去一个东西

    let res = 0
    let sum = 0
    for (const num of nums) {
        sum += num
        // 注意先更新 res，避免 k=0 时误多加 1
        res += (map.get(sum - k) ?? 0)

        map.set(sum, (map.get(sum) ?? 0) + 1)
    }
    return res
};
// @lc code=end

console.log(subarraySum([1, 2, 3, 4, -1], 3))
console.log(subarraySum([1, 2, -1], 0))
console.log(subarraySum([0], 0))




// @after-stub-for-debug-begin
module.exports = subarraySum;
// @after-stub-for-debug-end