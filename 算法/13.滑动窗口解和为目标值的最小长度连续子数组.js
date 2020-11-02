/**
 * 给定一个数组，求解数组中的连续子数组和大于等于target的最小子数组长度
 */

var countLength = function(arr, target){
  let l = 0, r = 1, sum = arr[l], res = arr.length
  for(; r<arr.length;){
    // if(sum < target){
    //   // 如果和小于target，右增加
    //   sum += arr[r++]
    // }else if(sum>target){
    //   sum -= arr[l++]
    // }else if(sum === target){
    //   const len = r-l
    //   len < res ? res = len : null
    // }
  }
  return res
}

// 测试用例
let arrTest = [1, 3, 2, 1, 4, 2, 7], target = 7 // [4, 3]，长度为2
let result = countLength(arrTest, target)
console.log(result)
