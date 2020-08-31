// @ts-check

/**
 * 
给定一个包含 n 个整数的数组 nums 和一个目标值 target，
判断 nums 中是否存在四个元素 a，b，c 和 d ，使得 a + b + c + d 的值与 target 相等？找出所有满足条件且不重复的四元组。
注意：答案中不可以包含重复的四元组。
示例：给定数组 nums = [1, 0, -1, 0, -2, 2]，和 target = 0。
满足要求的四元组集合为：
[
  [-1,  0, 0, 1],
  [-2, -1, 1, 2],
  [-2,  0, 0, 2]
]
*/

var fourSum = /**
 * @param {string | any[]} nums
 * @param {number} target
 */
 function(nums, target){
  let map = new Map()
  let A, B, C, D
  let len = nums.length
  let result = []
  // 二重循环得到A+B的所有可能的结果
  for(let i = 0; i < len; i++){
    A = nums[i]
    for(let j = 0; j < len; j++){
      B = nums[j]
      map.set([i, j], A+B)
    }
  }
  for(let i = 0; i < len; i++){
    C = nums[i]
    for(let j = 0; j < len; j++){
      D = nums[j]
      let sum = C + D
      if(sum + map.get([i, j]) === 0){
        result.push([i, j, i, j])
      }
    }
  }
  return result
}

// 测试用例
let testNums = [1, 0, -1, 0, -2, 2], target = 0
console.log(fourSum(testNums, target))
