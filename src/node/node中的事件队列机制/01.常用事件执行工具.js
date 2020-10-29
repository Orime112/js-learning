/**
  * * node中的事件执行机制，同样有宏任务和微任务之分
  * * setTimeout setInterval setImmediate IO操作 close事件 都是宏任务
  *    ! setImmediate比setTimeout还要后面执行
  *    ! 准确来说，宏任务队列执行顺序 timer queue(setTimeout setInterval) -> poll queue(IO事件) -> check queue(setImmediata) -> close queue(close事件)
  * * Promise的then回调 process.nextTick queueMicrotask 都是微任务
  *    ! 几个微任务相比起来，process.nextTick第一，queueMicrotask 和 Promise的then回调 不相上下
 */

setImmediate(() => {
  console.log('setImmediate');
  
})

setTimeout(() => {
  console.log('setTimeout');
})

process.nextTick(() => {console.log('pross.nextTick');
})

Promise.resolve().then(() => {
  console.log('Promise的then');
  
})

queueMicrotask(() => {
  console.log('queueMicrotask');
})

/**pross.nextTick
queueMicrotask
Promise的then
setTimeout */