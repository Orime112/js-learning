/**
  * * node中的事件执行机制，同样有宏任务和微任务之分
  * * setTimeout setInterval setImmediate IO操作 close事件 都是宏任务
  * * Promise的then回调 process.nextTick queueMicrotask 都是微任务
      ! 几个微任务相比起来，process.nextTick第一，queueMicrotask第二，Promise的then回调 第三
 */

setTimeout(() => {
  console.log('setTimeout');
})

queueMicrotask(() => {
  console.log('queueMicrotask');
})

process.nextTick(() => {console.log('pross.nextTick');
})

Promise.resolve().then(() => {
  console.log('Promise的then');
  
})

/**pross.nextTick
queueMicrotask
Promise的then
setTimeout */