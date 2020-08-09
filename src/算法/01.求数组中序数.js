/**
 * @param {number[]} nums
 * @return {number}
 */
var sumNum = function(arr){
  return arr.reduce((pre, cur) => pre+cur, 0)
}
var pivotIndex = function(nums) {
  // 左边Sum = 右边Sum
  let leftArr = []
  let rightArr = nums.slice(1)
  let result = -1
  for(let i = 1; i < nums.length + 1; i++){
    let leftSum = sumNum(leftArr)
    let rightSum = sumNum(rightArr)
    if(leftSum === rightSum) {
      result = i
      break
    } else {
      leftArr = nums.slice(0, i)
      rightArr = nums.slice(i+1)
    }
  }
  return result === -1 ? result : result -1
};

/**
 * 最佳思路
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var pivotIndex1 = function(nums) {
  const sum = nums.reduce( (a,b)=> a+b, 0);
  let leftSum = 0;
  for( let i=0, len=nums.length; i< len;i++){
      if(leftSum == sum - nums[i] - leftSum) return i
      leftSum += nums[i];
  }
  return -1
};

// 作者：luoboo
// 链接：https://leetcode-cn.com/problems/find-pivot-index/solution/xun-zhao-shu-zu-de-zhong-xin-suo-yin-jian-dan-yi-d/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

// 测试用例
const arr1 = [1,7,3,6,5,6]
// console.log(pivotIndex(arr1)) // 3

const arr2 = [-1,-1,-1,-1,-1,0]
// console.log(pivotIndex(arr2)) // 2

const arr3 = [-1,-1,-1,0,1,1]
// console.log(pivotIndex(arr3)) // 0

const arr4 = [-1,-1,0,1,1,0]
console.log(pivotIndex(arr4)) // 5
