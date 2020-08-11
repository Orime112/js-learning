/**
真题描述： 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

示例: 给定 nums = [2, 7, 11, 15], target = 9
因为 nums[0] + nums[1] = 2 + 7 = 9 所以返回 [0, 1]
 */

// 暴力解法省略

// 利用映射求和变求差
function findSumIndex(nums, target) {
  let map = {}
  for(let i = 0; i < nums.length; i++){
    const minus = target - nums[i]
    if(map[nums[i]]){
      return [map[nums[i]][1], i]
    }
    if(minus >= 0){
      map[minus] = [nums[i], i]
    }
  }
}

// 测试用例
let nums = [1, 7, 11, 8]
let target = 9

console.log(findSumIndex(nums, target))

// 1、暴力解法：通过二层循环的方式逐个组合进行试验
// 2、求和变成求差的；先求sum总和，新建一个对象：{7: 2, 2: 7}