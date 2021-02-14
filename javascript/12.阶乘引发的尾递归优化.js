/**
* 实现一个阶乘函数
* @param n 阶乘目标数
* @returns total 阶乘值
*/
// 未做尾递归优化
function factorial1(n){
  if(n === 1) return 1
  return n * factorial1(n-1)
}
console.time(1)
console.log(factorial1(100))
console.timeEnd(1)
// 24
// 1: 4.623ms

// 使用尾递归优化
function factorial2(n, total=1){
  if(n === 1) return total
  return factorial2(n-1, total*=n)
}
console.time(2)
console.log(factorial2(100))
console.timeEnd(2)
// 24
// 2: 0.081ms