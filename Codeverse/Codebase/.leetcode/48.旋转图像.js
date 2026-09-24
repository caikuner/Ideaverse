/*
 * @lc app=leetcode.cn id=48 lang=javascript
 *
 * [48] 旋转图像
 *
 * https://leetcode.cn/problems/rotate-image/description/
 *
 * algorithms
 * Medium (76.09%)
 * Likes:    1870
 * Dislikes: 0
 * Total Accepted:    583.5K
 * Total Submissions: 765.5K
 * Testcase Example:  '[[1,2,3],[4,5,6],[7,8,9]]'
 *
 * 给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度。
 *
 * 你必须在 原地 旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要 使用另一个矩阵来旋转图像。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
 * 输出：[[7,4,1],[8,5,2],[9,6,3]]
 *
 *
 * 示例 2：
 *
 *
 * 输入：matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
 * 输出：[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
 *
 *
 *
 *
 * 提示：
 *
 *
 * n == matrix.length == matrix[i].length
 * 1 <= n <= 20
 * -1000 <= matrix[i][j] <= 1000
 *
 *
 *
 *
 */

/** 借助辅助矩阵
 * 时间复杂度：O(n^2)， 空间复杂度：O(n^2)
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
  const n = matrix.length;
  const temp = JSON.parse(JSON.stringify(matrix));

  for (let i = 0; i < n; ++i) {
    for (let j = 0; j < n; ++j) {
      matrix[j][n - 1 - i] = temp[i][j]; // 旋转后，[i][j] -> [j][n - 1 - i]
    }
  }
};

/** 旋转 90 度，四个角点正好完成一次位置循环
 * 时间复杂度：O(n^2)， 空间复杂度：O(1)
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
  const n = matrix.length;

  for (let i = 0; i < Math.floor(n / 2); i++) {
    for (let j = 0; j < Math.floor((n + 1) / 2); j++) {
      // 注意：有一个循环要过中间，以遍历到奇数矩阵的中间值
      const temp = matrix[i][j];
      matrix[i][j] = matrix[n - 1 - j][i];
      matrix[n - 1 - j][i] = matrix[n - 1 - i][n - 1 - j];
      matrix[n - 1 - i][n - 1 - j] = matrix[j][n - 1 - i];
      matrix[j][n - 1 - i] = temp;
    }
  }
};

// @lc code=start
/** 顺旋转90 度  == 上下翻转 + 沿着 左斜线 45 度 \ 翻转
 * 时间复杂度：O(n^2)， 空间复杂度：O(1)
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
  const n = matrix.length;

  for (let i = 0; i < Math.floor(n / 2); i++) {
    for (let j = 0; j < n; j++) {
      const temp = matrix[i][j];
      matrix[i][j] = matrix[n - 1 - i][j];
      matrix[n - 1 - i][j] = temp;
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      const temp = matrix[i][j];
      matrix[i][j] = matrix[j][i];
      matrix[j][i] = temp;
    }
  }
};
// @lc code=end
