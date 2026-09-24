/*
 * @lc app=leetcode.cn id=56 lang=javascript
 *
 * [56] 合并区间
 *
 * https://leetcode.cn/problems/merge-intervals/description/
 *
 * algorithms
 * Medium (49.90%)
 * Likes:    2294
 * Dislikes: 0
 * Total Accepted:    837.2K
 * Total Submissions: 1.7M
 * Testcase Example:  '[[1,3],[2,6],[8,10],[15,18]]'
 *
 * 以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi]
 * 。请你合并所有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
 * 输出：[[1,6],[8,10],[15,18]]
 * 解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
 *
 *
 * 示例 2：
 *
 *
 * 输入：intervals = [[1,4],[4,5]]
 * 输出：[[1,5]]
 * 解释：区间 [1,4] 和 [4,5] 可被视为重叠区间。
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= intervals.length <= 10^4
 * intervals[i].length == 2
 * 0 <= starti <= endi <= 10^4
 *
 *
 */

// @lcpr-template-start

// @lcpr-template-end

// @lc code=start
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  // [[1,3],[2,6],[8,10],[15,18]]
  // [[1,6],[8,10],[15,18]]
  intervals.sort((a, b) => a[0] - b[0]);

  const res = [];
  let count = -1;
  for (let i = 0; i < intervals.length; ++i) {
    if (i === 0) {
      res.push(intervals[i]);
      count++;
      continue;
    }
    if (res[count][1] >= intervals[i][0]) {
      // 当前结果区间的尾部 与 遍历值的头有交集，就可以合并，直接替换当前区间的尾即可（由于尾部大小没有顺序，取个较大值）
      res[count][1] = Math.max(intervals[i][1], res[count][1]);
    } else {
      res.push(intervals[i]);
      count++;
    }
  }
  return res;
};
// @lc code=end
