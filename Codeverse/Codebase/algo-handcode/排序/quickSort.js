function quickSort(arr, left = 0, right = arr.length - 1) {
  if (!arr || left >= right) return;

  // 分区操作，返回本轮分区完成排序的索引
  const index = partition(arr, left, right);

  // 递归排序左右分区
  quickSort(arr, left, index - 1);
  quickSort(arr, index + 1, right);

  return arr;
}


// 分区函数（核心）,一次分区会把一个基准值刚到排序后的正确位置
function partition(arr, left, right) {
  // 随机选择基准值（避免最坏情况），并放到最右
  const randomIndex = left + Math.floor(Math.random() * (right - left + 1));
  swap(arr, randomIndex, right);

  // 简单写的话，也可以不随机，直接选最右
  const pivot = arr[right];

  let i = left; // i：比基准值 pivot 小的边界指针

  for (let j = left; j < right; j++) { // 找 pivot 应该处在的位置：左边都比它小，右边都比它大
    if (arr[j] < pivot) {
      // 交换元素i j位置，把比 pivot 小的放到i 左边
      swap(arr, i, j);
      i++;
    }
  }

  // 将基准值放到正确位置。i:比 pivot 小的全部到i左边了
  swap(arr, i, right);
  return i;
}

function swap(arr, i, j) {
  if (!arr || i === j) return;
  [arr[i], arr[j]] = [arr[j], arr[i]];
}



const a = [7, 4, 1, 6, 8, 9];
quickSort(a);
console.log(a);
