// 和前缀一样的处理，区别是从后往前遍历，注意处理下标

function longestCommonSuffix(strs) {
  if (!strs || !strs.length) return "";
  if (strs.length === 1) return strs[0];

  const n = Math.min(...strs.map((s) => s.length));
  let res = [];

  // 从末尾开始逐字符比较, i:倒数第 i 个字符
  for (let i = 0; i < n; i++) {
    const target = strs[0][strs[0].length - 1 - i];
    for (let j = 1; j < strs.length; j++) {
      if (strs[j][strs[j].length - 1 - i] !== target) {
        return res.reverse().join("");
      }
    }
    // target全部相同
    res.push(target);
  }
  return res.reverse().join("");
}

console.log(longestCommonSuffix(["abcded", "cded", "ed"])); // ed
console.log(longestCommonSuffix(["abcded", "abcd", "d"])); // d
console.log(longestCommonSuffix(["abcded", "c"])); // ""
