global.gc()
console.log(`第一次垃圾回收内存情况：已用${(process.memoryUsage().heapUsed/1024/1024).toFixed(2)} Mb；总${(process.memoryUsage().heapTotal/1024/1024).toFixed(2)} Mb`)

const map = new Map()
let key = {}
map.set(key, new Array(11104*19))

global.gc()
console.log(`第二次垃圾回收内存情况：已用${(process.memoryUsage().heapUsed/1024/1024).toFixed(2)} Mb；总${(process.memoryUsage().heapTotal/1024/1024).toFixed(2)} Mb`)

// key = null // ! 置空key键，依然不会释放
global.gc()
console.log(`第三次垃圾回收内存情况：已用${(process.memoryUsage().heapUsed/1024/1024).toFixed(2)} Mb；总${(process.memoryUsage().heapTotal/1024/1024).toFixed(2)} Mb`)

map.clear() // ! clear之后才能被释放
global.gc()
console.log(`第四次垃圾回收内存情况：已用${(process.memoryUsage().heapUsed/1024/1024).toFixed(2)} Mb；总${(process.memoryUsage().heapTotal/1024/1024).toFixed(2)} Mb`)


/**
 * * 第一次垃圾回收内存情况：已用1.56 Mb；总5.28 Mb
 * * 第一次垃圾回收内存情况：已用3.37 Mb；总9.39 Mb
 * * 第一次垃圾回收内存情况：已用3.36 Mb；总9.39 Mb
 * 很明显我们将key = null的引用地址断开后 ，

value 仍然存在Map所构建的实例里面，一如既往还在内存里面。

由此可见Map所构建的实例是需要手动清理，才能被垃圾回收清除，

 */
