/*
 * @lc app=leetcode.cn id=994 lang=javascript
 *
 * [994] 腐烂的橘子
 *
 * https://leetcode.cn/problems/rotting-oranges/description/
 *
 * algorithms
 * Medium (52.31%)
 * Likes:    900
 * Dislikes: 0
 * Total Accepted:    195.8K
 * Total Submissions: 373.9K
 * Testcase Example:  '[[2,1,1],[1,1,0],[0,1,1]]'
 *
 * 在给定的 m x n 网格 grid 中，每个单元格可以有以下三个值之一：
 *
 *
 * 值 0 代表空单元格；
 * 值 1 代表新鲜橘子；
 * 值 2 代表腐烂的橘子。
 *
 *
 * 每分钟，腐烂的橘子 周围 4 个方向上相邻 的新鲜橘子都会腐烂。
 *
 * 返回 直到单元格中没有新鲜橘子为止所必须经过的最小分钟数。如果不可能，返回 -1 。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：grid = [[2,1,1],[1,1,0],[0,1,1]]
 * 输出：4
 *
 *
 * 示例 2：
 *
 *
 * 输入：grid = [[2,1,1],[0,1,1],[1,0,1]]
 * 输出：-1
 * 解释：左下角的橘子（第 2 行， 第 0 列）永远不会腐烂，因为腐烂只会发生在 4 个方向上。
 *
 *
 * 示例 3：
 *
 *
 * 输入：grid = [[0,2]]
 * 输出：0
 * 解释：因为 0 分钟时已经没有新鲜橘子了，所以答案就是 0 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * m == grid.length
 * n == grid[i].length
 * 1 <= m, n <= 10
 * grid[i][j] 仅为 0、1 或 2
 *
 *
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
  const m = grid.length;
  const n = grid[0].length;

  let fresh = 0; // 统计当前新鲜的橘子
  let q = []; // 收集可以发散腐烂的橘子的坐标
  // 初始统计
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 2) {
        q.push([i, j]);
      } else if (grid[i][j] === 1) {
        fresh++;
      }
    }
  }

  // 如果本就没有新鲜橘子，直接返回 0
  if (fresh === 0) {
    return 0;
  }

  const inArea = (grid, row, col) => {
    return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;
  };

  let res = -1;
  while (q.length) {
    // 存在可以发散腐烂的橘子
    res++; // 过去 1 分钟后的当前状态

    const tmp = q;
    q = [];
    for (const [x, y] of tmp) {
      // 腐烂四周
      for (const [i, j] of [
        [x - 1, y],
        [x + 1, y],
        [x, y - 1],
        [x, y + 1],
      ]) {
        if (inArea(grid, i, j) && grid[i][j] === 1) {
          // 访问到新鲜橘子
          grid[i][j] = 2; // 腐烂新鲜橘子
          fresh--;
          q.push([i, j]);
        }
      }
    }
  }

  // 最终如果仍有新鲜橘子返回-1；
  return fresh > 0 ? -1 : res;
};
// @lc code=end
