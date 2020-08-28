/**
给定一个无序数组和一个target，要求按照离target距离从近到远进行排序
 */

function sort(arr, n){
  const len = arr.length
  let transArr = []
  for(let i = 0; i < len; i++){
    let abs = Math.abs(n - arr[i])
    transArr.push({[arr[i]]: abs})
  }
  // console.log(transArr)
  function quick(list){
    if(list.length <= 1) return list
    let len = list.length
    let midIndex = Math.floor(len/2)
    let midValue = list.splice(midIndex, 1)[0]
    let [left, right] = [[], []]
    for(let i = 0; i < list.length; i++){
      if(Object.values(list[i])[0] < Object.values(midValue)[0]) left.push(list[i])
      else right.push(list[i])
    }
    return quick(left).concat(midValue, quick(right))
  }
  let result = quick(transArr).map(item => Object.keys(item)[0])
  return result
}

// 测试用例
let arr = [7, 28, -1, 0, 7, 33]
let res = sort(arr, 5)
console.log(res)