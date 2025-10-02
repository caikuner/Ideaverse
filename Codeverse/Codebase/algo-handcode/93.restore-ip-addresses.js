/*
 * @lc app=leetcode.cn id=93 lang=javascript
 * @lcpr version=30204
 *
 * [93] 复原 IP 地址
 *
 * https://leetcode.cn/problems/restore-ip-addresses/description/
 *
 * algorithms
 * Medium (61.49%)
 * Likes:    1521
 * Dislikes: 0
 * Total Accepted:    520K
 * Total Submissions: 845.3K
 * Testcase Example:  '"25525511135"'
 *
 * 有效 IP 地址 正好由四个整数（每个整数位于 0 到 255 之间组成，且不能含有前导 0），整数之间用 '.' 分隔。
 * 
 * 
 * 例如："0.1.2.201" 和 "192.168.1.1" 是 有效 IP 地址，但是 "0.011.255.245"、"192.168.1.312"
 * 和 "192.168@1.1" 是 无效 IP 地址。
 * 
 * 
 * 给定一个只包含数字的字符串 s ，用以表示一个 IP 地址，返回所有可能的有效 IP 地址，这些地址可以通过在 s 中插入 '.' 来形成。你 不能
 * 重新排序或删除 s 中的任何数字。你可以按 任何 顺序返回答案。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 输入：s = "25525511135"
 * 输出：["255.255.11.135","255.255.111.35"]
 * 
 * 
 * 示例 2：
 * 
 * 输入：s = "0000"
 * 输出：["0.0.0.0"]
 * 
 * 
 * 示例 3：
 * 
 * 输入：s = "101023"
 * 输出：["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= s.length <= 20
 * s 仅由数字组成
 * 
 * 
 */


// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function(s) {
    // * 输入：s = "25525511135"
    // * 输出：["255.255.11.135","255.255.111.35"]
    const n = s.length
    if (n <=0 || n > 12) return []

    const res = []
    const path = [] // 每一段
    function backtrack(start) { // 剩余未分配字符的起始 index
      if (path.length === 4) {
        if (start === n) {
          // 合法结果
          res.push(path.join("."))
        }
        return
      }

      // 遍历剩余字符，分段。每段最大 255，三位字符
      for (let i= 1; i <= 3; i++) {
        if (start + i > n) break  // 剩余字符不足

        let seg = s.substring(start, start + i)
        if ((seg.length > 1 && seg[0] === "0") || Number(seg) > 255) continue // ip不合法(多个0 / >255)

        // 选取 seg
        path.push(seg)
        backtrack(start + i)

        // 不选 seg
        path.pop()
      }
    }

    backtrack(0)
    return res
};
// @lc code=end



/*
// @lcpr case=start
// "25525511135"\n
// @lcpr case=end

// @lcpr case=start
// "0000"\n
// @lcpr case=end

// @lcpr case=start
// "101023"\n
// @lcpr case=end

 */

