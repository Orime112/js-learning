/**
 * 给定一个整数序列（不保证有序），寻找第k大元素
 */

 // 传统排序暴力解法
var findEle = function(arr, k){
  // 先假设一个元素是第一大的，管理每个元素序号{1: 3}, {2: 2}, {3: 1}; {1: 5}, {2: 3}, {3: 2}, {4: 1}; {}
  // 每当遇到一个更大值，排序递增
  function quick(array){
    if(array.length <= 1){
      return array
    }
    const midIndex = Math.floor(array.length/2)
    const midValue = array.splice(midIndex, 1)[0]
    const left = [], right = []
    for(let i = 0; i < array.length; i++){
      if(arr[i] > midValue){
        left.push(arr[i])
      } else if( arr[i] < midValue){
        right.push(arr[i])
      }
    }
    return quick(left).concat(midValue, quick(right))
  }
  let sortArr = quick(arr)
  console.log(sortArr)
  return sortArr[k-1]
}

// 测试用例
let arrTest = [3, 2, 1, 5, 6, 4] // 结果为5
let k = 2
// result => 2
let result = findEle(arrTest, k)
console.log(result)