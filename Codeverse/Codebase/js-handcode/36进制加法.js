/* 类似 LC415.字符串相加
36 进制由 0-9，a-z，共 36 个字符表示。

要求按照加法规则计算出任意两个 36 进制正整数的和，如 1b + 2x = 48  （解释：47+105=152）

要求：不允许使用先将 36 进制数字整体转为 10 进制，相加后再转回为 36 进制的做法
*/

function add36Strings(str1, str2){
  let i = str1.length - 1, j = str2.length - 1
  let carry = 0
  const res = []

  while(i>=0 || j>=0 || carry) {
    const x = i >=0 ? parseInt(str1[i], 36) : 0
    const y = j >=0 ? parseInt(str2[j], 36) : 0
    const sum = x + y + carry

    carry = Math.floor(sum / 36)
    res.push((sum % 36).toString(36))

    i--
    j--
  }

  return res.reverse().join("")
}

console.log(add36Strings('1b', '2x')) // '48'
console.log(add36Strings('1c', '2y')) // '4a'