/*
给定两个字符串 s1 和 s2，找到它们的最长公共子串（要求连续）。

示例：
输入：s1 = "cabcde", s2 = "dabfce"
输出："ab"（最长公共连续子串）
*/

// 相同：
// LeetCode 718. 最长重复子数组（Maximum Length of Repeated Subarray）

// 相似：（不要求连续）
// LeetCode 1143. 最长公共子序列（Longest Common Subsequence, LCS）

function longestCommonSubstring(str1, str2) {
  const len1 = str1.length,
    len2 = str2.length;
  let res = "";

  for (let i = 0; i < len1; i++) {
    for (let j = 0; j < len2; j++) {
      // 滑动窗口长度, 注意滑动的终点 [i, len1)  [k, len2)
      let k = 0;
      while (i + k < len1 && j + k < len2 && str1[i + k] === str2[j + k]) {
        // 注意不要越界，不取等
        k++;
      }

      // 当前轮次（i,j为起点）的最大公共子串，坐标 [i,i+k)，长度k
      // 对比更新
      if (res.length < k) {
        res = str1.substring(i, i + k); // 截取 k 个字符
      }
    }
  }

  return res;
}

console.log(longestCommonSubstring("abcde", "abfce")); // "ab"
console.log(longestCommonSubstring("cabcde", "dabfce")); // "ab"
