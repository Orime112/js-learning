/**
 * 给定一个数组，数组中的元素只可能为0,1,2三个数中的值，按照0,1,2的顺序排列成有序数组
 */

/**
 * 计数排序法
 * 统计0,1,2三个元素的个数，再以此个数生成想要的数组
 * @param {} arr 
 */

function countSort(arr){
  const count = {0: 0, 1: 0, 2: 0}
  for(let i = 0; i < arr.length; i++){
    count[arr[i]]++
  }
  const generateArr = function(num, times){
    return Array.from({length: times}, item => num)
  }
  return generateArr(0, count[0]).concat(generateArr(1, count[1]), generateArr(2, count[2]))
}

/**
 * 三路快排，注意zero和two指针位置
 * @param {*} arr 
 */

function threeRoaldSort(arr){
  // 定义zero，i，two分别在0,1,2元素的起始位置（左闭右开）
  let zero = -1
  let i = 0
  let two = arr.length
  let swap = function(arr, a, b){
    [arr[a], arr[b]] = [arr[b], arr[a]]
  }
  for(; i < two; ){
    if(arr[i] === 1){
      // 不用管
      i++
    } else if (arr[i] === 2) {
      // two索引-1并且和当前的i交换位置，i不变
      swap(arr, --two, i)
    } else if (arr[i] === 0){
      swap(arr, ++zero, i++)
    }
  }
  return arr
}

// 测试用例

let arrTest = [0,1,2,0,1,2,1,1,2,2,2,0]
console.time('计数排序')
const result = countSort(arrTest)
console.timeEnd('计数排序')
console.log(result)
console.time('三路快排')
threeRoaldSort(arrTest)
console.timeEnd('三路快排')
console.log(arrTest)
