/*
 * @lc app=leetcode.cn id=54 lang=javascript
 * @lcpr version=30204
 *
 * [54] 螺旋矩阵
 *
 * https://leetcode.cn/problems/spiral-matrix/description/
 *
 * algorithms
 * Medium (53.71%)
 * Likes:    1943
 * Dislikes: 0
 * Total Accepted:    764.6K
 * Total Submissions: 1.4M
 * Testcase Example:  '[[1,2,3],[4,5,6],[7,8,9]]'
 *
 * 给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
 * 输出：[1,2,3,6,9,8,7,4,5]
 * 
 * 
 * 示例 2：
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
 * 1 <= m, n <= 10
 * -100 <= matrix[i][j] <= 100
 * 
 * 
 */


// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
  if (matrix.length === 0 || matrix[0].length === 0) return []  
  const m = matrix.length, n = matrix[0].length
  const res = []

  let top = 0, bottom = m - 1, left = 0, right = n - 1
  while (top <= bottom && left <= right) {
    for (let i = left; i <= right; i++) {
        res.push(matrix[top][i])
    }
    top++

    for(let i = top; i<= bottom; i++) {
      res.push(matrix[i][right])
    }
    right--

    for(let i = right; i >= left && top <= bottom; i--) {
      // 注意判断 top <= bottom，因为之前 top++后可能越界
      res.push(matrix[bottom][i])
    }
    bottom--

    for (let i = bottom; i>= top && left <= right; i--) {
      // 注意判断 left <= right，因为之前 right--后可能越界
      res.push(matrix[i][left])
    }
    left++
  }

  return res
    
};
// @lc code=end



/*
// @lcpr case=start
// [[1,2,3],[4,5,6],[7,8,9]]\n
// @lcpr case=end

// @lcpr case=start
// [[1,2,3,4],[5,6,7,8],[9,10,11,12]]\n
// @lcpr case=end

 */


// @lcpr-after-debug-begin
module.exports = spiralOrder;
// @lcpr-after-debug-end