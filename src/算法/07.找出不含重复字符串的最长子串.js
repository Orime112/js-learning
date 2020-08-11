/**
let str1 = 'abcabcbb' // 3
let str2 = 'bbbbb' // 1
*/

var findStr1 = function (str) {
  let maxLen = 1
  let len = 1
  let char = str[0]
  for (let i = 1; i < str.length; i++) {
    if (!char.includes(str[i])) {
      // 如果之前中没有该字符，则push进去
      char += str[i]
      len += 1
    } else {
      // 如果之前存在该字符，则从当前i位置重新计数
      maxLen = len > maxLen ? len : maxLen
      char = str[i]
      len = 0
    }
    // 循环到最后自动退出捕获
    if (i === str.length - 1) {
      maxLen = len > maxLen ? len : maxLen
    }
  }
  return maxLen
}


// 测试用例
let str1 = 'abcddefghtiop' // 3
let str2 = 'bbbbb' // 1

console.log(findStr1(str1))

// 1、将所有连续子串找出，挑出长度最长的那个
// 2、如何快速找出连续子串--->哈希映射分割
// 3、猴子掰棒子，找到连续子串记录长度，后边长度比这小的直接舍弃