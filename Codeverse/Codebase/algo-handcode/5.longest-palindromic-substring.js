/*
 * @lc app=leetcode.cn id=5 lang=javascript
 * @lcpr version=30204
 *
 * [5] 最长回文子串
 *
 * https://leetcode.cn/problems/longest-palindromic-substring/description/
 *
 * algorithms
 * Medium (39.24%)
 * Likes:    7727
 * Dislikes: 0
 * Total Accepted:    2M
 * Total Submissions: 5.2M
 * Testcase Example:  '"babad"'
 *
 * 给你一个字符串 s，找到 s 中最长的 回文 子串。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 输入：s = "babad"
 * 输出："bab"
 * 解释："aba" 同样是符合题意的答案。
 * 
 * 
 * 示例 2：
 * 
 * 输入：s = "cbbd"
 * 输出："bb"
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= s.length <= 1000
 * s 仅由数字和英文字母组成
 * 
 * 
 */


// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    const expandAroundCenter = function(s, l, r) {
      // 向外扩散窗口，直至不等或者越界
      while(l>=0 && r < s.length && s[l] === s[r]) {
        l--
        r++
      }
      return [l+1, r-1]
    }

    let start = 0, end = 0
    for (let i =0; i< s.length; i++) {
      const [start1, end1] = expandAroundCenter(s, i, i) // 奇
      const [start2, end2] = expandAroundCenter(s, i, i+1)  // 偶

      if (end1 - start1 > end - start) {
        start = start1
        end = end1
      }
      if (end2 - start2 > end - start) {
        start = start2
        end = end2
      }
    }

    return s.substring(start, end + 1)
};
// @lc code=end



/*
// @lcpr case=start
// "babad"\n
// @lcpr case=end

// @lcpr case=start
// "cbbd"\n
// @lcpr case=end

 */

