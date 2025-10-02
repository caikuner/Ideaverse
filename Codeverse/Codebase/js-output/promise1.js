console.log(1);

new Promise(function (resolve, reject) {
  console.log(6);

  reject(true);
  window.setTimeout(function () {
      console.log(5) 
      resolve(false);  
  }, 0);   // 下次执行宏任务才能放入回调
})
.then(function () {
  console.log(2);
}, function () {
  console.log(3);
});

console.log(4);

// 1
// 6
// 4
// 3
