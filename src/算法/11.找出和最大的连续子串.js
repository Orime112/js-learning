/**
* 给出一个正数数组，找出和最大的连续子串的最大和
*/

// 1、暴力解法，找出所有的连续子数组，计算最大值（边找边计算）
var findMaxSum1 = function (arr) {
  let preSum = max = arr[0]
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      max = Math.max(max, preSum)
      preSum += arr[j]
    }
  }
  return max
}

// 2、累计和如果小于下一个值则最大值取下一个值
var findMaxSum2 = function(nums){
  let len = nums.length
  let max = nums[0]
  let preSum = nums[0]
  for(let i = 0; i < len; i++){
    preSum = Math.max(nums[i], preSum+nums[i]) // 如果当前和加上下一个值之后，比下一个将被比较的值还小，就不用加了
    max = Math.max(max, preSum)
  }
  return max
}

// 测试用例
let arrTest = [-3, 0, -1, -2, 9] // 6

console.time('1')
let res = findMaxSum1(arrTest)
console.log(res)
console.timeEnd('1')

console.time('2')
let res2 = findMaxSum2(arrTest)
console.log(res2)
console.timeEnd('2')


// 1、暴力解法，找出所有连续子数组，求最大和
// 2、指针对撞,i = 0, j=1, [i, j)的和为判断条件，设定初始和为0，如果小于0，