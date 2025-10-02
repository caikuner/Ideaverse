// 快手用增一面
// 合并单元格：
arr = [
  {id: 1, type: 'a'},
  {id: 2, type: 'a'},
  {id: 3, type: 'a'},
  {id: 4, type: 'b'},
  {id: 5, type: 'b'},
  {id: 6, type: 'c'},
  {id: 7, type: 'c'},
  {id: 8, type: 'd'}
]
// 转化成
res_arr = [
  {id: 1, type: 'a', rowSpan: 3},
  {id: 2, type: 'a', rowSpan: 0},
  {id: 3, type: 'a', rowSpan: 0},
  {id: 4, type: 'b', rowSpan: 2},
  {id: 5, type: 'b', rowSpan: 0},
  {id: 6, type: 'c', rowSpan: 2},
  {id: 7, type: 'c', rowSpan: 0},
  {id: 8, type: 'd', rowSpan: 1}
]

function transform(arr) {
  if (!arr || arr.length === 0) return [];

  const result = arr.map(item => ({...item, rowSpan: 0})); // 创建数组副本避免修改原数组
  let startIndex = 0;      // 当前连续组的起始索引，必须保存住，后面才好更新它的 rowSpan 注意⚠️
  let currentType = result[0].type; // 当前连续组的类型(分组依据)

  for (let i = 1; i <= result.length; i++) { // 故意走到尾部的下一个
    // 当类型变化或到达数组末尾时，写上一组的 rowSpan。并换到下一组
    if (i === result.length || result[i].type !== currentType) {
      const groupLength = i - startIndex;
      
      // 设置上组的第一个元素的rowSpan
      result[startIndex].rowSpan = groupLength;

      // 迭代下一组
      if (i < result.length) {
        startIndex = i;
        currentType = result[i].type;
      }
    }
  }
  
  return result;
}

console.log(transform(arr))

