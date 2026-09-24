/*
 * @lc app=leetcode.cn id=415 lang=javascript
 * @lcpr version=30204
 *
 * [415] 字符串相加
 *
 * https://leetcode.cn/problems/add-strings/description/
 *
 * algorithms
 * Easy (54.84%)
 * Likes:    878
 * Dislikes: 0
 * Total Accepted:    376.3K
 * Total Submissions: 686.2K
 * Testcase Example:  '"11"\n"123"'
 *
 * 给定两个字符串形式的非负整数 num1 和num2 ，计算它们的和并同样以字符串形式返回。
 *
 * 你不能使用任何內建的用于处理大整数的库（比如 BigInteger）， 也不能直接将输入的字符串转换为整数形式。
 *
 *
 *
 * 示例 1：
 *
 * 输入：num1 = "11", num2 = "123"
 * 输出："134"
 *
 *
 * 示例 2：
 *
 * 输入：num1 = "456", num2 = "77"
 * 输出："533"
 *
 *
 * 示例 3：
 *
 * 输入：num1 = "0", num2 = "0"
 * 输出："0"
 *
 *
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= num1.length, num2.length <= 10^4
 * num1 和num2 都只包含数字 0-9
 * num1 和num2 都不包含任何前导零
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
var addStrings = function (num1, num2) {
  let str1 = num1.toString(),
    str2 = num2.toString();
  const n1 = str1.length,
    n2 = str2.length;

  let i = n1 - 1,
    j = n2 - 1; // 从后往前开始
  let carry = 0;
  let res = [];

  while (i >= 0 || j >= 0 || carry) {
    const x = i >= 0 ? parseInt(str1[i], 10) : 0;
    const y = j >= 0 ? parseInt(str2[j], 10) : 0;

    const sum_i = x + y + carry;
    carry = Math.floor(sum_i / 10);
    res.push(sum_i % 10);

    i--;
    j--;
  }

  return res.reverse().join("");
};
// @lc code=end

var addStrings = function (num1, num2) {
  let str1 = num1.toString(),
    str2 = num2.toString();

  const n = Math.max(str1.length, str2.length);
  str1 = str1.padStart(n, 0); // 填充前导 0，对齐位数到较大值n
  str2 = str2.padStart(n, 0);

  let res = [];
  let carry = 0;
  for (let i = n - 1; i >= 0; i--) {
    const sumi = parseInt(str1[i], 10) + parseInt(str2[i], 10) + carry;
    carry = Math.floor(sumi / 10);
    res.push(sumi % 10);
  }
  // 最后一位可能有进位
  if (carry) {
    res.push(carry);
  }

  return res.reverse().join("");
};

/*
// @lcpr case=start
// "11"\n"123"\n
// @lcpr case=end

// @lcpr case=start
// "456"\n"77"\n
// @lcpr case=end

// @lcpr case=start
// "0"\n"0"\n
// @lcpr case=end

 */
