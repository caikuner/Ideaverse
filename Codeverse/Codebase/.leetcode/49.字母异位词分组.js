/*
 * @lc app=leetcode.cn id=49 lang=javascript
 *
 * [49] 字母异位词分组
 *
 * https://leetcode.cn/problems/group-anagrams/description/
 *
 * algorithms
 * Medium (67.96%)
 * Likes:    1867
 * Dislikes: 0
 * Total Accepted:    676.1K
 * Total Submissions: 994.7K
 * Testcase Example:  '["eat","tea","tan","ate","nat","bat"]'
 *
 * 给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。
 * 
 * 字母异位词 是由重新排列源单词的所有字母得到的一个新单词。
 * 
 * 
 * 
 * 示例 1:
 * 
 * 
 * 输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
 * 输出: [["bat"],["nat","tan"],["ate","eat","tea"]]
 * 
 * 示例 2:
 * 
 * 
 * 输入: strs = [""]
 * 输出: [[""]]
 * 
 * 
 * 示例 3:
 * 
 * 
 * 输入: strs = ["a"]
 * 输出: [["a"]]
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= strs.length <= 10^4
 * 0 <= strs[i].length <= 100
 * strs[i] 仅包含小写字母
 * 
 * 
 */

// @lc code=start
/** 很容易想到用 map 保存每一个组，问题点在于：怎么唯一表示不同的异位词
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
    // 容易想到 将字母排序输出，不同的异位词表示一致
    var getSign = (str) => {
        // 注意： 排序字符，需要转成码元序列才能 sort
        return str.split('').sort((a, b) => a.charCodeAt() - b.charCodeAt()).join('')
    }

    // 改进：构造一个26字母空间，把字符串中所有的字符压缩到(映射)空间中，相同字母的映射位置一致
    // 空间占用小
    var getSign = (str) => {
        const letterSpace = new Array(26).fill(0)  // 0:a, ..., 25: z （这里认为是全小写，考虑大写的话扩大空间即可）
        const start = 'a'.charCodeAt()
        for (let i = 0; i < str.length; ++i) {
            letterSpace[str[i].charCodeAt() - start] += 1 // +1 是考虑到可能有重复字符
        }

        let res = ''
        for (let i = 0; i < letterSpace.length; ++i) {
            if (letterSpace[i]) {
                res += (String.fromCharCode(i + start)).repeat(letterSpace[i]) // 转换回字符
            }
        }
        return res
    }

    const map = new Map()
    for (let i = 0; i < strs.length; ++i) {
        const str = strs[i]
        const sign = getSign(str)

        if (map.has(sign)) {
            map.set(sign, map.get(sign).concat(str))
        } else {
            map.set(sign, [str])
        }
    }

    const res = []
    map.forEach((v, k) => res.push(v))
    return res
};
// @lc code=end