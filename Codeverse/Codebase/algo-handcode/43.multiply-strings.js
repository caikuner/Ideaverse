/*
 * @lc app=leetcode.cn id=43 lang=javascript
 * @lcpr version=30204
 *
 * [43] 字符串相乘
 *
 * https://leetcode.cn/problems/multiply-strings/description/
 *
 * algorithms
 * Medium (44.74%)
 * Likes:    1435
 * Dislikes: 0
 * Total Accepted:    389.7K
 * Total Submissions: 870.7K
 * Testcase Example:  '"2"\n"3"'
 *
 * 给定两个以字符串形式表示的非负整数 num1 和 num2，返回 num1 和 num2 的乘积，它们的乘积也表示为字符串形式。
 *
 * 注意：不能使用任何内置的 BigInteger 库或直接将输入转换为整数。
 *
 *
 *
 * 示例 1:
 *
 * 输入: num1 = "2", num2 = "3"
 * 输出: "6"
 *
 * 示例 2:
 *
 * 输入: num1 = "123", num2 = "456"
 * 输出: "56088"
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= num1.length, num2.length <= 200
 * num1 和 num2 只能由数字组成。
 * num1 和 num2 都不包含任何前导零，除了数字0本身。
 *
 *
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function (num1, num2) {
  // 11 11  121
  // 和字符串相加类似，关键在于处理进位

  if (!num1 || !num2 || num1 === "0" || num2 === "0") return "0";
  const m = num1.length,
    n = num2.length;
  const res = Array.from({ length: m + n }).fill(0);

  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      // 从低位开始计算，放进 res 并处理进位
      const mul = num1[i] * num2[j];

      const p1 = i + j,
        p2 = i + j + 1; // 要放的位置：高位、低位
      const sum = mul + res[p2]; // 加上上次的进位
      res[p2] = sum % 10;
      res[p1] += Math.floor(sum / 10); // 注意是+=，很多轮都可能有这一位
    }
  }
  // 处理前导 0：没有产生足够的进位时，res 会有前导 0
  const result = res.join("").replace(/^0+/, "");
  return result;
};
// @lc code=end

/*
// @lcpr case=start
// "2"\n"3"\n
// @lcpr case=end

// @lcpr case=start
// "123"\n"456"\n
// @lcpr case=end

 */
