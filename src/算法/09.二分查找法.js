/**

* 给定一个数组arr，寻找target项的索引

*/

function findindex(arr, target){
  const len = arr.length
  let l = 0, r = len
  let midIndex = Math.floor(len/2)
  while(l <= r){
    let middleValue = arr[midIndex]
    if(middleValue === target) return midIndex
    if(middleValue > target){
      r = midIndex - 1
      midIndex = Math.floor((r - l)/2 + l)
    }else {
      l = midIndex + 1
      midIndex = Math.floor((r - l)/2 + l)
    }
  }
  return -1
}

// 测试用例
let arr = Array.from({length: 1000}, (item, index) => index+1)
let target = 999
console.log(findindex(arr, target))