/**
 * 将数组中的所有0移动到末尾，并保证其他元素的相对顺序
 * 要求：1、比如在元素上操作，不能拷贝新数组；2、尽量减少操作次数
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes1 = function (nums) {
  let count = 0
  for (let i = 0; i < nums.length - count; i++) {
    if (nums[i] === 0) {
      count++
      nums.splice(i, 1)
      nums.push(0)
      i--
    }
  }
};

// 从尾部开始进行替换
var moveZeroes2 = function (nums) {
  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i] === 0) {
      nums.splice(i, 1)
      nums.push(0)
    }
  }
}

// 记录非0数并替换
var moveZeroes3 = function (nums) {
  let j = 0
  for (let i = 0; i < nums.length; i++) {
    // 遇0元素无需改变，遇到非0要与j交换位置
    if (nums[i] !== 0) {
      // 不是0元素
      nums[j++] = nums[i]
    }
  }
  for (; j < nums.length; j++) {
    nums[j] = 0
  }
}

// 让0元素直接和非0元素交换位置
var moveZeroes4 = function (nums) {
  let j = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      if (i === j) {
        j++
      } else {
        // 遇到非0元素了，要和0元素交换位置
        [nums[j++], nums[i]] = [nums[i], nums[j]]
      }
    }
  }
}

let arr = [2, 3, 0, 0, 23, 0, 2, 0, 1, 0]

console.time('移动0')
let res = moveZeroes4(arr)
console.log(arr)
console.timeEnd('移动0')