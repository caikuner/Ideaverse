/*
 * @lc app=leetcode.cn id=41 lang=javascript
 *
 * [41] 缺失的第一个正数
 *
 * https://leetcode.cn/problems/first-missing-positive/description/
 *
 * algorithms
 * Hard (44.58%)
 * Likes:    2117
 * Dislikes: 0
 * Total Accepted:    392.8K
 * Total Submissions: 879K
 * Testcase Example:  '[1,2,0]'
 *
 * 给你一个未排序的整数数组 nums ，请你找出其中没有出现的最小的正整数。
 * 请你实现时间复杂度为 O(n) 并且只使用常数级别额外空间的解决方案。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：nums = [1,2,0]
 * 输出：3
 * 解释：范围 [1,2] 中的数字都在数组中。
 * 
 * 示例 2：
 * 
 * 
 * 输入：nums = [3,4,-1,1]
 * 输出：2
 * 解释：1 在数组中，但 2 没有。
 * 
 * 示例 3：
 * 
 * 
 * 输入：nums = [7,8,9,11,12]
 * 输出：1
 * 解释：最小的正数 1 没有出现。
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= nums.length <= 10^5
 * -2^31 <= nums[i] <= 2^31 - 1
 * 
 * 
 */

/** 先排序，然后遍历找正数，由于排序了，时间复杂度O(nlogn)不符合要求，空间复杂度O(1)
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function (nums) {
    nums.sort((a, b) => a - b)

    let min = 1
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === min) {
            min++
        } else if (nums[i] < min) {
            continue
        } else {
            return min
        }
    }
    // 遍历到最后都没有找到，说明数组中的元素都是按照顺序来的. (最后一个循环 min 已经+1了)
    return min
};



/** 哈希表，时间复杂度 O(n)，空间复杂度O(n)不符合要求
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function (nums) {
    // nums中最多能放下 n 个数，即使全是正数，从 1 开始，也只能放下 1～n,所以可以建立哈希表，从 1 开始查询 1～n 哪个不在哈希表内
    const n = nums.length
    const hashSet = new Set()
    for (let i = 0; i < n; ++i) {
        hashSet.add(nums[i])
    }

    for (let i = 1; i <= n; ++i) {
        if (!hashSet.has(i)) {
            return i
        }
        continue
    }
    // 遍历到最后都没有找到
    return n + 1
};



// @lc code=start
/** 原地哈希，把每个正数逐个放在对应的索引上，注意会在原地修改数组，时间复杂度 O(n)，空间复杂度O(1)
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function (nums) {
    // 数组原地做哈西对应：把正数 1 放在索引 0，正数 2 放在索引 1，以此类推，把正数 n 放在索引 n-1。(最多只能放到索引 n-1 个位置，因为数组长度为 n)

    const swap = (nums, i, j) => {
        const temp = nums[i]
        nums[i] = nums[j]
        nums[j] = temp
    }

    const n = nums.length
    for (let i = 0; i < n; ++i) { 
        while (nums[i] > 0 && nums[i] <= n && nums[i] !== nums[nums[i] - 1]) {
            // 交换位置, 且可能需要多次交换位置，所以是 while
            swap(nums, i, nums[i] - 1)
        }
    }

    // 遍历数组，如果当前索引与它的值不对应，说明它是缺失的
    for (let i = 0; i < n; ++i) {
        if (nums[i] !== i + 1) {
            return i + 1
        }
    }
    // 遍历到最后都没有找到
    return n + 1
};

// @lc code=end



