/*
 * @lc app=leetcode.cn id=31 lang=javascript
 * @lcpr version=30204
 *
 * [31] 下一个排列
 *
 * https://leetcode.cn/problems/next-permutation/description/
 *
 * algorithms
 * Medium (41.08%)
 * Likes:    2701
 * Dislikes: 0
 * Total Accepted:    643K
 * Total Submissions: 1.6M
 * Testcase Example:  '[1,2,3]'
 *
 * 整数数组的一个 排列  就是将其所有成员以序列或线性顺序排列。
 *
 *
 * 例如，arr = [1,2,3] ，以下这些都可以视作 arr 的排列：[1,2,3]、[1,3,2]、[3,1,2]、[2,3,1] 。
 *
 *
 * 整数数组的 下一个排列 是指其整数的下一个字典序更大的排列。更正式地，如果数组的所有排列根据其字典顺序从小到大排列在一个容器中，那么数组的 下一个排列
 * 就是在这个有序容器中排在它后面的那个排列。如果不存在下一个更大的排列，那么这个数组必须重排为字典序最小的排列（即，其元素按升序排列）。
 *
 *
 * 例如，arr = [1,2,3] 的下一个排列是 [1,3,2] 。
 * 类似地，arr = [2,3,1] 的下一个排列是 [3,1,2] 。
 * 而 arr = [3,2,1] 的下一个排列是 [1,2,3] ，因为 [3,2,1] 不存在一个字典序更大的排列。
 *
 *
 * 给你一个整数数组 nums ，找出 nums 的下一个排列。
 *
 * 必须 原地 修改，只允许使用额外常数空间。
 *
 *
 *
 * 示例 1：
 *
 * 输入：nums = [1,2,3]
 * 输出：[1,3,2]
 *
 *
 * 示例 2：
 *
 * 输入：nums = [3,2,1]
 * 输出：[1,2,3]
 *
 *
 * 示例 3：
 *
 * 输入：nums = [1,1,5]
 * 输出：[1,5,1]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 100
 * 0 <= nums[i] <= 100
 *
 *
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// 讲解：https://leetcode.cn/problems/next-permutation/solutions/3621022/jiao-ni-cong-ling-kai-shi-si-kao-zhe-ti-9qfrq/

var nextPermutation = function (nums) {
  // 1 3 5 5 4 2
  const n = nums.length;
  let pos = -1; // 从右往前找出第一个 x，使得其右边都是比它大的。显然，右边是单调减的

  for (let i = n - 1; i >= 0; i--) {
    if (nums[i - 1] < nums[i]) {
      pos = i - 1;
      break
    }
  }

  // 特别的，如果找不出 pos，说明 nums 单调减，就是最大的排列。只需 reverse 得到最小排列即可
  if (pos === -1) {
    nums.reverse()
    return
  }

  // 从其右边单调减的数据中，找出一个最小的 比他大的数。相互交换
  for (let i = n - 1; i > pos; i--) {
    if (nums[i] > nums[pos]) {
      swap(nums, i, pos);
      break;
    }
  }

  // 交换后的右侧数据，需要重新排一个最小的。由于其仍然单调减，所以只需要 reverse
  reverse(nums, pos + 1, n - 1);

  function swap(nums, i, j) { // 原地交换
    const temp = nums[j]
    nums[j] = nums[i]
    nums[i] = temp
  }
  function reverse(nums, l, r){ // 原地reverse
    while(l < r) {
      swap(nums, l, r)
      l++
      r--
    }
  }
};
// @lc code=end

/*
// @lcpr case=start
// [1,2,3]\n
// @lcpr case=end

// @lcpr case=start
// [3,2,1]\n
// @lcpr case=end

// @lcpr case=start
// [1,1,5]\n
// @lcpr case=end


// @lcpr case=start
// [5,4,7,5,3,2]\n
// @lcpr case=end

 */

// @lcpr-after-debug-begin
module.exports = nextPermutation;
// @lcpr-after-debug-end