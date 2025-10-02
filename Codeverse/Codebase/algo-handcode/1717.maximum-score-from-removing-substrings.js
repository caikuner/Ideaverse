/*
 * @lc app=leetcode.cn id=1717 lang=javascript
 * @lcpr version=30204
 *
 * [1717] 删除子字符串的最大得分
 *
 * https://leetcode.cn/problems/maximum-score-from-removing-substrings/description/
 *
 * algorithms
 * Medium (50.68%)
 * Likes:    61
 * Dislikes: 0
 * Total Accepted:    13.4K
 * Total Submissions: 22.6K
 * Testcase Example:  '"cdbcbbaaabab"\n4\n5'
 *
 * 给你一个字符串 s 和两个整数 x 和 y 。你可以执行下面两种操作任意次。
 * 
 * 
 * 删除子字符串 "ab" 并得到 x 分。
 * 
 * 
 * 比方说，从 "cabxbae" 删除 ab ，得到 "cxbae" 。
 * 
 * 
 * 删除子字符串"ba" 并得到 y 分。
 * 
 * 比方说，从 "cabxbae" 删除 ba ，得到 "cabxe" 。
 * 
 * 
 * 
 * 
 * 请返回对 s 字符串执行上面操作若干次能得到的最大得分。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 输入：s = "cdbcbbaaabab", x = 4, y = 5
 * 输出：19
 * 解释：
 * - 删除 "cdbcbbaaabab" 中加粗的 "ba" ，得到 s = "cdbcbbaaab" ，加 5 分。
 * - 删除 "cdbcbbaaab" 中加粗的 "ab" ，得到 s = "cdbcbbaa" ，加 4 分。
 * - 删除 "cdbcbbaa" 中加粗的 "ba" ，得到 s = "cdbcba" ，加 5 分。
 * - 删除 "cdbcba" 中加粗的 "ba" ，得到 s = "cdbc" ，加 5 分。
 * 总得分为 5 + 4 + 5 + 5 = 19 。
 * 
 * 示例 2：
 * 
 * 输入：s = "aabbaaxybbaabb", x = 5, y = 4
 * 输出：20
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= s.length <= 10^5
 * 1 <= x, y <= 10^4
 * s 只包含小写英文字母。
 * 
 * 
 */


// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * @param {string} s
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var maximumGain = function(s, x, y) {
    // 优先处理分数高的组合，使用数组解构一次性定义所有变量
    const [highPair, highScore, lowPair, lowScore] = x > y 
        ? ['ab', x, 'ba', y] 
        : ['ba', y, 'ab', x];
    
    // 第一次遍历：处理高分组合
    let stack = [];
    let score = 0;
    for (const char of s) {
        if (stack.length > 0 && stack[stack.length - 1] + char === highPair) {
            stack.pop();
            score += highScore;
        } else {
            stack.push(char);
        }
    }
    
    // 第二次遍历：处理低分组合，直接复用同一个栈变量
    const tempStack = [];
    for (const char of stack) {
        if (tempStack.length > 0 && tempStack[tempStack.length - 1] + char === lowPair) {
            tempStack.pop();
            score += lowScore;
        } else {
            tempStack.push(char);
        }
    }
    
    return score;
};
// @lc code=end



/*
// @lcpr case=start
// "cdbcbbaaabab"\n4\n5\n
// @lcpr case=end

// @lcpr case=start
// "aabbaaxybbaabb"\n5\n4\n
// @lcpr case=end

 */