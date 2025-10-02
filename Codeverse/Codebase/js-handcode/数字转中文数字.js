// 数字转中文数字，eg: 13275 -> 一万三千二百七十五
function numberToChinese(num) {
  const chineseDigits = ['零','一','二','三','四','五','六','七','八','九']
  const chineseUnits = ['', '十', '百', '千', '万', '亿']
  const chineseBigUnits = ['', '万', '亿', '万亿'] // 4 位递增

  if (num === 0) return '零'

  let result = ''
  const numStr = num.toString()
  const n = numStr.length
  const groups = Math.ceil(numStr.length / 4) 
  // 每 4 个一组,不足 4 个也算一组。注意应该从后往前划组

  // i: 第 i 组（从后往前）
  for (let g=0; g < groups; g++) {
    const startIndex = Math.max(n - (g+1) * 4, 0) // 不足一组的会越界<0
    const groupLen = Math.min(n - g * 4, 4) // 该组长度

    let groupStr = ''
    for (let i = 0; i < groupLen; i++) {
      const digit = parseInt(numStr[startIndex + i])
      if (digit !== 0) {
        // 如果当前位不为0，添加对应中文数字及单位（如“千”、“百”）
        groupStr += chineseDigits[digit] + chineseUnits[groupLen - i - 1]
      } else if (i > 0 && groupStr[groupStr.length - 1] !== chineseDigits[0]) {
        // 如果当前位是0，并且上一位不是0，则添加一个“零”
        groupStr += chineseDigits[0]
      }
    }

    // 如果当前组有值，则拼接大单位（如“万”、“亿”）并加到结果中
    if (groupStr !== '') {
      result = groupStr + chineseBigUnits[groups - g - 1] + result
    }
  }
  return result
}

// 测试用例
// console.log(numberToChinese(3275)); // 输出：三千二百七十五
// console.log(numberToChinese(1001)); // 输出：一千零一
console.log(numberToChinese(10000000)); // 输出：一千万
console.log(numberToChinese(100000000)); // 输出：一亿