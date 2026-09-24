/*
 * @lc app=leetcode.cn id=73 lang=javascript
 *
 * [73] 矩阵置零
 *
 * https://leetcode.cn/problems/set-matrix-zeroes/description/
 *
 * algorithms
 * Medium (66.14%)
 * Likes:    1045
 * Dislikes: 0
 * Total Accepted:    350.1K
 * Total Submissions: 528.9K
 * Testcase Example:  '[[1,1,1],[1,0,1],[1,1,1]]'
 *
 * 给定一个 m x n 的矩阵，如果一个元素为 0 ，则将其所在行和列的所有元素都设为 0 。请使用 原地 算法。
 *
 *
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：matrix = [[1,1,1],[1,0,1],[1,1,1]]
 * 输出：[[1,0,1],[0,0,0],[1,0,1]]
 *
 *
 * 示例 2：
 *
 *
 * 输入：matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
 * 输出：[[0,0,0,0],[0,4,5,0],[0,3,1,0]]
 *
 *
 *
 *
 * 提示：
 *
 *
 * m == matrix.length
 * n == matrix[0].length
 * 1 <= m, n <= 200
 * -2^31 <= matrix[i][j] <= 2^31 - 1
 *
 *
 *
 *
 * 进阶：
 *
 *
 * 一个直观的解决方案是使用  O(mn) 的额外空间，但这并不是一个好的解决方案。
 * 一个简单的改进方案是使用 O(m + n) 的额外空间，但这仍然不是最好的解决方案。
 * 你能想出一个仅使用常量空间的解决方案吗？
 *
 *
 */

// 追问：注意空间占用  O(mn) -> O(m + n) -> O(1)

/** 使用两个标记数组/hash表，来标记行和列是否需要置零
 * 时间复杂度：O(m*n)，空间复杂度：O(m+n)
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function (matrix) {
  const m = matrix.length;
  const n = matrix[0].length;

  const rows = new Array(m),
    cols = new Array(n);
  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      if (matrix[i][j] === 0) {
        rows[i] = true;
        cols[j] = true;
      }
    }
  }

  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      if (rows[i] === true || cols[j] === true) {
        matrix[i][j] = 0;
      }
    }
  }
};

// @lc code=start
/** 原地标记，想只用O(1)只能修改原数组，在原数组上标记
 * 时间复杂度：O(m*n)，空间复杂度：O(1)
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function (matrix) {
  const m = matrix.length;
  const n = matrix[0].length;

  // 使用第一行、第一列的元素做标记。实际上相当于压缩，把所有点是否为 0 的情况压缩到两条边上。
  // 但要注意：在后续的标记过程中会丢失信息,第一行第一列是否元贝有 0 的信息会丢失，所以需要提前保存，置0过程也要在最后单独做

  // 标记第一行第一列的原信息
  let firstRowHasZero = false,
    firstColHasZero = false;
  for (let i = 0; i < m; ++i) {
    if (matrix[i][0] === 0) {
      firstColHasZero = true;
    }
  }
  for (let j = 0; j < n; ++j) {
    if (matrix[0][j] === 0) {
      firstRowHasZero = true;
    }
  }

  // 将每个元素的 0 信息压缩到第一行第一列
  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      if (matrix[i][j] === 0) {
        matrix[i][0] = 0;
        matrix[0][j] = 0;
      }
    }
  }

  // i=0,j=0 的元素需要作为标志，不能在遍历时候同步置0，否则乱了
  for (let i = 1; i < m; ++i) {
    for (let j = 1; j < n; ++j) {
      if (matrix[i][0] === 0 || matrix[0][j] === 0) {
        matrix[i][j] = 0;
      }
    }
  }

  // i=0,j=0 的元素单独置0
  for (let i = 0; i < m; ++i) {
    if (firstColHasZero) {
      matrix[i][0] = 0;
    }
  }
  for (let j = 0; j < n; ++j) {
    if (firstRowHasZero) {
      matrix[0][j] = 0;
    }
  }
};
// @lc code=end
