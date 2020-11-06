let arr = [1, 2, 3]
let set = new Set([4, 5, 6])
let map = new Map([['one', 'value'], ['two', 'success']])

for(let val of arr){
  console.log(val);
}
for(let val of set){
  console.log(val);
}
for(let val of map){
  console.log(val);
}

/**
 * * 对于数组和集合，会依次打印 value，对于 map，会打印出类似 map.entries() 的结果
 */

// 1
// 2
// 3
// 4
// 5
// 6
// [ 'one', 'value' ]
// [ 'two', 'success' ]