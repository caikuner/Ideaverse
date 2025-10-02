/*
 * @lc app=leetcode.cn id=240 lang=javascript
 *
 * [240] 搜索二维矩阵 II
 *
 * https://leetcode.cn/problems/search-a-2d-matrix-ii/description/
 *
 * algorithms
 * Medium (53.92%)
 * Likes:    1486
 * Dislikes: 0
 * Total Accepted:    475.5K
 * Total Submissions: 881.9K
 * Testcase Example:  '[[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]]\n' +
  '5'
 *
 * 编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值 target 。该矩阵具有以下特性：
 * 
 * 
 * 每行的元素从左到右升序排列。
 * 每列的元素从上到下升序排列。
 * 
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：matrix =
 * [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]],
 * target = 5
 * 输出：true
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：matrix =
 * [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]],
 * target = 20
 * 输出：false
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * m == matrix.length
 * n == matrix[i].length
 * 1 <= n, m <= 300
 * -10^9 <= matrix[i][j] <= 10^9
 * 每行的所有元素从左到右升序排列
 * 每列的所有元素从上到下升序排列
 * -10^9 <= target <= 10^9
 * 
 * 
 */


/* 
 74.搜索矩阵 1：从上到下，每一行组成的元素总体上单调。 
 
 本题中，考察左上顶点：在行内最小，在列内也最小，没什么用。
 再考察右上顶点：在行内最大，在列内最小。因此右顶点所在的行列元素总体上单调，这就和搜索矩阵 1 类似了。
*/

// @lc code=start
/** 
 * 时间复杂度：O(m + n)，空间复杂度：O(1)。
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
    const m = matrix.length, n = matrix[0].length;

    let i = 0, j = n - 1;  // 右上顶点
    while (i < m && j >= 0) {
        if (matrix[i][j] < target) {
            i++;
        } else if (matrix[i][j] > target) {
            j--;
        } else {
            return true;
        }
    }
    return false
};
// @lc code=end

