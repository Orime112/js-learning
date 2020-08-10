/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
  let times = 1
  const len = nums.length
  if(len <= 1){
    return len
  }
  if(len === 2){
    if(nums[0] === nums[1]){
      nums.splice(0, 1)
      return 1
    } else {
      return 2
    }
  }
  nums.push(nums[0])
  for(var i = 1; i < len; i++){
      if(nums[nums.length -1] !== nums[i]){
          nums.push(nums[i])
          times+=1
      }
  }
  nums.splice(0, nums.length - times)
  return times
};


// 测试用例
let arr = [0,0,1,1,1,2,2,3,3,4]
console.log(removeDuplicates(arr))
console.log(arr)