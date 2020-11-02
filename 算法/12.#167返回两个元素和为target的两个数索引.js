/**
 * 给定一个有序整型数组和一个target，寻找两个元素，和为target，返回这两个数的索引
 */

 // 空间换时间法
var findSumIndex = function(arr, target){
  const record = new Map()
  for(let i = 0; i < arr.length; i++){
    // 如果现有的map的键值刚好为arr[i]，返回对应值的index和当前项的index
    let value = record.get(arr[i])
    if(value){
      return [value.index+1, i+1]
    }
    record.set(target - arr[i], {index: i})
  }
}

// 对撞指针法
var findSumIndex2 = function(arr, target){
  let i = 0, j = arr.length - 1
  for(;i < j;){
    const iValue = arr[i], jValue = arr[j]
    let value = target - iValue - jValue
    if(value === 0){
      return [i, j]
    }
    if(value < 0){
      j--
    } else {
      i++
    }
  }
}

// 测试用例
let arrTest = [2, 7, 11, 15], target = 9 // [1, 2]
let result = findSumIndex2(arrTest, 9)
console.log(result)