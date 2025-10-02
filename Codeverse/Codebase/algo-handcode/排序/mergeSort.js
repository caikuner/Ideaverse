function mergeSort(arr, left=0, right = arr.length - 1) {
  if (!Array.isArray(arr) || !arr.length || left > right) return []
  if (left === right) return arr.slice(left, left + 1)

  const mid = (right + left) >> 1; // /2
  const leftArr = mergeSort(arr, left, mid);
  const rightArr = mergeSort(arr, mid + 1, right);
  return merge(leftArr, rightArr);
}

// merge: 相当于合并两个有序数组
function merge(arr1, arr2) {
  const n1 = arr1.length, n2 = arr2.length
  const arr = [];

  let i = 0, j = 0
  while (i < n1 && j < n2) {
    if (arr1[i] <= arr2[j]) {
      arr.push(arr1[i]);
      i++;
    } else {
      arr.push(arr2[j]);
      j++;
    }
  }

  // 剩余元素
  while (i < n1) {
    arr.push(arr1[i])
    i++
  }
  while (j < n2) {
    arr.push(arr2[j])
    j++
  }

  return arr
}


const a = [7, 7, 4, -1, 1, 6, 8, 9];
const b = mergeSort(a);
console.log(a);
console.log(b);