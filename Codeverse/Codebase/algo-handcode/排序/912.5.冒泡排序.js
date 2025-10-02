// 优化： 标记每轮是否发生交换，如果没有，那就可以提前终止。
// 因为冒泡排序，前面的轮次便利的数多，都没有交换的


function bubbleSort(arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    markSwaped = false; // 标记是否交换过
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

        markSwaped = true;
      }
    }
    if (!markSwaped) break; // 如果本轮无交换，以后也不会有了
  }
  return arr;
}

console.log(bubbleSort([2, 9, 5, 7, 3, 2, 1]));
