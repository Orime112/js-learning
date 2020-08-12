/**
 * 翻转字符串
 * @param str 'abcdefg'
 * @returns str 'gfedcba'
 */

// 1、打散成数组
var reverseStr1 = function(str){
  const arr = Array.from(str)
  const len = arr.length
  for(let i = 0; i < len/2; i++){
    [arr[i], arr[len-1-i]] = [arr[len-1-i], arr[i]]
  }
  return arr.join('')
}

// 2、开辟新的字符串倒序接收
var reverseStr2 = function(str){
  let newStr = ''
  for(let i = str.length - 1; i >= 0; i--){
    newStr += str[i]
  }
  return newStr
}

// 测试用例
let str = 'abcdefg'

console.log(reverseStr1(str))
console.log(reverseStr2(str))

// 1、直接调用字符串的reverse方法 X 字符串没有reverse方法
// 2、字符串打散成数组，交换数组位置后拼起来
// 3、开辟新的字符串倒序接收