/*
 * @lc app=leetcode.cn id=47 lang=javascript
 * @lcpr version=30204
 *
 * [47] 全排列 II
 *
 * https://leetcode.cn/problems/permutations-ii/description/
 *
 * algorithms
 * Medium (66.74%)
 * Likes:    1719
 * Dislikes: 0
 * Total Accepted:    668.1K
 * Total Submissions: 1M
 * Testcase Example:  '[1,1,2]'
 *
 * 给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。
 *
 *
 *
 * 示例 1：
 *
 * 输入：nums = [1,1,2]
 * 输出：
 * [[1,1,2],
 * ⁠[1,2,1],
 * ⁠[2,1,1]]
 *
 *
 * 示例 2：
 *
 * 输入：nums = [1,2,3]
 * 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 8
 * -10 <= nums[i] <= 10
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
// 相比全排列，如何去排除重复
// 1. 保存结果时判断该排列是否已保存过；
// 2. 固定某一位数字时候，保证该位不重复：
//    - 最简单的就是先排序，这样就保证这一位和前一位不重复就行

var permuteUnique = function (nums) {
  const n = nums.length;
  const res = [];

  const path = [];
  const used = Array.from({ length: n }).fill(false);

  function backtrack(i) {
    if (i === n) {
      res.push([...path]);
      return;
    }

    for (let j = 0; j < n; j++) {
      if (!used[j]) {
        // 排除重复
        if(j >0 && nums[j] === nums[j-1] && used[j-1]) {
          continue
        }

        path[i] = nums[j]
        used[j] = true

        backtrack(i+1)

        // 恢复现场
        used[j] = false
      }
    }
  }

  nums.sort((a, b) => a - b);
  backtrack(0);
  return res;
};
// @lc code=end

/*
// @lcpr case=start
// [1,1,2]\n
// @lcpr case=end

// @lcpr case=start
// [1,2,3]\n
// @lcpr case=end

 */
