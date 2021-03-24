global.gc() // ! 执行时候需要加上 node --expose-gc 01.xxx.js
// * 手动清理垃圾状态
console.log(
  `第一次垃圾回收，当前内存使用情况${(
    process.memoryUsage().heapUsed /
    1024 /
    1024
  ).toFixed(2)}Mb`,
  "总",
  (process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2) + "Mb"
)

const wm = new WeakMap()

let key = {}
// * wm实例赋值一个占领内存足够大的键值对
wm.set(key, new Array(114514 * 19))

// 手动清理
global.gc()
console.log(
  `第二次垃圾回收，当前内存使用情况${(
    process.memoryUsage().heapUsed /
    1024 /
    1024
  ).toFixed(2)}Mb`,
  "总",
  (process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2) + "Mb"
)

key = null // * 置空键，释放内存
// key = {} // ! 没置空键，占用内存
global.gc()
console.log(
  `第三次垃圾回收，当前内存使用情况${(
    process.memoryUsage().heapUsed /
    1024 /
    1024
  ).toFixed(2)}Mb`,
  "总",
  (process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2) + "Mb"
)

/**
 * 第一次垃圾回收，当前内存使用情况1.56Mb 总 5.28Mb
第二次垃圾回收，当前内存使用情况18.36Mb 总 24.38Mb
第二次垃圾回收，当前内存使用情况1.75Mb 总 11.78Mb
 */
