/*
 * @lc app=leetcode.cn id=74 lang=javascript
 *
 * [74] 搜索二维矩阵
 *
 * https://leetcode.cn/problems/search-a-2d-matrix/description/
 *
 * algorithms
 * Medium (49.81%)
 * Likes:    932
 * Dislikes: 0
 * Total Accepted:    418.1K
 * Total Submissions: 839.2K
 * Testcase Example:  '[[1,3,5,7],[10,11,16,20],[23,30,34,60]]\n3'
 *
 * 给你一个满足下述两条属性的 m x n 整数矩阵：
 * 
 * 
 * 每行中的整数从左到右按非严格递增顺序排列。
 * 每行的第一个整数大于前一行的最后一个整数。
 * 
 * 
 * 给你一个整数 target ，如果 target 在矩阵中，返回 true ；否则，返回 false 。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
 * 输出：true
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
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
 * 1 <= m, n <= 100
 * -10^4 <= matrix[i][j], target <= 10^4
 * 
 * 
 */

/** 由于每一行都是有序的，且每一行比前一行都大，所以只需要找到所在行，然后在每一行中查找即可
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
    const m = matrix.length, n = matrix[0].length;

    let l = 0, r = n - 1

    for (let i = 0; i < m; i++) {
        // 找到所在行
        if (matrix[i][l] > target) break
        if (matrix[i][r] < target) continue

        // 在所在行中二分查找
        while (l <= r) {
            const mid = Math.floor((l + r) / 2)

            if (matrix[i][mid] > target) r = mid - 1
            else if (matrix[i][mid] < target) l = mid + 1
            else return true
        }
    }
    return false
};



// @lc code=start
/** 由于特殊的规则，每个点在行内最小，在列内也最小。
/** 考察右上顶点：在本行内最大，和下一行比最小，因此比较右顶点可以界定 target 在哪一行。
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
    const m = matrix.length, n = matrix[0].length;

    let i = 0, j = n - 1

    while (i < m && j >= 0) {
        if (matrix[i][j] > target) j--
        else if (matrix[i][j] < target) i++
        else return true
    }
    return false
};
// @lc code=end

