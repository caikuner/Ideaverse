/*
 * @lc app=leetcode.cn id=54 lang=javascript
 *
 * [54] 螺旋矩阵
 *
 * https://leetcode.cn/problems/spiral-matrix/description/
 *
 * algorithms
 * Medium (51.08%)
 * Likes:    1704
 * Dislikes: 0
 * Total Accepted:    540.1K
 * Total Submissions: 1.1M
 * Testcase Example:  '[[1,2,3],[4,5,6],[7,8,9]]'
 *
 * 给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
 * 输出：[1,2,3,6,9,8,7,4,5]
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
 * 输出：[1,2,3,4,8,12,11,10,9,5,6,7]
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * m == matrix.length
 * n == matrix[i].length
 * 1 
 * -100 
 * 
 * 
 */

// @lc code=start
/** 设定好四个边界，沿着四条边遍历即可。转移转向时候处理边界+-，以及判断是否越界即可
 * 时间复杂度O(mn), 空间复杂度 O(1)
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
    const m = matrix.length ?? 0
    const n = matrix?.[0].length ?? 0

    if (!m || !n) return []
    const res = []

    let l = 0, r = n - 1, t = 0, b = m - 1;
    while (true) {
        for (let i = l; i <= r; i++) {
            res.push(matrix[t][i])
        }
        t += 1
        if (t > b) break

        for (let i = t; i <= b; i++) {
            res.push(matrix[i][r])
        }
        r -= 1
        if (l > r) break


        for (let i = r; i >= l; i--) {
            res.push(matrix[b][i])
        }
        b -= 1
        if (t > b) break


        for (let i = b; i >= t; i--) {
            res.push(matrix[i][l])
        }
        l += 1
        if (l > r) break
    }
    return res

};
// @lc code=end

