/*
 * @lc app=leetcode.cn id=46 lang=javascript
 * @lcpr version=30204
 *
 * [46] 全排列
 *
 * https://leetcode.cn/problems/permutations/description/
 *
 * algorithms
 * Medium (80.48%)
 * Likes:    3126
 * Dislikes: 0
 * Total Accepted:    1.4M
 * Total Submissions: 1.7M
 * Testcase Example:  '[1,2,3]'
 *
 * 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。
 *
 *
 *
 * 示例 1：
 *
 * 输入：nums = [1,2,3]
 * 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 *
 *
 * 示例 2：
 *
 * 输入：nums = [0,1]
 * 输出：[[0,1],[1,0]]
 *
 *
 * 示例 3：
 *
 * 输入：nums = [1]
 * 输出：[[1]]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 6
 * -10 <= nums[i] <= 10
 * nums 中的所有整数 互不相同
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
var permute = function (nums) {
  const n = nums.length;
  const res = [];

  const path = [];
  const used = Array.from({ length: n }).fill(false);

  function backtrack(i) {
    // 找第 i 个元素
    if (i === n) {
      res.push([...path]);
      return;
    }

    for (let j = 0; j < n; j++) {
      // 未排列过
      if (!used[j]) {
        // (j 使用时)
        path[i] = nums[j];
        used[j] = true;

        backtrack(i + 1);

        // 恢复现场 (j 不使用时)  - 只需要 false
        path.pop();
        used[j] = false;
      }
    }
  }

  backtrack(0);
  return res;
};
// @lc code=end

console.log(permute(["a", "b", "c", "d"]));

/*
// @lcpr case=start
// [1,2,3]\n
// @lcpr case=end

// @lcpr case=start
// [0,1]\n
// @lcpr case=end

// @lcpr case=start
// [1]\n
// @lcpr case=end

 */
