/**
* 出题：求斐波那契数列的第n个数 1, 1, 2, 3, 5, 8
* @param n 长度
* @returns []
*/

// 未进行尾递归优化
function fibonacci1(n){
  return n-1 <= 1 ? 1 : fibonacci1(n-1) + fibonacci1(n-2)
}

console.time('斐波那契1')
console.log(fibonacci1(6))
console.timeEnd('斐波那契1')
// 1
// 斐波那契1: 4.253ms


// 进行尾递归优化
function fibonacci2(n, ac1, ac2){
  (ac1 = ac1 || 1), (ac2 = ac2 || 1)
  return n-1 <= 1 ? ac2 : fibonacci2(n-1, ac2, ac2 + ac1)
}

console.time('斐波那契2')
console.log(fibonacci2(6))
console.timeEnd('斐波那契2')
// 1
// 斐波那契2: 0.047ms