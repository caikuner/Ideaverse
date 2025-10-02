/*
 * @lc app=leetcode.cn id=438 lang=javascript
 *
 * [438] 找到字符串中所有字母异位词
 *
 * https://leetcode.cn/problems/find-all-anagrams-in-a-string/description/
 *
 * algorithms
 * Medium (53.54%)
 * Likes:    1418
 * Dislikes: 0
 * Total Accepted:    413.3K
 * Total Submissions: 772.1K
 * Testcase Example:  '"cbaebabacd"\n"abc"'
 *
 * 给定两个字符串 s 和 p，找到 s 中所有 p 的 异位词 的子串，返回这些子串的起始索引。不考虑答案输出的顺序。
 * 
 * 异位词 指由相同字母重排列形成的字符串（包括相同的字符串）。
 * 
 * 
 * 
 * 示例 1:
 * 
 * 
 * 输入: s = "cbaebabacd", p = "abc"
 * 输出: [0,6]
 * 解释:
 * 起始索引等于 0 的子串是 "cba", 它是 "abc" 的异位词。
 * 起始索引等于 6 的子串是 "bac", 它是 "abc" 的异位词。
 * 
 * 
 * 示例 2:
 * 
 * 
 * 输入: s = "abab", p = "ab"
 * 输出: [0,1,2]
 * 解释:
 * 起始索引等于 0 的子串是 "ab", 它是 "ab" 的异位词。
 * 起始索引等于 1 的子串是 "ba", 它是 "ab" 的异位词。
 * 起始索引等于 2 的子串是 "ab", 它是 "ab" 的异位词。
 * 
 * 
 * 
 * 
 * 提示:
 * 
 * 
 * 1 <= s.length, p.length <= 3 * 10^4
 * s 和 p 仅包含小写字母
 * 
 * 
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
    var getSign = (str) => {
        const letterSpace = new Array(26).fill(0)
        const start = 'a'.charCodeAt()

        for (const si of str) {
            letterSpace[si.charCodeAt() - start] += 1  // 可能重复
        }

        let res = ''
        for (let i = 0; i < letterSpace.length; ++i) {
            if (letterSpace[i]) {
                res += (String.fromCharCode(i + start)).repeat(letterSpace[i])
            }
        }
        return res
    }

    const windowLen = p.length
    const sign = getSign(p)

    let res = []
    for (let i = 0; i < s.length - windowLen + 1; i++) {
        const curSign = getSign(s.slice(i, i + windowLen))
        if (curSign === sign) {
            res.push(i)
        }
    }
    return res
};
// @lc code=end

console.log(findAnagrams(s = "cbaebabacd", p = "abc"))

// TODO: https://leetcode.cn/problems/find-all-anagrams-in-a-string/solutions/1123971/zhao-dao-zi-fu-chuan-zhong-suo-you-zi-mu-xzin/?envType=study-plan-v2&envId=top-100-liked