/*
 * @lc app=leetcode.cn id=128 lang=javascript
 *
 * [128] 最长连续序列
 *
 * https://leetcode.cn/problems/longest-consecutive-sequence/description/
 *
 * algorithms
 * Medium (51.96%)
 * Likes:    2045
 * Dislikes: 0
 * Total Accepted:    606.6K
 * Total Submissions: 1.2M
 * Testcase Example:  '[100,4,200,1,3,2]'
 *
 * 给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。
 *
 * 请你设计并实现时间复杂度为 O(n) 的算法解决此问题。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [100,4,200,1,3,2]
 * 输出：4
 * 解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。
 *
 * 示例 2：
 *
 *
 * 输入：nums = [0,3,7,2,5,8,4,6,0,1]
 * 输出：9
 *
 *
 *
 *
 * 提示：
 *
 *
 * 0
 * -10^9
 *
 *
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
  const len = nums?.length || 0;
  if (len === 0) {
    return 0;
  }

  const sortedNums = nums.toSorted((a, b) => a - b);

  let maxCount = 0;
  let curCount = 1;
  for (let i = 1; i < len; ++i) {
    if (sortedNums[i] - sortedNums[i - 1] === 1) {
      curCount++;
    } else if (sortedNums[i] - sortedNums[i - 1] === 0) {
      continue; // 跳过重复值（相当于区间有交集，仍然满足条件）
    } else {
      curCount = 1;
    }
    maxCount = Math.max(maxCount, curCount);
  }
  return maxCount;
};

// @lc code=start
/** Optimised: hashmap
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
  const len = nums?.length || 0;
  if (len === 0) {
    return 0;
  }

  const map = new Map();
  for (const num of nums) {
    map.set(num, 1); // 不需要考虑 num 重复，要求连续：可以多，不能少
  }

  for (const num of nums) {
    if (map.has(num - 1)) {
      map.set(num, 0); // 对于 num，如果存在 num-1，num-1才是较大连续区间的起始
    }
  }
  // 最终，map中为 1 的值，只剩下了所有连续区间的起始元素。这时只需要比较其中的较大值

  let maxCount = 0;
  let curCount = 0;
  for (const num of map.keys()) {
    // map 的遍历是按照顺序的 (object不是)
    if (map.get(num) === 1) {
      curCount = 1; // 起始位置，清空之前的累积值
      while (map.has(num + curCount)) {
        curCount++;
      }
    }
    maxCount = Math.max(maxCount, curCount);
  }
  return maxCount;
};
// @lc code=end

console.log(longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]));
