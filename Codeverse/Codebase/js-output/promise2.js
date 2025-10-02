setTimeout(()=>{console.log('t1')},0)

Promise.resolve()
.then(()=>console.log('p1'))
.then(()=>console.log('p2')) // p1 完成后，才把p2追加到微任务队尾


Promise.resolve()
.then(()=>console.log('p3'))

setTimeout(()=>{console.log('t2')},0)

// p1, p3, p2, t1, t2
